/* ============================================================
   4 FUN — Site Configuration & Editable Content
   ------------------------------------------------------------
   You can edit the defaults here, OR use the Admin Panel
   (/admin.html) to change content without touching code.
   Admin changes are stored in your browser's localStorage.
   ============================================================ */

const SITE_CONFIG = {
  name: "4 FUN",
  shortName: "4FUN",
  tagline: "Where Fun Never Stops",
  established: "Est. Jul 2023",
  inviteLink: "https://discord.gg/7N44R9fU",
  inviteCode: "7N44R9fU",
  fallbackMemberCount: 142,
  fallbackOnlineCount: 38,
  discord: {
    clientId: "YOUR_DISCORD_CLIENT_ID",
    redirectUri: "",
    scopes: "identify"
  },
  adminPin: "4fun2023"
};

const DEFAULT_CONTENT = {
  hero: {
    badge: "Discord Community — Est. Jul 2023",
    titleA: "4",
    titleB: "FUN",
    subtitle:
      "A chill gaming community built for fun. Play games, join tournaments, make friends and enjoy good vibes with over 142 members."
  },

  about: {
    title: "About Our Community",
    subtitle: "Who we are and what we play",
    paragraphs: [
      "4 FUN is a gaming community founded in July 2023. We are a group of friends who love to play together, compete in tournaments and share unforgettable moments.",
      "Whether you are a casual player or a hardcore competitor, there is a place for you here. We keep the vibes positive, the laughter loud and the gameplay serious — but never too serious."
    ],
    games: ["Valorant", "Fortnite", "Minecraft", "GTA V", "Apex Legends", "Warzone", "Rocket League"],
    features: [
      { icon: "gamepad", title: "Multi-Game", desc: "Valorant, Fortnite, Minecraft, GTA, Warzone and more." },
      { icon: "trophy", title: "Tournaments", desc: "Regular events, ranked ladders and prize giveaways." },
      { icon: "headphones", title: "Voice Nights", desc: "Active voice channels, movie nights and hangouts." },
      { icon: "shield", title: "Safe & Friendly", desc: "Active staff and zero tolerance for toxicity." },
      { icon: "gift", title: "Giveaways", desc: "Nitro, game keys and merch giveaways for members." },
      { icon: "users", title: "Community", desc: "Supportive members who have your back, 24/7." }
    ]
  },

  rules: {
    title: "Server Rules",
    subtitle: "Keep it fun, keep it respectful",
    items: [
      { title: "Be Respectful", desc: "Treat everyone with respect. No harassment, hate speech or discrimination." },
      { title: "No Toxicity", desc: "No toxic behavior, rage-baiting or starting drama in chats or voice." },
      { title: "No Spam", desc: "No spam, mass pinging (@everyone) or flooding channels with messages." },
      { title: "No Cheating", desc: "Cheating, hacking or exploiting in games is an instant ban." },
      { title: "No NSFW", desc: "Keep all content SFW. NSFW media or links are not allowed anywhere." },
      { title: "Follow Staff", desc: "Follow the instructions of staff members. They are here to help." },
      { title: "No Scams", desc: "No self-promo, scams or phishing links. Report them to staff." },
      { title: "Have Fun", desc: "Most importantly — have fun and make friends. That is what we are here for!" }
    ]
  },

  staff: {
    title: "Staff & Team",
    subtitle: "The people running the show",
    members: [
      { name: "Founder", role: "Owner & Founder", color: "#e63946", tag: "Founder", avatar: "" },
      { name: "Co-Founder", role: "Co-Founder", color: "#ff6b6b", tag: "Co-Founder", avatar: "" },
      { name: "Head Admin", role: "Administrator", color: "#d00000", tag: "Admin", avatar: "" },
      { name: "Admin", role: "Administrator", color: "#a4133c", tag: "Admin", avatar: "" },
      { name: "Moderator", role: "Moderator", color: "#6a040f", tag: "Mod", avatar: "" },
      { name: "Moderator", role: "Moderator", color: "#370617", tag: "Mod", avatar: "" }
    ]
  },

  events: {
    title: "Events & Tournaments",
    subtitle: "Join the action — upcoming events",
    items: [
      { title: "Summer Valorant Cup", desc: "5v5 tournament with a prize pool. Brackets, casters and more!", prize: "Prize: $50 Nitro", date: "2026-09-01T18:00:00" },
      { title: "Fortnite Duo Showdown", desc: "Duo tournament, knockout bracket. Bring your best partner.", prize: "Prize: $30 Nitro", date: "2026-09-15T19:00:00" },
      { title: "Movie & Chill Night", desc: "Community movie night in VC with giveaways between films.", prize: "Fun & giveaways", date: "2026-08-25T20:00:00" },
      { title: "Minecraft Build Battle", desc: "Weekly build battle with community voting.", prize: "Winner gets a custom role", date: "2026-09-08T17:00:00" }
    ]
  },

  gallery: {
    title: "Media Gallery",
    subtitle: "Moments from our community",
    items: [
      { src: "", caption: "Tournament night finals", type: "image" },
      { src: "", caption: "Weekend VC hangout", type: "image" },
      { src: "", caption: "MVP of the match", type: "image" },
      { src: "", caption: "Apex ranked grind", type: "image" },
      { src: "", caption: "Community screenshot", type: "image" },
      { src: "", caption: "Winning moment", type: "image" },
      { src: "", caption: "Building contest entry", type: "image" },
      { src: "", caption: "GTA meetup", type: "image" }
    ]
  },

  perks: {
    title: "Server Perks & Store",
    subtitle: "Support the server, unlock exclusive perks",
    tiers: [
      { name: "Member", price: "Free", color: "#6e6e6e", featured: false, features: ["Access to all channels", "Join voice chats", "Play in tournaments", "React with custom emojis"] },
      { name: "Booster", price: "$2.99/mo", color: "#e63946", featured: true, features: ["Everything in Member", "Booster exclusive role", "Custom nickname color", "Priority queue in events", "Access to boosting lounge", "20% off store items"] },
      { name: "VIP", price: "Donation", color: "#ffd166", featured: false, features: ["Everything in Booster", "VIP role & special tag", "Private VC access", "Exclusive VIP giveaways", "Custom emoji privileges"] }
    ]
  },

  faq: {
    title: "FAQ",
    subtitle: "Frequently asked questions",
    items: [
      { q: "How do I join the server?", a: "Simply click the Join Server button anywhere on the site — it will open our Discord invite instantly." },
      { q: "Do I need to be good at games?", a: "Not at all! We welcome players of every skill level. It is all about having fun together." },
      { q: "How do tournaments work?", a: "Events are announced in the #events channel and on this site with a countdown. Sign up by reacting or via the signup form posted with each event." },
      { q: "How can I support the server?", a: "You can boost the server, or check the #store channel for supported perks and donations." },
      { q: "What games do you play?", a: "Valorant, Fortnite, Minecraft, GTA V, Apex Legends, Warzone, and plenty more. Members can suggest new games too!" },
      { q: "I found a problem or need help. Who do I contact?", a: "Open a ticket in the server or DM any of our staff members — the team is listed on this site." }
    ]
  },

  footer: {
    text: "4 FUN Community — Est. Jul 2023. Built with passion by the 4FUN team."
  }
};

/* ---------------- LocalStorage helpers ---------------- */

function getContent(key) {
  try {
    const stored = localStorage.getItem("4fun_" + key);
    if (stored) return JSON.parse(stored);
  } catch (e) {}
  return DEFAULT_CONTENT[key];
}

function saveContent(key, value) {
  localStorage.setItem("4fun_" + key, JSON.stringify(value));
}

function resetContent(key) {
  localStorage.removeItem("4fun_" + key);
}

function getConfig() {
  try {
    const stored = localStorage.getItem("4fun_config");
    if (stored) return Object.assign({}, SITE_CONFIG, JSON.parse(stored));
  } catch (e) {}
  return SITE_CONFIG;
}

function saveConfig(cfg) {
  localStorage.setItem("4fun_config", JSON.stringify(cfg));
}