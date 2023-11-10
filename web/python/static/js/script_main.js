const slider = document.querySelector('.slider');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let slideIndex = 0;

next.addEventListener('click', () => {
    slideIndex = (slideIndex + 1) % 3;
    updateSlider();
});

prev.addEventListener('click', () => {
    slideIndex = (slideIndex - 1 + 3) % 3;
    updateSlider();
});

function updateSlider() {
    slider.style.transform = `translateX(-${slideIndex * 33.3333}%)`;
}

// Cambia de diapositiva automáticamente cada 5 segundos (5000 ms)
setInterval(() => {
    slideIndex = (slideIndex + 1) % 3;
    updateSlider();
}, 5000);

// Función para cargar los comentarios y sus respectivos likes y dislikes desde localStorage al cargar la página
window.onload = function() {
    loadComments();
};

// Función para cargar los comentarios desde el almacenamiento local (localStorage)
function loadComments() {
    var comments = JSON.parse(localStorage.getItem('comments')) || [];
    var commentSection = document.getElementById('commentSection');
    commentSection.innerHTML = ''; // Limpiar la sección de comentarios

    comments.forEach(function(comment, index) {
        displayComment(comment.comment, comment.likes, comment.dislikes, index);
    });
}

// Función para agregar un comentario con likes y dislikes
document.getElementById('addCommentButton').addEventListener('click', function() {
    var commentInput = document.getElementById('commentInput');
    var commentText = commentInput.value.trim();
    if (commentText !== '') {
        var newComment = { comment: commentText, likes: 0, dislikes: 0, likedBy: [], dislikedBy: [] };

        // Agregar el nuevo comentario al array de comentarios en localStorage
        var comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push(newComment);
        localStorage.setItem('comments', JSON.stringify(comments));

        loadComments(); // Recargar la lista de comentarios
        commentInput.value = ''; // Limpiar el área de texto después de agregar el comentario
    }
});

// Función para mostrar un comentario en la interfaz
function displayComment(comment, likes, dislikes, index) {
    var commentSection = document.getElementById('commentSection');
    var commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    commentDiv.innerHTML = `
        <p>${comment}</p>
        <button id="likeBtn${index}">Like</button>
        <span class="likes">Likes: ${likes}</span>
        <button id="dislikeBtn${index}">Dislike</button>
        <span class="dislikes">Dislikes: ${dislikes}</span>
        <button id="editBtn${index}">Edit</button>
        <button id="deleteBtn${index}">Delete</button>
    `;

    commentSection.appendChild(commentDiv);

    // Agregar eventos para dar like/dislike y editar/borrar comentarios
    document.getElementById(`likeBtn${index}`).addEventListener('click', function() {
        likeComment(index);
    });

    document.getElementById(`dislikeBtn${index}`).addEventListener('click', function() {
        dislikeComment(index);
    });

    document.getElementById(`editBtn${index}`).addEventListener('click', function() {
        editComment(index);
    });

    document.getElementById(`deleteBtn${index}`).addEventListener('click', function() {
        deleteComment(index);
    });
}

// Función para dar "like" a un comentario
function likeComment(index) {
    toggleLikeDislike(index, 'likes', 'likedBy');
}

// Función para dar "dislike" a un comentario
function dislikeComment(index) {
    toggleLikeDislike(index, 'dislikes', 'dislikedBy');
}

// Función para dar like o dislike a un comentario y gestionar el almacenamiento local
function toggleLikeDislike(index, type, likedDislikedBy) {
    var comments = JSON.parse(localStorage.getItem('comments')) || [];
    var comment = comments[index];
    var userLikedDisliked = comment[likedDislikedBy].includes('user_id'); // Reemplaza 'user_id' por el identificador único del usuario

    if (!userLikedDisliked) {
        comment[type]++;
        comment[likedDislikedBy].push('user_id'); // Reemplaza 'user_id' por el identificador único del usuario
    } else {
        comment[type]--;
        var userIndex = comment[likedDislikedBy].indexOf('user_id'); // Reemplaza 'user_id' por el identificador único del usuario
        comment[likedDislikedBy].splice(userIndex, 1);
    }

    comments[index] = comment;
    localStorage.setItem('comments', JSON.stringify(comments));
    loadComments(); // Recargar la lista de comentarios
}

// Función para editar un comentario
function editComment(index) {
    var comments = JSON.parse(localStorage.getItem('comments')) || [];
    var comment = comments[index];
    var newCommentText = prompt('Edita tu comentario:', comment.comment);
    if (newCommentText !== null) {
        comment.comment = newCommentText;
        comments[index] = comment;
        localStorage.setItem('comments', JSON.stringify(comments));
        loadComments(); // Recargar la lista de comentarios
    }
}

// Función para borrar un comentario
function deleteComment(index) {
    if (confirm('¿Seguro que quieres borrar este comentario?')) {
        var comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.splice(index, 1);
        localStorage.setItem('comments', JSON.stringify(comments));
        loadComments(); // Recargar la lista de comentarios
    }
}



/*SCRIPT DEL DOC ENVIVO*/

