// === КЛИК ПО КНОПКЕ → МЕНЯЕТ ЦВЕТ НА ТОТ ЖЕ ===
document.addEventListener('DOMContentLoaded', () => {
    const jsColorText = document.getElementById('js-color');
    const colorButtons = document.querySelectorAll('.btn-color');

    if (!jsColorText || colorButtons.length === 0) return;

    jsColorText.style.transition = 'color 0.5s ease';

    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            const hex = button.querySelector('span').textContent.trim();
            jsColorText.style.color = hex;
        });
    });
});

// === ПРОБЕЛ (SPACE) → РАНДОМНЫЙ ЦВЕТ ===
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        const jsColorText = document.getElementById('js-color');
        if (!jsColorText) return;

        const colors = ['#FF6B35', '#00FF88', '#FF00FF', '#00D4FF', '#FFD700', '#FF4500'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        jsColorText.style.color = randomColor;
    }
});

// === СЛАЙДЕР ===
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;

    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    let currentSlide = 0;
    let autoSlideInterval;

    const showSlide = (index) => {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active_slide', i === index);
        });
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    };

    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    };

    const startAutoSlide = () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    };

    const stopAutoSlide = () => clearInterval(autoSlideInterval);

    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    showSlide(currentSlide);
    startAutoSlide();

    document.querySelector('.slider').addEventListener('mouseenter', stopAutoSlide);
    document.querySelector('.slider').addEventListener('mouseleave', startAutoSlide);
});

