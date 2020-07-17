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
#cxPhone:empty {
   display: none;
}
#cxPhone {
	width: 400px;
	height: 300px;
}
input {
	width: 30%;
}
</style>
<div>
	Enter your ConnexCS Portal URL <input id="url" name="url"/>
	<button onclick="start(document.getElementById('url').value)">Start</button>
	<div>
		<div id="output"></div>
		<div id="cxPhone"></div>
		<div id="isButtons">
			<button onClick="call('160')">Call 160</button>
			<button onClick="hangup()">Hang Up</button>
		</div>
	</div>
<div>
<script src="https://webphone-sdk.connexcs.com/cx-webphone-sdk.js"></script>
<script>
	var output = document.getElementById('output');
	var isButton = document.getElementById('isButtons');
	var phone = null
	isButton.style.display = 'none';
	async function start(url) {
		try {
			output.innerHTML = '';
			isButton.style.display = 'none';
			if (!url) throw new Error('URL is required');
			// Ready to Init
			phone = cxWebphone('cxPhone', url);
			isButton.style.display = 'block';
		} catch (err) {
			console.error(err)
			output.innerHTML = 	`Error: ${err.message}`;
			output.style.color = "#f44336";
		}
	}
	async function call (number) {
		try {
			output.innerHTML = 	`Running Function call(${number})`;
			let result = phone.call(number)
			output.innerHTML = 	`Function call Complete\n` + JSON.stringify(result, null, 4);
			console.log(result)
		} catch (err) {
			console.error(err)
			output.innerHTML = 	`Error: ${err.message}`;
			output.style.color = "#f44336";
		}
	}
	function hangup () {
		try {
			let result = phone.hangup()
			output.innerHTML = 	`Call ended\n` + JSON.stringify(result, null, 4);
			console.log(result)
		} catch (err) {
			console.error(err)
			output.innerHTML = 	`Error: ${err.message}`;
			output.style.color = "#f44336";
		}
	}
</script>
<!-- Live Example Script End -->
