function openWindow(serviceId) {
    const windowElement = document.getElementById(serviceId);
    const barraPrincipal = document.getElementById('itens-barra-principal');
    const existingItem = document.querySelector(`#itens-barra-principal .taskbar-item[data-id="${serviceId}"]`);
    
    if (!existingItem) {
        const taskbarItem = document.createElement('div');
        taskbarItem.classList.add('taskbar-item');
        taskbarItem.id = `taskbar-${serviceId}`;
        taskbarItem.dataset.id = serviceId;

        const icon = windowElement.querySelector('.barra-janela img').cloneNode(true);
        icon.style.width = '16px'; /* Ajuste do tamanho do ícone */
        icon.style.height = '16px';
        taskbarItem.appendChild(icon);

        taskbarItem.appendChild(document.createTextNode(windowElement.querySelector('.barra-janela span').innerText));
        barraPrincipal.appendChild(taskbarItem);
        taskbarItem.style.display = 'flex';

        taskbarItem.onclick = () => {
            openWindow(serviceId);
        };
    }

    document.querySelectorAll('.taskbar-item').forEach(item => item.classList.remove('selected'));
    document.getElementById(`taskbar-${serviceId}`).classList.add('selected');

    document.querySelectorAll('.janela').forEach(win => win.style.display = 'none');
    windowElement.style.display = 'flex';
}

function closeWindow(serviceId) {
    const windowElement = document.getElementById(serviceId);
    const taskbarItem = document.getElementById(`taskbar-${serviceId}`);

    if (windowElement) {
        windowElement.style.display = 'none';
    }

    if (taskbarItem) {
        taskbarItem.remove();
    }
}