document.addEventListener('DOMContentLoaded', function() {
    var contadorPruebas = 0;
    var tiempoCambioPrueba = 300; // 300 segundos = 5 minutos

    cambiarPrueba(); // Inicializa la primera prueba

    setInterval(function() {
        tiempoCambioPrueba--;
        if (tiempoCambioPrueba === 0) {
            cambiarPrueba();
            tiempoCambioPrueba = 300; // Reinicia el contador de tiempo para el próximo cambio de prueba
        }
        actualizarContador();
    }, 1000);

    function cambiarPrueba() {
        var pruebaElement = document.querySelector('.prueba');
        var parcialesList = document.querySelector('.parciales ul');
        var tiempoFinalElement = document.getElementById('tiempoFinal');
        var piscinaElement = document.querySelector('.piscina');

        var pruebas = [
            {
                prueba: 'Prueba 200m Libre masculino',
                parciales: [
                    'Pedro González : 1m 00s',
                    'Sergio Muñoz : 59s',
                    'Jorge García : 58s',
                    'Pablo Sánchez : 56s',
                    'Juan González : 57s',
                    'Luis Jiménez : 59s',
                    'Javier Pérez : 1m 02s',
                    'Pedro Martínez : 1m 00s'
                ],
                tiempoFinal: 'Tiempo final ganador: Pablo Sánchez 1m 57s',
                nadadores: [
                    'González', 'Muñoz', 'García', 'Sánchez',
                    'González', 'Jiménez', 'Pérez', 'Martínez'
                ]
            },
            {
                prueba: 'Prueba 100m Espalda femenino',
                parciales: [
                    'Lucía Fernández : 31s',
                    'Sara Gómez  : 30s',
                    'Isabel Díaz : 29s',
                    'Carmen Ruiz : 27s',
                    'Nuria Martín : 27s',
                    'Rosa López : 29s',
                    'Ana Fernández : 30s',
                    'Nerea López : 29s'
                ],
                tiempoFinal: 'Tiempo final ganadora: Nuria Martín 59s',
                nadadores: [
                    'Fernández', 'Gómez', 'Díaz', 'Ruiz',
                    'Martín', 'López', 'Fernández', 'López'
                ]
            },
            {
                prueba: 'Prueba 100m Braza masculino',
                parciales: [
                    'Juan González : 39s',
                    'José Antonio : 37s',
                    'Carlos López : 36s',
                    'Miguel Hernández : 33s',
                    'Diego García : 34s',
                    'David Muñoz : 36s',
                    'Juan Pérez : 34s',
                    'Pedro González : 37s'
                ],
                tiempoFinal: 'Tiempo final ganador: Miguel Hernández 1m 08s',
                nadadores: [
                    'González', 'Antonio', 'López', 'Hernández',
                    'García', 'Muñoz', 'Pérez', 'González'
                ]
            },
            {
                prueba: 'Prueba 100m Mariposa femenino',
                parciales: [
                    'Marie Daniela : 30s',
                    'Nuria Martín : 32s',
                    'Alma Martínez : 28s',
                    'Laura Sánchez : 33s',
                    'Lucía Fernández : 29s',
                    'Eva Rodríguez : 30s',
                    'Marta Hernández : 34s',
                    'Elena Rodríguez : 32s'
                ],
                tiempoFinal: 'Tiempo final ganadora: Alma Martínez 58s',
                nadadores: [
                    'Daniela', 'Martín', 'Martínez', 'Sánchez',
                    'Fernández', 'Rodríguez', 'Hernández', 'Rodríguez'
                ]
            },
            {
                prueba: 'Prueba 200m Mariposa masculino',
                parciales: [
                    'Pablo Sánchez 1: 1m 08s',
                    'Jorge García 2: 1m 06s',
                    'Álvaro Martín 3: 1m 04s',
                    'David Muñoz 4: 1m 00s',
                    'Fernando González 5: 1m 02s',
                    'Diego García 6: 1m 07s',
                    'Luis Jiménez 7: 1m 11s',
                    'Xabier González 8: 1m 13s'
                ],
                tiempoFinal: 'Tiempo final ganador: Fernando González 2m 09s',
                nadadores: [
                    'Sánchez', 'García', 'Martín', 'Muñoz',
                    'González', 'García', 'Jiménez', 'González'
                ]
            }
        ];

        var nuevaPrueba = pruebas[contadorPruebas];

        contadorPruebas = (contadorPruebas + 1) % pruebas.length;

        pruebaElement.textContent = nuevaPrueba.prueba;

        parcialesList.innerHTML = '';

        nuevaPrueba.parciales.forEach(function(parcial) {
            var nuevoItem = document.createElement('li');
            nuevoItem.textContent = parcial;
            parcialesList.appendChild(nuevoItem);
        });

        piscinaElement.innerHTML = ''; 

        nuevaPrueba.nadadores.forEach(function(tiempo, indice) {
            var nuevoNadador = document.createElement('div');
            nuevoNadador.className = 'calle';
            nuevoNadador.textContent = nuevaPrueba.nadadores[indice];
            piscinaElement.appendChild(nuevoNadador);
        });

        tiempoFinalElement.textContent = nuevaPrueba.tiempoFinal;

        tiempoFinalElement.style.display = 'none';
        setTimeout(function() {
            tiempoFinalElement.style.display = 'block';
        }, 120000);
    }

    function actualizarContador() {
        var contadorElement = document.getElementById('contadorCambioPrueba');
        var minutos = Math.floor(tiempoCambioPrueba / 60);
        var segundos = tiempoCambioPrueba % 60;
        contadorElement.textContent = 'Próximo cambio de prueba en: ' + minutos + ' minutos ' + segundos + ' segundos';
    }
});