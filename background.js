chrome.browserAction.onClicked.addListener(function() {
	chrome.tabs.query({
		currentWindow: true,
		active: true
	}, function(tab) {
		chrome.tabs.create({
			"url": "http://goodmanga.net"
		});
	});
});
chrome.browserAction.setBadgeBackgroundColor({
	// color: '#ff0000'
	color: '#777'
});
chrome.browserAction.setBadgeText({
	text: '1'
});
