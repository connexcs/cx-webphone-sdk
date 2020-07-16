# ConnexCS Webphone SDK Connector

ConnexCS Webphone is a SIP over WebRTC Client which is used in the ConnexCS Platform.

The purpose of this SDK is to provide minimal lines of code to a stable deployment.

Example Usage

```
<html>
	<head>
		<title>WebPhone Example</title>
	</head>
	<div id="cxPhone" style="height:300px;width:400px;"></div>
	<script src="https://webphone-sdk.connexcs.com/cx-webphone-sdk.js"></script>
	<script>
		window.addEventListener('DOMContentLoaded', () => {
			// Ready to Init
			var phone = cxWebphone('cxPhone', 'https://webphone.mydomain.com');
		});	
	</script>
</html>
```


<!-- Live Example Script Start -->
<style>
#cxPhone {
	width: 400px;
	height: 300px;
}
#error {
	color: red;
}
</style>
<div>
	Enter your ConnexCS Portal URL <input id="url" name="url"/>
	<button onclick="start(document.getElementById('url').value)">Start</button>
<!--
	<a href='#' onClick="start(document.getElementById('url').value)">Start</a>
-->
	<div>
		<div id="error"></div>
		<div id="cxPhone"></div>
		<div>
			<button onClick="call('160')">Call 160</button>
			<button onClick="hangup()">Hang Up</button>
		</div>
	</div>
<div>
<script src="https://webphone-sdk.connexcs.com/cx-webphone-sdk.js"></script>
<script>
	var errMessage = document.getElementById('error');
	var phone = null
	async function start(url) {
		try {
			errMessage.innerHTML = '';
			if (!url) throw new Error('URL is required')
			// Ready to Init
			phone = cxWebphone('cxPhone', url);
		} catch (err) {
			console.error(err)
			errMessage.innerHTML = 	`Error: ${err.message}`;
		}
	}
	async function call (number) {
		try {
			let result = phone.call(number)
			console.log(result)
		} catch (err) {
			console.error(err)
			errMessage.innerHTML = 	`Error: ${err.message}`;
		}
	}
	function hangup () {
		try {
			let result = phone.hangup()
			console.log(result)
		} catch (err) {
			console.error(err)
			errMessage.innerHTML = 	`Error: ${err.message}`;
		}
	}
</script>
<!-- Live Example Script End -->
