function editRow(button) {
    const row = button.parentNode.parentNode;
    const tds = row.querySelectorAll('td[contenteditable="true"]');

    if (button.innerHTML === 'Editar') {
        tds.forEach(td => {
            td.contentEditable = 'true';
        });
        button.innerHTML = 'Guardar';
    } else {
        // Aquí debes enviar los datos al servidor para actualizar el registro
        const updatedData = {
            dni: tds[0].textContent,
            nombre: tds[1].textContent,
            apellido: tds[2].textContent,
            genero: tds[3].textContent,
            id: row.cells[0].textContent // Aquí debes obtener el ID del registro
        };

        // Envía `updatedData` al servidor para la actualización
        sendUpdatedData(updatedData);

        // Deshabilita la edición
        tds.forEach(td => {
            td.contentEditable = 'false';
        });
        button.innerHTML = 'Editar';
    }
}

function sendUpdatedData(data) {
    // Aquí debes usar una solicitud AJAX (por ejemplo, con fetch) para enviar los datos al servidor
    // y actualizar el registro en la base de datos.
}