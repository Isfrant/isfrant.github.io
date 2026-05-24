/* ====================================================
   PORTAFOLIO DIGITAL INTEGRADO — UTS 2026
   script.js — Interactividad
   ==================================================== */

/* ──────────────────────────────────────────
   1. NAVBAR: scroll + hamburguesa
   ────────────────────────────────────────── */
(function () {
  const navbar    = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  // Efecto de fondo al hacer scroll
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Abrir / cerrar menú hamburguesa
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Cerrar menú al clicar un enlace
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
})();


/* ──────────────────────────────────────────
   2. ENLACE ACTIVO según sección visible
   ────────────────────────────────────────── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a[href^="#"]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(
          `.nav-links a[href="#${entry.target.id}"]`
        );
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
})();


/* ──────────────────────────────────────────
   3. SCROLL REVEAL — aparición suave
   Añade clase .reveal a los elementos que
   quieras animar; se vuelven visibles al
   entrar en el viewport.
   ────────────────────────────────────────── */
(function () {
  // Añade .reveal automáticamente a los elementos principales
  const targets = document.querySelectorAll(
    '.product-card, .reflexion-card, .card-base, ' +
    '.profile-card, .competencias-wrap, .score-item, ' +
    '.qual-block, .bib-item, .section-header'
  );

  targets.forEach((el, i) => {
    el.classList.add('reveal');
    // Escalonado ligero para grupos
    el.style.transitionDelay = (i % 6) * 0.07 + 's';
  });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => revealObserver.observe(el));
})();


/* ──────────────────────────────────────────
   4. PARTÍCULAS DEL HERO
   Se generan dinámicamente para evitar HTML
   largo. Modifica 'count' para más/menos.
   ────────────────────────────────────────── */
(function () {
  const container = document.getElementById('particles');
  if (!container) return;

  const count  = 18;
  const colors = ['#00f0ff', '#ff0090', '#f0e040', '#9060ff', '#00aacc'];

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    const size  = Math.random() * 4 + 2;           // 2–6 px
    const color = colors[Math.floor(Math.random() * colors.length)];
    const dur   = (Math.random() * 7 + 5).toFixed(1);  // 5–12 s
    const delay = (Math.random() * 6).toFixed(1);       // 0–6 s

    p.style.cssText = `
      width:${size}px; height:${size}px;
      background:${color};
      top:${Math.random() * 100}%;
      left:${Math.random() * 100}%;
      --dur:${dur}s; --delay:${delay}s;
    `;

    container.appendChild(p);
  }
})();


/* ──────────────────────────────────────────
   5. BARRAS DE COMPETENCIAS — animación
   Se disparan cuando la sección entra en
   vista, no en carga (mejor rendimiento).
   ────────────────────────────────────────── */
(function () {
  const bars = document.querySelectorAll('.comp-fill, .score-fill');

  const barObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Fuerza el reflow para que la animación CSS se vea
        entry.target.style.animation = 'none';
        // eslint-disable-next-line no-unused-expressions
        entry.target.offsetHeight;  // trigger reflow
        entry.target.style.animation = '';
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(b => barObserver.observe(b));
})();


/* ──────────────────────────────────────────
   6. CERRAR MENÚ al clicar fuera (móvil)
   ────────────────────────────────────────── */
document.addEventListener('click', (e) => {
  const navLinks  = document.getElementById('navLinks');
  const navToggle = document.getElementById('navToggle');
  if (
    navLinks.classList.contains('open') &&
    !navLinks.contains(e.target) &&
    !navToggle.contains(e.target)
  ) {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});


/* ──────────────────────────────────────────
   7. UTILIDAD: marcar placeholders con borde
   Ayuda a localizar visualmente qué secciones
   faltan por completar. Quitar en producción.
   ────────────────────────────────────────── */
(function () {
  // Puedes comentar estas líneas cuando ya hayas llenado todo el contenido
  document.querySelectorAll('.placeholder-content').forEach(ph => {
    ph.closest('.content-area').style.borderColor = 'rgba(255,0,144,0.35)';
  });
})();
