function openCase(id){
  const home=document.getElementById('home');
  const target=document.getElementById(id);
  if(!home || !target) return;
  home.style.display='none';
  document.querySelectorAll('.case').forEach(el=>el.classList.remove('show'));
  target.classList.add('show');
  window.scrollTo({top:0,behavior:'smooth'});
}
function closeCase(){
  document.querySelectorAll('.case').forEach(el=>el.classList.remove('show'));
  const home=document.getElementById('home');
  if(home) home.style.display='block';
  window.scrollTo({top:0,behavior:'smooth'});
}
function openResume(){
  const panel=document.getElementById('resumePanel');
  if(panel){panel.classList.add('show');document.body.style.overflow='hidden';}
}
function closeResume(){
  const panel=document.getElementById('resumePanel');
  if(panel){panel.classList.remove('show');document.body.style.overflow='';}
}
function openImage(img){
  const box=document.getElementById('imageLightbox');
  const full=document.getElementById('lightboxImage');
  const cap=document.getElementById('lightboxCaption');
  if(!box||!full||!cap)return;
  full.src=img.currentSrc||img.src; full.alt=img.alt||'Project image'; cap.textContent=img.alt||'';
  box.classList.add('show'); document.body.style.overflow='hidden';
}
function closeImage(e){
  if(e && e.target && e.target.id==='lightboxImage') return;
  const box=document.getElementById('imageLightbox');
  if(box) box.classList.remove('show');
  document.body.style.overflow='';
}
function initSkills(){
  const tabs=[...document.querySelectorAll('.skill-tab')];
  const cards=[...document.querySelectorAll('#skillGrid .skill-card')];
  if(!tabs.length||!cards.length)return;
  const apply=filter=>{
    tabs.forEach(tab=>{
      const active=(tab.dataset.filter||'key')===filter;
      tab.classList.toggle('active',active);
      tab.setAttribute('aria-selected',active?'true':'false');
    });
    cards.forEach(card=>{
      const category=(card.dataset.category||'').toLowerCase();
      const isKey=(card.dataset.key||'').toLowerCase()==='true';
      const show=filter==='key'?isKey:category===filter;
      card.style.display=show?'block':'none';
    });
  };
  tabs.forEach(tab=>tab.addEventListener('click',()=>apply(tab.dataset.filter||'key')));
  apply('key');
}
document.addEventListener('DOMContentLoaded',()=>{
  initSkills();
  document.querySelectorAll('.gallery figure img').forEach(img=>img.addEventListener('click',()=>openImage(img)));
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){closeImage();closeResume();if(document.querySelector('.case.show'))closeCase();}
  });
});
