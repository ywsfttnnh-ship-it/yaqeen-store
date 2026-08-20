/* ============================================================
   4 FUN — Admin Panel logic
   ------------------------------------------------------------
   Edits are stored in localStorage and override config.js
   defaults. Reset buttons remove the override.
   NOTE: PIN auth is client-side only — for production, move
   auth + persistence to a real backend.
   ============================================================ */

(function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  const AUTH_KEY = "4fun_admin_auth";
  const TITLES = {
    hero: ["Hero", "Landing page hero text and buttons"],
    about: ["About", "Community intro, games and feature cards"],
    rules: ["Rules", "Server rules displayed on the landing page"],
    staff: ["Staff & Team", "Founders, admins and moderators"],
    events: ["Events & Tournaments", "Upcoming events with countdowns"],
    gallery: ["Media Gallery", "Images and videos from the community"],
    perks: ["Server Perks & Store", "Booster/VIP tiers"],
    faq: ["FAQ", "Frequently asked questions"],
    settings: ["Settings", "Discord integration and site configuration"]
  };

  const ICON_NAMES = ["gamepad", "trophy", "headphones", "shield", "gift", "users"];

  function toast(msg, isError) {
    const t = $("#toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.toggle("error", !!isError);
    t.classList.add("show");
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove("show"), 2600);
  }

  function esc(str) {
    const div = document.createElement("div");
    div.textContent = str == null ? "" : String(str);
    return div.innerHTML;
  }

  /* ---------------- Auth ---------------- */

  function isAuthed() {
    try {
      return sessionStorage.getItem(AUTH_KEY) === "1";
    } catch (e) {
      return false;
    }
  }

  function showDashboard() {
    $("#adminLogin").classList.add("hidden");
    $("#adminDash").classList.remove("hidden");
  }

  function showLogin() {
    $("#adminDash").classList.add("hidden");
    $("#adminLogin").classList.remove("hidden");
  }

  function initAuth() {
    const form = $("#pinForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const cfg = getConfig();
      if ($("#pinInput").value === cfg.adminPin) {
        sessionStorage.setItem(AUTH_KEY, "1");
        showDashboard();
        switchTab("hero");
        toast("Welcome back!");
      } else {
        toast("Wrong PIN.", true);
      }
    });

    $("#logoutAdmin").addEventListener("click", () => {
      sessionStorage.removeItem(AUTH_KEY);
      showLogin();
      $("#pinInput").value = "";
    });

    if (isAuthed()) {
      showDashboard();
      switchTab("hero");
    }
  }

  /* ---------------- Generic list editor ---------------- */

  function listFieldsHtml(fields, item, index) {
    const inner = fields
      .map((f) => {
        const val = item[f.key] != null ? item[f.key] : "";
        const label = f.label || f.key;
        let input = "";
        if (f.type === "textarea") {
          input =
            '<textarea class="admin-input" data-field="' + f.key + '" placeholder="' + esc(label) + '">' +
            esc(val) +
            "</textarea>";
        } else if (f.type === "color") {
          input = '<input type="color" class="admin-input" data-field="' + f.key + '" value="' + esc(val) + '" />';
        } else if (f.type === "datetime-local") {
          const d = val ? new Date(val) : "";
          const dt = d ? new Date(d.getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16) : "";
          input = '<input type="datetime-local" class="admin-input" data-field="' + f.key + '" value="' + dt + '" />';
        } else if (f.type === "select") {
          input =
            '<select class="admin-input" data-field="' + f.key + '">' +
            (f.options || [])
              .map((o) => '<option value="' + o + '"' + (String(val) === o ? " selected" : "") + ">" + o + "</option>")
              .join("") +
            "</select>";
        } else {
          input = '<input type="text" class="admin-input" data-field="' + f.key + '" placeholder="' + esc(label) + '" value="' + esc(val) + '" />';
        }
        const cls = f.type === "textarea" ? " full" : "";
        return '<div class="form-field' + cls + '">' + input + "</div>";
      })
      .join("");

    return (
      '<div class="list-row" data-index="' + index + '">' +
      '<div class="fields">' + inner + "</div>" +
      '<div class="row-actions">' +
      '<button class="icon-btn" type="button" data-act="up" title="Move up">&uarr;</button>' +
      '<button class="icon-btn" type="button" data-act="down" title="Move down">&darr;</button>' +
      '<button class="icon-btn" type="button" data-act="del" title="Delete">&times;</button>' +
      "</div></div>"
    );
  }

  function listEditorHtml(fields, items) {
    return (
      '<div class="list-editor">' +
      items.map((it, i) => listFieldsHtml(fields, it, i)).join("") +
      '<button class="add-btn" type="button" data-act="add">+ Add item</button>' +
      "</div>"
    );
  }

  function readListRows(container, fields) {
    const rows = Array.from(container.querySelectorAll(".list-row"));
    return rows.map((row) => {
      const obj = {};
      fields.forEach((f) => {
        const el = row.querySelector('[data-field="' + f.key + '"]');
        if (!el) return;
        obj[f.key] = el.value;
        if (f.type === "color") obj[f.key] = el.value;
      });
      return obj;
    });
  }

  function bindList(container, fields, onSave) {
    container.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-act]");
      if (!btn) return;
      const row = e.target.closest(".list-row");
      const act = btn.getAttribute("data-act");

      if (act === "add") {
        const items = readListRows(container, fields);
        items.push({});
        renderList(items);
        return;
      }
      if (!row) return;

      if (act === "del") {
        row.remove();
        return;
      }
      const rows = Array.from(container.querySelectorAll(".list-row"));
      const idx = rows.indexOf(row);
      if (act === "up" && idx > 0) {
        rows[idx - 1].after(row);
      }
      if (act === "down" && idx < rows.length - 1) {
        rows[idx + 1].before(row);
      }
    });

    function renderList(items) {
      container.innerHTML = listEditorHtml(fields, items);
      bindList(container, fields, onSave);
      onSave();
    }

    container.addEventListener("change", onSave);
    container.addEventListener("input", onSave);
  }

  /* ---------------- Section renderers ---------------- */

  function cardHeader(title, subtitle) {
    return '<div class="admin-card"><h3>' + esc(title) + "</h3>" + (subtitle ? '<p style="color:var(--text-dim);font-size:13.5px;margin-bottom:14px;">' + esc(subtitle) + "</p>" : "");
  }
  function cardFooter() {
    return "</div>";
  }

  function renderHero() {
    const h = getContent("hero");
    const html =
      cardHeader("Hero Section", "Main headline shown on the landing page") +
      '<div class="form-grid">' +
      '<div class="form-field full"><label>Badge</label><input class="admin-input" data-k="badge" value="' + esc(h.badge) + '" /></div>' +
      '<div class="form-field"><label>Title (part 1)</label><input class="admin-input" data-k="titleA" value="' + esc(h.titleA) + '" /></div>' +
      '<div class="form-field"><label>Title (accent)</label><input class="admin-input" data-k="titleB" value="' + esc(h.titleB) + '" /></div>' +
      '<div class="form-field full"><label>Subtitle</label><textarea class="admin-input" data-k="subtitle">' + esc(h.subtitle) + "</textarea></div>" +
      "</div>" +
      cardFooter();
    setContent(html);
  }

  function renderAbout() {
    const a = getContent("about");
    const featureFields = [
      { key: "icon", type: "select", options: ICON_NAMES, label: "Icon" },
      { key: "title", label: "Title" },
      { key: "desc", label: "Description", type: "textarea" }
    ];
    const html =
      cardHeader("About Section") +
      '<div class="form-grid">' +
      '<div class="form-field full"><label>Title</label><input class="admin-input" data-k="title" value="' + esc(a.title) + '" /></div>' +
      '<div class="form-field full"><label>Subtitle</label><input class="admin-input" data-k="subtitle" value="' + esc(a.subtitle) + '" /></div>' +
      '<div class="form-field full"><label>Paragraph 1</label><textarea class="admin-input" data-k="p0">' + esc((a.paragraphs || [])[0] || "") + "</textarea></div>" +
      '<div class="form-field full"><label>Paragraph 2</label><textarea class="admin-input" data-k="p1">' + esc((a.paragraphs || [])[1] || "") + "</textarea></div>" +
      '<div class="form-field full"><label>Games (comma separated)</label><input class="admin-input" data-k="games" value="' + esc((a.games || []).join(", ")) + '" /></div>' +
      "</div>" +
      cardFooter() +
      cardHeader("Feature Cards", "The grid below the about text") +
      listEditorHtml(featureFields, a.features || []) +
      cardFooter();
    setContent(html);
    bindSave("about", () => {
      const obj = readForm();
      const games = String(obj.games || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const parsed = {
        title: obj.title,
        subtitle: obj.subtitle,
        paragraphs: [obj.p0, obj.p1],
        games: games,
        features: readListRows($(".list-editor"), featureFields)
      };
      saveContent("about", parsed);
    });
    if ($(".list-editor")) bindList($(".list-editor"), featureFields, () => {});
  }

  function renderRules() {
    const r = getContent("rules");
    const fields = [
      { key: "title", label: "Rule title" },
      { key: "desc", label: "Description", type: "textarea" }
    ];
    const html =
      cardHeader("Rules Section") +
      '<div class="form-grid">' +
      '<div class="form-field full"><label>Title</label><input class="admin-input" data-k="title" value="' + esc(r.title) + '" /></div>' +
      '<div class="form-field full"><label>Subtitle</label><input class="admin-input" data-k="subtitle" value="' + esc(r.subtitle) + '" /></div>' +
      "</div>" +
      cardFooter() +
      cardHeader("Rules List") +
      listEditorHtml(fields, r.items || []) +
      cardFooter();
    setContent(html);
    bindSave("rules", () => {
      const obj = readForm();
      obj.items = readListRows($(".list-editor"), fields);
      saveContent("rules", obj);
    });
    if ($(".list-editor")) bindList($(".list-editor"), fields, () => {});
  }

  function renderStaff() {
    const s = getContent("staff");
    const fields = [
      { key: "name", label: "Name" },
      { key: "role", label: "Role" },
      { key: "tag", label: "Tag / Badge" },
      { key: "color", type: "color", label: "Color" },
      { key: "avatar", label: "Avatar URL (optional)" }
    ];
    const html =
      cardHeader("Staff Section") +
      '<div class="form-grid">' +
      '<div class="form-field full"><label>Title</label><input class="admin-input" data-k="title" value="' + esc(s.title) + '" /></div>' +
      '<div class="form-field full"><label>Subtitle</label><input class="admin-input" data-k="subtitle" value="' + esc(s.subtitle) + '" /></div>' +
      "</div>" +
      cardFooter() +
      cardHeader("Staff Members", "Avatar URL: use your Discord CDN avatar link, or leave empty for initials.") +
      listEditorHtml(fields, s.members || []) +
      cardFooter();
    setContent(html);
    bindSave("staff", () => {
      const obj = readForm();
      obj.members = readListRows($(".list-editor"), fields);
      saveContent("staff", obj);
    });
    if ($(".list-editor")) bindList($(".list-editor"), fields, () => {});
  }

  function renderEvents() {
    const ev = getContent("events");
    const fields = [
      { key: "title", label: "Event title" },
      { key: "prize", label: "Prize / reward" },
      { key: "date", type: "datetime-local", label: "Date & time" },
      { key: "desc", label: "Description", type: "textarea" }
    ];
    const html =
      cardHeader("Events Section") +
      '<div class="form-grid">' +
      '<div class="form-field full"><label>Title</label><input class="admin-input" data-k="title" value="' + esc(ev.title) + '" /></div>' +
      '<div class="form-field full"><label>Subtitle</label><input class="admin-input" data-k="subtitle" value="' + esc(ev.subtitle) + '" /></div>' +
      "</div>" +
      cardFooter() +
      cardHeader("Upcoming Events", "Set a future date for the countdown. Past events show as ended.") +
      listEditorHtml(fields, ev.items || []) +
      cardFooter();
    setContent(html);
    bindSave("events", () => {
      const obj = readForm();
      obj.items = readListRows($(".list-editor"), fields).map((it) => {
        if (it.date) {
          const d = new Date(it.date);
          if (!isNaN(d.getTime())) it.date = d.toISOString();
        }
        return it;
      });
      saveContent("events", obj);
    });
    if ($(".list-editor")) bindList($(".list-editor"), fields, () => {});
  }

  function renderGallery() {
    const g = getContent("gallery");
    const fields = [
      { key: "caption", label: "Caption" },
      { key: "src", label: "Image / video URL" },
      { key: "type", type: "select", options: ["image", "video"], label: "Type" }
    ];
    const html =
      cardHeader("Gallery Section") +
      '<div class="form-grid">' +
      '<div class="form-field full"><label>Title</label><input class="admin-input" data-k="title" value="' + esc(g.title) + '" /></div>' +
      '<div class="form-field full"><label>Subtitle</label><input class="admin-input" data-k="subtitle" value="' + esc(g.subtitle) + '" /></div>' +
      "</div>" +
      cardFooter() +
      cardHeader("Media Items", "Paste direct image (jpg/png/webp) or mp4 URLs. Leave URL empty for a styled placeholder.") +
      listEditorHtml(fields, g.items || []) +
      cardFooter();
    setContent(html);
    bindSave("gallery", () => {
      const obj = readForm();
      obj.items = readListRows($(".list-editor"), fields);
      saveContent("gallery", obj);
    });
    if ($(".list-editor")) bindList($(".list-editor"), fields, () => {});
  }

  function renderPerks() {
    const p = getContent("perks");
    const rows = (p.tiers || [])
      .map((t, i) => {
        return (
          '<div class="list-row" data-index="' + i + '">' +
          '<div class="fields">' +
          '<div class="form-field"><input class="admin-input" data-field="name" placeholder="Tier name" value="' + esc(t.name) + '" /></div>' +
          '<div class="form-field"><input class="admin-input" data-field="price" placeholder="Price / label" value="' + esc(t.price) + '" /></div>' +
          '<div class="form-field"><input type="color" class="admin-input" data-field="color" value="' + esc(t.color || "#e63946") + '" /></div>' +
          '<div class="form-field checkbox-line"><input type="checkbox" data-field="featured"' + (t.featured ? " checked" : "") + ' /><span>Featured</span></div>' +
          '<div class="form-field full"><textarea class="admin-input" data-field="features" placeholder="Features (one per line)">' + esc((t.features || []).join("\n")) + "</textarea></div>" +
          "</div>" +
          '<div class="row-actions">' +
          '<button class="icon-btn" type="button" data-act="up">&uarr;</button>' +
          '<button class="icon-btn" type="button" data-act="down">&darr;</button>' +
          '<button class="icon-btn" type="button" data-act="del">&times;</button>' +
          "</div></div>"
        );
      })
      .join("");

    const html =
      cardHeader("Perks Section") +
      '<div class="form-grid">' +
      '<div class="form-field full"><label>Title</label><input class="admin-input" data-k="title" value="' + esc(p.title) + '" /></div>' +
      '<div class="form-field full"><label>Subtitle</label><input class="admin-input" data-k="subtitle" value="' + esc(p.subtitle) + '" /></div>' +
      "</div>" +
      cardFooter() +
      cardHeader("Tiers", "The middle tier becomes the featured card when checked.") +
      '<div class="list-editor">' + rows + '<button class="add-btn" type="button" data-act="add">+ Add tier</button></div>' +
      cardFooter();
    setContent(html);

    const editor = $(".list-editor");
    editor.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-act]");
      if (!btn) return;
      const act = btn.getAttribute("data-act");
      const row = e.target.closest(".list-row");
      if (act === "add") {
        renderPerks();
        toast("New tier added. Fill in the fields and save.");
        return;
      }
      if (!row) return;
      if (act === "del") row.remove();
      const rowsArr = Array.from(editor.querySelectorAll(".list-row"));
      const idx = rowsArr.indexOf(row);
      if (act === "up" && idx > 0) rowsArr[idx - 1].after(row);
      if (act === "down" && idx < rowsArr.length - 1) rowsArr[idx + 1].before(row);
    });

    bindSave("perks", () => {
      const obj = readForm();
      obj.tiers = Array.from(editor.querySelectorAll(".list-row")).map((row) => ({
        name: row.querySelector('[data-field="name"]').value,
        price: row.querySelector('[data-field="price"]').value,
        color: row.querySelector('[data-field="color"]').value,
        featured: row.querySelector('[data-field="featured"]').checked,
        features: row
          .querySelector('[data-field="features"]')
          .value.split("\n")
          .map((s) => s.trim())
          .filter(Boolean)
      }));
      saveContent("perks", obj);
    });
  }

  function renderFaq() {
    const f = getContent("faq");
    const fields = [
      { key: "q", label: "Question" },
      { key: "a", label: "Answer", type: "textarea" }
    ];
    const html =
      cardHeader("FAQ Section") +
      '<div class="form-grid">' +
      '<div class="form-field full"><label>Title</label><input class="admin-input" data-k="title" value="' + esc(f.title) + '" /></div>' +
      '<div class="form-field full"><label>Subtitle</label><input class="admin-input" data-k="subtitle" value="' + esc(f.subtitle) + '" /></div>' +
      "</div>" +
      cardFooter() +
      cardHeader("Questions") +
      listEditorHtml(fields, f.items || []) +
      cardFooter();
    setContent(html);
    bindSave("faq", () => {
      const obj = readForm();
      obj.items = readListRows($(".list-editor"), fields);
      saveContent("faq", obj);
    });
    if ($(".list-editor")) bindList($(".list-editor"), fields, () => {});
  }

  function renderSettings() {
    const cfg = getConfig();
    const html =
      '<div class="admin-hint">' +
      "<b>Discord OAuth2 login:</b> create an app at discord.com/developers/applications &gt; OAuth2, add this site URL as a redirect URI, then paste the Client ID below. The login button becomes active once a real Client ID is set.<br/>" +
      "<b>Live stats:</b> shown automatically from the public Discord invite API using your invite code. No bot token needed." +
      "</div>" +
      cardHeader("Discord Integration") +
      '<div class="settings-grid">' +
      '<div class="form-field"><label>Discord Client ID</label><input class="admin-input" data-k="clientId" value="' + esc(cfg.discord.clientId) + '" /></div>' +
      '<div class="form-field"><label>Invite Code</label><input class="admin-input" data-k="inviteCode" value="' + esc(cfg.inviteCode) + '" /></div>' +
      '<div class="form-field full"><label>Invite Link</label><input class="admin-input" data-k="inviteLink" value="' + esc(cfg.inviteLink) + '" /></div>' +
      "</div>" +
      cardFooter() +
      cardHeader("Fallback Stats", "Shown if the Discord API is unreachable.") +
      '<div class="settings-grid">' +
      '<div class="form-field"><label>Fallback member count</label><input type="number" class="admin-input" data-k="fallbackMemberCount" value="' + esc(cfg.fallbackMemberCount) + '" /></div>' +
      '<div class="form-field"><label>Fallback online count</label><input type="number" class="admin-input" data-k="fallbackOnlineCount" value="' + esc(cfg.fallbackOnlineCount) + '" /></div>' +
      "</div>" +
      cardFooter() +
      cardHeader("Security") +
      '<div class="form-grid">' +
      '<div class="form-field"><label>Admin PIN</label><input class="admin-input" data-k="adminPin" value="' + esc(cfg.adminPin) + '" /></div>' +
      "</div>" +
      cardFooter();

    setContent(html);

    const saveBtn = document.createElement("button");
    saveBtn.className = "btn btn-red";
    saveBtn.textContent = "Save Settings";
    saveBtn.addEventListener("click", () => {
      const form = readForm();
      const cfg2 = getConfig();
      cfg2.discord.clientId = form.clientId;
      cfg2.inviteCode = form.inviteCode;
      cfg2.inviteLink = form.inviteLink;
      cfg2.fallbackMemberCount = parseInt(form.fallbackMemberCount, 10) || 142;
      cfg2.fallbackOnlineCount = parseInt(form.fallbackOnlineCount, 10) || 38;
      cfg2.adminPin = form.adminPin || "4fun2023";
      saveConfig(cfg2);
      toast("Settings saved.");
    });
    $("#adminContent").appendChild(saveBtn);
  }

  /* ---------------- Shared helpers ---------------- */

  function setContent(html) {
    $("#adminContent").innerHTML = html;
  }

  function readForm() {
    const obj = {};
    $$("#adminContent [data-k]").forEach((el) => {
      obj[el.getAttribute("data-k")] = el.value;
    });
    return obj;
  }

  function bindSave(key, onSave) {
    const actions = document.createElement("div");
    actions.className = "admin-actions";
    const saveBtn = document.createElement("button");
    saveBtn.className = "btn btn-red";
    saveBtn.textContent = "Save " + TITLES[key][0];
    saveBtn.addEventListener("click", () => {
      onSave();
      toast(TITLES[key][0] + " saved. View the site to see changes.");
    });
    const resetBtn = document.createElement("button");
    resetBtn.className = "btn-ghost-outline";
    resetBtn.textContent = "Reset to defaults";
    resetBtn.addEventListener("click", () => {
      if (confirm("Reset this section to the original defaults?")) {
        resetContent(key);
        toast("Section reset to defaults.");
        switchTab(key);
      }
    });
    actions.appendChild(saveBtn);
    actions.appendChild(resetBtn);
    $("#adminContent").appendChild(actions);
  }

  /* ---------------- Tabs ---------------- */

  function switchTab(tab) {
    $$(".admin-tab").forEach((t) => t.classList.toggle("active", t.getAttribute("data-tab") === tab));
    const title = TITLES[tab] || ["", ""];
    $("#panelTitle").textContent = title[0];
    $("#panelSub").textContent = title[1] || "";
    const renderers = {
      hero: renderHero,
      about: renderAbout,
      rules: renderRules,
      staff: renderStaff,
      events: renderEvents,
      gallery: renderGallery,
      perks: renderPerks,
      faq: renderFaq,
      settings: renderSettings
    };
    (renderers[tab] || renderHero)();
    window.scrollTo(0, 0);
  }

  function initTabs() {
    $("#adminTabs").addEventListener("click", (e) => {
      const btn = e.target.closest(".admin-tab");
      if (!btn) return;
      switchTab(btn.getAttribute("data-tab"));
    });
  }

  /* ---------------- Boot ---------------- */

  document.addEventListener("DOMContentLoaded", () => {
    initAuth();
    initTabs();
  });
})();