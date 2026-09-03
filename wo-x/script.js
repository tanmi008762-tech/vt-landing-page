const slides = [...document.querySelectorAll('.banner-slide')];
const dots = [...document.querySelectorAll('.banner-dot')];
const rotator = document.querySelector('.banner-rotator');
const viewport = document.querySelector('.banner-viewport');
const track = document.querySelector('.banner-track');
let activeSlide = 0;
let rotationTimer;
let pointerStartX = 0;
let pointerStartY = 0;
let pointerStartedAt = 0;
let dragOffset = 0;
let draggingHorizontally = false;
let activePointerId = null;

function setTrackPosition(offset = 0, animate = true) {
  if (!viewport || !track) return;
  viewport.classList.toggle('is-dragging', !animate);
  track.style.transform = `translate3d(${(-activeSlide * viewport.clientWidth) + offset}px, 0, 0)`;
}

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
  setTrackPosition();
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

viewport?.addEventListener('pointerdown', (event) => {
  if (event.pointerType === 'mouse' && event.button !== 0) return;
  clearInterval(rotationTimer);
  pointerStartX = event.clientX;
  pointerStartY = event.clientY;
  pointerStartedAt = performance.now();
  dragOffset = 0;
  draggingHorizontally = false;
  activePointerId = event.pointerId;
  viewport.setPointerCapture?.(event.pointerId);
});

viewport?.addEventListener('pointermove', (event) => {
  if (event.pointerId !== activePointerId) return;
  const deltaX = event.clientX - pointerStartX;
  const deltaY = event.clientY - pointerStartY;

  if (!draggingHorizontally && Math.abs(deltaX) < 7) return;
  if (!draggingHorizontally && Math.abs(deltaY) > Math.abs(deltaX)) return;

  draggingHorizontally = true;
  dragOffset = deltaX;
  setTrackPosition(dragOffset, false);
});

function finishSwipe(event) {
  if (!viewport || event.pointerId !== activePointerId) return;
  if (viewport.hasPointerCapture?.(event.pointerId)) viewport.releasePointerCapture(event.pointerId);

  const elapsed = Math.max(performance.now() - pointerStartedAt, 1);
  const velocity = Math.abs(dragOffset) / elapsed;
  const threshold = Math.min(viewport.clientWidth * .2, 90);
  const shouldChange = Math.abs(dragOffset) > threshold || (Math.abs(dragOffset) > 28 && velocity > .45);

  if (draggingHorizontally && shouldChange) {
    showSlide(activeSlide + (dragOffset < 0 ? 1 : -1));
  } else {
    setTrackPosition();
  }

  dragOffset = 0;
  draggingHorizontally = false;
  activePointerId = null;
  startRotation();
}

viewport?.addEventListener('pointerup', finishSwipe);
viewport?.addEventListener('pointercancel', finishSwipe);
viewport?.addEventListener('keydown', (event) => {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
  event.preventDefault();
  showSlide(activeSlide + (event.key === 'ArrowRight' ? 1 : -1));
  startRotation();
});

window.addEventListener('resize', () => setTrackPosition());

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
  event.currentTarget.querySelector('.submit').innerHTML = 'Information ready <span>↗</span>';
});
