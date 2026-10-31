(() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const projects = window.PROJECTS || [];
  const builds = window.BUILDS || [];
  const home = document.getElementById('home');
  const caseView = document.getElementById('caseView');
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const commas = s => esc(String(s).split(' · ').join(', '));
  const IMG = 'assets/images/';
  const REPORTS = 'assets/reports/';
  const PREVIEWS = 'assets/previews/';
  const BUILD_IMG = 'assets/builds/';
  const ext = '<svg class="ext" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 16L16 8M9 8h7v7"/></svg>';
  const thumbOf = p => p.artifact && p.artifact.preview ? PREVIEWS + p.artifact.preview : 'assets/covers/' + p.id + '.jpg';

  // ---------- Theme ----------
  document.getElementById('themeToggle').addEventListener('click', () => {
    const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    const next = dark ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // ---------- Mobile menu ----------
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.querySelector('.nav-links');
  const closeMenu = () => { navLinks.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); };
  menuBtn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  // ---------- Active nav + case subnav ----------
  const links = [...navLinks.querySelectorAll('a[href^="#"]')];
  let currentPage = 'home';
  const onScroll = () => {
    links.forEach(l => {
      const on = !home.hidden && l.getAttribute('href') === '#' + currentPage;
      l.classList.toggle('active', on);
      if (on) l.setAttribute('aria-current', 'page'); else l.removeAttribute('aria-current');
    });
    const sn = caseView.hidden ? null : caseView.querySelector('.case-subnav');
    if (sn) {
      let cur = '';
      sn.querySelectorAll('[data-jump]').forEach(b => { const t = document.getElementById(b.dataset.jump); if (t && t.getBoundingClientRect().top < 200) cur = b.dataset.jump; });
      sn.querySelectorAll('[data-jump]').forEach(b => b.classList.toggle('active', b.dataset.jump === (cur || 'cs-overview')));
    }
  };
  addEventListener('scroll', onScroll, { passive: true });

  // ---------- Project list ----------
  const grid = document.getElementById('projectGrid');
  const FEATURED = 'startup-valuation';
  const GROUPS = {
    'dcf-valuation': ['valuation'], 'project-decision-analysis': ['valuation'], 'startup-valuation': ['valuation'],
    'sales-budget-variance': ['fpa'], 'material-budget-hedging': ['fpa'],
    'cash-flow-13-week': ['treasury'], 'sql-working-capital': ['treasury', 'analytics'],
    'power-bi-dashboard': ['analytics'], 'portfolio-optimization': ['analytics'],
  };
  const FILTERS = [['all', 'All'], ['fpa', 'FP&A and costing'], ['valuation', 'Modelling and valuation'], ['treasury', 'Cash and working capital'], ['analytics', 'Analytics and BI']];
  const ordered = [...projects].sort((a, b) => (b.id === FEATURED) - (a.id === FEATURED));

  const projCard = (p, featured) => `
    <article class="proj${featured ? ' featured' : ''}" data-groups="${(GROUPS[p.id] || []).join(' ')}">
      <a class="proj-thumb" href="#/project/${p.id}" tabindex="-1" aria-hidden="true">
        <img src="${thumbOf(p)}" alt="" loading="lazy" decoding="async" />
      </a>
      <div class="proj-body">
        <p class="proj-kicker">${commas(p.kicker)}</p>
        <h3><a href="#/project/${p.id}">${esc(p.title)}</a></h3>
        <p class="proj-summary">${esc(p.summary)}</p>
        ${p.highlight ? `<p class="proj-figure"><span class="figure">${esc(p.highlight.value)}</span> ${esc(p.highlight.label.split(' · ').join(', '))}</p>` : ''}
        <div class="proj-links">
          <a href="#/project/${p.id}">Read the case study</a>
          ${p.artifact ? `<a href="${p.artifact.url}" target="_blank" rel="noopener noreferrer">Open the live model${ext}</a>` : ''}
        </div>
      </div>
    </article>`;

  grid.insertAdjacentHTML('beforebegin', `<div class="proj-filters" role="toolbar" aria-label="Filter case studies">${FILTERS.map(([k, l], i) =>
    `<button class="filter${i ? '' : ' active'}" type="button" data-pf="${k}" aria-pressed="${!i}">${esc(l)}<span class="count">${k === 'all' ? projects.length : projects.filter(p => (GROUPS[p.id] || []).includes(k)).length}</span></button>`).join('')}</div>`);
  grid.innerHTML = ordered.map(p => projCard(p, p.id === FEATURED)).join('');

  document.querySelector('.proj-filters').addEventListener('click', e => {
    const b = e.target.closest('[data-pf]'); if (!b) return;
    const k = b.dataset.pf;
    document.querySelectorAll('[data-pf]').forEach(x => { const on = x === b; x.classList.toggle('active', on); x.setAttribute('aria-pressed', String(on)); });
    grid.classList.toggle('filtered', k !== 'all');
    grid.querySelectorAll('.proj').forEach(c => { c.hidden = k !== 'all' && !c.dataset.groups.split(' ').includes(k); });
  });

  // ---------- Next page links ----------
  const PAGES = [['projects', 'Case studies', 'projects'], ['builds', 'Builds', 'builds'], ['capabilities', 'Skills', 'capabilities'], ['about', 'About', 'vision'], ['contact', 'Contact', 'contact']];
  PAGES.forEach(([id], i) => {
    const next = PAGES[i + 1]; if (!next) return;
    document.getElementById(PAGES[i][2]).insertAdjacentHTML('beforeend', `<a class="next-up" href="#${next[0]}"><span>Next</span><strong>${next[1]}</strong></a>`);
  });

  // ---------- Builds ----------
  const hostOf = u => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch (e) { return ''; } };
  document.getElementById('buildsGrid').innerHTML = builds.map(b => `
    <article class="build">
      <a class="proj-thumb" href="#/build/${b.id}" tabindex="-1" aria-hidden="true">
        <img src="${BUILD_IMG}${b.cover}" alt="" loading="lazy" decoding="async" />
        ${b.illustrative ? '<span class="cover-tag">Illustration</span>' : ''}
      </a>
      <div class="proj-body">
        <p class="proj-kicker">${commas(b.kicker)}</p>
        <h3><a href="#/build/${b.id}">${esc(b.title)}</a></h3>
        <p class="proj-summary">${esc(b.summary)}</p>
        <p class="build-tools">${b.tools.map(esc).join(', ')}</p>
        <div class="proj-links">
          <a href="#/build/${b.id}">How it works</a>
          <a href="${b.url}" target="_blank" rel="noopener noreferrer">${esc(b.cta)}${ext}</a>
        </div>
      </div>
    </article>`).join('');

  // ---------- Home: featured + page list ----------
  const fp = projects.find(p => p.id === FEATURED);
  if (fp) document.getElementById('homeFeatured').innerHTML = projCard(fp, true);
  const TILES = [
    ['projects', 'Case studies', `${projects.length} finance projects with models, reports and working versions`],
    ['builds', 'Builds', `${builds.length} small tools I built while learning Python and AI tools`],
    ['capabilities', 'Skills', 'Finance, tools, tax and audit'],
    ['about', 'About', 'Experience, education and where I want to go'],
    ['contact', 'Contact', 'Email, LinkedIn and GitHub'],
  ];
  document.getElementById('exploreGrid').innerHTML = `<h3>Also on this site</h3><ul>${TILES.map(([id, t, d]) => `
      <li><a href="#${id}"><strong>${t}</strong><span>${esc(d)}</span></a></li>`).join('')}</ul>`;

  // ---------- Case study helpers ----------
  const subnav = items => `<nav class="case-subnav" aria-label="On this page">${items.filter(Boolean).map(([id, l]) => `<button type="button" data-jump="${id}">${esc(l)}</button>`).join('')}</nav>`;
  const caseNav = (prev, next, attr, word) => `
      <nav class="case-nav" aria-label="More ${word}s">
        <button type="button" ${attr}="${prev.id}"><small>Previous ${word}</small><strong>${esc(prev.title)}</strong></button>
        <button class="next" type="button" ${attr}="${next.id}"><small>Next ${word}</small><strong>${esc(next.title)}</strong></button>
      </nav>
      <p class="key-hint">Use the <kbd>←</kbd> <kbd>→</kbd> keys to move between ${word}s and <kbd>Esc</kbd> to go back.</p>`;
  const backBtn = (to, label) => `<div class="case-top"><button class="back" type="button" data-back="${to}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>${label}</button></div>`;

  // ---------- Build detail ----------
  let galleryImages = [];
  const renderBuild = idx => {
    const b = builds[idx];
    const prev = builds[(idx - 1 + builds.length) % builds.length];
    const next = builds[(idx + 1) % builds.length];
    galleryImages = [{ src: BUILD_IMG + b.cover, alt: b.illustrative ? `${b.title}, illustration` : `${b.title}, screenshot` }];
    caseView.innerHTML = `
      ${backBtn('builds', 'All builds')}
      <header class="case-head" id="cs-overview">
        <p class="proj-kicker">${commas(b.kicker)}</p>
        <h1 class="case-title">${esc(b.title)}</h1>
        <p class="case-overview">${esc(b.overview)}</p>
        <div class="case-actions"><a class="btn btn-primary" href="${b.url}" target="_blank" rel="noopener noreferrer">${esc(b.cta)}${ext}</a></div>
      </header>
      ${subnav([['cs-overview', 'Overview'], ['cs-how', 'How it works'], ['cs-what', 'What it does'], ['cs-access', 'Try it']])}
      <figure class="exhibit" data-img="0">
        <img src="${BUILD_IMG}${b.cover}" alt="${esc(galleryImages[0].alt)}" loading="lazy" decoding="async" />
        <figcaption>${b.illustrative ? 'Illustration of the idea, not a screenshot of the app.' : 'Screenshot of the app. Select to enlarge.'}</figcaption>
      </figure>
      <dl class="stats">${b.stats.map(([v, l]) => `<div><dt>${esc(l)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
      <section class="case-section" id="cs-how">
        <h2>How it works</h2>
        <ol class="flow">${b.steps.map(([t, d]) => `<li><strong>${esc(t)}</strong><p>${esc(d)}</p></li>`).join('')}</ol>
      </section>
      <section class="case-columns" id="cs-what">
        <div class="case-block"><h2>What it does</h2><ul>${b.features.map(f => `<li>${esc(f)}</li>`).join('')}</ul></div>
        <div class="case-block"><h2>What I learned</h2><ul>${b.learned.map(f => `<li>${esc(f)}</li>`).join('')}</ul></div>
      </section>
      <aside class="disclosure"><strong>Note.</strong> ${esc(b.note)}</aside>
      <section class="access" id="cs-access" aria-label="Try it">
        <div>
          <h2>Try ${esc(b.title)}</h2>
          <p>${esc(b.access || '')}</p>
          <code class="access-url">${esc(b.url.replace(/^https?:\/\//, ''))}</code>
        </div>
        <div class="access-actions">
          <a class="btn btn-primary" href="${b.url}" target="_blank" rel="noopener noreferrer">${esc(b.cta)}${ext}</a>
          <button class="btn btn-ghost copy-link" type="button" data-url="${b.url}">Copy link</button>
        </div>
      </section>
      ${caseNav(prev, next, 'data-gob', 'build')}`;
    document.title = `${b.title} | Harshavardhaan C`;
  };

  // ---------- Project detail ----------
  const renderCase = idx => {
    const p = projects[idx];
    const prev = projects[(idx - 1 + projects.length) % projects.length];
    const next = projects[(idx + 1) % projects.length];
    galleryImages = p.images.map((f, i) => ({ src: IMG + f, alt: `${p.title}, output ${i + 1}` }));
    caseView.innerHTML = `
      ${backBtn('projects', 'All case studies')}
      <header class="case-head" id="cs-overview">
        <p class="proj-kicker">${commas(p.kicker)}</p>
        <h1 class="case-title">${esc(p.title)}</h1>
        <p class="case-overview">${esc(p.overview)}</p>
        ${p.highlight ? `<p class="case-highlight"><span class="figure">${esc(p.highlight.value)}</span> ${esc(p.highlight.label.split(' · ').join(', '))}</p>` : ''}
        <p class="case-tags">${p.tags.map(esc).join(', ')}</p>
      </header>
      ${subnav([['cs-overview', 'Overview'], p.artifact && ['cs-live', 'Live model'], ['cs-approach', 'Approach'], ['cs-outputs', 'Outputs'], p.report && ['cs-report', 'Report']])}
      ${p.artifact ? `
      <section class="live-model" id="cs-live">
        <a class="live-shot" href="${p.artifact.url}" target="_blank" rel="noopener noreferrer" tabindex="-1" aria-hidden="true">
          <img src="${PREVIEWS}${p.artifact.preview}" alt="" loading="lazy" decoding="async" />
        </a>
        <div class="live-info">
          <h2>${esc(p.artifact.title)}</h2>
          <p>${esc(p.artifact.blurb)}</p>
          <a class="btn btn-primary" href="${p.artifact.url}" target="_blank" rel="noopener noreferrer">Open the live model${ext}</a>
        </div>
      </section>` : ''}
      <section class="case-columns" id="cs-approach">
        <div class="case-block"><h2>Approach</h2><ul>${p.approach.map(a => `<li>${esc(a)}</li>`).join('')}</ul></div>
        <div class="case-block"><h2>What came out of it</h2><ul>${p.outcomes.map(o => `<li>${esc(o)}</li>`).join('')}</ul></div>
      </section>
      <section class="case-section" id="cs-outputs">
        <h2>Outputs <span class="hint">Select any image to enlarge</span></h2>
        <div class="gallery${p.images.length === 1 ? ' single' : ''}">
          ${galleryImages.map((g, i) => `
            <figure class="exhibit" data-img="${i}" tabindex="0" role="button" aria-label="Enlarge output ${i + 1}">
              <img src="${g.src}" alt="${esc(g.alt)}" loading="lazy" decoding="async" />
              <figcaption>Output ${i + 1}</figcaption>
            </figure>`).join('')}
        </div>
      </section>
      ${p.report ? `
      <section class="case-section report" id="cs-report">
        <h2>${esc(p.report.title)}</h2>
        <div class="report-frame"><iframe src="${REPORTS}${p.report.file}" title="${esc(p.report.title)}" loading="lazy"></iframe></div>
        <div class="report-actions">
          <a class="btn btn-primary btn-sm" href="${REPORTS}${p.report.file}" target="_blank" rel="noopener">Open the PDF${ext}</a>
          <a class="btn btn-ghost btn-sm" href="${REPORTS}${p.report.file}" download>Download</a>
        </div>
      </section>` : ''}
      <aside class="disclosure"><strong>How this was made.</strong> This is a self-study case study. I used AI tools for research, drafting and presentation. The modelling, calculations and analysis are my own work.</aside>
      ${caseNav(prev, next, 'data-go', 'case study')}`;
    document.title = `${p.title} | Harshavardhaan C`;
  };

  caseView.addEventListener('click', e => {
    const fig = e.target.closest('[data-img]');
    if (fig) return openLightbox(+fig.dataset.img);
    const cl = e.target.closest('.copy-link');
    if (cl) { navigator.clipboard.writeText(cl.dataset.url).then(() => { cl.textContent = 'Link copied'; }).catch(() => { cl.textContent = 'Copy failed'; }); setTimeout(() => { cl.textContent = 'Copy link'; }, 1800); return; }
    const jump = e.target.closest('[data-jump]');
    if (jump) { const t = document.getElementById(jump.dataset.jump); if (t) scrollTo({ top: t.getBoundingClientRect().top + scrollY - 130, behavior: reduceMotion ? 'auto' : 'smooth' }); return; }
    const go = e.target.closest('[data-go]');
    if (go) { location.hash = '#/project/' + go.dataset.go; return; }
    const gob = e.target.closest('[data-gob]');
    if (gob) { location.hash = '#/build/' + gob.dataset.gob; return; }
    const back = e.target.closest('[data-back]');
    if (back) { location.hash = '#' + (back.dataset.back || 'projects'); }
  });
  caseView.addEventListener('keydown', e => {
    const fig = e.target.closest && e.target.closest('figure[data-img]');
    if (fig && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openLightbox(+fig.dataset.img); }
  });

  // ---------- Router ----------
  const baseTitle = document.title;
  const pageSections = [...home.querySelectorAll('[data-page]')];
  const PAGE_IDS = PAGES.map(p => p[0]);
  const showPage = pg => {
    pageSections.forEach(sec => { sec.hidden = sec.dataset.page !== pg; });
    currentPage = pg;
    home.dataset.page = pg;
    const label = (PAGES.find(p => p[0] === pg) || [])[1];
    document.title = label ? `${label} | Harshavardhaan C` : baseTitle;
  };
  const route = () => {
    const m = location.hash.match(/^#\/project\/([\w-]+)/);
    const mb = location.hash.match(/^#\/build\/([\w-]+)/);
    const idx = m ? projects.findIndex(p => p.id === m[1]) : -1;
    const bidx = mb ? builds.findIndex(b => b.id === mb[1]) : -1;
    if (idx >= 0 || bidx >= 0) {
      if (idx >= 0) renderCase(idx); else renderBuild(bidx);
      home.hidden = true;
      caseView.hidden = false;
      scrollTo({ top: 0, behavior: 'instant' });
    } else {
      caseView.hidden = true;
      caseView.innerHTML = '';
      home.hidden = false;
      const id = location.hash.slice(1);
      let pg = 'home', target = null;
      if (PAGE_IDS.includes(id)) pg = id;
      else if (id) {
        target = document.getElementById(id);
        const holder = target && target.closest('[data-page]');
        if (holder) pg = holder.dataset.page; else target = null;
      }
      showPage(pg);
      requestAnimationFrame(() => {
        if (target && pg !== 'home' && target.id === pg) target = null;
        if (target) target.scrollIntoView({ behavior: 'instant' });
        else scrollTo({ top: 0, behavior: 'instant' });
      });
    }
    closeMenu();
    onScroll();
  };
  addEventListener('hashchange', route);
  document.querySelector('.brand').addEventListener('click', e => {
    e.preventDefault();
    history.pushState('', '', location.pathname);
    route();
  });

  // ---------- Lightbox ----------
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCap = document.getElementById('lbCap');
  let lbIndex = 0, lastFocus = null;
  const showImg = i => {
    lbIndex = (i + galleryImages.length) % galleryImages.length;
    const g = galleryImages[lbIndex];
    lbImg.src = g.src; lbImg.alt = g.alt;
    lbCap.textContent = galleryImages.length > 1 ? `${g.alt} (${lbIndex + 1} of ${galleryImages.length})` : g.alt;
    lb.querySelectorAll('.lb-prev, .lb-next').forEach(b => { b.hidden = galleryImages.length < 2; });
  };
  const openLightbox = i => { lastFocus = document.activeElement; showImg(i); lb.hidden = false; document.body.classList.add('locked'); lb.querySelector('.lb-close').focus(); };
  const closeLightbox = () => { lb.hidden = true; document.body.classList.remove('locked'); if (lastFocus) lastFocus.focus(); };
  lb.addEventListener('click', e => {
    if (e.target.closest('.lb-prev')) return showImg(lbIndex - 1);
    if (e.target.closest('.lb-next')) return showImg(lbIndex + 1);
    if (e.target !== lbImg) closeLightbox();
  });

  // ---------- Resume modal ----------
  const resume = document.getElementById('resumePanel');
  const resumeFrame = resume.querySelector('iframe');
  const openResume = () => {
    lastFocus = document.activeElement;
    if (!resumeFrame.src) resumeFrame.src = resumeFrame.dataset.src;
    resume.hidden = false; document.body.classList.add('locked');
    resume.querySelector('.modal-close').focus();
  };
  const closeResume = () => { resume.hidden = true; document.body.classList.remove('locked'); if (lastFocus) lastFocus.focus(); };
  document.querySelectorAll('[data-resume]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); closeMenu(); openResume(); }));
  resume.querySelector('.modal-close').addEventListener('click', closeResume);
  resume.addEventListener('click', e => { if (e.target === resume) closeResume(); });

  addEventListener('keydown', e => {
    if (!lb.hidden) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showImg(lbIndex - 1);
      if (e.key === 'ArrowRight') showImg(lbIndex + 1);
      return;
    }
    if (!resume.hidden && e.key === 'Escape') return closeResume();
    if (caseView.hidden) return;
    if (e.key === 'Escape') location.hash = location.hash.startsWith('#/build/') ? '#builds' : '#projects';
    if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && !e.altKey && !e.metaKey && !e.ctrlKey) {
      const btn = caseView.querySelector(e.key === 'ArrowRight' ? '.case-nav .next' : '.case-nav button:not(.next)');
      if (btn) btn.click();
    }
  });

  // ---------- Copy email ----------
  const copyBtn = document.querySelector('.copy-email');
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(copyBtn.dataset.email);
      copyBtn.textContent = 'Address copied';
    } catch (e) {
      copyBtn.textContent = 'Select and copy the address above';
    }
    setTimeout(() => { copyBtn.textContent = 'Copy address'; }, 2000);
  });

  document.getElementById('year').textContent = new Date().getFullYear();
  route();
})();
