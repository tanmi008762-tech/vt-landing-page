const slides = [...document.querySelectorAll('.banner-slide')];
const dots = [...document.querySelectorAll('.banner-dot')];
const rotator = document.querySelector('.banner-rotator');
let activeSlide = 0;
let rotationTimer;

function showSlide(index) {
  if (!slides.length) return;
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === activeSlide;
    slide.classList.toggle('is-active', isActive);
    slide.setAttribute('aria-hidden', String(!isActive));
  });
  dots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === activeSlide;
    dot.classList.toggle('is-active', isActive);
    dot.setAttribute('aria-selected', String(isActive));
  });
}

function startRotation() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || slides.length < 2) return;
  clearInterval(rotationTimer);
  rotationTimer = window.setInterval(() => showSlide(activeSlide + 1), 5200);
}

document.querySelector('[data-banner-prev]')?.addEventListener('click', () => {
  showSlide(activeSlide - 1);
  startRotation();
});

document.querySelector('[data-banner-next]')?.addEventListener('click', () => {
  showSlide(activeSlide + 1);
  startRotation();
});

dots.forEach((dot) => {
  dot.addEventListener('click', () => {
    showSlide(Number(dot.dataset.bannerDot));
    startRotation();
  });
});

rotator?.addEventListener('mouseenter', () => clearInterval(rotationTimer));
rotator?.addEventListener('mouseleave', startRotation);
rotator?.addEventListener('focusin', () => clearInterval(rotationTimer));
rotator?.addEventListener('focusout', (event) => {
  if (!rotator.contains(event.relatedTarget)) startRotation();
});

showSlide(0);
startRotation();

document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach((item) => { item.classList.remove('active'); item.setAttribute('aria-selected', 'false'); });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
  });
});

document.querySelector('#register-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  document.querySelector('.success')?.classList.add('show');
  event.currentTarget.querySelector('.submit').innerHTML = '信息已准备好 <span>↗</span>';
});
