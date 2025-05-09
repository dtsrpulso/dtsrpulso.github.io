// --- Navbar responsive hamburguesa ---
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});

// Cierra menú al hacer click en un link (opcional)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
  });
});




// Efecto visual al hacer clic en los botones
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.add('clicked');
    setTimeout(() => btn.classList.remove('clicked'), 300);
  });
});

// Enviar mensaje personalizado a WhatsApp
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const userMessage = document.getElementById('userMessage').value;
  const baseUrl = 'https://api.whatsapp.com/send?phone=3502161217&text=';
  const message = encodeURIComponent('¡Hola! Me gustaría saber más. \n' + userMessage);
  window.open(baseUrl + message, '_blank');
});

// Animaciones de deslizamiento
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('slide-in');
    } else {
      entry.target.classList.remove('slide-in');
    }
  });
}, { threshold: 0.1 });

const packages = document.querySelectorAll('.package');
packages.forEach(package => {
  observer.observe(package);
});





const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const numberOfParticles = 100;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Reaparecer partículas fuera de pantalla
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
    }
  }
  draw() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

function init() {
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  requestAnimationFrame(animate);
}

init();
animate();







document.querySelectorAll('.info-icon').forEach(icon => {
  let tooltip = null;
  let removeTimeout = null;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  function hideTooltip() {
    if (tooltip) {
      tooltip.classList.remove('visible');
      const t = tooltip;
      tooltip = null;
      t.addEventListener('transitionend', () => {
        if (t.parentElement) t.parentElement.removeChild(t);
      }, { once: true });
      clearTimeout(removeTimeout);
      removeTimeout = setTimeout(() => {
        if (t.parentElement) t.parentElement.removeChild(t);
      }, 50);
      window.removeEventListener('scroll', hideTooltip);
      window.removeEventListener('touchstart', outsideClickListener);
      window.removeEventListener('click', outsideClickListener);
    }
  }

  function outsideClickListener(e) {
    if (tooltip && !tooltip.contains(e.target) && !e.target.closest('.info-icon')) {
      hideTooltip();
    }
  }

  function showTooltip(icon) {
    const text = icon.getAttribute('data-tooltip');
    if (!text) return;

    hideTooltip();

    tooltip = document.createElement('div');
    tooltip.className = 'tooltip-fixed';
    tooltip.textContent = text;
    document.body.appendChild(tooltip);

    const rect = icon.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    let top = rect.top - tooltipRect.height - 10;
    if (top < 10) top = rect.bottom + 10;

    let left = rect.left + rect.width / 2 - tooltipRect.width / 2;
    if (left < 10) left = 10;
    if (left + tooltipRect.width > window.innerWidth - 10) {
      left = window.innerWidth - tooltipRect.width - 10;
    }

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;

    requestAnimationFrame(() => {
      if (tooltip) tooltip.classList.add('visible');
    });

    window.addEventListener('scroll', hideTooltip);

    // Diferencia: en táctil escucha también touchstart, en desktop solo click
    if (isTouchDevice) {
      window.addEventListener('touchstart', outsideClickListener);
    } else {
      window.addEventListener('click', outsideClickListener);
    }
  }

  if (isTouchDevice) {
    // En táctil: toggle tooltip con tap/click
    icon.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (tooltip) {
        hideTooltip();
      } else {
        showTooltip(icon);
      }
    });
  } else {
    // En desktop: hover clásico
    icon.addEventListener('mouseenter', () => {
      showTooltip(icon);
    });
    icon.addEventListener('mouseleave', () => {
      hideTooltip();
    });
  }
});



