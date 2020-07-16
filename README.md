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

<!DOCTYPE html>
<html>
<body>

<h2>HTML Forms</h2>

<form action="/action_page.php">
  <label for="fname">First name:</label><br>
  <input type="text" id="fname" name="fname" value="John"><br>
  <label for="lname">Last name:</label><br>
  <input type="text" id="lname" name="lname" value="Doe"><br><br>
  <input type="submit" value="Submit">
</form> 

<p>If you click the "Submit" button, the form-data will be sent to a page called "/action_page.php".</p>

</body>
</html>


<!-- Live Example Script Start -->
<style>
#cxPhone {
	width: 400px;
	height: 600px;
}
</style>
<div>
	Enter your ConnexCS Portal URL <input id="url" name="url"/> <a href='#' onClick="start(document.getElementById('url').value)">Start</a>
	<div>
		<div id="cxPhone"></div>
		<div>
			<a href='#' onClick="phone && phone.call('160')">Call 160</a>
			<a href='#' onClick="phone && phone.hangup()">Hang Up</a>
		</div>
	</div>
<div>

<script>
	var phone = null
	function start(url) {
		// Ready to Init
		var phone = cxWebphone('cxPhone', url);
	}
</script>
<!-- Live Example Script End -->
