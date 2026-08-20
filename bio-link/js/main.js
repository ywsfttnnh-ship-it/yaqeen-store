/* ============================================================
   4FUNg — Bio Link Hub · main.js
   ============================================================ */

const DISCORD_USER_ID = '675423005970792448';
const KICK_CHANNEL = '4fungg';
const RIOT_ID = 'NoMercyツ#3073';

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

/* ============================================================
   I18N (EN / AR)
   ============================================================ */
const I18N = {
  en: {
    navJoin: 'Join Discord',
    tagStreamer: 'Streamer',
    tagGamer: 'Gamer',
    tagCreator: 'Content Creator',
    riotLabel: 'Riot ID',
    bio: 'Gamer • Streamer • Community builder. I play, I stream, I have fun — welcome to my corner of the internet.',
    ctaKick: 'Watch on Kick',
    ctaServer: 'Join the Server',
    pcChecking: 'Checking…',
    pcOnline: 'Online',
    pcIdle: 'Idle',
    pcDnd: 'Do Not Disturb',
    pcOffline: 'Offline',
    pcOfflineText: 'Offline — I\u2019ll be back soon.',
    pcFoot: 'Live presence',
    pcAdd: 'Add friend',
    pcPlaying: 'Playing',
    pcListening: 'Listening to',
    pcCustom: 'Status',
    linksKicker: 'Where to find me',
    linksTitle: 'Connect & Play',
    linksSub: 'Follow, watch, add me — and come hang out with the 4 FUN crew.',
    kickStatus: 'Channel',
    kickLive: 'LIVE NOW',
    kickCta: 'Watch Live →',
    instaStatus: 'Active',
    instaCta: 'Follow →',
    steamStatus: 'Profile',
    steamCta: 'View Profile →',
    riotStatus: 'NoMercyツ#3073',
    riotCta: 'Copy Riot ID →',
    dmStatus: 'DM open',
    dmCta: 'Send a message →',
    serverStatus: 'Community',
    serverSub: '142+ members. Games, tournaments & giveaways.',
    serverCta: 'Join Server →',
    footerText: '© 2026 4FUNg — Made for fun. All rights reserved.',
    toastCopied: 'Copied to clipboard!',
  },
  ar: {
    navJoin: 'انضم للسيرفر',
    tagStreamer: 'ستريمر',
    tagGamer: 'جيمر',
    tagCreator: 'صانع محتوى',
    riotLabel: 'معرّف Riot',
    bio: 'جيمر • ستريمر • باني مجتمع. ألعب، أبث، وأستمتع — مرحباً بك في ركني على الإنترنت.',
    ctaKick: 'شاهدني على كيك',
    ctaServer: 'انضم للسيرفر',
    pcChecking: 'جارٍ الفحص…',
    pcOnline: 'متصل',
    pcIdle: 'خامل',
    pcDnd: 'لا تُزعج',
    pcOffline: 'غير متصل',
    pcOfflineText: 'غير متصل — سأعود قريباً.',
    pcFoot: 'حالة حيّة',
    pcAdd: 'أضف كصديق',
    pcPlaying: 'يلعب الآن',
    pcListening: 'يستمع إلى',
    pcCustom: 'الحالة',
    linksKicker: 'أين تجدني',
    linksTitle: 'تواصل والعب',
    linksSub: 'تابعني وشاهدني وأضفني — وتعال استمتع مع فريق 4 FUN.',
    kickStatus: 'القناة',
    kickLive: 'مباشر الآن',
    kickCta: 'شاهد البث ←',
    instaStatus: 'نشط',
    instaCta: 'تابع ←',
    steamStatus: 'البروفايل',
    steamCta: 'عرض البروفايل ←',
    riotStatus: 'NoMercyツ#3073',
    riotCta: 'نسخ معرّف Riot ←',
    dmStatus: 'الرسائل مفتوحة',
    dmCta: 'أرسل رسالة ←',
    serverStatus: 'المجتمع',
    serverSub: '+142 عضو. ألعاب وبطولات وهدايا.',
    serverCta: 'انضم للسيرفر ←',
    footerText: '© 2026 4FUNg — صُنع للمتعة. جميع الحقوق محفوظة.',
    toastCopied: 'تم النسخ!',
  },
};

let currentLang = localStorage.getItem('4fung-lang') || 'en';

