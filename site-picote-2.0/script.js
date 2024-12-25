// Função para abrir uma janela principal
function openWindow(serviceId) {
    const windowElement = document.getElementById(serviceId);
    const barraPrincipal = document.getElementById('itens-barra-principal');
    const existingItem = document.querySelector(`#itens-barra-principal .taskbar-item[data-id="${serviceId}"]`);

    // Se o item não existir na barra de tarefas, cria um novo
    if (!existingItem) {
        const taskbarItem = document.createElement('div');
        taskbarItem.classList.add('taskbar-item');
        taskbarItem.id = `taskbar-${serviceId}`;
        taskbarItem.dataset.id = serviceId;

        // Cria o ícone do item da barra de tarefas
        const icon = windowElement.querySelector('.barra-janela img').cloneNode(true);
        icon.style.width = '16px'; // Ajuste do tamanho do ícone
        icon.style.height = '16px';
        taskbarItem.appendChild(icon);

        // Adiciona o nome do item
        const itemName = windowElement.querySelector('.barra-janela span').innerText;
        taskbarItem.appendChild(document.createTextNode(itemName));
        barraPrincipal.appendChild(taskbarItem);

        // Exibe o item na barra de tarefas
        taskbarItem.style.display = 'flex';

        // Adiciona o comportamento de clique para abrir a janela correspondente
        taskbarItem.onclick = () => {
            openWindow(serviceId);
        };
    }

    // Atualiza a seleção do item na barra de tarefas
    document.querySelectorAll('.taskbar-item').forEach(item => item.classList.remove('selected'));
    document.getElementById(`taskbar-${serviceId}`).classList.add('selected');

    // Fecha todas as janelas e abre a janela clicada
    document.querySelectorAll('.janela').forEach(win => win.style.display = 'none');
    windowElement.style.display = 'flex';
}

// Função para fechar uma janela
function closeWindow(serviceId) {
    const windowElement = document.getElementById(serviceId);
    const taskbarItem = document.getElementById(`taskbar-${serviceId}`);

    // Fecha a janela
    if (windowElement) {
        windowElement.style.display = 'none';
    }

    // Remove o item da barra de tarefas
    if (taskbarItem) {
        taskbarItem.remove();
    }

    // Desseleciona itens da barra de tarefas
    document.querySelectorAll('.taskbar-item').forEach(item => item.classList.remove('selected'));
}

// Adicionar comportamento de fechar para todas as janelas
document.querySelectorAll('.janela').forEach(windowElement => {
    const closeButton = windowElement.querySelector('.close-button');
    if (closeButton) {
        closeButton.addEventListener('click', () => closeWindow(windowElement.id));
    }
});

// Adicionando eventos aos ícones da área de trabalho
document.querySelectorAll('.icon[data-window-id]').forEach(icon => {
    const windowId = icon.dataset.windowId;
    icon.addEventListener('click', () => openWindow(windowId));
});
