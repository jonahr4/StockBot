
//When User Sends a messsage to the bot
document.getElementById('send-btn').addEventListener('click', function() {
    const input = document.getElementById('chat-input');
    const chatDisplay = document.getElementById('chat-display');

    if (input.value.trim()) { //if not an empty string

        //Display user message
        const userMessage = document.createElement('p');
        userMessage.textContent = input.value;
        userMessage.classList.add('user-message');
        chatDisplay.appendChild(userMessage);

        //Display Chatbot Response
        const botMessage = document.createElement('p');
        botMessage.textContent = "Chat response placeholder";
        botMessage.classList.add('bot-message');
        chatDisplay.appendChild(botMessage);

        //Clear input field
        input.value = '';

        // Scroll to the bottom of the chat display
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    }
});