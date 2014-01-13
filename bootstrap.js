var changeButton = document.querySelector('#change-button') ;
var webView = document.querySelector('#webView');

changeButton.addEventListener('click', function(){
	if(webView.src.indexOf('grooveshark') > -1){
		webView.src = 'https://play.google.com/music/listen';
	}
	else{
		webView.src = 'http://grooveshark.com/';
	}
});