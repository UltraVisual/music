chrome.app.runtime.onLaunched.addListener(function () {
	runApp();
});

chrome.app.runtime.onRestarted.addListener(function () {
	runApp();
});

function runApp() {
	chrome.app.window.create('window.html', {
		id: 'music-app',
		bounds: {
			'width': 1020,
			'height': 600
		}
	});
}