# LAB HUB — Medical Practical Laboratory Platform (منصة المختبرات الطبية التعليمية)

A comprehensive, production-ready digital medical laboratory learning & examination platform for medical students and faculty, featuring **Anatomy (تشريح)**, **Histology (علم الأنسجة)**, and **Biochemistry (الكيمياء الحيوية)**.

---

## 🔬 Key Features

- **3 Core Medical Laboratories**:
  - **Anatomy**: High-yield 3D/dissection stations, labeled spotters, bone and muscle identification.
  - **Histology**: Microscopic tissue slide viewer, staining identification (H&E, Special stains), cellular and tissue landmarks based on the official faculty curriculum.
  - **Biochemistry**: Complete procedural and diagnostic guides with doctor explanation videos and practical OSPE stations.
- **Interactive OSPE Practical Examination System**:
  - Timed stations with medical specimens and high-resolution slides.
  - Identification multiple-choice questions with flags, instant scoring, and review cards.
- **Teacher & Faculty Management Dashboard**:
  - Question bank management, OSPE exam configuration, passing threshold settings, and live attempt reviews.
- **Academic Approval & Schedule Hub**:
  - Preparation checklists, academic notifications, and student progress metrics.
- **Bilingual Arabic/English Medical Terminology UI**:
  - Native RTL support, high-contrast accessible design, and responsive layouts for mobile, tablet, and desktop.

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- **Node.js**: v18.0 or higher
- **npm** or **pnpm** / **yarn**

### 2. Installation
```bash
git clone https://github.com/asaadalbaraa75/LAB-HUB.git
cd LAB-HUB
npm install
```

### 3. Running Locally

**Development Server (Full-Stack Express + Vite):**
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

**Client-Only Vite Dev Mode:**
```bash
npx vite
```

---

## 🛠️ Production Build & Deployment

### Build for Production
```bash
npm run build:web
```
This outputs the compiled static web bundle into the `dist/` directory.

### Deploying to Vercel
1. Import this repository at [vercel.com/new](https://vercel.com/new).
2. Framework Preset: **Vite**
3. Build Command: `npm run build:web`
4. Output Directory: `dist`
5. Click **Deploy**.

### Deploying to Netlify / Cloudflare Pages / GitHub Pages
- **Build command**: `npm run build:web`
- **Publish directory**: `dist`
- The included `vercel.json` and client-side router handle SPA routing seamlessly.

---

## 📱 Mobile Apps (Capacitor Android / iOS)

This project includes Capacitor configuration for building native Android & iOS APKs/IPAs:

```bash
# Build web assets and sync to Android
npm run build:android

# Open in Android Studio
npm run cap:open
```

---

## 📄 License
Educational Medical Platform — Built for medical students, instructors, and faculty.
