/* ============================================================
   4 FUN — Discord OAuth2 login (implicit flow, client-side)
   ------------------------------------------------------------
   To enable login:
   1. Create an app at https://discord.com/developers/applications
   2. Under OAuth2 > General, add this page's URL as a redirect URI
   3. Copy the Client ID into SITE_CONFIG.discord.clientId (or the
      Admin panel > Settings)
   ============================================================ */

(function () {
  "use strict";

  const SESSION_KEY = "4fun_discord_session";
  const $ = (sel) => document.querySelector(sel);

  function currentConfig() {
    return window.getConfig ? getConfig() : window.SITE_CONFIG;
  }

  function redirectUri() {
    const cfg = currentConfig();
    if (cfg.discord.redirectUri) return cfg.discord.redirectUri;
    return window.location.origin + window.location.pathname;
  }

  function isConfigured() {
    const cfg = currentConfig();
    return !!(cfg.discord && cfg.discord.clientId && !/YOUR_DISCORD/i.test(cfg.discord.clientId));
  }

  function loginUrl() {
    const cfg = currentConfig();
    const params = new URLSearchParams({
      client_id: cfg.discord.clientId,
      redirect_uri: redirectUri(),
      response_type: "token",
      scope: cfg.discord.scopes || "identify"
    });
    return "https://discord.com/api/oauth2/authorize?" + params.toString();
  }

  function avatarUrl(user, size) {
    const s = size || 128;
    if (user.avatar) {
      const ext = user.avatar.startsWith("a_") ? "gif" : "png";
      return "https://cdn.discordapp.com/avatars/" + user.id + "/" + user.avatar + "." + ext + "?size=" + s;
    }
    const idx = Number(BigInt(BigInt(user.id) >> 22n) % 5n);
    return "https://cdn.discordapp.com/embed/avatars/" + idx + ".png?size=" + s;
  }

  async function fetchUser(token) {
    const res = await fetch("https://discord.com/api/v10/users/@me", {
      headers: { Authorization: "Bearer " + token }
    });
    if (!res.ok) throw new Error("failed to fetch user: " + res.status);
    return res.json();
  }

  function getSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const s = JSON.parse(raw);
      if (s && s.user) return s;
    } catch (e) {}
    return null;
  }

  function saveSession(token, user) {
    const session = { token, user, at: Date.now() };
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch (e) {}
    return session;
  }

  function clearSession() {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch (e) {}
  }

  function renderUserChip() {
    const chip = $("#userChip");
    const loginBtn = $("#loginBtn");
    if (!chip || !loginBtn) return;

    const session = getSession();
    if (!session) {
      chip.classList.add("hidden");
      loginBtn.classList.remove("hidden");
      return;
    }

    const u = session.user;
    loginBtn.classList.add("hidden");
    chip.classList.remove("hidden");
    chip.innerHTML =
      '<img class="chip-avatar" src="' +
      avatarUrl(u) +
      '" alt="avatar" referrerpolicy="no-referrer"/>' +
      '<span class="chip-name" title="' +
      escapeHtml(u.username || "") +
      '">' +
      escapeHtml(u.global_name || u.username || "") +
      "</span>" +
      '<button class="chip-logout" id="logoutBtn" aria-label="Log out">&times;</button>';

    $("#logoutBtn").addEventListener("click", (e) => {
      e.preventDefault();
      clearSession();
      renderUserChip();
      window.location.reload();
    });
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str == null ? "" : String(str);
    return div.innerHTML;
  }

  async function handleOAuthRedirect() {
    const hash = window.location.hash.substring(1);
    if (!hash) return;
    const params = new URLSearchParams(hash);
    const token = params.get("access_token");
    if (!token) return;

    try {
      const user = await fetchUser(token);
      saveSession(token, user);
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
      renderUserChip();
      if (window.showToast) window.showToast("Logged in as " + (user.global_name || user.username));
    } catch (e) {
      if (window.showToast) window.showToast("Login failed. Please try again.", true);
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }

  function bindLogin() {
    const loginBtn = $("#loginBtn");
    if (!loginBtn) return;

    loginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (!isConfigured()) {
        const msg =
          "Discord login is not configured yet. Set your Discord Client ID in js/config.js or the Admin panel (Settings).";
        if (window.showToast) window.showToast(msg, true);
        else alert(msg);
        return;
      }
      window.location.href = loginUrl();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindLogin();
    handleOAuthRedirect();
    renderUserChip();
  });
})();