function applyLang(lang) {
  currentLang = lang;
  const dict = I18N[lang];
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  document.body.setAttribute('data-lang', lang);
  localStorage.setItem('4fung-lang', lang);

  $$('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] != null) el.textContent = dict[key];
  });
  $('#langToggle').textContent = lang === 'ar' ? 'EN' : 'ع';
}

/* ============================================================
   TOAST
   ============================================================ */
let toastTimer;
function showToast(message) {
  const t = $('#toast');
  t.textContent = message;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

function copyText(text, successMsg) {
  const done = () => showToast(successMsg || I18N[currentLang].toastCopied);
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
  } else {
    fallbackCopy(text, done);
  }
}
function fallbackCopy(text, done) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); done(); } catch (e) { /* noop */ }
  document.body.removeChild(ta);
}

/* ============================================================
   STARFIELD
   ============================================================ */
function initStars() {
  const canvas = $('#stars');
  const ctx = canvas.getContext('2d');
  let w, h, dpr;
  const stars = [];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.width = window.innerWidth * dpr;
    h = canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
  }

  function buildStars() {
    stars.length = 0;
    const count = Math.min(160, Math.floor(window.innerWidth / 9));
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: (Math.random() * 1.6 + 0.4) * dpr,
        a: Math.random() * 0.6 + 0.2,
        tw: Math.random() * 0.02 + 0.004,
        hue: [0, 1, 2][Math.floor(Math.random() * 3)], // 0=cyan 1=violet 2=white
      });
    }
  }

  const PALETTE = ['34,211,238', '167,139,250', '238,240,255'];

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      const alpha = s.a * (0.6 + 0.4 * Math.sin(t * s.tw * 40 + s.x));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${PALETTE[s.hue]},${alpha})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  resize();
  buildStars();
  requestAnimationFrame(draw);
  window.addEventListener('resize', () => { resize(); buildStars(); });
}

/* ============================================================
   NAVBAR + REVEAL ON SCROLL
   ============================================================ */
function initScrollFx() {
  const navbar = $('#navbar');
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 12);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  $$('.reveal').forEach((el, i) => {
    if (el.closest('.links-grid')) el.style.transitionDelay = `${Math.min(i % 3, 2) * 90}ms`;
    observer.observe(el);
  });
}

/* ============================================================
   DISCORD LIVE PRESENCE (Lanyard)
   ============================================================ */
const STATUS_META = {
  online: { cls: 'is-online', key: 'pcOnline', color: 'green' },
  idle: { cls: 'is-idle', key: 'pcIdle', color: 'yellow' },
  dnd: { cls: 'is-dnd', key: 'pcDnd', color: 'red' },
  offline: { cls: 'is-offline', key: 'pcOffline', color: 'gray' },
};

function discordAvatarUrl(user) {
  if (!user || !user.avatar) return 'assets/avatar.svg';
  const ext = user.avatar.startsWith('a_') ? 'gif' : 'png';
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=128`;
}

function renderPresence(data) {
  const meta = STATUS_META[data.discord_status] || STATUS_META.offline;
  const dict = I18N[currentLang];

  // Status dots + pill
  $('#avatarStatusDot').className = 'status-dot ' + (meta.cls === 'is-offline' ? 'is-offline' : meta.cls);
  $('#pcStatusDot').className = 'status-dot ' + meta.cls;
  const pill = $('#pcPill');
  pill.className = 'pc-pill ' + meta.cls;
  pill.querySelector('b').textContent = dict[meta.key];

  // User
  const user = data.discord_user;
  if (user) {
    const display = user.global_name || user.username || '4FUNg';
    $('#pcName').textContent = display;
    $('#pcHandle').textContent = '@' + (user.username || 'yusef_asmar');
    const av = discordAvatarUrl(user);
    $('#pcAvatar').src = av;
    $('#avatarImg').src = av;
    $('#dmName').textContent = display;
  }

  // Custom status
  const custom = (data.activities || []).find((a) => a.type === 4);
  const customEl = $('#pcCustom');
  if (custom && custom.state) {
    customEl.hidden = false;
    $('#pcCustomText').textContent = custom.state;
    if (custom.emoji && custom.emoji.name) {
      const e = customEl.querySelector('.pc-custom-icon');
      e.textContent = custom.emoji.id ? '' : custom.emoji.name;
    }
  } else {
    customEl.hidden = true;
  }

  // Activity: game first, then Spotify
  const activityEl = $('#pcActivity');
  const offlineEl = $('#pcOffline');
  const game = (data.activities || []).find((a) => a.type === 0);

  if (data.listening_to_spotify && data.spotify) {
    offlineEl.hidden = true;
    activityEl.hidden = false;
    activityEl.className = 'pc-activity is-spotify';
    $('#pcActivityType').textContent = dict.pcListening;
    $('#pcActivityName').textContent = data.spotify.song;
    $('#pcActivityDetail').textContent =
      data.spotify.artist + (data.spotify.album ? ' — ' + data.spotify.album : '');
    const img = $('#pcActivityImg');
    img.src = data.spotify.album_art_url;
    img.onerror = () => { img.style.visibility = 'hidden'; };
  } else if (game) {
    offlineEl.hidden = true;
    activityEl.hidden = false;
    activityEl.className = 'pc-activity';
    $('#pcActivityType').textContent = dict.pcPlaying;
    $('#pcActivityName').textContent = game.name;
    $('#pcActivityDetail').textContent = [game.details, game.state].filter(Boolean).join(' — ');
    const img = $('#pcActivityImg');
    img.style.visibility = 'visible';
    img.src = 'assets/logo.svg';
    if (game.application_id && game.assets && game.assets.large_image) {
      const key = game.assets.large_image;
      const url = key.startsWith('mp:')
        ? `https://media.discordapp.net/${key.replace('mp:', '')}`
        : `https://cdn.discordapp.com/app-assets/${game.application_id}/${key}.png`;
      img.onerror = () => { img.src = 'assets/logo.svg'; };
      img.src = url;
    }
  } else {
    activityEl.hidden = true;
    offlineEl.hidden = false;
    $('#pcOfflineText').textContent = dict.pcOfflineText;
  }
}

