# Portfolio Design System and UI Schema

Use this file as the reusable design blueprint for recreating the same visual language on another website. The current site is a dark, cinematic portfolio UI with oversized Kanit typography, glass panels, soft borders, scroll motion, rounded media, and high-contrast editorial sections.

## 1. Design Personality

- Dark, premium, visual-first portfolio.
- Large uppercase display typography.
- Minimal copy, strong spacing, and image-led storytelling.
- Soft glass surfaces on app pages; bolder rounded sections on the landing page.
- Motion is calm and scroll-driven, not chaotic.
- Buttons are simple, either rounded pills for landing CTAs or compact rounded rectangles for app/admin UI.

## 2. Core Stack

- Font: `Kanit`
- Styling: Tailwind CSS
- Icons: `lucide-react`
- Motion: `framer-motion`
- Main background: near-black
- Layout width: centered shell with responsive side padding

Recommended install:

```bash
npm install tailwindcss framer-motion lucide-react
```

Google Font import:

```css
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800;900&display=swap");
```

## 3. Color Tokens

Use these as the main theme tokens:

```js
colors: {
  ink: "#0C0C0C",
  panel: "#121212",
  panel2: "#1B1B1B",
  line: "#2A3036",
  mist: "#D7E2EA",
  muted: "#8D98A3",
  accent: "#D7E2EA",
  gold: "#BE4C00"
}
```

Additional landing-page gradient accents:

```css
--purple-deep: #18011f;
--purple-hot: #b600a8;
--violet: #7621b0;
--burnt-orange: #be4c00;
--display-gradient-start: #646973;
--display-gradient-end: #bbccd7;
```

Usage rules:

- Use `#0C0C0C` for the body and dark sections.
- Use `#D7E2EA` for primary text, borders, and most CTAs.
- Use `#8D98A3` for secondary body text.
- Use white sections sparingly for contrast, especially service or pricing sections.
- Use the purple/orange gradient only for primary hero-level CTAs.

## 4. Typography

Global font:

```css
body {
  font-family: "Kanit", ui-sans-serif, system-ui, sans-serif;
}
```

Display headings:

```css
.hero-heading {
  background: linear-gradient(180deg, #646973 0%, #bbccd7 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

Typography scale:

- Hero H1: `text-[13vw]`, `font-black`, `uppercase`, `leading-none`, `tracking-tight`, `whitespace-nowrap`.
- Section H2: `text-[clamp(3rem,12vw,160px)]`, `font-black`, `uppercase`, `leading-none`.
- Project titles: `text-[clamp(1.8rem,5vw,5rem)]`, `font-black`, `uppercase`.
- Service numbers: `text-[clamp(3rem,10vw,140px)]`, `font-black`.
- Body text: `text-sm` to `text-lg`, `leading-6` or `leading-relaxed`.
- Labels: `text-xs` or `text-sm`, `uppercase`, `tracking-widest`.

Tone:

- Headings should be short and visual.
- Body copy should be direct and compact.
- Navigation labels should be simple: About, Price, Projects, Contact.

## 5. Base CSS

```css
:root {
  color-scheme: dark;
  background: #0c0c0c;
  color: #d7e2ea;
  font-family: "Kanit", ui-sans-serif, system-ui, sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body,
#root {
  min-width: 320px;
  min-height: 100vh;
  background: #0c0c0c;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
textarea,
select {
  font: inherit;
}

:focus-visible {
  outline: 2px solid #4dd7b0;
  outline-offset: 3px;
}

.container-shell {
  width: min(1160px, calc(100% - 32px));
  margin: 0 auto;
}
```

## 6. Surface Styles

Standard panel:

```css
.panel {
  border: 1px solid rgba(215, 226, 234, 0.16);
  background: rgba(18, 18, 18, 0.86);
  box-shadow: 0 18px 70px rgba(0, 0, 0, 0.32);
  backdrop-filter: blur(16px);
}
```

Glass card:

```css
.glass-card {
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: linear-gradient(135deg, rgba(18, 18, 18, 0.76), rgba(12, 12, 12, 0.52));
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.34), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(22px) saturate(140%);
  -webkit-backdrop-filter: blur(22px) saturate(140%);
}
```

Radius rules:

- App cards, forms, admin panels: `rounded-lg`.
- Inputs and compact buttons: `rounded-md`.
- Landing page buttons: `rounded-full`.
- Landing page section curves and project cards: `rounded-[40px] sm:rounded-[50px] md:rounded-[60px]`.
- Marquee images: `rounded-2xl`.

## 7. Layout Schema

Global page:

```tsx
<div className="min-h-screen bg-[#0C0C0C]">
  <Navbar />
  <main>{children}</main>
  <Footer />
