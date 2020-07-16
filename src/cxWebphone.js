/**
 * cxWebphone
 * 
 * @module cxWebphone
 * @namespace cxWebphone
 * @class
 * @hideconstructor
 * @classdesc ConnexCS Webphone SDK Connector
 * 
 * ## Example ##
 * ```
 * var phone = cxWebphone('myId', 'https://webphone.mydomain.com');
 * ```
 */

module.exports = function cxWebphone (containerId, src) {
	if (!containerId || typeof containerId !== 'string') throw new Error(`Can\'t find <div id="${containerId}"></div>`)
	const promiseCallback = {};
	var container = null
	_init();

	return { config, on, provision, call, answer, reject, hangup, mute, unmute, sendDTMF, register, unregister };
	/**
	 * Initalize the component (into an iframe).
	 *
	 * @param {string} ID of the container
	 * @return {string} Webphone Root URL
	 *
	 * @example
	 *     var phone = cxWebphone('myId', 'https://webphone.mydomain.com');
	 */
	
	function _init () {
		container = document.getElementById(containerId);
		if (!container) throw new Error(`Can\'t find <div id="${containerId}"></div>`)
		const iframe = document.createElement('iframe');
		iframe.src = src;
		iframe.height = '300px'
		iframe.width = '400px'
		container.appendChild(iframe);

		window.addEventListener("message", _receiveMessage, false);
	}
	
	/**
	 * Pass config data to the component
	 *
	 * @param {{ username: string, password: string, realm: string, displayName: string, wsServer: string, cli: string }} Config Object
	 * @return {Promise} 
	 *
	 * @example
	 *     phone.config();
	 */

	function config(data) {
		return _postPromise('config', data);
	}

	/**
	 * Add Event Listener
	 *
	 * @param {string} Event Name
	 * @param {*} Event Data
	 *
	 * @example
	 *     phone.on('ringing', myRingingFunction);
	 *     phone.on('err', myErrFunction);
	 *     phone.on('statusChanged', myStatusChanged);
	 *     phone.on('cdr', myCdrFunction);
	 */

	function on (name, fn) {
		container.addEventListener(name, fn, false);
	}

	/**
	 * Provision a new User
	 *
	 * @param {{ email: string }} Provision Object
	 * @param {function} Validation Callback
	 * @return {Promise}
	 *
	 * @example
	 *     phone.provision({ email: 'joe@blogs.com'});
	 */
	function provision (data, validationCallback) {
		if (!validationCallback) return _postPromise('provision', data);
		return _postPromise('provision', data)
			.then(validationCallback)
			.then(res => _postPromise('validate', res))
	}

	/**
	 * Start a call with destination
	 *
	 * @param {string} destination The destination endpoint that wish to call
	 * @return {Promise} 
	 *
	 * @example
	 *     phone.call('123456789');
	 */

	function call (destination) {
		return _postPromise('call', {destination});
	}

	/**
	 * Mute the local media of a call
	 *
	 * @return {Promise} 
	 *
	 * @example
	 *     phone.mute();
	 */

	function mute () {
		return _postPromise('mute');
	}

	/**
	 * Unmute the local media of a call
	 *
	 * @return {Promise} 
	 *
	 * @example
	 *     phone.unmute();
	 */

	function unmute () {
		return _postPromise('unmute');
	}

	/**
	 * Answer an incoming call
	 *
	 * @return {Promise} 
	 *
	 * @example
	 *     phone.answer();
	 */

	function answer() {
		return _postPromise('answer');
	}

	/**
	 * Reject an incoming call
	 *
	 * @return {Promise} 
	 *
	 * @example
	 *     phone.reject();
	 */

	function reject() {
		return _postPromise('reject');
	}

	/**
	 * Hangup a call
	 *
	 * @return {Promise} 
	 *
	 * @example
	 *     phone.hangup();
	 */

	function hangup() {
		return _postPromise('hangup');
	}

	/**
	 * Send a (RFC 4733) DTMF event to the active call.
	 *
	 * @param {string} tone The tone that you want to send to the active call when a button is pressed (digits: 0-9, symbols: # *)
	 * @return {Promise} 
	 *
	 * @example
	 *     phone.sendDTMF(tone);
	 */

	function sendDTMF(tone) {
		return _postPromise('sendDTMF', {tone});
	}

	/**
	 * Perform a SIP Registration
	 *
	 * @param {object} [data] Optional Object to be used for Standalone mode, leave empty when provisioning
	 * @param {string} data.displayName Friendly name
	 * @param {string} data.cli From Number
	 * @param {string} data.username Authentication Username
	 * @param {string} data.password Authentication Password
	 * @param {string} data.wsServer Server Address
	 * @param {string} data.realm Realm
	 * @return {Promise} 
	 *
	 * @example <caption>Standalone Example.</caption>
	 *     phone.register({
	 *        displayName: '',
	 *        cli: null,
	 *        username: '',
	 *        password: '',
	 *        wsServer:'',
	 *        realm: ''
	 *     });
	 * @example <caption>Provision Example.</caption>
	 *     phone.register();
	 */

	function register() {
		return _postPromise('register', data);
	}

	/**
	 * SIP Unregsiter
	 *
	 * @return {Promise} 
	 *
	 * @example
	 *     phone.unregister();
	 */

	function unregister() {
		return _postPromise('config', data);
	}

	function _postPromise (fn, data) {
		const id = Math.random() * 10000000;
		return new Promise((resolve, reject) => {
			promiseCallback[id] = {resolve, reject}
			popup.postMessage({ id, containerId, fn, data, _type: 'webphone-sdk'}, src);
		})
	}
	
	function _receiveMessage (e) {
		var wrap = e.data;
		if (!wrap.containerId || wrap.containerId != containerId) return
		if (wrap.id && promiseCallback[wrap.id]) {
			if (wrap.error) {
				promiseCallback[wrap.id].reject(new Error(wrap.error))
			} else {
				promiseCallback[wrap.id].resolve(wrap.data)
			}
			delete promiseCallback[wrap.id]
		} else if (wrap.event) {
			const event = new CustomEvent(wrap.event, wrap.data);			
			container.dispatchEvent(event);
		}
	}
}