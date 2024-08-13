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
    const url = `https://api.openai.com/v1/assistants/${assistantId}/threads`;
    const betaHeader = 'assistants=v2';

    try {
        // Step 1: Create a Thread
        const threadResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'OpenAI-Beta': betaHeader, // Required for v2 API
            },
            body: JSON.stringify({
                model: "gpt-4", // Use the correct model associated with your assistant if needed
            }),
        });

        if (!threadResponse.ok) {
            throw new Error(`Thread creation failed: ${threadResponse.statusText}`);
        }

        const thread = await threadResponse.json();
        const threadId = thread.id;

        if (!threadId) {
            throw new Error('Thread ID is undefined.');
        }

        // Step 2: Add a Message to the Thread
        const messageResponse = await fetch(`${url}/${threadId}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'OpenAI-Beta': betaHeader,
            },
            body: JSON.stringify({
                role: "user",
                content: userText
            }),
        });

        if (!messageResponse.ok) {
            throw new Error(`Message creation failed: ${messageResponse.statusText}`);
        }

        // Step 3: Create a Run
        const runResponse = await fetch(`${url}/${threadId}/runs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'OpenAI-Beta': betaHeader,
            },
        });

        if (!runResponse.ok) {
            throw new Error(`Run creation failed: ${runResponse.statusText}`);
        }

        const run = await runResponse.json();

        if (run.status === 'completed') {
            const messagesResponse = await fetch(`${url}/${threadId}/messages`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                    'OpenAI-Beta': betaHeader,
                },
            });

            if (!messagesResponse.ok) {
                throw new Error(`Fetching messages failed: ${messagesResponse.statusText}`);
            }

            const messages = await messagesResponse.json();
            return messages.data.reverse()[0].content[0].text.value;
        } else {
            console.log(run.status);
            return "Sorry, I couldn't process your request.";
        }
    } catch (error) {
        console.error('Error:', error.message);
        return "An error occurred while processing your request.";
    }
}