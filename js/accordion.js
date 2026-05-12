/* ============================================================
   accordion.js
   Apenas 1 card aberto por vez
============================================================ */

const botoesCard = document.querySelectorAll('.service-card-header');

botoesCard.forEach((botao) => {

  botao.addEventListener('click', () => {

    const card = botao.closest('.service-card');

    const idCorpo = botao.getAttribute('aria-controls');
    const corpo = document.getElementById(idCorpo);

    const estaAberto =
      card.getAttribute('aria-expanded') === 'true';

    /* ========================================================
       FECHA TODOS OS CARDS
    ======================================================== */

    document.querySelectorAll('.service-card').forEach((outroCard) => {

      const outroBotao =
        outroCard.querySelector('.service-card-header');

      const outroCorpoId =
        outroBotao.getAttribute('aria-controls');

      const outroCorpo =
        document.getElementById(outroCorpoId);

      outroCard.setAttribute('aria-expanded', 'false');

      outroBotao.setAttribute('aria-expanded', 'false');

      outroCorpo.hidden = true;
    });

    /* ========================================================
       SE O CARD CLICADO ESTAVA FECHADO,
       ABRE ELE
    ======================================================== */

    if (!estaAberto) {

      card.setAttribute('aria-expanded', 'true');

      botao.setAttribute('aria-expanded', 'true');

      corpo.hidden = false;
    }
  });
});