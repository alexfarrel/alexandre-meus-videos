# Portfolio de Vídeos — Alexandre Oliveira

## Estrutura de Pastas

```
portfolio-alexandre/
├── index.html              ← Página principal
├── css/
│   └── style.css           ← Todos os estilos da página
├── js/
│   └── main.js             ← Lógica de vídeos Vimeo + ano do copyright
└── images/
    ├── profile.jpg         ← Foto de perfil (substitua pelo seu arquivo)
    ├── flags/
    │   ├── en.png          ← Bandeira inglesa (PNG transparente)
    │   ├── es.png          ← Bandeira espanhola (PNG transparente)
    │   └── pt.png          ← Bandeira brasileira (PNG transparente)
    ├── logos/              ← Logos SVG das plataformas (se quiser arquivos externos)
    └── thumbnails/
        ├── proj1-vid1.jpg  ← Thumbnail vídeo 1 do projeto 1
        ├── proj1-vid2.jpg
        ├── proj1-vid3.jpg
        ├── proj1-vid4.jpg
        ├── proj2-vid1.jpg  ← Thumbnails do projeto 2
        ├── proj2-vid2.jpg
        ├── proj2-vid3.jpg
        ├── proj2-vid4.jpg
        └── proj3-vid1.jpg  ← Thumbnail do VSL (16:9)
```

---

## Como Usar

### 1. Adicionar vídeos do Vimeo
Em cada `<div class="video-thumb">`, substitua:
```html
data-vimeo="SEU_ID_VIMEO_AQUI"
```
Pelo ID numérico do vídeo. O ID está na URL:
- URL: `https://vimeo.com/123456789`
- ID: `123456789`

### 2. Adicionar thumbnails
Coloque as imagens em `images/thumbnails/` e atualize o `style=""` de cada thumb:
```html
style="background-image: url('images/thumbnails/nome-da-imagem.jpg')"
```

### 3. Adicionar bandeiras de idioma
Coloque os arquivos `.png` em `images/flags/` com os nomes:
- `en.png` — Inglês
- `es.png` — Espanhol  
- `pt.png` — Português

### 4. Adicionar links dos idiomas
No `index.html`, encontre os botões `.lang-btn` e substitua o `href="#"`.

### 5. Link do WhatsApp
No rodapé, encontre o `.whatsapp-btn` e troque o `href="#"` pelo link:
```
https://wa.me/55SEUDDD9NUMERO
```

### 6. Foto de perfil
Substitua `images/profile.jpg` pela sua foto.

### 7. Substituir SVGs
Cada lugar com `<!-- Cole aqui o SVG -->` é onde você insere seu ícone/logo SVG.

---

## Tecnologias
- HTML5 semântico
- CSS3 (variáveis, grid, flexbox, scroll-snap)
- JavaScript puro (sem frameworks)
- Fontes: Inter + Space Grotesk (Google Fonts)
- Vídeos: Vimeo Player (carregados sob demanda)
