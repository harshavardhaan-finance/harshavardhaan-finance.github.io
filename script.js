document.addEventListener('DOMContentLoaded',()=>{
  const tabs=document.querySelectorAll('.skill-tab');
  const cards=document.querySelectorAll('#skillGrid .skill-card');
  const applySkillFilter=(filter)=>{
    tabs.forEach(tab=>{
      const active=tab.dataset.filter===filter;
      tab.classList.toggle('active',active);
      tab.setAttribute('aria-selected',active?'true':'false');
    });
    cards.forEach(card=>{
      const show=filter==='key' ? card.dataset.key==='true' : card.dataset.category===filter;
      card.classList.toggle('hidden',!show);
    });
  };
  tabs.forEach(tab=>tab.addEventListener('click',()=>applySkillFilter(tab.dataset.filter)));
  applySkillFilter('key');
});
function openCase(id){document.getElementById('home').style.display='none';document.querySelectorAll('.case').forEach(x=>x.classList.remove('show'));document.getElementById(id).classList.add('show');window.scrollTo(0,0)}
function closeCase(){document.querySelectorAll('.case').forEach(x=>x.classList.remove('show'));document.getElementById('home').style.display='block';window.scrollTo(0,0)}
function openResume(){document.getElementById('resumePanel').classList.add('show')}
function closeResume(){document.getElementById('resumePanel').classList.remove('show')}
function openImage(img){
  const box=document.getElementById('imageLightbox');
  const full=document.getElementById('lightboxImage');
  const cap=document.getElementById('lightboxCaption');
  full.src=img.currentSrc||img.src;
  full.alt=img.alt||'Project image';
  cap.textContent=img.alt||'';
  box.classList.add('show');
  document.body.style.overflow='hidden';
}
function closeImage(e){
  if(e && e.target && e.target.id==='lightboxImage') return;
  document.getElementById('imageLightbox').classList.remove('show');
  document.body.style.overflow='';
}
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.gallery figure img').forEach(img=>{
    img.addEventListener('click',()=>openImage(img));
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape') closeImage();
  });
});
