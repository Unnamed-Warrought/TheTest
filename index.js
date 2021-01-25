var inAppBrowserRef;

var windowPlSpDialog;

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {

        this.receivedEvent('deviceready');

        document.getElementById('deviceready').classList.add('ready');

        document.getElementById('deviceready').addEventListener('click', deviceReadyClicked);
  
        loadPage();
    },

 // Add to index.js or the first page that loads with your app.

receivedEvent: function(id) {
  //START ONESIGNAL CODE
  //Remove this method to stop OneSignal Debugging 
  window.plugins.OneSignal.setLogLevel({logLevel: 6, visualLevel: 0});
  
  var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };
  // Set your iOS Settings
  var iosSettings = {};
  iosSettings["kOSSettingsKeyAutoPrompt"] = false;
  iosSettings["kOSSettingsKeyInAppLaunchURL"] = false;
  
  window.plugins.OneSignal
    .startInit("0afab853-964a-4377-a2d3-6fee08ea3433")
    .handleNotificationOpened(notificationOpenedCallback)
    .iOSSettings(iosSettings)
    .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification)
    .endInit();
  
  // The promptForPushNotificationsWithUserResponse function will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 6)
  window.plugins.OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
    console.log("User accepted notifications: " + accepted);
  });
  //END ONESIGNAL CODE
}

};


function deviceReadyClicked() {
  
   alert('deviceReady clicked');

}

function loadPage() {

	let url = 'https://www.mechta.kz/';

	let target = '_blank';

	let options = 'location=no, hidenavigationbuttons=yes, hidden=yes, beforeload=no';

	inAppBrowserRef = cordova.InAppBrowser.open( url, target, options);
 
    inAppBrowserRef.addEventListener('loadstart', loadStartCallBack);
 
    inAppBrowserRef.addEventListener('loadstop', loadStopCallBack);

    inAppBrowserRef.addEventListener('loaderror', loadErrorCallBack);

}
 
function loadStartCallBack() {
 
  windowPlSpDialog = 1;

  window.plugins.spinnerDialog.show("Loading","... . .  .", true);

  setTimeout(() => splash_2_stop(), 5000);

}
 
function loadStopCallBack() {

  splash_2_stop();
 
}
 
function loadErrorCallBack() {
 
    //splash_2_stop();

    alert("loading failure");

    inAppBrowserRef.close();

    inAppBrowserRef = undefined;
 
}

function splash_2_stop() {

	if (windowPlSpDialog != undefined) {

		window.plugins.spinnerDialog.hide();

    windowPlSpDialog = undefined;

  }

}

app.initialize();