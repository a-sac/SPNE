cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-pin-dialog/www/pin.js",
        "id": "cordova-plugin-pin-dialog.PinDialog",
        "pluginId": "cordova-plugin-pin-dialog",
        "merges": [
            "window.plugins.pinDialog"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/src/browser/DeviceProxy.js",
        "id": "cordova-plugin-device.DeviceProxy",
        "pluginId": "cordova-plugin-device",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/src/browser/SplashScreenProxy.js",
        "id": "cordova-plugin-splashscreen.SplashScreenProxy",
        "pluginId": "cordova-plugin-splashscreen",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-touch-id/www/TouchID.js",
        "id": "cordova-plugin-touch-id.TouchID",
        "pluginId": "cordova-plugin-touch-id",
        "clobbers": [
            "window.plugins.touchid"
        ]
    },
    {
        "file": "plugins/cordova-plugin-fingerprint-aio/www/Fingerprint.js",
        "id": "cordova-plugin-fingerprint-aio.Fingerprint",
        "pluginId": "cordova-plugin-fingerprint-aio",
        "clobbers": [
            "Fingerprint"
        ]
    },
    {
        "file": "plugins/phonegap-plugin-barcodescanner/www/barcodescanner.js",
        "id": "phonegap-plugin-barcodescanner.BarcodeScanner",
        "pluginId": "phonegap-plugin-barcodescanner",
        "clobbers": [
            "cordova.plugins.barcodeScanner"
        ]
    },
    {
        "file": "plugins/phonegap-plugin-barcodescanner/src/browser/BarcodeScannerProxy.js",
        "id": "phonegap-plugin-barcodescanner.BarcodeScannerProxy",
        "pluginId": "phonegap-plugin-barcodescanner",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
        "id": "cordova-plugin-inappbrowser.inappbrowser",
        "pluginId": "cordova-plugin-inappbrowser",
        "clobbers": [
            "cordova.InAppBrowser.open",
            "window.open"
        ]
    },
    {
        "file": "plugins/cordova-plugin-inappbrowser/src/browser/InAppBrowserProxy.js",
        "id": "cordova-plugin-inappbrowser.InAppBrowserProxy",
        "pluginId": "cordova-plugin-inappbrowser",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-browsertab/www/browsertab.js",
        "id": "cordova-plugin-browsertab.BrowserTab",
        "pluginId": "cordova-plugin-browsertab",
        "clobbers": [
            "cordova.plugins.browsertab"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-pin-dialog": "0.1.3",
    "cordova-plugin-whitelist": "1.3.3",
    "cordova-plugin-device": "2.0.1",
    "cordova-plugin-splashscreen": "5.0.2",
    "cordova-plugin-ionic-webview": "1.1.16",
    "cordova-plugin-ionic-keyboard": "2.0.5",
    "cordova-plugin-touch-id": "3.3.1",
    "cordova-plugin-add-swift-support": "1.7.1",
    "cordova-plugin-fingerprint-aio": "1.3.4",
    "phonegap-plugin-barcodescanner": "8.0.0",
    "cordova-plugin-inappbrowser": "3.0.0",
    "cordova-plugin-compat": "1.2.0",
    "cordova-plugin-browsertab": "0.2.0"
}
// BOTTOM OF METADATA
});