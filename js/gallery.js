/* ============================================================
   gallery.js — Galeria masonry e popup (lightbox)
   
   O que este arquivo faz:
   1. Abre o popup (lightbox) ao clicar em qualquer imagem da galeria
   2. Fecha o popup ao clicar no botão X ou no fundo escuro
   3. Fecha o popup ao pressionar a tecla Escape
   4. Controla o "... mais" / "... menos" nos textos dos projetos
============================================================ */


/* ============================================================
   PARTE 1 — LIGHTBOX (popup de imagem)
============================================================ */

/* Pega os elementos do popup do HTML */
const lightbox        = document.getElementById('lightbox');
const lightboxImg     = document.getElementById('lightbox-img');
const lightboxClose   = document.getElementById('lightbox-close');
const lightboxBackdrop = document.getElementById('lightbox-backdrop');


/* ------------------------------------------------------------
   Função: abre o lightbox com a imagem clicada
   
   Parâmetros:
   - srcCompleto = URL da imagem em tamanho completo (data-full)
   - textoAlt    = texto alternativo da imagem (alt)
------------------------------------------------------------ */
function abrirLightbox(srcCompleto, textoAlt) {
  /* Define a imagem no elemento <img> do popup */
  lightboxImg.src = srcCompleto;
  lightboxImg.alt = textoAlt || '';

  /* Remove o atributo hidden para tornar o popup visível */
  lightbox.hidden = false;

  /* Impede que a página por baixo role enquanto o popup está aberto */
  document.body.style.overflow = 'hidden';

  /* Coloca o foco no botão de fechar (acessibilidade) */
  lightboxClose.focus();
}


/* ------------------------------------------------------------
   Função: fecha o lightbox e limpa a imagem
------------------------------------------------------------ */
function fecharLightbox() {
  lightbox.hidden = true;

  /* Pequeno atraso antes de limpar o src para evitar flash branco */
  setTimeout(function() {
    lightboxImg.src = '';
    lightboxImg.alt = '';
  }, 200);

  /* Volta a permitir o scroll da página */
  document.body.style.overflow = '';
}


/* ------------------------------------------------------------
   Adiciona o clique em TODAS as imagens da galeria
   (.gallery-img dentro de .masonry-item)
------------------------------------------------------------ */
const imagensGaleria = document.querySelectorAll('.masonry-item .gallery-img');

imagensGaleria.forEach(function(img) {
  img.addEventListener('click', function() {
    /* data-full = caminho para a imagem em tamanho completo */
    const srcCompleto = img.dataset.full || img.src;
    abrirLightbox(srcCompleto, img.alt);
  });

  /* Acessibilidade: também funciona com teclado (Enter ou Espaço) */
  img.addEventListener('keydown', function(evento) {
    if (evento.key === 'Enter' || evento.key === ' ') {
      evento.preventDefault();
      const srcCompleto = img.dataset.full || img.src;
      abrirLightbox(srcCompleto, img.alt);
    }
  });

  /* Torna a imagem focável pelo teclado */
  img.setAttribute('tabindex', '0');
  img.setAttribute('role', 'button');
});


/* ------------------------------------------------------------
   Fecha o popup ao clicar no botão X
------------------------------------------------------------ */
lightboxClose.addEventListener('click', fecharLightbox);


/* ------------------------------------------------------------
   Fecha o popup ao clicar no fundo escuro (backdrop)
------------------------------------------------------------ */
lightboxBackdrop.addEventListener('click', fecharLightbox);


/* ------------------------------------------------------------
   Fecha o popup ao pressionar a tecla Escape
------------------------------------------------------------ */
document.addEventListener('keydown', function(evento) {
  if (evento.key === 'Escape' && !lightbox.hidden) {
    fecharLightbox();
  }
});


/* ============================================================
   PARTE 2 — TOGGLE DE TEXTO ("... mais" / "... menos")
   
   Ao clicar no botão "mais" dentro do texto do projeto,
   o trecho escondido aparece e o botão muda para "menos"
============================================================ */

/* Pega todos os botões de toggle de texto */
const botoesMais = document.querySelectorAll('.text-toggle');

botoesMais.forEach(function(botao) {
  botao.addEventListener('click', function() {
    /* O trecho escondido fica na <span class="text-extra"> irmã do botão */
    const paragrafo  = botao.closest('.project-text');
    const textoExtra = paragrafo.querySelector('.text-extra');

    const estaAberto = botao.getAttribute('aria-expanded') === 'true';

    if (estaAberto) {
      /* Esconde o trecho extra e volta para "mais" */
      textoExtra.hidden = true;
      botao.setAttribute('aria-expanded', 'false');
      /* O texto do botão depende do idioma da página */
      /* Tenta ler o idioma do atributo lang do <html> */
      const lang = document.documentElement.lang || 'pt-BR';
      botao.textContent = lang.startsWith('en') ? 'more'
                        : lang.startsWith('es') ? 'más'
                        : 'mais';
    } else {
      /* Mostra o trecho extra e muda para "menos" */
      textoExtra.hidden = false;
      botao.setAttribute('aria-expanded', 'true');
      const lang = document.documentElement.lang || 'pt-BR';
      botao.textContent = lang.startsWith('en') ? 'less'
                        : lang.startsWith('es') ? 'menos'
                        : 'menos';
    }
  });
});


/* ============================================================
   ANO DO COPYRIGHT
============================================================ */
const elementoAno = document.getElementById('ano-atual');
if (elementoAno) {
  elementoAno.textContent = new Date().getFullYear();
}