</div>
```

Reusable content page:

```tsx
<section className="container-shell py-14">
  <SectionHeader eyebrow="Label" title="Large uppercase title" body="Short supporting copy." />
  <div className="grid gap-5 md:grid-cols-3">{items}</div>
</section>
```

Landing page order:

1. Full-height hero with oversized name.
2. Horizontal image marquee.
3. About section with large heading, centered animated paragraph, and decorative 3D assets.
4. White service section with numbered rows.
5. Dark project section with sticky stacked project cards.

## 8. Navigation

Header style:

```tsx
<header className="sticky top-0 z-40 border-b border-[#D7E2EA]/10 bg-[#0C0C0C]/90 backdrop-blur">
  <nav className="container-shell flex h-16 items-center justify-between">
    ...
  </nav>
</header>
```

Nav link style:

```tsx
const linkClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm transition ${
    isActive ? "bg-accent/12 text-accent" : "text-muted hover:text-white"
  }`;
```

Landing hero nav:

```tsx
<nav className="flex justify-between px-6 pt-6 text-sm font-medium uppercase tracking-wider text-[#D7E2EA] md:px-10 md:pt-8 md:text-lg lg:text-[1.4rem]">
  ...
</nav>
```

## 9. Buttons

Primary landing CTA:

```tsx
<a
  className="inline-flex items-center justify-center rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white outline outline-2 outline-offset-[-3px] outline-white sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
  style={{
    background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
    boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset"
  }}
>
  Contact Me
</a>
```

Secondary landing CTA:

```tsx
<a className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#D7E2EA] px-6 py-3 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] transition hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-base">
  Live Project
</a>
```

App primary button:

```tsx
<button className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 font-semibold text-ink transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60">
  Send message
</button>
```

App secondary button:

```tsx
<a className="inline-flex items-center justify-center gap-2 rounded-md border border-line bg-panel px-5 py-3 font-semibold text-mist hover:border-accent/60">
  Work With Me
</a>
```

## 10. Forms

Input style:

```tsx
const input =
  "w-full rounded-md border border-white/12 bg-ink/70 px-3 py-3 text-sm text-white placeholder:text-muted outline-none transition focus:border-accent/70";
```

Form wrapper:

```tsx
<form className="glass-card grid gap-4 rounded-lg p-6">
  <input className={input} placeholder="Name" />
  <input className={input} placeholder="Email" />
  <select className={input}>...</select>
  <textarea className={`${input} min-h-36`} />
</form>
```

Validation message:

```tsx
<p className="mt-1 text-xs text-red-200">Error message</p>
```

Status message:

```tsx
<p className="rounded-md border border-accent/25 bg-accent/10 px-3 py-2 text-sm text-mist">
  Message sent
</p>
```

## 11. Cards

Project card for content pages:

```tsx
<article className="panel grid overflow-hidden rounded-lg transition">
  <div className="aspect-[16/9] bg-gradient-to-br from-panel2 via-panel to-accent/20">
    <img className="h-full w-full object-cover" />
  </div>
  <div className="p-5">
    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Category</p>
    <h3 className="mt-2 text-xl font-semibold text-white">Project title</h3>
    <p className="mt-3 min-h-16 text-sm leading-6 text-muted">Short description</p>
  </div>
</article>
```

Landing project card:

```tsx
<article className="sticky rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8">
  <div className="mb-6 grid items-center gap-4 md:grid-cols-[0.35fr_0.5fr_1fr_auto]">
    <p className="text-[clamp(3rem,10vw,140px)] font-black leading-none text-[#D7E2EA]">01</p>
    <p className="text-sm font-medium uppercase tracking-widest text-[#D7E2EA]/70 md:text-base">Client</p>
    <h3 className="text-[clamp(1.8rem,5vw,5rem)] font-black uppercase leading-none tracking-tight text-[#D7E2EA]">Project Name</h3>
  </div>
</article>
```

## 12. Sections

Hero section:

