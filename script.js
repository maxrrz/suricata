const guardarButton = document.getElementById('guardar');
const limparNotasButton = document.getElementById('limparNotas');
const nomeNotaInput = document.getElementById('nomeNota');
const notaInput = document.getElementById('nota');
const listaNotas = document.getElementById('listaNotas');
const loginPanel = document.getElementById('login-panel');
const notasPanel = document.getElementById('notas-panel');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const logoutButton = document.getElementById('logout');
const loginButton = document.getElementById('loginButton');
const errorMessage = document.getElementById('error-message');

// Credenciais de login
const usuarioCorreto = 'max';
const senhaCorreta = 'maxrrz';

// Função para verificar se o usuário está logado ao carregar a página
function verificarLogin() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (usuarioLogado === usuarioCorreto) {
        loginPanel.style.display = 'none';  // Oculta o painel de login
        notasPanel.style.display = 'block'; // Exibe o painel de notas
    } else {
        loginPanel.style.display = 'block'; // Exibe o painel de login
        notasPanel.style.display = 'none';  // Oculta o painel de notas
    }
}

// Função de login
loginButton.addEventListener('click', () => {
    const usuario = usernameInput.value;
    const senha = passwordInput.value;

    if (usuario === usuarioCorreto && senha === senhaCorreta) {
        localStorage.setItem('usuarioLogado', usuario); // Armazena no localStorage
        verificarLogin(); // Atualiza a interface para mostrar o painel de notas
    } else {
        errorMessage.style.display = 'block'; // Exibe mensagem de erro
    }
});

// Função de logout
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('usuarioLogado'); // Remove o usuário logado do localStorage
    verificarLogin(); // Atualiza a interface para voltar ao painel de login
});

// Verificar o login quando a página for carregada
window.onload = verificarLogin;

// Função para guardar a nota
guardarButton.addEventListener('click', () => {
    const nomeNota = nomeNotaInput.value.trim();
    const nota = notaInput.value.trim();

    if (nota && nomeNota) {
        // Verifica se o nome da nota já existe
        const notasExistentes = Object.keys(localStorage);
        if (notasExistentes.some(idNota => {
            const storedNota = localStorage.getItem(idNota);
            try {
                const parsedNota = JSON.parse(storedNota); // Tenta parsear a nota
                return parsedNota.nome === nomeNota;
            } catch (error) {
                return false; // Ignora qualquer erro de JSON
            }
        })) {
            alert('Já existe uma nota com este nome!');
            return;
        }

        // Adiciona a nota no localStorage
        const idNota = Date.now().toString();
        const timestamp = new Date().toLocaleString(); // Obtém a data e hora atuais
        const novaNota = { nome: nomeNota, texto: nota, dataCriacao: timestamp };
        localStorage.setItem(idNota, JSON.stringify(novaNota));

        // Exibe a nota na lista
        adicionarNotaALista(idNota, nomeNota, nota, timestamp);

        // Limpa os campos de entrada
        nomeNotaInput.value = '';
        notaInput.value = '';
    } else {
        alert('Preenche o nome e a nota antes de guardar!');
    }
});

// Função para gerar o link da nota
function gerarLinkParaNota(idNota) {
    return window.location.href.split('?')[0] + '?nota=' + idNota;
}

// Função para exibir a nota compartilhada
function exibirNota(idNota) {
    const nota = JSON.parse(localStorage.getItem(idNota));
    if (nota) {
        document.body.innerHTML = ` 
            <h1>${nota.nome}</h1>
            <p>${formatarTexto(nota.texto)}</p>
            <footer style="text-align: center; margin-top: 20px; font-size: 14px; color: #888;">Desenvolvido por Max</footer>
        `;
    } else {
        document.body.innerHTML = '<h1>Nota não encontrada!</h1>';
    }
}

