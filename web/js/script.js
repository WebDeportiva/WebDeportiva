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

      
