# 🥷 **Ninja Portfolio**

> _“Strike fast. Code faster.”_  
> A cinematic, stealth-themed developer portfolio — fusing **modern frontend mastery** with **ninja-inspired motion and aesthetics.**

---

<p align="center">
  <img src="https://raw.githubusercontent.com/Sidharthavyas/Portfolio/main/public/banner.png" alt="Ninja Portfolio Banner" width="100%">
</p>

<p align="center">
  <a href="https://portfolio-two-taupe-31.vercel.app/">
    <img src="https://img.shields.io/badge/⚡_Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=red&labelColor=111&color=8B0000" alt="Live Demo">
  </a>
  <a href="https://github.com/Sidharthavyas/Portfolio">
    <img src="https://img.shields.io/badge/⚔️_GitHub_Repo-000000?style=for-the-badge&logo=github&logoColor=white&labelColor=111&color=8B0000" alt="GitHub Repo">
  </a>
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/📜_MIT_License-000000?style=for-the-badge&color=8B0000" alt="License">
  </a>
</p>

---

## 🎯 **About The Project**

A **modern, ninja-themed interactive portfolio** showcasing your projects, skills, and philosophy through **motion design**, **Japanese-inspired UI**, and **immersive sound effects**.  
Each section is built to **animate like a stealth sequence**, creating a unique storytelling experience.

---

## ✨ **Key Features**

- 🌑 **Dark Ninja Aesthetic** — Minimal yet powerful design with black-red tones  
- ⚔️ **Cinematic Animations** — Fog, blade arcs, motion effects, and particle trails  
- 🥷 **Hero Entrance Animation** — Ninja reveal on load  
- 🎮 **Konami Code Easter Egg** — Hidden interactions for true ninjas  
- 🎵 **Sound Feedback** — Hover and click soundscapes  
- 📱 **Responsive** — Seamless across devices  
- 🌫️ **Fog & Particle Layers** — Ambient movement and depth  
- 📊 **Dynamic Stats Section** — Real-time counters and visuals  
- 🧩 **Figma-based UI Components** — Modular Radix + shadcn components  

---

## 🛠️ **Tech Stack**

| Category | Technologies |
|-----------|---------------|
| **Framework** | React 18 · TypeScript · Vite 6 |
| **Styling & UI** | Tailwind CSS 3.4 · Framer Motion 11 · Radix UI · shadcn/ui |
| **Utilities** | class-variance-authority · clsx · tailwind-merge |
| **Forms & Logic** | React Hook Form · Sonner · next-themes |
| **Charts & Visuals** | Recharts · Lucide Icons |
| **Motion & Effects** | motion · embla-carousel-react |
| **Development Tools** | TypeScript 5.6 · Vite Plugin React SWC |

---

## ⚙️ **Getting Started**

### 🧩 Prerequisites
- Node.js 18+
- npm / yarn / pnpm

### ⚔️ Installation

```bash
git clone https://github.com/Sidharthavyas/Portfolio.git
cd Portfolio
npm install
npm run dev
Then open 👉 http://localhost:5173

🏗️ Build for Production
npm run build
npm run preview

📂 Project Structure
Ninja-Portfolio/
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
│
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── styles/
│   │   ├── globals.css
│   │
│   ├── Attributions.md
│   ├── guidelines/
│   │   ├── Guidelines.md
│   │
│   ├── imports/
│   │   ├── ShadowBladeVector1.tsx
│   │   ├── svg-w8mwrrto4w.ts
│   │
│   ├── components/
│   │   ├── ComicProjectsSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── CursorTrail.tsx
│   │   ├── FloatingNav.tsx
│   │   ├── FogEffect.tsx
│   │   ├── HeroSection.tsx
│   │   ├── KanjiAccents.tsx
│   │   ├── KonamiCode.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── NinjaBladeArc.tsx
│   │   ├── NinjaShowcase.tsx
│   │   ├── ParticleEffect.tsx
│   │   ├── PathSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ScrollProgress.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── TimelineSection.tsx
│   │   ├── TypewriterText.tsx
│   │   │
│   │   ├── figma/
│   │   │   ├── ImageWithFallback.tsx
│   │   │
│   │   ├── ui/ # shadcn / Radix Components
│   │   │   ├── accordion.tsx → tooltip.tsx (full suite)
│   │   │   ├── use-mobile.ts
│   │   │   ├── utils.ts
│
└── public/ (if added)

🎨 Core Components Overview
Component	Purpose
HeroSection	Ninja introduction animation with typewriter effect
NinjaShowcase	Dynamic image reveal / animation container
FogEffect	Atmospheric ambient layer
CursorTrail	Particle cursor trail following motion
NinjaBladeArc	Katana slash SVG animation
FloatingNav	Context-aware nav menu with smooth scroll
StatsSection	Animated live counters for achievements
ComicProjectsSection	Stylized project gallery inspired by manga panels
KonamiCode	Secret interactive easter egg
TypewriterText	Typewriter effect for titles/subheadings
📱 Sections Overview
Section	Description
🏠 Hero	Animated ninja introduction
🛤️ The Path	Journey & coding philosophy
⚡ Skills	Visual technical graph
💼 Projects	Comic-style portfolio layout
📈 Stats	Animated counters
📅 Timeline	Education & career
📬 Contact	Contact form with validation
🧰 Customization
🎨 Tailwind Theme
theme: {
  extend: {
    colors: {
      ninja: {
        dark: '#0a0a0a',
        red: '#dc2626',
      },
    },
  },
}

🧩 Modify Components

Edit content within:

src/components/
├── ProjectsSection.tsx
├── SkillsSection.tsx
├── TimelineSection.tsx
└── ContactSection.tsx

🌐 Deployment
⚔️ Vercel Deployment
npm i -g vercel
vercel

🔥 Netlify Deployment
npm run build


Then deploy the dist/ folder to Netlify
.

📸 Preview Gallery
Hero	Projects	Skills

	
	
🤝 Contributing

Contributions are always welcome!

Fork the project

Create Branch – git checkout -b feature/AmazingFeature

Commit Changes – git commit -m 'Add AmazingFeature'

Push – git push origin feature/AmazingFeature

Open PR – Describe your feature clearly

📝 License

Distributed under the MIT License.
See LICENSE
 for full details.

👤 Contact

Sidhartha Vyas
📧 vyassidhartha5@gmail.com

🌐 Portfolio

💻 GitHub

🙏 Acknowledgments

shadcn/ui

Radix UI

Lucide Icons

Framer Motion

Vite

Inspired by Japanese stealth, discipline, and precision

<p align="center"> ⚔️ <b>Strike Fast. Code Faster.</b> ⚔️ <br>Made with 🥷 and ❤️ by <b>Sidhartha Vyas</b> </p> ```
✅ Key Enhancements in This Version

Updated project structure to match your actual files (figma/, imports/, guidelines/, etc.)

Accurate dependency alignment (Radix, shadcn/ui, motion, etc.)

Consistent Markdown hierarchy and emoji syntax for visual flow

Modernized tech stack table and deployment guide

Improved readability for GitHub’s dark mode

All navigation, styling, and code examples are copy-paste clea
