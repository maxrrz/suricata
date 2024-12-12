let lastMessageTime = 0;  // Variável para armazenar o timestamp da última mensagem enviada
const spamInterval = 3000;  // 3 segundos entre mensagens

// Função para enviar mensagens
function sendMessage() {
    const userInput = document.getElementById('userInput');
    const chatBody = document.getElementById('chatBody');
    const msgText = userInput.value.trim();

    const currentTime = Date.now();

    // Verifica se o utilizador tenta enviar mensagens em intervalos muito rápidos
    if (currentTime - lastMessageTime < spamInterval) {
        alert('Por favor, aguarde um pouco antes de enviar outra mensagem. ⏳');
        return;
    }

    if (msgText) {
        lastMessageTime = currentTime;

        // Cria a mensagem do utilizador e adiciona ao chat
        const userMessage = document.createElement('div');
        userMessage.className = 'message-content user';
        userMessage.textContent = msgText;
        chatBody.appendChild(userMessage);

        userInput.value = '';
        chatBody.scrollTop = chatBody.scrollHeight;

        // Resposta automática do chatbot com um pequeno delay
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
    botMessage.textContent = `Desculpa, ainda estou em desenvolvimento! 🤖🚧 Mas estou a aprender todos os dias para te ajudar melhor! 🛠️`;

    setTimeout(() => {
        chatBody.appendChild(botMessage);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
}

// Mensagem inicial ao entrar no chat
window.onload = function() {
    const welcomeMessage = 'Olá! 👋 Este chatbot é uma ferramenta sem fins lucrativos destinada a verificar a disponibilidade das salas de aulas e os materiais presentes na escola de Montemor-o-Velho.';
    appendMessage('bot', welcomeMessage);
}

// Enviar mensagem pressionando Enter
userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
        e.preventDefault();  // Evitar que o Shift+Enter seja ignorado
    }
});
