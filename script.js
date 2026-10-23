const projectList = document.querySelector("#project-list");
const profile = window.PORTFOLIO_PROFILE || {};
const displayName = typeof profile.displayName === "string" && profile.displayName.trim() ? profile.displayName.trim() : "Om";
const projects = Array.isArray(window.PORTFOLIO_PROJECTS) ? window.PORTFOLIO_PROJECTS : [];

document.querySelectorAll("[data-profile-name]").forEach((element) => {
  element.textContent = displayName;
});
document.title = `${displayName} — Developer & Builder`;
const portrait = document.querySelector(".hero-portrait img");
if (portrait) portrait.alt = `${displayName}, smiling in a garden`;
const homeLink = document.querySelector(".site-header .brand");
if (homeLink) homeLink.setAttribute("aria-label", `${displayName} home`);

document.querySelectorAll("#hero-project-count, #work-project-count").forEach((element) => {
  element.textContent = String(projects.length).padStart(2, "0");
});

function safeUrl(value) {
  if (typeof value !== "string" || !value.trim()) return "";
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

function youtubeId(value) {
  const url = safeUrl(value);
  if (!url) return "";
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") {
      const id = parsed.pathname.slice(1).split("/")[0];
      return /^[\w-]{6,20}$/.test(id) ? id : "";
    }
    if (["youtube.com", "www.youtube.com", "m.youtube.com"].includes(parsed.hostname)) {
      const parts = parsed.pathname.split("/").filter(Boolean);
      const id = parsed.pathname === "/watch" ? parsed.searchParams.get("v") : ["embed", "shorts"].includes(parts[0]) ? parts[1] : "";
      return /^[\w-]{6,20}$/.test(id || "") ? id : "";
    }
  } catch { /* invalid URL */ }
  return "";
}

function makeIdentityVisual(project) {
  const identity = document.createElement("div");
  identity.className = "project-identity";
  identity.setAttribute("role", "img");
  identity.setAttribute("aria-label", project.imageAlt || `${project.title} project identity`);
  const marker = document.createElement("span");
  marker.className = "identity-kicker";
  marker.textContent = project.category || "PROJECT";
  const name = document.createElement("strong");
  name.textContent = project.title || "Project";
  const mark = document.createElement("i");
  mark.setAttribute("aria-hidden", "true");
  mark.textContent = project.visual === "fitcraft" ? "✦" : "R";
  identity.append(marker, name, mark);
  return identity;
}

function makePreview(project) {
  const liveUrl = safeUrl(project.liveUrl);
  const githubUrl = safeUrl(project.githubUrl);
  const destination = liveUrl || githubUrl;
  const preview = document.createElement(destination ? "a" : "div");
  preview.className = `project-preview preview-${project.visual || "plain"}`;
  preview.dataset.imageKind = project.imageKind || "identity";
  if (destination) {
    preview.href = destination;
    preview.target = "_blank";
    preview.rel = "noopener noreferrer";
  }
  preview.setAttribute("aria-label", destination
    ? `${liveUrl ? "Visit" : "View source for"} ${project.title}${liveUrl ? " website" : ""} (opens in a new tab)`
    : `${project.title} project visual`);

  const localAsset = (value) => {
    const asset = typeof value === "string" ? value.trim() : "";
    return asset && asset.length < 300 && !/^(\/|[a-z]+:|\\)/i.test(asset) && !asset.split(/[\\/]/).includes("..") ? asset : "";
  };
  const imageValue = localAsset(project.image);
  const fallbackImage = safeUrl(project.image) || imageValue;
  if (fallbackImage) {
    const image = document.createElement("img");
    image.className = "project-preview-image";
    image.src = fallbackImage;
    image.alt = project.imageAlt || `${project.title} project asset`;
    image.loading = "lazy";
    image.decoding = "async";
    image.addEventListener("error", () => {
      image.replaceWith(makeIdentityVisual(project));
    }, { once: true });
    preview.append(image);
  } else {
    preview.append(makeIdentityVisual(project));
  }

  const note = document.createElement("span");
  note.className = "project-visual-note";
  note.textContent = project.imageNote || (project.image ? "PROJECT ASSET" : "SCREENSHOT NOT PUBLISHED");
  preview.append(note);

  if (destination && project.showPreviewHint !== false) {
    const hint = document.createElement("span");
    hint.className = "preview-hint";
    const text = document.createElement("span");
    text.textContent = liveUrl ? "VISIT WEBSITE" : "VIEW SOURCE";
    const arrow = document.createElement("b");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";
    hint.append(text, arrow);
    preview.append(hint);
  }
  return preview;
}

