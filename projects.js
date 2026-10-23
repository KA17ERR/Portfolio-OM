/* Project content lives here so each item creates its own portfolio case study. */
/* Verified project destinations and locally cached project media. */
window.PORTFOLIO_PROFILE = { displayName: "Om Aletiwär" };
window.PORTFOLIO_PROJECTS = [
  {
    id: "solarsmart",
    title: "SolarSmart",
    category: "Energy · Product",
    description: "A local-first rooftop solar planner that brings roof layout, shade, energy use, costs, and assumptions into one clear assessment. Sample scenarios work locally, with optional integrations kept separate.",
    image: "assets/solarsmart-project.webp",
    imageKind: "project",
    imageAlt: "SolarSmart solar roof project image supplied by Om",
    imageNote: "SOLARSMART · PROJECT IMAGE",
    technologies: ["Next.js", "TypeScript", "React", "Supabase", "Leaflet"],
    githubUrl: "https://github.com/KA17ERR/SolarSmart",
    liveUrl: "https://main.d1ifsf72k3a4lj.amplifyapp.com/",
    youtubeUrl: "https://www.youtube.com/watch?v=4Ccjv1nLcFc",
    videoThumbnail: "assets/solarsmart-video.jpg",
    featured: true,
    visual: "solar"
  },
  {
    id: "reserve",
    title: "ReServe",
    category: "AI · Social impact",
    description: "A coordination platform that connects surplus food and medical supplies with organisations in need. Its transparent matching engine scores recipients, supports partial allocations, and tracks each rescue operation.",
    image: "assets/reserve-project.webp",
    imageKind: "brand",
    imageAlt: "ReServe logo supplied by Om",
    imageNote: "RESERVE · PROJECT IMAGE",
    technologies: ["React", "Vite", "Tailwind CSS", "FastAPI", "PostgreSQL", "Gemini"],
    githubUrl: "https://github.com/dhruv-asati/ReServe",
    liveUrl: "https://reserve-web-tensors.onrender.com/",
    youtubeUrl: "https://www.youtube.com/watch?v=yVGD7WfhFEg",
    videoThumbnail: "assets/reserve-video.jpg",
    featured: false,
    visual: "reserve"
  },
  {
    id: "fitcraft-rpg",
    title: "FitCraft RPG",
    category: "Fitness · Gamification",
    description: "A fitness tracker with a pixel-art RPG direction. The current round establishes the frontend shell and working sign-up, login, and logout flows; quests, XP, and character progression are planned next.",
    image: "assets/fitcraft-project.webp",
    imageKind: "project",
    imageAlt: "FitCraft RPG pixel-art character project artwork supplied by Om",
    imageNote: "FITCRAFT RPG · PROJECT ARTWORK",
    showPreviewHint: false,
    technologies: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Express", "JWT"],
    githubUrl: "https://github.com/KA17ERR/FitCraft-RPG",
    liveUrl: "https://fitcraftrpg.netlify.app/",
    youtubeUrl: "",
    featured: false,
    visual: "fitcraft"
  },
  {
    id: "agentguard",
    title: "AgentGuard",
    category: "AI · Reliability",
    description: "A reliability testing platform for AI agents. It generates adversarial scenarios, runs each against mocked tools in a sandbox, captures decision-by-decision traces, and scores reliability across five dimensions.",
    image: "assets/agentguard-mark.svg",
    imageKind: "brand",
    imageAlt: "Official AgentGuard shield logo from the project repository",
    imageNote: "AGENTGUARD · OFFICIAL VECTOR LOGO",
    technologies: ["React", "Vite", "Tailwind CSS", "Python", "FastAPI", "SQLAlchemy"],
    githubUrl: "https://github.com/KA17ERR/Agent-Guard",
    liveUrl: "",
    youtubeUrl: "https://www.youtube.com/watch?v=D2RYFE-5Tq4",
    videoThumbnail: "assets/agentguard-video.jpg",
    featured: true,
    visual: "agentguard"
  }
];