```tsx
<section className="relative flex h-[calc(100vh-64px)] min-h-[660px] flex-col overflow-x-clip bg-[#0C0C0C]">
  <h1 className="hero-heading w-full whitespace-nowrap text-[13vw] font-black uppercase leading-none tracking-tight">
    Hi, i'm danish
  </h1>
</section>
```

White services section:

```tsx
<section className="rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
  <h2 className="text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight text-[#0C0C0C]">
    Services
  </h2>
</section>
```

Dark curved section:

```tsx
<section className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10">
  ...
</section>
```

## 13. Motion Schema

Default reveal:

```tsx
<motion.section
  initial={{ opacity: 0, y: 28 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.18 }}
  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
>
  ...
</motion.section>
```

Landing fade-in:

```tsx
<motion.div
  initial={{ opacity: 0, x: 0, y: 30 }}
  whileInView={{ opacity: 1, x: 0, y: 0 }}
  viewport={{ once: true, margin: "50px", amount: 0 }}
  transition={{ delay: 0, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
>
  ...
</motion.div>
```

Motion rules:

- Use reveal animations on sections and important hero elements.
- Use scroll-linked transforms for marquee rows and sticky project cards.
- Keep hover motion subtle: opacity, border color, or small magnetic movement.
- Avoid fast, looping animation on text-heavy sections.

## 14. Image Treatment

- Use real project previews, GIFs, or strong rendered visuals.
- Use `object-cover` for project screenshots and marquee images.
- Use fixed visual ratios: `aspect-[16/9]`, `aspect-[16/10]`, or stable `clamp()` heights.
- Landing project previews use very large rounded corners.
- Marquee images use `h-[270px] w-[420px] shrink-0 rounded-2xl object-cover`.
- Decorative assets can be absolutely positioned around centered text.

## 15. Tailwind Config

Copy this into another Tailwind project:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0C0C0C",
        panel: "#121212",
        panel2: "#1B1B1B",
        line: "#2A3036",
        mist: "#D7E2EA",
        muted: "#8D98A3",
        accent: "#D7E2EA",
        gold: "#BE4C00"
      },
      boxShadow: {
        glow: "0 0 35px rgba(182, 0, 168, 0.28)"
      },
      fontFamily: {
        sans: ["Kanit", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Kanit", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
```

## 16. Reusable UI Checklist

When applying this design to another website:

- Use Kanit everywhere.
- Keep the main canvas `#0C0C0C`.
- Use `#D7E2EA` as the main text, border, and light accent.
- Use huge uppercase headings with `font-black`.
- Keep body copy smaller, muted, and spacious.
- Use `container-shell` for regular pages.
- Use full-width immersive sections for the landing page.
- Use glass or panel cards only when grouping repeated content or forms.
- Use rounded pill CTAs on hero/landing sections.
- Use compact rounded-md buttons in dashboards, forms, and utility pages.
- Add reveal motion with Framer Motion.
- Use real images, project previews, or rendered assets as visual anchors.
- Keep the design high contrast, minimal, and image-led.

## 17. Quick Starter Template

```tsx
export function PortfolioStylePage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#0C0C0C] text-[#D7E2EA]">
      <section className="relative flex min-h-screen flex-col px-6 py-6 md:px-10">
        <nav className="flex justify-between text-sm font-medium uppercase tracking-wider md:text-lg">
          <a>About</a>
          <a>Projects</a>
          <a>Contact</a>
        </nav>

        <div className="mt-10 overflow-hidden">
          <h1 className="hero-heading whitespace-nowrap text-[13vw] font-black uppercase leading-none tracking-tight">
            Your Name
          </h1>
        </div>

        <div className="mt-auto flex items-end justify-between pb-8">
          <p className="max-w-[260px] text-[clamp(0.75rem,1.4vw,1.5rem)] font-light uppercase leading-snug tracking-wide">
            A short visual positioning line for your work
          </p>
          <a className="inline-flex items-center justify-center rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white outline outline-2 outline-offset-[-3px] outline-white">
            Contact Me
          </a>
        </div>
      </section>

      <section className="rounded-t-[40px] bg-white px-5 py-20 text-[#0C0C0C] md:rounded-t-[60px] md:px-10 md:py-32">
        <h2 className="text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight">
          Services
        </h2>
      </section>
    </main>
  );
}
```
