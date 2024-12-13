let isDarkMode = false;

const chatBody = document.getElementById('chatBody');
const userInput = document.getElementById('userInput');

function sendMessage() {
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

function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);

    const toggleButton = document.getElementById('toggleTheme');
    toggleButton.textContent = isDarkMode ? '☀️ Modo Claro' : '🌙 Modo Escuro';
}

// Mensagem inicial ao entrar no chatbot
window.onload = function() {
    const welcomeMessage = '🤖 Desculpa, ainda estou em desenvolvimento! 🤖🚧 Mas estou a aprender todos os dias para te ajudar melhor! 🛠️';
    appendMessage('bot', welcomeMessage);
}

// Enviar mensagem ao pressionar Enter
userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
        e.preventDefault();
    }
});
