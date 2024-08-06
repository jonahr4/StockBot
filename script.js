document.getElementById('send-btn').addEventListener('click', function() {
    const input = document.getElementById('chat-input');
    const chatDisplay = document.getElementById('chat-display');
    if (input.value.trim()) {
        const message = document.createElement('p');
        message.textContent = input.value;
        chatDisplay.appendChild(message);
        input.value = '';
    }
});