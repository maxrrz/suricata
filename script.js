const guardarButton = document.getElementById('guardar');
const gerarLinkButton = document.getElementById('gerarLink');
const nomeNotaInput = document.getElementById('nomeNota');
const notaInput = document.getElementById('nota');
const listaNotas = document.getElementById('listaNotas');
const linkGeradoDiv = document.getElementById('linkGerado');
const urlLink = document.getElementById('urlLink');

guardarButton.addEventListener('click', () => {
    const nomeNota = nomeNotaInput.value.trim();
    const nota = notaInput.value.trim();

    if (nota && nomeNota) {
        const listItem = document.createElement('li');
        listItem.innerHTML = nomeNota + ": " + formatarTexto(nota); // Formatar o texto com quebras de linha e links
        listaNotas.appendChild(listItem);
        nomeNotaInput.value = ''; // Limpar campo do nome
        notaInput.value = ''; // Limpar área de texto
    } else {
        alert('Preenche o nome e a nota antes de guardar!');
    }
});

gerarLinkButton.addEventListener('click', () => {
    const nomeNota = nomeNotaInput.value.trim();
    const nota = notaInput.value.trim();

    if (nota && nomeNota) {
        // Gerar um ID único para cada nota
        const idNota = Date.now().toString(); // Usar um ID baseado no timestamp
        
        // Guardar a nota no localStorage com esse ID e nome
        localStorage.setItem(idNota, JSON.stringify({ nome: nomeNota, texto: nota }));

        // Gerar o link
        const link = window.location.href.split('?')[0] + '?nota=' + idNota;

        // Mostrar o link para o utilizador
        urlLink.href = link;
        urlLink.textContent = 'Clique aqui para aceder à nota';
        linkGeradoDiv.style.display = 'block';
        
        nomeNotaInput.value = ''; // Limpar campo do nome
        notaInput.value = ''; // Limpar área de texto
    } else {
        alert('Preenche o nome e a nota antes de gerar o link!');
    }
});

// Função para formatar o texto, substituir quebras de linha e links
function formatarTexto(texto) {
    // Substitui quebras de linha por <br> para exibição correta
    const textoComQuebras = texto.replace(/\n/g, '<br>');

    // Detecta links e os transforma em links clicáveis
    return detectarLinks(textoComQuebras);
}

// Função para detectar URLs e transformá-las em links clicáveis
function detectarLinks(texto) {
    const urlRegex = /https?:\/\/[^\s]+/g; // Regex para detectar links
    const links = texto.split('<br>'); // Dividir o texto por quebras de linha

    // Processar cada linha e transformá-la num link, se for um URL
    const textoComLinks = links.map(linha => {
        if (urlRegex.test(linha)) {
            return linha.replace(urlRegex, (url) => {
                return `<a href="${url}" target="_blank">${url}</a>`; // Garante que o link abre numa nova aba
            });
        }
        return linha; // Retorna a linha sem alterações se não for um link
    });

    // Reunir todas as linhas de volta com as quebras de linha convertidas
    return textoComLinks.join('<br>');
}

// Verificar se há um ID de nota na URL e mostrar a nota
window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    const idNota = params.get('nota');

    if (idNota) {
        const nota = localStorage.getItem(idNota);
        if (nota) {
            const { nome, texto } = JSON.parse(nota);
            document.body.innerHTML = `<h1>${nome}</h1><p>${formatarTexto(texto)}</p>`; // Formatando texto ao exibir
        } else {
            document.body.innerHTML = '<h1>Nota não encontrada</h1>';
        }
    }
};
