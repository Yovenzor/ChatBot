// Replace with your OpenAI API key
const apiKey = 'your API key';

document.addEventListener('DOMContentLoaded', function () {
    const chatLog = document.getElementById('chat-log');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    sendButton.addEventListener('click', function () {
        const userMessage = userInput.value.trim();
        if (userMessage === '') return;

        // Display user's message
        displayMessage('user', userMessage);

        // Send user's message to the chatbot API
        sendToChatbot(userMessage);

        // Clear the input field
        userInput.value = '';
    });

    function displayMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(sender);
        messageDiv.textContent = message;
        chatLog.appendChild(messageDiv);

        // Scroll to the bottom of the chat log
        chatLog.scrollTop = chatLog.scrollHeight;
    }

    async function sendToChatbot(userMessage) {
        try {
            // Make a request to the ChatGPT API
            const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    prompt: userMessage,
                    max_tokens: 1, // Adjust this as needed
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const chatbotResponse = data.choices[0].text;

                // Display the chatbot's response
                displayMessage('chatbot', chatbotResponse);
            } else {
                console.error('Error fetching response from the ChatGPT API.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }
});
