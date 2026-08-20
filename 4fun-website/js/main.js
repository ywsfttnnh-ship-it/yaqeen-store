/* ============================================================
   4 FUN — Main site logic
   ============================================================ */
(function () {
  "use strict";

  const $ = (sel, el) => (el || document).querySelector(sel);
  const $$ = (sel, el) => Array.from((el || document).querySelectorAll(sel));

  const CONFIG = getConfig();

  /* ---------- Small helpers ---------- */

  function icon(name) {
    const paths = {
      gamepad:
        '<path d="M7 12h3M8.5 10.5v3M15 12h.01M18 12h.01M4 8h13a5 5 0 0 1 5 5v1a3 3 0 0 1-3 3c-1 0-2-.6-2.6-1.5L15 14H9l-1.4 1.5C7 16.4 6 17 5 17a3 3 0 0 1-3-3v-1a5 5 0 0 1 5-5z"/>',
      trophy:
        '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM7 5H4a1 1 0 0 0 0 4h3M17 5h3a1 1 0 0 1 0 4h-3"/>',
      headphones:
        '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M3 18a2 2 0 0 0 2 2h1v-6H5a2 2 0 0 0-2 2zm18 0a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2z"/>',
      shield:
        '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9.5 12l2 2 3.5-4"/>',
      gift:
        '<path d="M20 12v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8M3 7h18v5H3zM12 7v14M12 7c-2 0-4-1-4-3s2-2 3-1 1 3 1 4zm0 0c2 0 4-1 4-3s-2-2-3-1-1 3-1 4z"/>',
      users:
        '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.9M15 3.1a4 4 0 0 1 0 7.8"/>'
    };
    return (
      '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      (paths[name] || paths.gamepad) +
      "</svg>"
    );
  }

  function esc(str) {
    const div = document.createElement("div");
    div.textContent = str == null ? "" : String(str);
    return div.innerHTML;
  }

  function toDataUri(svg) {
    return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
  }

  function gradientPlaceholder(label) {
    const labelStr = String(label || "4");
    const c1 = labelStr.length % 2 ? "#2a0f0f" : "#1c1c1e";
    const c2 = labelStr.length % 3 ? "#550000" : "#0a0a0b";
    const ch = esc(labelStr.charAt(0).toUpperCase() || "4");
    const svg =
      "<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500'>" +
      "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
      "<stop offset='0' stop-color='" + c1 + "'/><stop offset='1' stop-color='" + c2 + "'/>" +
      "</linearGradient></defs>" +
      "<rect width='800' height='500' fill='url(#g)'/>" +
      "<circle cx='400' cy='250' r='110' fill='none' stroke='#e63946' stroke-width='2' opacity='0.55'/>" +
      "<text x='400' y='318' font-family='Arial' font-size='170' font-weight='900' fill='#e63946' text-anchor='middle' opacity='0.85'>" +
      ch +
      "</text></svg>";
    return toDataUri(svg);
  }

  function initialsAvatar(name, color) {
    const n = esc((name || "?").split(/\s+/).map((w) => w.charAt(0)).join("").slice(0, 2).toUpperCase() || "?");
    const svg =
      "<svg xmlns='http://www.w3.org/2000/svg' width='256' height='256'>" +
      "<rect width='256' height='256' fill='" + (color || "#333") + "'/>" +
      "<text x='128' y='156' font-family='Arial' font-size='96' font-weight='bold' fill='#ffffff' text-anchor='middle'>" +
      n +
      "</text></svg>";
    return toDataUri(svg);
  }

  function toast(msg, isError) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.toggle("error", !!isError);
    t.classList.add("show");
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove("show"), 2600);
  }

  /* ---------- Navbar + mobile menu ---------- */

  function initNav() {
    const navbar = $("#navbar");
    const hamburger = $("#hamburger");
    const navLinks = $("#navLinks");

    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 30);
    });

    hamburger.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      hamburger.classList.toggle("open", open);
      hamburger.setAttribute("aria-expanded", open);
    });

    navLinks.addEventListener("click", (e) => {
      if (e.target.classList.contains("nav-link")) {
        navLinks.classList.remove("open");
        hamburger.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Set all Join buttons ---------- */

  function bindJoinButtons() {
    $$(".btn-red, [id^=joinBtn], [id^=joinBtn2], [id^=joinBtn3], [id^=joinBtn4]")
      .filter((el) => el && (el.id === "joinBtn" || el.id === "joinBtn2" || el.id === "joinBtn3" || el.id === "joinBtn4"))
      .forEach((el) => (el.href = CONFIG.inviteLink));
  }

  /* ---------- Reveal on scroll ---------- */

  function initReveal() {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("visible");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    $$(".reveal").forEach((el) => io.observe(el));
  }

  /* ---------- Count-up numbers ---------- */

  function animateCount(el, target, duration) {
    if (!el) return;
    const start = performance.now();
    function frame(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString("en-US");
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function initStaticCounters() {
    $$("[data-count]").forEach((el) => {
      const target = parseInt(el.getAttribute("data-count"), 10) || 0;
      animateCount(el, target, 1400);
    });
  }

  /* ---------- Live Discord stats ---------- */

  function renderStats(memberCount, onlineCount) {
    animateCount($("#statMembers"), memberCount, 1400);
    animateCount($("#statOnline"), onlineCount, 1400);
    const metaOnline = $("#metaOnline");
    const metaMembers = $("#metaMembers");
    if (metaOnline) metaOnline.textContent = onlineCount.toLocaleString("en-US");
    if (metaMembers) metaMembers.textContent = memberCount.toLocaleString("en-US");
    const serverOnline = $("#serverOnline");
    if (serverOnline) serverOnline.textContent = onlineCount.toLocaleString("en-US");
    const serverMemberLine = $("#serverMemberLine");
    if (serverMemberLine) serverMemberLine.textContent = memberCount.toLocaleString("en-US") + " Members";
  }

  async function loadStats() {
    const fallbackM = CONFIG.fallbackMemberCount || 142;
    const fallbackO = CONFIG.fallbackOnlineCount || 38;
    renderStats(fallbackM, fallbackO);

    try {
      const res = await fetch(
        "https://discord.com/api/v10/invites/" + encodeURIComponent(CONFIG.inviteCode) + "?with_counts=true",
        { headers: { Accept: "application/json" } }
      );
      if (!res.ok) throw new Error("stats " + res.status);
      const data = await res.json();
      const members = data.approximate_member_count;
      const online = data.approximate_presence_count;

      if (data.guild && data.guild.icon) {
        const iconEl = $("#serverIcon");
        if (iconEl) {
          iconEl.src =
            "https://cdn.discordapp.com/icons/" + data.guild.id + "/" + data.guild.icon + ".png?size=256";
          iconEl.onerror = () => (iconEl.src = "assets/logo.svg");
        }
        const nameEl = $("#serverName");
        if (nameEl && data.guild.name) nameEl.textContent = data.guild.name;
      }

      if (members || online) {
        renderStats(members || fallbackM, online || fallbackO);
        const badge = $("#heroBadge");
        if (badge && data.guild && data.guild.name) {
          badge.innerHTML = "Discord Community — <b>" + esc(data.guild.name) + "</b>";
        }
      }
    } catch (e) {
      console.warn("4FUN: could not fetch live Discord stats, using fallback.", e);
    }
  }

  /* ---------- Content rendering ---------- */

  function renderHero() {
    const hero = getContent("hero");
    $("#heroBadge").textContent = hero.badge || "";
    $("#heroTitleA").textContent = hero.titleA || "4";
    $("#heroTitleB").textContent = hero.titleB || "FUN";
    $("#heroSubtitle").textContent = hero.subtitle || "";
    document.title = hero.titleA + hero.titleB + " — Gaming Discord Community";
  }

  function renderAbout() {
    const about = getContent("about");
    $("#aboutKicker").textContent = "Who we are";
    $("#aboutTitle").innerHTML = about.title || "";
    $("#aboutSubtitle").textContent = about.subtitle || "";

    const paras = about.paragraphs || [];
    for (let i = 0; i < 2; i++) {
      const el = $("#aboutP" + i);
      if (el) el.textContent = paras[i] || "";
    }

    const tags = $("#gameTags");
    tags.innerHTML = (about.games || [])
      .map((g) => '<span class="game-tag">' + esc(g) + "</span>")
      .join("");

    $("#aboutFeatures").innerHTML = (about.features || [])
      .map(
        (f) =>
          '<div class="feature-card">' +
          '<div class="feature-icon">' +
          icon(f.icon) +
          "</div>" +
          '<div class="feature-title">' +
          esc(f.title) +
          "</div>" +
          '<div class="feature-desc">' +
          esc(f.desc) +
          "</div></div>"
      )
      .join("");
  }

  function renderRules() {
    const rules = getContent("rules");
    $("#rulesTitle").innerHTML = rules.title || "";
    $("#rulesSubtitle").textContent = rules.subtitle || "";
    $("#rulesGrid").innerHTML = (rules.items || [])
      .map(
        (r, i) =>
          '<div class="rule-card reveal">' +
          '<span class="rule-num">' +
          String(i + 1).padStart(2, "0") +
          "</span>" +
          '<div class="rule-title">' +
          esc(r.title) +
          "</div>" +
          '<div class="rule-desc">' +
          esc(r.desc) +
          "</div></div>"
      )
      .join("");
  }

  function renderStaff() {
    const staff = getContent("staff");
    $("#staffTitle").innerHTML = staff.title || "";
    $("#staffSubtitle").textContent = staff.subtitle || "";
    $("#staffGrid").innerHTML = (staff.members || [])
      .map((m) => {
        const color = m.color || "#e63946";
        const avatar = m.avatar
          ? esc(m.avatar)
          : initialsAvatar(m.name, color);
        return (
          '<div class="staff-card reveal" style="--member-color:' +
          color +
          '">' +
          '<img class="staff-avatar" src="' +
          avatar +
          '" alt="' +
          esc(m.name) +
          '" loading="lazy" onerror="this.onerror=null;this.src=&#39;' +
          initialsAvatar(m.name, color) +
          '&#39;"/>' +
          '<div class="staff-name">' +
          esc(m.name) +
          "</div>" +
          '<div class="staff-role">' +
          esc(m.role) +
          "</div>" +
          '<span class="staff-tag">' +
          esc(m.tag || m.role) +
          "</span></div>"
        );
      })
      .join("");
  }

  function renderEvents() {
    const events = getContent("events");
    $("#eventsTitle").innerHTML = events.title || "";
    $("#eventsSubtitle").textContent = events.subtitle || "";
    $("#eventsGrid").innerHTML = (events.items || [])
      .map((ev, i) => {
        let dateVal = "";
        try {
          dateVal = ev.date ? new Date(ev.date).toISOString() : "";
        } catch (e) {}
        return (
          '<div class="event-card reveal" id="evCard-' + i + '" data-target="' + dateVal + '">' +
          '<h3 class="event-title">' +
          esc(ev.title) +
          "</h3>" +
          '<p class="event-desc">' +
          esc(ev.desc) +
          "</p>" +
          '<span class="event-prize">' +
          esc(ev.prize || "") +
          "</span>" +
          '<div class="countdown" id="evCount-' + i + '"></div>' +
          '<span class="event-ended">Event ended</span></div>'
        );
      })
      .join("");
  }

  function tickCountdowns() {
    const cards = $$(".event-card");
    cards.forEach((card) => {
      const target = card.getAttribute("data-target");
      if (!target) return;
      const diff = new Date(target).getTime() - Date.now();

      if (diff <= 0) {
        card.classList.add("ended");
        return;
      }
      card.classList.remove("ended");
      const s = Math.floor(diff / 1000);
      const d = Math.floor(s / 86400);
      const h = Math.floor((s % 86400) / 3600);
      const m = Math.floor((s % 3600) / 60);
      const sec = s % 60;
      const pad = (n) => String(n).padStart(2, "0");
      const box = (num, label) =>
        '<div class="countdown-box"><span class="countdown-num">' +
        num +
        '</span><span class="countdown-label">' +
        label +
        "</span></div>";
      card.querySelector(".countdown").innerHTML =
        box(pad(d), "Days") + box(pad(h), "Hrs") + box(pad(m), "Min") + box(pad(sec), "Sec");
    });
  }

  function renderGallery() {
    const gallery = getContent("gallery");
    $("#galleryTitle").innerHTML = gallery.title || "";
    $("#gallerySubtitle").textContent = gallery.subtitle || "";
    $("#galleryGrid").innerHTML = (gallery.items || [])
      .map((g, i) => {
        const src = g.src
          ? esc(g.src)
          : gradientPlaceholder(g.caption || "4");
        const media =
          g.type === "video"
            ? '<video src="' +
              src +
              '" muted preload="metadata"></video>'
            : '<img src="' +
              src +
              '" alt="' +
              esc(g.caption) +
              '" loading="lazy" onerror="this.onerror=null;this.src=&#39;' +
              gradientPlaceholder(g.caption || "4") +
              '&#39;"/>';
        return (
          '<div class="gallery-item reveal" data-index="' +
          i +
          '">' +
          media +
          '<div class="gallery-overlay"><span class="gallery-caption">' +
          esc(g.caption || "") +
          "</span></div></div>"
        );
      })
      .join("");

    initGallery();
  }

  function initGallery() {
    const lightbox = $("#lightbox");
    const img = $("#lightboxImg");
    const video = $("#lightboxVideo");
    const caption = $("#lightboxCaption");
    let current = -1;
    let items = [];

    function loadIndex(i) {
      const srcs = Array.from($$("#galleryGrid .gallery-item")).map((el) => {
        const inner = el.querySelector("img") || el.querySelector("video");
        return {
          src: inner ? inner.currentSrc || inner.src : "",
          isVideo: !!el.querySelector("video"),
          caption: (el.querySelector(".gallery-caption") || { textContent: "" }).textContent
        };
      });
      if (srcs.length !== items.length) items = srcs;
      const item = items[i];
      if (!item) return;
      current = i;
      img.hidden = item.isVideo;
      video.hidden = !item.isVideo;
      if (item.isVideo) {
        video.src = item.src;
        video.play().catch(() => {});
      } else {
        img.src = item.src;
      }
      caption.textContent = item.caption || "";
    }

    function open(i) {
      items = Array.from($$("#galleryGrid .gallery-item")).map((el) => {
        const inner = el.querySelector("img") || el.querySelector("video");
        return {
          src: inner ? inner.currentSrc || inner.src : "",
          isVideo: !!el.querySelector("video"),
          caption: (el.querySelector(".gallery-caption") || { textContent: "" }).textContent
        };
      });
      loadIndex(i);
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function close() {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      video.pause();
      video.removeAttribute("src");
      video.load();
      img.removeAttribute("src");
    }

    function step(dir) {
      if (current < 0 || !items.length) return;
      loadIndex((current + dir + items.length) % items.length);
    }

    $$("#galleryGrid .gallery-item").forEach((el) => {
      el.addEventListener("click", () => open(parseInt(el.getAttribute("data-index"), 10)));
    });

    $("#lightboxClose").addEventListener("click", close);
    $("#lightboxPrev").addEventListener("click", () => step(-1));
    $("#lightboxNext").addEventListener("click", () => step(1));
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
  }

  function renderPerks() {
    const perks = getContent("perks");
    $("#perksTitle").innerHTML = perks.title || "";
    $("#perksSubtitle").textContent = perks.subtitle || "";
    $("#perksGrid").innerHTML = (perks.tiers || [])
      .map((t) => {
        const color = t.color || "#e63946";
        return (
          '<div class="perk-card reveal' +
          (t.featured ? " featured" : "") +
          '" style="--perk-color:' +
          color +
          '">' +
          (t.featured ? '<span class="perk-badge">Most Popular</span>' : "") +
          '<div class="perk-name">' +
          esc(t.name) +
          "</div>" +
          '<div class="perk-price">' +
          esc(t.price) +
          "</div>" +
          '<ul class="perk-features">' +
          (t.features || []).map((f) => "<li>" + esc(f) + "</li>").join("") +
          "</ul>" +
          '<a class="btn ' +
          (t.featured ? "btn-red" : "btn-ghost") +
          ' perk-btn" href="' +
          CONFIG.inviteLink +
          '" target="_blank" rel="noopener">' +
          (t.featured ? "Get Started" : "Learn More") +
          "</a></div>"
        );
      })
      .join("");
  }

  function renderFaq() {
    const faq = getContent("faq");
    $("#faqTitle").innerHTML = faq.title || "";
    $("#faqSubtitle").textContent = faq.subtitle || "";
    $("#faqList").innerHTML = (faq.items || [])
      .map(
        (f, i) =>
          '<div class="faq-item reveal">' +
          '<button class="faq-q" type="button" aria-expanded="false">' +
          esc(f.q) +
          '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>' +
          "</button>" +
          '<div class="faq-a"><div class="faq-a-inner">' +
          esc(f.a) +
          "</div></div></div>"
      )
      .join("");

    $$(".faq-item").forEach((item) => {
      const btn = item.querySelector(".faq-q");
      const body = item.querySelector(".faq-a");
      btn.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        $$(".faq-item.open").forEach((other) => {
          other.classList.remove("open");
          other.querySelector(".faq-a").style.maxHeight = "0";
          other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          item.classList.add("open");
          body.style.maxHeight = body.scrollHeight + "px";
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  function renderFooter() {
    const footer = getContent("footer");
    $("#footerText").textContent = footer.text || "";
  }

  function renderAll() {
    renderHero();
    renderAbout();
    renderRules();
    renderStaff();
    renderEvents();
    renderGallery();
    renderPerks();
    renderFaq();
    renderFooter();
  }

  /* ---------- Init ---------- */

  document.addEventListener("DOMContentLoaded", () => {
    initNav();
    bindJoinButtons();
    renderAll();
    initReveal();
    initStaticCounters();
    loadStats();
    tickCountdowns();
    setInterval(tickCountdowns, 1000);
    window.addEventListener("resize", () => {
      $$(".faq-item.open").forEach((item) => {
        item.querySelector(".faq-a").style.maxHeight = item.querySelector(".faq-a").scrollHeight + "px";
      });
    });
  });
})();