//JONAH ROTHMAN STOCKBOT JAVASCRIPT

// When User Sends a message to the bot by clicking the send button
document.getElementById('send-btn').addEventListener('click', sendMessage);

// When User Presses Enter key in the input field
document.getElementById('chat-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});


//Funcrtion to display message on the chatbox
async function sendMessage() {
    const input = document.getElementById('chat-input');
    const chatDisplay = document.getElementById('chat-display');

    if (input.value.trim()) { //if not an empty string

        //Display user message
        const userMessage = document.createElement('p');
        userMessage.textContent = input.value;
        const userTxt = input.value;
        userMessage.classList.add('user-message');
        chatDisplay.appendChild(userMessage);

        //Clear input field
        input.value = '';

        // Scroll to the bottom of the chat display
        chatDisplay.scrollTop = chatDisplay.scrollHeight;


        //Display Chatbot Response
        const botResponse = await getBotResponse(userTxt);
        const botMessage = document.createElement('p');
        botMessage.textContent = botResponse;
        botMessage.classList.add('bot-message');
        chatDisplay.appendChild(botMessage);
    }
}


// Function to get the bot response from OpenAI API
async function getBotResponse(userText) {
    
}