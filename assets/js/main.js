// Carousel behaviour
(()=>{
  const slides = document.getElementById('slides');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  if(!slides) return;
  let index = 0;
  const items = slides.children.length;
  const update = ()=>{
    const width = slides.children[0].getBoundingClientRect().width + 18;
    slides.style.transform = `translateX(${-index * width}px)`;
  };
  window.addEventListener('resize', update);
  prev.addEventListener('click', ()=>{ index = (index - 1 + items) % items; update(); });
  next.addEventListener('click', ()=>{ index = (index + 1) % items; update(); });
  // swipe for mobile
  let startX = 0;
  slides.addEventListener('touchstart', (e)=> startX = e.touches[0].clientX);
  slides.addEventListener('touchend', (e)=>{
    const dx = e.changedTouches[0].clientX - startX;
    if(Math.abs(dx) > 40){ if(dx<0) index = (index+1)%items; else index = (index-1+items)%items; update(); }
  });
  // init
  setTimeout(update,200);
})();
// === Lightbox / Modal de imagem robusto ===
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('img-modal');
  const modalImg = document.getElementById('modal-img');
  const closeBtn = document.getElementById('close-modal');

  if (!modal || !modalImg || !closeBtn) return;

  // abrir ao clicar nas imagens do carrossel
  document.querySelectorAll('#slides .slide img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', (e) => {
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');
      modalImg.src = img.src;
      // impede que clique na imagem propague para o modal (que fechava)
      e.stopPropagation();
      // foco no botão fechar para acessibilidade
      closeBtn.focus();
    });
  });

  // fechar ao clicar no botão X
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modalImg.src = '';
  });

  // fechar ao clicar fora da imagem (no overlay)
  modal.addEventListener('click', (e) => {
    // se clicar no próprio overlay (não na imagem), fecha
    if (e.target === modal) {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
      modalImg.src = '';
    }
  });

  // evitar que clique na imagem feche (caso algum browser propague)
  modalImg.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // fechar com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
      modalImg.src = '';
    }
  });
});

