let currentSlide = 0;
slider(currentSlide);

function prevSlide() {
    currentSlide -= 1;
    slider(currentSlide);
}
function nextSlide() {
    currentSlide += 1;
    slider(currentSlide);
}
function slider(current) {
    const slides = document.getElementsByClassName('item');
    if (current < 0) {
        current = slides.length - 1;
        currentSlide = current;
    }
    if (current > slides.length - 1) {
        current = 0;
        currentSlide = current;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    slides[current].style.display = 'block';

}

document.querySelector('.prev-slide').addEventListener('click', prevSlide);
document.querySelector('.next-slide').addEventListener('click', nextSlide);
