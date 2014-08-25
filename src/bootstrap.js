var goButton = document.querySelector('#go-button');
var selection = document.querySelector('#choice');
var webView = document.querySelector('#webView');
var popupContainer = undefined;
var newWebView = undefined;

window.onresize = function(){
    handleResize()
};

handleResize();

goButton.addEventListener('click', function (e) {
    console.log('Shane', e)
    webView.src = selection.value;
});

//todo - listen for esc press to remove popups;

function handleExit(e) {
//    console.log(e, e.type);
}

function handleResize(){
    webView.style.width = window.innerWidth + 'px';
    webView.style.height = window.innerHeight - 50 +'px';
}

function handleLoadStart(e) {
//    console.log(e, e.type);
}

function handleLoadStop(e) {
//    console.log(e, e.type);
}

function handleLoadAbort(e) {
//    console.log(e, e.type);
}

function handleLoadRedirect(e) {
    if(e.newUrl.indexOf('https://soundcloud.com/soundcloud-callback') === 0){
        onRedirectAfterLogin({});
        webView.src = 'https://soundcloud.com/';
    }
}

function getHostName(url) {
    var aTag = document.createElement('a');
    aTag.href = url;
    return aTag.host;
}

function handleLoadCommit(e) {
    if(getHostName(e.url) === 'soundcloud.com'){
        return;
    }
    if (!!newWebView && e.srcElement === newWebView && getHostName(e.url) === getHostName(webView.src)) {
        onRedirectAfterLogin({});
    }
    else if(!!newWebView && e.srcElement === newWebView && getHostName(e.url) === 's-static.ak.facebook.com'){
        onRedirectAfterLogin({});
    }
}

function onRedirectAfterLogin(e) {
    webView.removeEventListener('loadredirect', onRedirectAfterLogin);
    removeListeners(newWebView);
    if(!!popupContainer) {
        document.body.removeChild(popupContainer);
    }
    newWebView = undefined;
}

function loadNewWindow(e) {
    newWebView = document.createElement('webview');
    popupContainer = document.createElement('div');
    popupContainer.classList.add('modal');
    newWebView.classList.add('popup-webview');
    popupContainer.appendChild(newWebView);
    document.body.appendChild(popupContainer);
    e.window.attach(newWebView);
    webView.addEventListener('loadredirect', onRedirectAfterLogin);
    addListeners(newWebView);
}

addListeners(webView);

function addListeners(view) {
    view.addEventListener('exit', handleExit);
    view.addEventListener('loadstart', handleLoadStart);
    view.addEventListener('newwindow', loadNewWindow);
    view.addEventListener('loadstop', handleLoadStop);
    view.addEventListener('loadabort', handleLoadAbort);
    view.addEventListener('loadredirect', handleLoadRedirect);
    view.addEventListener('loadcommit', handleLoadCommit);
}



function removeListeners(view) {
    view.removeEventListener('exit', handleExit);
    view.removeEventListener('loadstart', handleLoadStart);
    view.removeEventListener('newwindow', loadNewWindow);
    view.removeEventListener('loadstop', handleLoadStop);
    view.removeEventListener('loadabort', handleLoadAbort);
    view.removeEventListener('loadredirect', handleLoadRedirect);
    view.removeEventListener('loadcommit', handleLoadCommit);
}