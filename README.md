# ConnexCS Webphone SDK Connector

ConnexCS Webphone is a SIP over WebRTC Client which is used in the ConnexCS Platform.

The purpose of this SDK is to provide minimal lines of code to a stable deployment.

Example Usage

```
<html>
	<head>
		<title>WebPhone Example</title>
	</head>
	<div style="height:500px;width:500px"></div>
	<script id="cxPhone" src="https://webphone-sdk.connexcs.com/cx-webphone-sdk.js"></script>
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
	height: 600px;
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
			<button onClick="phone && phone.call('160')">Call 160</button>
			<button onClick="phone && phone.hangup()">Hang Up</button>
		</div>
	</div>
<div>

<script>
	var phone = null
	async function start(url) {
		try {
			var errMessage = document.getElementById('error');
			errMessage.innerHTML = '';
			if (!url) throw new Error('URL is required')
			// Ready to Init
			var phone = cxWebphone('cxPhone', url);
		} catch (err) {
			errMessage.innerHTML = 	`Error: ${err.message}`;
		}
	}
</script>
<!-- Live Example Script End -->
