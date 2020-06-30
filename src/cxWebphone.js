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

export default function cxWebphone (containerId, src) {
	const promiseCallback = {};
	var containerId = null;
	var container = null
	var src = null;
	_init();

	return { config, on, provision, invite, stop, register, unregister };
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
		const iframe = document.createElement('iframe');
		iframe.style.display = "none";
		iframe.src = src;
		containerElement.innerHTML(iframe);

		window.addEventListener("message", receiveMessage, false);
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
	 * Place an Outbound Call
	 *
	 * @param {string} Phone Number
	 * @return {Promise} 
	 *
	 * @example
	 *     phone.call('123456789');
	 */

	function invite (address) {
		return _postPromise('invite', data);
	}

	/**
	 * Stop a call (HangUp / Reject / Cancel Ringing)
	 *
	 * @return {Promise} 
	 *
	 * @example
	 *     phone.stop();
	 */

	function stop() {
		return _postPromise('stop', data);
	}

	/**
	 * Perform a SIP Registration
	 *
	 * @return {Promise} 
	 *
	 * @example
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
			popup.postMessage({ id, containerId, data: {fn, ...data}}, src);
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