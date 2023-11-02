function editRow(button) {
    const row = button.parentNode.parentNode;
    const tds = row.querySelectorAll('td[contenteditable="true"]');

    if (button.innerHTML === 'Editar') {
        tds.forEach(td => {
            td.contentEditable = 'true';
            td.style.backgroundColor = 'lightyellow'; // Cambiar el fondo para indicar edición
        });
        button.innerHTML = 'Guardar';
    } else {
        const updatedData = {
            dni: tds[0].textContent,
            nombre: tds[1].textContent,
            apellido: tds[2].textContent,
            genero: tds[3].textContent,
            id: row.cells[0].textContent
        };

        // Envía `updatedData` al servidor para la actualización
        sendUpdatedData(updatedData);

        // Restaura la apariencia original de la fila
        tds.forEach(td => {
            td.contentEditable = 'false';
            td.style.backgroundColor = ''; // Restaurar el fondo
        });
        button.innerHTML = 'Editar';
    }
}

function sendUpdatedData(data) {
    // Aquí debes implementar la lógica para enviar `data` al servidor
    // Puedes usar una solicitud AJAX o una forma adecuada para enviar datos al servidor.
    // Después de recibir la confirmación del servidor, puedes realizar cambios adicionales en la fila, si es necesario.
}
