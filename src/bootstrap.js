var goButton = document.querySelector('#go-button') ;
var selection = document.querySelector('#choice') ;
var webView = document.querySelector('#webView');

goButton.addEventListener('click', function(){
	webView.src = selection.value;
});