// Função para adicionar nota na lista de "Notas Guardadas"
function adicionarNotaALista(idNota, nomeNota, textoNota, timestamp) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <input type="checkbox" class="checkbox-apagar" data-id="${idNota}" /> 
        <strong>${nomeNota}</strong>: ${formatarTexto(textoNota)} <br>
        <small>Salva em: ${timestamp}</small> <!-- Exibe a data e hora -->
        <button onclick="gerarLink(${idNota})">Gerar Link</button>
        <div id="link-${idNota}" style="margin-top: 5px; display: none;">
            <input type="text" id="linkInput-${idNota}" readonly />
            <button onclick="copiarLink(${idNota})">Copiar Link</button>
        </div>
    `;
    listaNotas.appendChild(listItem);
}

// Função para gerar o link e exibir o campo de cópia
function gerarLink(idNota) {
    const link = gerarLinkParaNota(idNota);
    const linkInput = document.getElementById(`linkInput-${idNota}`);
    linkInput.value = link;
    
    // Esconde o botão "Gerar Link" e exibe "Copiar Link"
    document.querySelector(`#link-${idNota}`).style.display = 'block'; 
    event.target.style.display = 'none'; // Esconde o botão "Gerar Link"
}

// Função para copiar o link gerado
function copiarLink(idNota) {
    const linkInput = document.getElementById(`linkInput-${idNota}`);
    linkInput.select();
    document.execCommand('copy');
    alert('Link copiado para a área de transferência!');
}

// Função para formatar o texto da nota
function formatarTexto(texto) {
    const textoComQuebras = texto.replace(/\n/g, '<br>');
    return detectarLinks(textoComQuebras);
}

// Função para detectar links no texto e formatá-los
function detectarLinks(texto) {
    const urlRegex = /https?:\/\/[^\s]+/g;
    const links = texto.split('<br>');

    const textoComLinks = links.map(linha => {
        if (urlRegex.test(linha)) {
            return linha.replace(urlRegex, (url) => {
                return `<a href="${url}" target="_blank">${url}</a>`;
            });
        }
        return linha;
    });

    return textoComLinks.join('<br>');
}

// Limpar notas selecionadas
limparNotasButton.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('.checkbox-apagar:checked');
    if (checkboxes.length > 0) {
        if (confirm('Tem certeza que deseja apagar as notas selecionadas?')) {
            checkboxes.forEach(checkbox => {
                const idNota = checkbox.getAttribute('data-id');
                localStorage.removeItem(idNota); // Remove a nota do localStorage
                checkbox.parentElement.remove(); // Remove a nota da lista exibida
            });
        }
    } else {
        alert('Selecione pelo menos uma nota para apagar!');
    }
});

// Carregar notas salvas
function carregarNotas() {
    const notas = Object.keys(localStorage);
    notas.forEach(idNota => {
        const nota = localStorage.getItem(idNota);
        try {
            const { nome, texto, dataCriacao } = JSON.parse(nota);
            adicionarNotaALista(idNota, nome, texto, dataCriacao);
        } catch (error) {
            console.error('Erro ao carregar nota com id:', idNota, error);
        }
    });
}

// Carregar notas ao iniciar
window.onload = () => {
    verificarLogin();
    carregarNotas();
};

// Verificar link de nota compartilhada
const params = new URLSearchParams(window.location.search);
const idNota = params.get('nota');

if (idNota) {
    exibirNota(idNota);
}

// Detectando pressionamento das teclas no campo de texto para Enter / Shift + Enter
notaInput.addEventListener('keydown', function (e) {
    // Se pressionar Enter sem Shift, envia a nota
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault(); // Previne o comportamento padrão (não vai adicionar uma nova linha)
        guardarButton.click(); // Simula o clique no botão "Guardar"
    }
    // Se pressionar Shift + Enter, insere uma nova linha no campo de texto
    if (e.key === 'Enter' && e.shiftKey) {
        e.preventDefault(); // Previne o comportamento padrão (não envia a nota)
        const cursorPos = this.selectionStart;
        const textoAtual = this.value;
        this.value = textoAtual.slice(0, cursorPos) + '\n' + textoAtual.slice(cursorPos); // Adiciona a nova linha
        this.selectionStart = this.selectionEnd = cursorPos + 1; // Mantém o cursor na posição correta
    }
});
