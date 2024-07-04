/*
On startup, connect to the "ping_pong" app.
*/
var port = chrome.runtime.connectNative("ping_pong");

/*
Listen for messages from the native messaging host.
*/
port.onMessage.addListener((response) => {
    console.log("Received from native app: ");
    console.log(response);
    // Send the received message to the popup
    chrome.runtime.sendMessage({ type: 'received_message', content: response });
});

/*
Listen for messages from the popup.
*/
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === "ping") {
        console.log("Forwarding message to native app: " + message);
        port.postMessage(message);
        sendResponse({ success: true });
    } else {
        sendResponse({ success: false, message: "Unknown message" });
    }
    return true;
});

/*
Handle disconnection from native messaging host.
*/
port.onDisconnect.addListener(() => {
    console.error("Disconnected from native messaging host");
    if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
    }
});
