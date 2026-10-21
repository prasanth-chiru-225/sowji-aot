# BEYOND THE WALLS — A Birthday Transmission for Sowji

An interactive, anime-inspired cinematic birthday experience designed for **Sowji** on **24 October**, built with an original fan-inspired **Attack on Titan** Scout Regiment aesthetic.

---

## ⚔️ Experience Overview

- **Opening Cinematic Sequence**: Fullscreen atmospheric entry with towering stone walls, fog, sequential military transmission lines, and camera transition through the colossal gate.
- **The Classified Archive Dossier**: Official Scout Regiment record for **Subject: Sowji** with classified stamps, strategic specs, and an interactive **[ Declassify the File ]** typewriter letter reveal.
- **The Friendship Chapters**: 5 interactive expedition chronicles covering the journey from the beginning, the little things, through every wall, the wings of freedom, and the 24 October transmission.
- **The Recovered Memory Gallery**: Polaroid-style photo cards with wax tape, coordinates, notes, and a click-to-expand modal lightbox.
- **The Secret Birthday Message**: Interactive wax-sealed envelope that unclasps and unfolds into a personal, emotional best friend letter.
- **The Emotional Climax**: Transition from dark fog into a golden sunrise behind the colossal walls, golden celebratory particles, and an unlockable parchment dedication scroll: **HAPPY BIRTHDAY, SOWJI**.
- **Cinematic Soundtrack**: Built-in procedural Web Audio API soundscape (wind ambience, deep cinematic drone, gentle AoT-inspired piano arpeggios, and interaction chimes) with a floating visualizer and mute/unmute control. Works offline without relying on external CDNs, plus an option to load a custom MP3.

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
The optimized production bundle will be created in the `dist/` directory.

---

## 🎨 How to Personalize for Sowji

All customizable text, dates, photos, and messages are centralized in a single configuration file:
👉 **`src/config/birthdayContent.ts`**

### 1. Adding Real Photos to the Memory Gallery
1. Place your photo files into the `public/photos/` directory (e.g. `public/photos/memory-1.jpg`).
2. Open `src/config/birthdayContent.ts`.
3. Locate the `memories` array and set `imageSrc`:
```ts
{
  id: "MEM-01",
  title: "Expedition Recon: Chapter One",
  date: "Log Entry #001",
  location: "Wall Rose Inner District",
  caption: "Where two paths crossed and an unspoken alliance was forged.",
  imageSrc: "/photos/memory-1.jpg", // <-- Set your image path here!
  tag: "ORIGIN POINT",
  notes: "The beginning of conversations that would last for hours..."
}
```

### 2. Editing the Secret Best Friend Letter
In `src/config/birthdayContent.ts`, edit the `secretMessage` section to include your own words, shared memories, or inside jokes:
```ts
secretMessage: {
  clue: "Not every treasure is found beyond the walls. Some are hidden in the words we leave behind.",
  salutation: "Sowji,",
  paragraphs: [
    "I don't know if I say it enough, but I'm genuinely glad that you're part of my life.",
    // Add or edit paragraphs here...
  ],
  signoff: "Happy Birthday, Sowji.",
  sender: "From your best friend, with a little help from the Wings of Freedom."
}
```

### 3. Using Your Own Background Music Track (Optional)
If you want to use a specific song or anime OST track instead of the built-in procedural synthesizer:
1. Save your MP3 file as `public/audio/theme.mp3`.
2. The website will automatically detect and play it when sound is activated!

---

## 🌐 Free Static Deployment (Vercel & Netlify)

### Deploy to Vercel
1. Push your repository to GitHub or GitLab.
2. Go to [Vercel](https://vercel.com) and click **Add New Project**.
3. Select your repository.
4. Framework Preset will be automatically detected as **Vite**.
5. Click **Deploy**.

### Deploy to Netlify
1. Go to [Netlify](https://www.netlify.com) and drag-and-drop the `dist` folder created by `npm run build`.
2. Or connect your GitHub repository with Build Command `npm run build` and Publish Directory `dist`.

---

## 🛡️ Dedication

*“Some people make the world feel a little less ordinary. You're one of those people, Sowji.”*  
**Happy Birthday, Sowji!** 🦅
