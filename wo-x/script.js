const toast = document.querySelector('.toast');
const signupLinks = document.querySelectorAll('.account-option, .hero-actions .button-primary');
signupLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (link.getAttribute('href')?.startsWith('http')) return;
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 3200);
  });
});

document.querySelectorAll('.menu-toggle').forEach((button) => {
  button.addEventListener('click', () => document.body.classList.toggle('menu-open'));
});

document.querySelectorAll('.faq-list details').forEach((detail) => {
  detail.addEventListener('toggle', () => {
    if (detail.open) {
      document.querySelectorAll('.faq-list details').forEach((other) => {
        if (other !== detail) other.removeAttribute('open');
      });
    }
  });
});