async function pollPresence() {
  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`, {
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error('not-tracked');
    const json = await res.json();
    if (json.success && json.data) renderPresence(json.data);
  } catch (e) {
    // Not tracked or offline — render a graceful offline state
    const dict = I18N[currentLang];
    $('#avatarStatusDot').className = 'status-dot is-offline';
    $('#pcStatusDot').className = 'status-dot is-offline';
    const pill = $('#pcPill');
    pill.className = 'pc-pill is-offline';
    pill.querySelector('b').textContent = dict.pcOffline;
    $('#pcActivity').hidden = true;
    $('#pcCustom').hidden = true;
    const offlineEl = $('#pcOffline');
    offlineEl.hidden = false;
    $('#pcOfflineText').textContent = dict.pcOfflineText;
  }
}

/* ============================================================
   KICK LIVE STATUS (best-effort, graceful fallback)
   ============================================================ */
async function pollKick() {
  const badge = $('#kickBadge');
  try {
    const res = await fetch(`https://kick.com/api/v2/channels/${KICK_CHANNEL}`, {
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error('blocked');
    const json = await res.json();
    const live = json.livestream !== null && json.livestream !== undefined;
    if (live) {
      const viewers = json.livestream?.viewer_count;
      badge.innerHTML = '';
      const dot = document.createElement('span');
      dot.className = 'dot dot-kick';
      const txt = document.createElement('span');
      txt.textContent = I18N[currentLang].kickLive + (viewers ? ` · ${viewers}` : '');
      badge.appendChild(dot);
      badge.appendChild(txt);
      badge.classList.add('is-live');
    }
  } catch (e) {
    /* Kick blocks browser CORS — keep the static "Channel" badge */
  }
}

/* ============================================================
   COPY HANDLERS
   ============================================================ */
function initCopy() {
  const riotCopyBtn = $('#riotCopyBtn');
  const riotCard = $('#riotCardCopy');

  const copyRiot = () => {
    copyText(RIOT_ID);
    riotCopyBtn.classList.add('copied');
    setTimeout(() => riotCopyBtn.classList.remove('copied'), 1800);
  };

  riotCopyBtn.addEventListener('click', copyRiot);
  riotCard.addEventListener('click', copyRiot);
}

/* ============================================================
   BOOT
   ============================================================ */
function init() {
  applyLang(currentLang);
  initStars();
  initScrollFx();
  initCopy();
  $('#langToggle').addEventListener('click', () =>
    applyLang(currentLang === 'en' ? 'ar' : 'en')
  );

  pollPresence();
  setInterval(pollPresence, 30000);

  pollKick();
  setInterval(pollKick, 60000);
}

document.addEventListener('DOMContentLoaded', init);