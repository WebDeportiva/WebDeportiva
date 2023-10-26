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
