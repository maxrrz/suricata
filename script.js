let lastMessageTime = 0;  
const spamInterval = 3000;  

// Função para alternar entre Modo Claro e Modo Escuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Função para enviar mensagens
function sendMessage() {
    const userInput = document.getElementById('userInput');
    const chatBody = document.getElementById('chatBody');
    const msgText = userInput.value.trim();

    const currentTime = Date.now();

    if (currentTime - lastMessageTime < spamInterval) {
        alert('Por favor, aguarde um pouco antes de enviar outra mensagem. ⏳');
        return;
    }

    if (msgText) {
        lastMessageTime = currentTime;

        const userMessage = document.createElement('div');
        userMessage.className = 'message-content user';
        userMessage.textContent = msgText;
        chatBody.appendChild(userMessage);

        userInput.value = '';
        chatBody.scrollTop = chatBody.scrollHeight;

        setTimeout(() => {
            sendBotReply(msgText);
        }, 1000);
    }
}

// Função para responder ao utilizador
function sendBotReply(userMsg) {
    const chatBody = document.getElementById('chatBody');

    const botMessage = document.createElement('div');
    botMessage.className = 'message-content bot';
    botMessage.textContent = `🤖 Desculpa, ainda estou em desenvolvimento! 🤖🚧 Mas estou a aprender todos os dias para te ajudar melhor! 🛠️`;

    setTimeout(() => {
        chatBody.appendChild(botMessage);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
}

// Adiciona o evento ao botão Enviar
document.getElementById('sendBtn').addEventListener('click', sendMessage);

// Adiciona o envio das mensagens ao pressionar Enter
document.getElementById('userInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Alterna entre os temas claro/escuro
document.getElementById('themeBtn').addEventListener('click', toggleDarkMode);

// Mensagem de introdução ao entrar no chatbot
function showIntroMessage() {
    const chatBody = document.getElementById('chatBody');

    const introMsg = document.createElement('div');
    introMsg.className = 'message-content bot';
    introMsg.textContent = `Olá! 👋 Este chatbot é uma ferramenta sem fins lucrativos destinada a verificar a disponibilidade das salas de aulas e os materiais presentes na escola de Montemor-o-Velho.`;

    chatBody.appendChild(introMsg);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Chama a mensagem de introdução ao carregar a página
window.onload = showIntroMessage;
