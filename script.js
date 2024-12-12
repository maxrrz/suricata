const chatBody = document.getElementById('chatBody');

function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();

    if (message) {
        appendMessage('user', message);
        userInput.value = '';

        setTimeout(() => {
            botReply();
        }, 500);
    }
}

function appendMessage(sender, message) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('chat-message', sender);

    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content', sender);
    messageContent.textContent = message;

    messageContainer.appendChild(messageContent);
    chatBody.appendChild(messageContainer);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function botReply() {
    const botMessage = 'Desculpa, ainda estou em desenvolvimento! 🤖🚧 Mas estou a aprender todos os dias para te ajudar melhor! 🛠️';
    appendMessage('bot', botMessage);
}
