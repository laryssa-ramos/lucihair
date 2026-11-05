/* =========================================================================
   Studio Luci Hair Therapy — comportamento da interface.
   Sem ScrollReveal, sem Font Awesome, sem Boxicons.
   ========================================================================= */
(function () {
  'use strict';

  var semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- ano no rodapé ---------- */
  document.querySelectorAll('[data-ano]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- cabeçalho: transparente sobre o hero, sólido depois ---------- */
  var cabecalho = document.querySelector('.cabecalho');
  var hero = document.querySelector('.hero');

  if (cabecalho && hero) {
    var marcarCabecalho = function () {
      // Vira sólido quando o hero já saiu quase todo da tela.
      var limite = hero.offsetHeight - cabecalho.offsetHeight - 20;
      cabecalho.classList.toggle('solido', window.scrollY > limite);
    };
    window.addEventListener('scroll', marcarCabecalho, { passive: true });
    window.addEventListener('resize', marcarCabecalho);
    marcarCabecalho();
  } else if (cabecalho) {
    cabecalho.classList.add('solido');
  }

  /* ---------- menu mobile ---------- */
  var botao = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');

  if (botao && menu) {
    var alternar = function (abrir) {
      botao.setAttribute('aria-expanded', String(abrir));
      botao.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
      menu.classList.toggle('aberto', abrir);
      document.body.style.overflow = abrir ? 'hidden' : '';
      if (abrir) {
        var primeiro = menu.querySelector('a');
        if (primeiro) primeiro.focus();
      }
    };

    botao.addEventListener('click', function () {
      alternar(botao.getAttribute('aria-expanded') !== 'true');
    });

    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) alternar(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && botao.getAttribute('aria-expanded') === 'true') {
        alternar(false);
        botao.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 900) alternar(false);
    });
  }

  /* ---------- revelação ao rolar ---------- */
  var alvos = document.querySelectorAll('.reveal');

  if (alvos.length) {
    if (semMovimento || !('IntersectionObserver' in window)) {
      alvos.forEach(function (el) { el.classList.add('visivel'); });
    } else {
      requestAnimationFrame(function () {
        alvos.forEach(function (el) { el.classList.add('reveal-pronto'); });
      });

      var observador = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
          if (entrada.isIntersecting) {
            entrada.target.classList.add('visivel');
            observador.unobserve(entrada.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

      alvos.forEach(function (el) { observador.observe(el); });
    }
  }
})();
