const chatBody = document.getElementById('chatBody');

function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();

    if (message) {
        appendMessage('user', message);
        userInput.value = '';

        setTimeout(() => {
            botReply(message);
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

function botReply(userMessage) {
    let botMessage;

    if (userMessage.toLowerCase().includes('olá')) {
        botMessage = 'Olá! Como posso ajudar-te hoje?';
    } else if (userMessage.toLowerCase().includes('horário')) {
        botMessage = 'O nosso horário de funcionamento é das 9h às 18h, de segunda a sexta.';
    } else {
        botMessage = 'Desculpa, não entendi. Podes reformular a tua pergunta?';
    }

    appendMessage('bot', botMessage);
}
