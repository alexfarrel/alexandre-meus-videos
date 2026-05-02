/* ============================================================
   main.js — Lógica da página de vídeos de Alexandre Oliveira
   
   O que este arquivo faz:
   1. Preenche o ano atual no copyright do rodapé
   2. Ao clicar no botão de play de qualquer vídeo,
      cria um iframe do Vimeo com autoplay e substitui a thumbnail
      (lazy load — o vídeo só carrega quando o usuário pede)
============================================================ */

/* ------------------------------------------------------------
   1. ANO ATUAL NO COPYRIGHT
   Encontra o elemento #ano-atual e escreve o ano de hoje
------------------------------------------------------------ */
const elementoAno = document.getElementById('ano-atual');
if (elementoAno) {
  elementoAno.textContent = new Date().getFullYear();
}


/* ------------------------------------------------------------
   2. LAZY LOAD DE VÍDEOS DO VIMEO

   Como funciona:
   - A thumbnail é um <div> com background-image e data-vimeo="ID"
   - Ao clicar, pegamos o ID do Vimeo, criamos um <iframe>
     com autoplay=1 e inserimos no .video-item pai
   - A thumbnail recebe a classe "loaded" e some

   Para adicionar um vídeo novo:
   - Coloque o atributo data-vimeo="SEU_ID_AQUI" na thumbnail
   - O ID do Vimeo está na URL do vídeo:
     ex: https://vimeo.com/123456789 → ID é 123456789
------------------------------------------------------------ */

/**
 * Cria e insere o iframe do Vimeo dentro do .video-item
 * @param {HTMLElement} thumb - o elemento .video-thumb clicado
 */
function carregarVimeo(thumb) {
  const idVimeo = thumb.dataset.vimeo;

  // Segurança: só prossegue se houver um ID válido
  if (!idVimeo || idVimeo === 'SEU_ID_VIMEO_AQUI') {
    console.warn('Adicione o ID do vídeo Vimeo no atributo data-vimeo.');
    return;
  }

  // Cria o iframe com autoplay e sem mostrar o título/autor do Vimeo
  const iframe = document.createElement('iframe');
  iframe.src = `https://player.vimeo.com/video/${idVimeo}?autoplay=1&title=0&byline=0&portrait=0`;
  iframe.className  = 'vimeo-iframe';
  iframe.allow      = 'autoplay; fullscreen; picture-in-picture';
  iframe.allowFullscreen = true;
  iframe.title      = 'Vídeo Vimeo';

  // Insere o iframe no elemento pai (.video-item)
  const videoItem = thumb.parentElement;
  videoItem.appendChild(iframe);

  // Esconde a thumbnail para que só o vídeo apareça
  thumb.classList.add('loaded');
}


/* ------------------------------------------------------------
   Adiciona o listener de clique em TODAS as thumbnails da página
   Funciona com clique do mouse E tecla Enter (acessibilidade)
------------------------------------------------------------ */
const thumbnails = document.querySelectorAll('.video-thumb');

thumbnails.forEach(function(thumb) {

  // Clique com mouse / toque
  thumb.addEventListener('click', function() {
    carregarVimeo(thumb);
  });

  // Tecla Enter (para usuários de teclado)
  thumb.addEventListener('keydown', function(evento) {
    if (evento.key === 'Enter' || evento.key === ' ') {
      evento.preventDefault();
      carregarVimeo(thumb);
    }
  });

});

    //Script para trocar a thumb pelo iframe do youtube
document.addEventListener("DOMContentLoaded", () => {
  const thumbs = document.querySelectorAll(".video-thumb");

  thumbs.forEach(thumb => {
    thumb.addEventListener("click", () => {
      const videoId = thumb.dataset.youtube;

      if (!videoId) return;

      const iframe = document.createElement("iframe");
      iframe.setAttribute("src", `https://www.youtube.com/embed/${videoId}?autoplay=1`);
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
      iframe.setAttribute("allowfullscreen", "");
      iframe.style.width = "100%";
      iframe.style.height = "100%";

      thumb.replaceWith(iframe);
    });
  });
});

// preload por hover/toque para melhorar a experiência de quem vai assistir aos vídeos (carrega o iframe antes do clique)
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.video-card');

  cards.forEach(card => {
    let loaded = false;

    function preload() {
      if (loaded) return;

      const id = card.dataset.id;

      const iframe = document.createElement('iframe');
      iframe.src = `https://player.vimeo.com/video/${id}`;
      iframe.style.display = 'none';

      document.body.appendChild(iframe);

      loaded = true;
    }

    // Desktop (hover)
    card.addEventListener('mouseenter', preload);

    // Mobile (toque)
    card.addEventListener('touchstart', preload, { passive: true });
  });
});
