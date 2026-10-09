/* AIRES — language toggle, mobile nav, contact form (mailto fallback). No dependencies. */
(function () {
  'use strict';

  var EMAIL = 'contact@airesresearch.org';
  var root = document.documentElement;

  /* ---------- English strings (Indonesian lives in the HTML) ---------- */
  var EN = {
    skip: 'Skip to content',
    brandLabel: 'AIRES — back to top',
    navLabel: 'Main navigation',
    navAbout: 'Who we are',
    navWhat: 'What we do',
    navPubs: 'Publications',
    navResearch: 'Research',
    navContact: 'Contact us',
    navCta: 'Join a session',
    langLabel: 'Choose language',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',

    heroPill: 'Official launch December 2026',
    heroTitle: 'AI is on your little one’s device. <span class="nowrap">Let’s understand</span> it together.',
    heroLede: 'We study whether generative AI for children can lead to overstimulation and gadget addiction. We’d love to hear your story.',
    heroCta1: 'Join a discussion session',
    heroCta2: 'Learn about our research',

    panelTitle: 'Discussion session for mothers',
    panelStatus: 'Opening soon',
    rowDur: 'Duration',
    rowDurV: '45 minutes',
    rowPart: 'Participants',
    rowPartV: 'About 15 mothers',
    rowAge: 'Child’s age',
    rowAgeV: '3–7 years',
    rowLead: 'Led by',
    rowLeadV: 'Professional child psychologists',
    rowLoc: 'Location',
    rowLocV: 'Jakarta or Zoom',

    aboutEyebrow: 'Who we are',
    aboutTitle: 'Caring about how children grow up with AI.',
    aboutSub: 'Mothers, child psychologists, designers, and academics in one research team.',
    teamLabel: 'Team',
    ph: 'Placeholder',
    phNote: 'Team names and roles to come.',
    m1Name: '[Team member 1]',
    m1Role: '[Role, e.g. Principal investigator]',
    m2Name: '[Team member 2]',
    m2Role: '[Role, e.g. Child psychologist]',
    m3Name: '[Team member 3]',
    m3Role: '[Role, e.g. UX researcher]',
    m4Name: '[Team member 4]',
    m4Role: '[Role, e.g. Product designer]',

    whatEyebrow: 'What we do',
    whatTitle: 'Listen, understand, then share.',
    f1Title: 'Listening to mothers',
    f1Text: 'Focus groups and interviews about devices and AI at home.',
    f2Title: 'With child psychologists',
    f2Text: 'Every session is led by a professional child psychologist, safe and warm.',
    f3Title: 'For technology & design',
    f3Text: 'Findings for UI/UX designers, product teams, and academics.',

    pubEyebrow: 'Publications',
    pubTitle: 'Our findings, coming soon.',
    pubSub: 'No publications yet. Our first paper is in preparation.',
    pubT1Meta: 'Tallinn, Estonia · <span class="nowrap">23–27 August 2027</span>',
    pubT1Tag: 'In preparation',
    soon: 'Coming soon',
    pub2Title: 'Research paper',
    pub3Title: 'Summary for parents',

    resEyebrow: 'Upcoming research',
    resTitle: 'Discussion sessions for mothers of children aged 3–7.',
    resSub: 'A relaxed FGD, with no right or wrong answers.',
    factsLabel: 'Session summary',
    fa1V: '45 minutes',
    fa2V: 'Small groups, ~15 mothers',
    fa3V: 'Led by child psychologists',
    fa4V: 'Jakarta or online',
    venues: 'Perpusnas, Jakarta Creative Hub, Jakarta libraries (Nyi Ageng Serang & TIM), or Zoom.',
    regCta: 'Register as a participant',

    contactEyebrow: 'Contact us',
    contactTitle: 'A story or a question? Write to us.',
    socEyebrow: 'Social media',
    socSub: 'We share session schedules and launch news here.',
    socBtn: 'Follow on Instagram',
    newTab: '(opens in a new tab)',
    mailEyebrow: 'Mailbox',
    fName: 'Name',
    fNamePh: 'Your name',
    fEmail: 'Email',
    fMsg: 'Message',
    fMsgPh: 'Write your message here…',
    eName: 'Please enter your name.',
    eEmail: 'Please enter a valid email address.',
    eMsg: 'Please write a message.',
    fSend: 'Send message',
    fNote: 'Opens your email app.',

    footLaunch: 'Official launch December 2026',
    toTop: 'Back to top'
  };


  var META = {
    id: {
      title: document.title,
      desc: document.querySelector('meta[name="description"]').getAttribute('content'),
      formOpened: 'Aplikasi email Ibu sedang dibuka. Jika tidak muncul, kirim pesan langsung ke ' + EMAIL + '.',
      subject: 'Pesan dari situs AIRES',
      register: 'Halo AIRES, saya ingin ikut sesi diskusi. Anak saya berusia … tahun, dan saya lebih nyaman ikut di (Jakarta / Zoom).'
    },
    en: {
      title: 'AIRES — Research on generative AI & children aged 3–7',
      desc: 'AIRES is a research group studying whether generative AI for children can lead to overstimulation and gadget addiction. Join a discussion session for mothers of children aged 3–7.',
      formOpened: 'Your email app is opening. If nothing happens, write to us directly at ' + EMAIL + '.',
      subject: 'Message from the AIRES website',
      register: 'Hi AIRES, I would like to join a discussion session. My child is … years old, and I would prefer to join in (Jakarta / Zoom).'
    }
  };

  /* Capture Indonesian originals from the DOM */
  var ID = {}, ID_ATTR = {};
  var textNodes = document.querySelectorAll('[data-i18n]');
  textNodes.forEach(function (el) {
    var k = el.getAttribute('data-i18n');
    if (!(k in ID)) ID[k] = el.innerHTML;
  });
  var attrMap = { 'data-i18n-placeholder': 'placeholder', 'data-i18n-aria-label': 'aria-label' };
  Object.keys(attrMap).forEach(function (a) {
    document.querySelectorAll('[' + a + ']').forEach(function (el) {
      var k = el.getAttribute(a);
      if (!(k in ID_ATTR)) ID_ATTR[k] = el.getAttribute(attrMap[a]);
    });
  });
  ID_ATTR.menuClose = 'Tutup menu';

  var current = 'id';

  function t(key) {
    if (current === 'en') return EN[key] != null ? EN[key] : (ID[key] || ID_ATTR[key]);
    return ID[key] != null ? ID[key] : ID_ATTR[key];
  }

  function setLang(lang, persist) {
    current = lang === 'en' ? 'en' : 'id';
    root.lang = current;
    textNodes.forEach(function (el) {
      var v = t(el.getAttribute('data-i18n'));
      if (v != null) el.innerHTML = v;
    });
    Object.keys(attrMap).forEach(function (a) {
      document.querySelectorAll('[' + a + ']').forEach(function (el) {
        var v = t(el.getAttribute(a));
        if (v != null) el.setAttribute(attrMap[a], v);
      });
    });
    document.title = META[current].title;
    document.querySelector('meta[name="description"]').setAttribute('content', META[current].desc);
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === current));
    });
    syncMenuLabel();
    if (persist) { try { localStorage.setItem('aires-lang', current); } catch (e) {} }
  }

  document.querySelectorAll('.lang-btn').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang'), true); });
  });

  /* ---------- Mobile nav ---------- */
  var menuBtn = document.querySelector('.menu-btn');
  var nav = document.getElementById('site-nav');

  function isOpen() { return root.classList.contains('menu-open'); }
  function syncMenuLabel() {
    if (menuBtn) menuBtn.setAttribute('aria-label', t(isOpen() ? 'menuClose' : 'menuOpen'));
  }
  function setMenu(open) {
    root.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    syncMenuLabel();
  }
  if (menuBtn) {
    menuBtn.addEventListener('click', function () { setMenu(!isOpen()); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) { setMenu(false); menuBtn.focus(); }
    });
    window.matchMedia('(min-width: 960px)').addEventListener('change', function (m) { if (m.matches) setMenu(false); });
  }

  /* ---------- Contact form → mailto ---------- */
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  var msg = document.getElementById('f-msg');

  document.querySelectorAll('[data-prefill="register"]').forEach(function (a) {
    a.addEventListener('click', function () {
      if (msg && !msg.value.trim()) msg.value = META[current].register;
    });
  });

  if (form) {
    var fields = [
      { el: document.getElementById('f-name'), err: document.getElementById('e-name'), ok: function (v) { return v.trim().length > 0; } },
      { el: document.getElementById('f-email'), err: document.getElementById('e-email'), ok: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); } },
      { el: msg, err: document.getElementById('e-msg'), ok: function (v) { return v.trim().length > 0; } }
    ];
    fields.forEach(function (f) {
      f.el.setAttribute('aria-describedby', f.err.id);
      f.el.addEventListener('input', function () {
        if (f.ok(f.el.value)) { f.err.hidden = true; f.el.removeAttribute('aria-invalid'); }
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstBad = null;
      fields.forEach(function (f) {
        var good = f.ok(f.el.value);
        f.err.hidden = good;
        if (good) f.el.removeAttribute('aria-invalid');
        else { f.el.setAttribute('aria-invalid', 'true'); if (!firstBad) firstBad = f.el; }
      });
      if (firstBad) { firstBad.focus(); return; }

      var name = fields[0].el.value.trim();
      var email = fields[1].el.value.trim();
      var body = fields[2].el.value.trim() + '\n\n— ' + name + ' <' + email + '>';
      var href = 'mailto:' + EMAIL +
        '?subject=' + encodeURIComponent(META[current].subject + ' — ' + name) +
        '&body=' + encodeURIComponent(body);
      status.textContent = META[current].formOpened;
      window.location.href = href;
    });
  }

  /* ---------- Initial language ---------- */
  var pending = root.getAttribute('data-lang-pending');
  root.removeAttribute('data-lang-pending');
  setLang(pending || 'id', false);
})();
