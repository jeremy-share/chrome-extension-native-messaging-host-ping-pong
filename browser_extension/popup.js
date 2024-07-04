document.getElementById('ping').addEventListener('click', () => {
    console.log("Sending: ping");
    sendMessage("ping");
});

function sendMessage(message) {
    console.log('Sending message:', message);
    chrome.runtime.sendMessage(message, (response) => {
        if (response && response.success) {
            console.log('Action executed successfully');
        } else {
            console.error('Action failed:', response ? response.message : 'No response');
        }
    });
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'received_message') {
        appendMessage(message.content);
    }
});

function appendMessage(content) {
    const messagesTextArea = document.getElementById('messages');
    messagesTextArea.value += content + '\n';
}
