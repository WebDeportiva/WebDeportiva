function editRow(button) {
    const row = button.parentNode.parentNode;
    const tds = row.querySelectorAll('td[contenteditable="true"]');
    const originalValues = {}; // Almacena los valores originales

    if (button.innerHTML === 'Editar') {
        tds.forEach(td => {
            td.contentEditable = 'true';
            td.style.backgroundColor = 'lightyellow'; // Cambiar el fondo para indicar edición
            originalValues[td.dataset.field] = td.textContent; // Guarda el valor original
        });
        button.innerHTML = 'Guardar';
    } else {
        let hasChanges = false; // Indica si se realizaron cambios

        tds.forEach(td => {
            td.contentEditable = 'false';
            td.style.backgroundColor = ''; // Restaurar el fondo

            if (td.textContent !== originalValues[td.dataset.field]) {
                hasChanges = true; // Hay cambios si el valor no coincide con el original
            }
        });

        if (hasChanges) {
            const updatedData = {
                dni: tds[0].textContent,
                nombre: tds[1].textContent,
                apellido: tds[2].textContent,
                genero: tds[3].textContent,
                id: row.cells[0].textContent,
                action: 'update'
            };

            // Envía `updatedData` al servidor para la actualización
            sendUpdatedData(updatedData);
        }

        button.innerHTML = 'Editar';
    }
}


function sendUpdatedData(data) {

    const formData = new URLSearchParams();

    for (const key in data) {
        formData.append(key, data[key]);
    }

    fetch('/crud', {
        method: 'POST',
        body: formData, // Convierte los datos en formato JSON
        headers: {
            'Content-Type': 'application/json' // Indica que los datos son JSON
        }
    })
    .then(response => {
        if (response.ok) {
            // Manejar una respuesta exitosa, si es necesario
            console.log('Datos actualizados con éxito');
        } else {
            // Manejar errores de respuesta, si es necesario
            console.error('Error al actualizar datos');
        }
    })
    .catch(error => {
        // Manejar errores de red u otros errores, si es necesario
        console.error('Error de red:', error);
    });
}
