(() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const projects = window.PROJECTS || [];
  const home = document.getElementById('home');
  const caseView = document.getElementById('caseView');
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad = n => String(n).padStart(2, '0');
  const IMG = 'assets/images/';
  const REPORTS = 'assets/reports/';
  const PREVIEWS = 'assets/previews/';
  const arrow = '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const playIcon = '<svg viewBox="0 0 24 24"><path d="M7 17L17 7M8 7h9v9"/></svg>';

  // ---------- Theme ----------
  document.getElementById('themeToggle').addEventListener('click', () => {
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
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

  // ---------- Scroll progress + active nav ----------
  const links = [...navLinks.querySelectorAll('a[href^="#"]:not([data-resume])')];
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    root.style.setProperty('--scroll', max > 0 ? (scrollY / max).toFixed(4) : 0);
    let current = '';
    if (!home.hidden) {
      home.querySelectorAll('section[id]').forEach(s => {
        if (s.getBoundingClientRect().top < innerHeight * 0.4) current = s.id;
      });
    }
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
    const sn = caseView.hidden ? null : caseView.querySelector('.case-subnav');
    if (sn) {
      let cur = '';
      sn.querySelectorAll('[data-jump]').forEach(b => { const t = document.getElementById(b.dataset.jump); if (t && t.getBoundingClientRect().top < 200) cur = b.dataset.jump; });
      sn.querySelectorAll('[data-jump]').forEach(b => b.classList.toggle('active', b.dataset.jump === (cur || 'cs-overview')));
    }
    const r = document.querySelector('.rail');
    if (r) {
      r.classList.toggle('show', !home.hidden && scrollY > innerHeight * 0.6);
      r.querySelectorAll('a').forEach(a => a.classList.toggle('active', a.dataset.rail === (current || 'top')));
    }
  };
  addEventListener('scroll', onScroll, { passive: true });

  // ---------- Pointer effects ----------
  if (matchMedia('(pointer: fine)').matches) {
    addEventListener('pointermove', e => {
      root.style.setProperty('--mx', e.clientX + 'px');
      root.style.setProperty('--my', e.clientY + 'px');
      const card = e.target.closest && e.target.closest('.card');
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--cx', e.clientX - r.left + 'px');
        card.style.setProperty('--cy', e.clientY - r.top + 'px');
      }
    }, { passive: true });

    const tilt = document.querySelector('.tilt');
    if (tilt && !reduceMotion) {
      const host = tilt.parentElement;
      host.addEventListener('pointermove', e => {
        const r = host.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
      });
      host.addEventListener('pointerleave', () => { tilt.style.transform = ''; });
    }
  }

  // ---------- Reveal on scroll + counters ----------
  const countUp = el => {
    const to = +el.dataset.to;
    if (reduceMotion) { el.textContent = to; return; }
    const start = performance.now();
    const step = t => {
      const p = Math.min((t - start) / 1200, 1);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const siblings = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
      el.style.transitionDelay = Math.min(Math.max(0, siblings.indexOf(el)) * 60, 360) + 'ms';
      el.classList.add('in');
      el.querySelectorAll('.count').forEach(countUp);
      io.unobserve(el);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  const observeReveals = scope => scope.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el));

  // ---------- Hero sparkline ----------
  const line = document.getElementById('line');
  const area = document.getElementById('area');
  const dotEnd = document.getElementById('dotEnd');
  const W = 400, H = 110, N = 14;
  const drawChart = () => {
    let v = 30, pts = [];
    for (let i = 0; i < N; i++) {
      v += 4 + Math.sin(i * 1.2 + Math.random() * 2) * 6 + Math.random() * 3;
      pts.push([(i / (N - 1)) * W, H - 8 - Math.min(v, 100) / 100 * (H - 16)]);
    }
    const d = pts.reduce((acc, p, i, a) => {
      if (!i) return `M${p[0]},${p[1]}`;
      const cx = (a[i - 1][0] + p[0]) / 2;
      return `${acc} C${cx},${a[i - 1][1]} ${cx},${p[1]} ${p[0]},${p[1]}`;
    }, '');
    line.setAttribute('d', d);
    area.setAttribute('d', `${d} L${W},${H} L0,${H} Z`);
    dotEnd.setAttribute('cx', pts[N - 1][0]);
    dotEnd.setAttribute('cy', pts[N - 1][1]);
    if (!reduceMotion) {
      const len = line.getTotalLength();
      line.style.transition = 'none';
      line.style.strokeDasharray = len;
      line.style.strokeDashoffset = len;
      line.getBoundingClientRect();
      line.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(.2,.8,.2,1)';
      line.style.strokeDashoffset = 0;
    }
  };
  drawChart();
  if (!reduceMotion) setInterval(drawChart, 6000);

  // ---------- Project cards ----------
  const grid = document.getElementById('projectGrid');
  const FEATURED = 'startup-valuation';
  const GROUPS = {
    'dcf-valuation': ['valuation'], 'project-decision-analysis': ['valuation'], 'startup-valuation': ['valuation'],
    'sales-budget-variance': ['fpa'], 'material-budget-hedging': ['fpa'],
    'cash-flow-13-week': ['treasury'], 'sql-working-capital': ['treasury', 'analytics'],
    'power-bi-dashboard': ['analytics'], 'portfolio-optimization': ['analytics'],
  };
  const FILTERS = [['all', 'All projects'], ['valuation', 'Modelling & valuation'], ['fpa', 'FP&A & costing'], ['treasury', 'Treasury & working capital'], ['analytics', 'Analytics & BI']];
  grid.insertAdjacentHTML('beforebegin', `<div class="proj-filters reveal" role="toolbar" aria-label="Filter projects">${FILTERS.map(([k, l], i) =>
    `<button class="filter${i ? '' : ' active'}" type="button" data-pf="${k}" aria-pressed="${!i}">${esc(l)} <span class="mono">${k === 'all' ? projects.length : projects.filter(p => (GROUPS[p.id] || []).includes(k)).length}</span></button>`).join('')}</div>`);
  grid.innerHTML = projects.map((p, i) => `
    <article class="proj card reveal${p.id === FEATURED ? ' featured' : ''}" data-groups="${(GROUPS[p.id] || []).join(' ')}">
      <a class="proj-main" href="#/project/${p.id}" aria-label="Open case study: ${esc(p.title)}">
        <div class="proj-thumb">
          <img src="assets/covers/${p.id}.jpg" alt="${esc(p.title)}" loading="lazy" decoding="async" />
          <span class="proj-peek" aria-hidden="true">Read case study ${arrow}</span>
          <span class="proj-count">${p.images.length} image${p.images.length > 1 ? 's' : ''}${p.report ? ' · PDF' : ''}</span>
        </div>
        <div class="proj-body">
          <span class="proj-kicker">${esc(p.kicker)}</span>
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.summary)}</p>
          <span class="proj-link">View full case study ${arrow}</span>
        </div>
      </a>
      ${p.artifact ? `
      <a class="proj-live" href="${p.artifact.url}" target="_blank" rel="noopener noreferrer" aria-label="Open the interactive model: ${esc(p.artifact.title)}">
        <span class="live-ico" aria-hidden="true">${playIcon}</span>
        <span><small class="mono"><i></i>Live model</small><strong>${esc(p.artifact.title)}</strong></span>
        <b aria-hidden="true">↗</b>
      </a>` : ''}
    </article>`).join('');

  document.querySelector('.proj-filters').addEventListener('click', e => {
    const b = e.target.closest('[data-pf]'); if (!b) return;
    const k = b.dataset.pf;
    document.querySelectorAll('[data-pf]').forEach(x => { const on = x === b; x.classList.toggle('active', on); x.setAttribute('aria-pressed', String(on)); });
    grid.classList.toggle('filtered', k !== 'all');
    grid.querySelectorAll('.proj').forEach(c => { c.hidden = k !== 'all' && !c.dataset.groups.split(' ').includes(k); c.classList.add('in'); });
  });

  // ---------- Section hand-offs + side rail ----------
  const ORDER = [['projects', 'Projects'], ['builds', 'Builds'], ['capabilities', 'Capabilities'], ['about', 'About'], ['vision', 'Vision'], ['contact', 'Contact']];
  ORDER.forEach(([id], i) => {
    const next = ORDER[i + 1]; if (!next) return;
    document.getElementById(id).insertAdjacentHTML('beforeend', `<a class="next-up reveal" href="#${next[0]}"><span class="mono">Up next</span><strong>${next[1]}</strong><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7"/></svg></a>`);
  });
  document.body.insertAdjacentHTML('beforeend', `<nav class="rail" aria-label="Page sections"><a href="#top" data-rail="top"><i></i><span>Top</span></a>${ORDER.map(([id, l]) => `<a href="#${id}" data-rail="${id}"><i></i><span>${l}</span></a>`).join('')}</nav>`);
  const rail = document.querySelector('.rail');
  rail.querySelector('[data-rail="top"]').addEventListener('click', e => { e.preventDefault(); history.pushState('', '', location.pathname); scrollTo({ top: 0, behavior: 'smooth' }); });

  // ---------- Builds ----------
  const builds = window.BUILDS || [];
  const BUILD_IMG = 'assets/builds/';
  document.getElementById('buildsGrid').innerHTML = builds.map(b => `
    <article class="build card reveal">
      <a class="build-main" href="#/build/${b.id}" aria-label="Details: ${esc(b.title)}">
        <div class="build-cover">
          <img src="${BUILD_IMG}${b.cover}" alt="${esc(b.title)}" loading="lazy" decoding="async" />
          ${b.illustrative ? '<span class="cover-tag mono">Illustration</span>' : '<span class="cover-tag mono live"><i></i>Live</span>'}
        </div>
        <div class="build-body">
          <span class="proj-kicker">${esc(b.kicker)}</span>
          <h3>${esc(b.title)}</h3>
          <p>${esc(b.summary)}</p>
          <div class="build-tools">${b.tools.map(t => `<span>${esc(t)}</span>`).join('')}</div>
        </div>
      </a>
      <div class="build-actions">
        <a class="build-more" href="#/build/${b.id}">View details ${arrow}</a>
        <a class="btn btn-ghost btn-sm" href="${b.url}" target="_blank" rel="noopener noreferrer">${esc(b.cta)} ↗</a>
      </div>
    </article>`).join('');

  const renderBuild = idx => {
    const b = builds[idx];
    const prev = builds[(idx - 1 + builds.length) % builds.length];
    const next = builds[(idx + 1) % builds.length];
    galleryImages = [{ src: BUILD_IMG + b.cover, alt: b.illustrative ? `${b.title}, illustration` : `${b.title}, screenshot` }];
    caseView.innerHTML = `
      <div class="case-top"><button class="back" type="button" data-back="builds"><svg viewBox="0 0 24 24"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>Back to all builds</button><span class="case-count mono">${pad(idx + 1)} / ${pad(builds.length)}</span></div>
      <div class="case-head" id="cs-overview">
        <div>
          <span class="eyebrow mono">Build ${pad(idx + 1)} · ${esc(b.kicker)}</span>
          <h1 class="case-title">${esc(b.title)}</h1>
          <div class="case-tags">${b.tools.map(t => `<span>${esc(t)}</span>`).join('')}</div>
        </div>
        <a class="btn btn-primary" href="${b.url}" target="_blank" rel="noopener noreferrer">${esc(b.cta)} ↗</a>
      </div>
      ${subnav([['cs-overview', 'Overview'], ['cs-live', 'Preview'], ['cs-how', 'How it works'], ['cs-what', 'What it does']])}
      <p class="case-overview">${esc(b.overview)}</p>
      <a class="live-model card" id="cs-live" href="${b.url}" target="_blank" rel="noopener noreferrer" aria-label="${esc(b.cta)}: ${esc(b.title)}">
        <div class="live-shot">
          <img src="${BUILD_IMG}${b.cover}" alt="${esc(galleryImages[0].alt)}" loading="lazy" decoding="async" />
          <span class="live-play">${playIcon} ${esc(b.cta)}</span>
          ${b.illustrative ? '<span class="cover-tag mono">Illustration</span>' : ''}
        </div>
        <div class="live-info">
          <span class="live-badge mono"><i></i>${b.illustrative ? 'External app' : 'Live build'}</span>
          <h3>${esc(b.title)}</h3>
          <p>${esc(b.summary)}</p>
          <span class="btn btn-primary btn-sm">${esc(b.cta)} ↗</span>
        </div>
      </a>
      <div class="build-stats">${b.stats.map(([v, l]) => `<div class="card"><strong class="mono">${esc(v)}</strong><span>${esc(l)}</span></div>`).join('')}</div>
      <div class="sub-head" id="cs-how"><h2>How it works</h2></div>
      <ol class="flow">${b.steps.map(([t, d], i) => `<li class="card"><span class="mono">${pad(i + 1)}</span><strong>${esc(t)}</strong><p>${esc(d)}</p></li>`).join('')}</ol>
      <div class="case-columns" id="cs-what">
        <div class="case-block card"><h3>What it does</h3><ul>${b.features.map(f => `<li>${esc(f)}</li>`).join('')}</ul></div>
        <div class="case-block card outcomes"><h3>What I learned</h3><ul>${b.learned.map(f => `<li>${esc(f)}</li>`).join('')}</ul></div>
      </div>
      <div class="disclosure"><strong>Note</strong><br>${esc(b.note)}${b.illustrative ? ' The cover is an illustration of the concept, not a screenshot of the app.' : ''}</div>
      ${upNext('#/build/' + next.id, 'Build ' + pad((idx + 1) % builds.length + 1), next.title, next.summary, BUILD_IMG + next.cover)}
      <nav class="case-nav" aria-label="More builds">
        <button class="card" type="button" data-gob="${prev.id}"><small>← Previous build</small><strong>${esc(prev.title)}</strong></button>
        <button class="card next" type="button" data-gob="${next.id}"><small>Next build →</small><strong>${esc(next.title)}</strong></button>
      </nav>
      ${keyHint}`;
    document.title = `${b.title} | Harshavardhaan`;
  };

  // ---------- Case study helpers ----------
  const subnav = items => `<nav class="case-subnav" aria-label="On this page">${items.filter(Boolean).map(([id, l]) => `<button type="button" data-jump="${id}">${esc(l)}</button>`).join('')}</nav>`;
  const upNext = (href, kind, title, text, img) => `
      <a class="up-next card" href="${href}">
        <div class="un-img"><img src="${img}" alt="" loading="lazy" decoding="async" /></div>
        <div class="un-body">
          <span class="mono">Up next · ${esc(kind)}</span>
          <strong>${esc(title)}</strong>
          <p>${esc(text)}</p>
          <span class="un-go">Continue ${arrow}</span>
        </div>
      </a>`;
  const keyHint = `<p class="key-hint mono">Tip: use <kbd>←</kbd> <kbd>→</kbd> to browse, <kbd>Esc</kbd> to go back</p>`;

  // ---------- Case study view ----------
  let galleryImages = [];
  const renderCase = idx => {
    const p = projects[idx];
    const prev = projects[(idx - 1 + projects.length) % projects.length];
    const next = projects[(idx + 1) % projects.length];
    galleryImages = p.images.map((f, i) => ({ src: IMG + f, alt: `${p.title}, output ${i + 1}` }));
    caseView.innerHTML = `
      <div class="case-top"><button class="back" type="button" data-back><svg viewBox="0 0 24 24"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>Back to all projects</button><span class="case-count mono">${pad(idx + 1)} / ${pad(projects.length)}</span></div>
      <div class="case-head" id="cs-overview">
        <div>
          <span class="eyebrow mono">Project ${pad(idx + 1)} · ${esc(p.kicker)}</span>
          <h1 class="case-title">${esc(p.title)}</h1>
          <div class="case-tags">${p.tags.map(t => `<span>${esc(t)}</span>`).join('')}</div>
        </div>
        ${p.highlight ? `<div class="case-highlight card"><strong>${esc(p.highlight.value)}</strong><span>${esc(p.highlight.label)}</span></div>` : ''}
      </div>
      ${subnav([['cs-overview', 'Overview'], p.artifact && ['cs-live', 'Live model'], ['cs-approach', 'Approach & outcomes'], ['cs-outputs', 'Outputs'], p.report && ['cs-report', 'Report']])}
      <p class="case-overview">${esc(p.overview)}</p>
      ${p.artifact ? `
      <a class="live-model card" id="cs-live" href="${p.artifact.url}" target="_blank" rel="noopener noreferrer" aria-label="Open the interactive model: ${esc(p.artifact.title)}">
        <div class="live-shot">
          <img src="${PREVIEWS}${p.artifact.preview}" alt="Preview of the ${esc(p.artifact.title)} interactive model" loading="lazy" decoding="async" />
          <span class="live-play">${playIcon} Open interactive model</span>
        </div>
        <div class="live-info">
          <span class="live-badge mono"><i></i>Live model</span>
          <h3>${esc(p.artifact.title)}</h3>
          <p>${esc(p.artifact.blurb)}</p>
          <span class="btn btn-primary btn-sm">Launch model ↗</span>
        </div>
      </a>` : ''}
      <div class="case-columns" id="cs-approach">
        <div class="case-block card"><h3>Approach</h3><ul>${p.approach.map(a => `<li>${esc(a)}</li>`).join('')}</ul></div>
        <div class="case-block card outcomes"><h3>Key Outcomes</h3><ul>${p.outcomes.map(o => `<li>${esc(o)}</li>`).join('')}</ul></div>
      </div>
      <div class="sub-head" id="cs-outputs"><h2>Outputs</h2><span>Click any image to enlarge</span></div>
      <div class="gallery${p.images.length === 1 ? ' single' : ''}">
        ${galleryImages.map((g, i) => `
          <figure class="card" data-img="${i}">
            <img src="${g.src}" alt="${esc(g.alt)}" loading="lazy" decoding="async" />
            <figcaption>Output ${i + 1}<span>Enlarge ↗</span></figcaption>
          </figure>`).join('')}
      </div>
      ${p.report ? `
      <div class="report" id="cs-report">
        <span class="eyebrow mono">${esc(p.report.label)}</span>
        <h2>${esc(p.report.title)}</h2>
        <div class="report-frame"><iframe src="${REPORTS}${p.report.file}" title="${esc(p.report.title)}" loading="lazy"></iframe></div>
        <div class="report-actions">
          <a class="btn btn-primary btn-sm" href="${REPORTS}${p.report.file}" target="_blank" rel="noopener">Open full PDF ↗</a>
          <a class="btn btn-ghost btn-sm" href="${REPORTS}${p.report.file}" download>Download</a>
        </div>
      </div>` : ''}
      <div class="disclosure"><strong>AI &amp; Work Disclosure</strong><br>AI tools were used selectively for research support, drafting and presentation development. The financial modelling, calculations, analysis and core workings were completed independently by me.</div>
      ${upNext('#/project/' + next.id, 'Project ' + pad((idx + 1) % projects.length + 1), next.title, next.summary, 'assets/covers/' + next.id + '.jpg')}
      <nav class="case-nav" aria-label="More projects">
        <button class="card" type="button" data-go="${prev.id}"><small>← Previous</small><strong>${esc(prev.title)}</strong></button>
        <button class="card next" type="button" data-go="${next.id}"><small>Next →</small><strong>${esc(next.title)}</strong></button>
      </nav>
      ${keyHint}`;
    document.title = `${p.title} | Harshavardhaan`;
  };

  caseView.addEventListener('click', e => {
    const fig = e.target.closest('[data-img]');
    if (fig) return openLightbox(+fig.dataset.img);
    const jump = e.target.closest('[data-jump]');
    if (jump) { const t = document.getElementById(jump.dataset.jump); if (t) scrollTo({ top: t.getBoundingClientRect().top + scrollY - 150, behavior: reduceMotion ? 'auto' : 'smooth' }); return; }
    const go = e.target.closest('[data-go]');
    if (go) { location.hash = '#/project/' + go.dataset.go; return; }
    const gob = e.target.closest('[data-gob]');
    if (gob) { location.hash = '#/build/' + gob.dataset.gob; return; }
    const back = e.target.closest('[data-back]');
    if (back) { location.hash = '#' + (back.dataset.back || 'projects'); }
  });

  // ---------- Router ----------
  const baseTitle = document.title;
  let lastWasCase = false;
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
      lastWasCase = true;
    } else {
      caseView.hidden = true;
      caseView.innerHTML = '';
      home.hidden = false;
      document.title = baseTitle;
      const target = location.hash.length > 1 && document.getElementById(location.hash.slice(1));
      if (lastWasCase || target) {
        requestAnimationFrame(() => {
          if (target) target.scrollIntoView({ behavior: lastWasCase ? 'instant' : 'smooth' });
          else scrollTo({ top: 0, behavior: 'instant' });
          lastWasCase = false;
        });
      }
    }
    onScroll();
  };
  addEventListener('hashchange', route);
  document.querySelector('.brand').addEventListener('click', e => {
    e.preventDefault();
    history.pushState('', '', location.pathname);
    route();
    scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---------- Lightbox ----------
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCap = document.getElementById('lbCap');
  let lbIndex = 0;
  const showImg = i => {
    lbIndex = (i + galleryImages.length) % galleryImages.length;
    const g = galleryImages[lbIndex];
    lbImg.src = g.src; lbImg.alt = g.alt;
    lbCap.textContent = `${g.alt} · ${lbIndex + 1} / ${galleryImages.length}`;
    lb.querySelectorAll('.lb-prev, .lb-next').forEach(b => { b.hidden = galleryImages.length < 2; });
  };
  const openLightbox = i => { showImg(i); lb.hidden = false; document.body.classList.add('locked'); };
  const closeLightbox = () => { lb.hidden = true; document.body.classList.remove('locked'); };
  lb.addEventListener('click', e => {
    if (e.target.closest('.lb-prev')) return showImg(lbIndex - 1);
    if (e.target.closest('.lb-next')) return showImg(lbIndex + 1);
    if (e.target !== lbImg) closeLightbox();
  });

  // ---------- Resume modal ----------
  const resume = document.getElementById('resumePanel');
  const resumeFrame = resume.querySelector('iframe');
  const openResume = () => {
    if (!resumeFrame.src) resumeFrame.src = resumeFrame.dataset.src;
    resume.hidden = false; document.body.classList.add('locked');
  };
  const closeResume = () => { resume.hidden = true; document.body.classList.remove('locked'); };
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

  // ---------- Skill tabs ----------
  const tabs = [...document.querySelectorAll('.skill-tabs .filter')];
  const skills = [...document.querySelectorAll('#skillGrid .skill-card')];
  const applySkills = filter => {
    tabs.forEach(t => {
      const on = t.dataset.filter === filter;
      t.classList.toggle('active', on);
      t.setAttribute('aria-selected', String(on));
    });
    skills.forEach(c => {
      const show = filter === 'key' ? c.dataset.key === 'true' : c.dataset.category === filter;
      c.hidden = !show;
    });
  };
  tabs.forEach(t => t.addEventListener('click', () => applySkills(t.dataset.filter)));
  applySkills('key');

  // ---------- Copy email ----------
  const copyBtn = document.querySelector('.copy-email');
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(copyBtn.dataset.email);
      copyBtn.textContent = 'Copied ✓';
    } catch (e) {
      copyBtn.textContent = 'Press Ctrl+C';
    }
    setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1800);
  });

  document.getElementById('year').textContent = new Date().getFullYear();
  observeReveals(document);
  route();
})();
