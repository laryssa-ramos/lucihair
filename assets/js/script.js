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

  /* ---------------------------------------------------------------------
     Carrossel de serviços
     O scroll é nativo (scroll-snap); isto só pilota os botões, a barra de
     progresso e o contador.
     --------------------------------------------------------------------- */
  var carrossel = document.getElementById('carrossel');

  if (carrossel) {
    var trilho = carrossel.querySelector('.trilho');
    var ant = carrossel.querySelector('[data-ant]');
    var prox = carrossel.querySelector('[data-prox]');
    var barra = carrossel.querySelector('[data-barra]');
    var conta = carrossel.querySelector('[data-conta]');
    // 'auto' delega ao scroll-behavior do CSS (que é smooth); só 'instant'
    // desliga mesmo a animação para quem pediu menos movimento.
    var modo = semMovimento ? 'instant' : 'smooth';

    var passo = function () {
      var item = trilho.querySelector('.servico');
      if (!item) return trilho.clientWidth;
      var largura = item.getBoundingClientRect().width;
      var gap = parseFloat(getComputedStyle(trilho).columnGap) || 0;
      var porTela = Math.max(1, Math.round(trilho.clientWidth / (largura + gap)));
      return (largura + gap) * porTela;
    };

    var atualizar = function () {
      var max = trilho.scrollWidth - trilho.clientWidth;
      var x = trilho.scrollLeft;

      ant.disabled = x <= 1;
      prox.disabled = x >= max - 1;

      if (barra) {
        var visivel = trilho.clientWidth / (trilho.scrollWidth || 1);
        var deslocamento = max > 0 ? (x / max) * (1 - visivel) : 0;
        barra.style.transform = 'translateX(' + (deslocamento * 100) + '%) scaleX(' + visivel + ')';
      }

      if (conta) {
        var itens = trilho.querySelectorAll('.servico');
        var item = itens[0];
        if (itens.length && item) {
          var largura = item.getBoundingClientRect().width;
          var gap = parseFloat(getComputedStyle(trilho).columnGap) || 0;
          var porTela = Math.max(1, Math.round(trilho.clientWidth / (largura + gap)));
          var primeiro = Math.round(x / (largura + gap)) + 1;
          var ultimo = Math.min(itens.length, primeiro + porTela - 1);
          conta.textContent = (porTela > 1 ? primeiro + '–' + ultimo : String(primeiro)) + ' / ' + itens.length;
        }
      }
    };

    ant.addEventListener('click', function () { trilho.scrollBy({ left: -passo(), behavior: modo }); });
    prox.addEventListener('click', function () { trilho.scrollBy({ left: passo(), behavior: modo }); });

    trilho.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); trilho.scrollBy({ left: passo(), behavior: modo }); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); trilho.scrollBy({ left: -passo(), behavior: modo }); }
    });

    var quadro;
    trilho.addEventListener('scroll', function () {
      if (quadro) return;
      quadro = requestAnimationFrame(function () { quadro = null; atualizar(); });
    }, { passive: true });

    window.addEventListener('resize', atualizar);
    atualizar();
  }
})();