function makeVideoPreview(project) {
  const video = youtubeId(project.youtubeUrl);
  if (!video) return null;
  const link = document.createElement("a");
  link.className = "project-video-preview";
  link.href = `https://www.youtube.com/watch?v=${encodeURIComponent(video)}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", `Watch ${project.title} demo on YouTube (opens in a new tab)`);
  const image = document.createElement("img");
  image.alt = `${project.title} demo video thumbnail`;
  image.loading = "lazy";
  image.decoding = "async";
  const localAsset = typeof project.videoThumbnail === "string" && !/^(\/|[a-z]+:|\\)/i.test(project.videoThumbnail) && !project.videoThumbnail.split(/[\\/]/).includes("..") ? project.videoThumbnail : "";
  const sources = [`https://i.ytimg.com/vi/${video}/maxresdefault.jpg`, `https://i.ytimg.com/vi/${video}/hqdefault.jpg`, `https://i.ytimg.com/vi/${video}/sddefault.jpg`, localAsset].filter(Boolean);
  let sourceIndex = 0;
  image.src = sources[sourceIndex];
  image.addEventListener("error", () => {
    sourceIndex += 1;
    if (sources[sourceIndex]) image.src = sources[sourceIndex];
    else image.remove();
  });
  const play = document.createElement("span");
  play.className = "video-play";
  play.setAttribute("aria-hidden", "true");
  play.textContent = "▶";
  const hint = document.createElement("span");
  hint.className = "video-preview-hint";
  hint.textContent = "Watch Demo on YouTube ↗";
  link.append(image, play, hint);
  return link;
}

function makeAction(url, label, extraClass = "") {
  const link = document.createElement("a");
  link.className = `project-action${extraClass ? ` ${extraClass}` : ""}`;
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.append(document.createTextNode(label));
  const arrow = document.createElement("span");
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "↗";
  link.append(arrow);
  return link;
}

function makeProject(project, index) {
  const article = document.createElement("article");
  article.className = `project-card project-case${project.featured ? " is-featured" : ""}`;
  article.id = `project-${project.id || index + 1}`;
  article.dataset.project = project.id || "";
  article.style.setProperty("--project-index", index);
  article.setAttribute("aria-labelledby", `${article.id}-title`);
  const media = document.createElement("div");
  media.className = "project-media";
  media.append(makePreview(project));
  const videoPreview = makeVideoPreview(project);
  if (videoPreview) media.append(videoPreview);
  article.append(media);

  const detail = document.createElement("div");
  detail.className = "project-detail";
  const meta = document.createElement("div");
  meta.className = "project-meta";
  const number = document.createElement("span");
  number.textContent = String(index + 1).padStart(2, "0");
  const category = document.createElement("span");
  category.textContent = project.category || "Project";
  meta.append(number, category);
  if (project.featured) {
    const featured = document.createElement("span");
    featured.className = "featured-label";
    featured.textContent = "FEATURED";
    meta.append(featured);
  }

  const title = document.createElement("h3");
  title.id = `${article.id}-title`;
  title.textContent = project.title || "Untitled project";
  const description = document.createElement("p");
  description.className = "project-description";
  description.textContent = project.description || "Add a short description in projects.js.";

  const tags = document.createElement("ul");
  tags.className = "technology-list";
  tags.setAttribute("aria-label", "Technologies");
  (Array.isArray(project.technologies) ? project.technologies : []).forEach((technology) => {
    const item = document.createElement("li");
    item.textContent = technology;
    tags.append(item);
  });

  const links = document.createElement("div");
  links.className = "project-actions";
  const liveUrl = safeUrl(project.liveUrl);
  const githubUrl = safeUrl(project.githubUrl);
  const video = youtubeId(project.youtubeUrl);
  if (liveUrl) links.append(makeAction(liveUrl, "Visit Website"));
  if (githubUrl) links.append(makeAction(githubUrl, "View Source"));
  if (video) links.append(makeAction(`https://www.youtube.com/watch?v=${encodeURIComponent(video)}`, "Watch Demo on YouTube", "video-action"));

  detail.append(meta, title, description, tags, links);
  article.append(detail);
  return article;
}

if (projectList && projects.length) {
  projects.forEach((project, index) => projectList.append(makeProject(project, index)));
} else if (projectList) {
  projectList.textContent = "Project details are being added.";
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const revealTargets = document.querySelectorAll(".section-heading, .project-card, .about-layout, .contact-layout");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  revealTargets.forEach((element) => element.classList.add("reveal-ready"));
  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        instance.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -50px 0px", threshold: 0.08 });
  revealTargets.forEach((element) => observer.observe(element));
}
