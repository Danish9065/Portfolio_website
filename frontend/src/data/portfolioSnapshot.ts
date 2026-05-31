import type { Experience, HomeContent, Profile, Project, Service, Skill, Testimonial } from "../types/api";

export const portfolioSnapshot: {
  home: HomeContent;
  profile: Profile;
  skills: Skill[];
  projects: Project[];
  services: Service[];
  experience: Experience[];
  testimonials: Testimonial[];
} = {
  home: {
    hero: {
      nav: [
        { label: "About", to: "/about" },
        { label: "Price", to: "/services" },
        { label: "Projects", to: "/projects" },
        { label: "Contact", to: "/contact" }
      ],
      heading: "Hi, i'm danish",
      tagline: "An AI full-stack developer driven by building intelligent, practical, and user-friendly digital products.",
      portrait_url: "/images/danish-portrait.png",
      contact_label: "Contact Me"
    },
    marquee: { images: [] },
    about: {
      heading: "About me",
      body: "With a strong foundation in AI full-stack development, I focus on building intelligent web applications using React, TypeScript, Python, FastAPI, Gemini API, Supabase, and modern AI/ML tools. I enjoy creating practical AI-powered products, from image analysis and recommendation systems to chat assistants and automation tools. I’m passionate about building clean, user-friendly applications that solve real problems and help businesses work smarter. Let’s build something incredible together!",
      decor: {
        moon: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png",
        object: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png",
        lego: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png",
        group: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
      }
    },
    services: {
      heading: "Services",
      items: [
        { number: "01", name: "AI/ML", description: "I use to build intelligent applications with image analysis, model inference, and AI-powered workflows." },
        { number: "02", name: "Frontend Development", description: "React, TypeScript, Next.js, Vite, Tailwind CSS.Technologies I use to create modern, responsive, and user-friendly web interfaces." },
        { number: "03", name: "Backend Development", description: "Python, FastAPI, Express.js, REST APIs, Pydantic.Backend tools I use to build APIs, handle validation, connect services, and power full-stack applications." },
        { number: "04", name: "Web Design", description: "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience." },
        { number: "05", name: "Motion Design", description: "Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences." },
        { number: "06", name: "3D Modeling", description: "Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations." },
        { number: "07", name: "Branding", description: "Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence." },
        { number: "08", name: "Database & Cloud", description: "Supabase, PostgreSQL, SQLite, Cloudinary, Vercel, Render.Platforms I use for authentication, storage, databases, deployment, and media handling." }
      ]
    },
    projects: {
      heading: "Project",
      items: []
    }
  },
  profile: {
    id: "00000000-0000-4000-8000-000000000001",
    full_name: "Danish MD",
    title: "AI Full-stack Developer",
    bio: "An AI full-stack developer driven by building intelligent, practical, and user-friendly digital products.",
    location: "India",
    email: "danish90654@gmail.com",
    phone: null,
    linkedin_url: "https://www.linkedin.com/in/danish90654/",
    github_url: "https://github.com/Danish9065",
    website_url: null,
    resume_url: null
  },
  skills: [
  { id: "skill-react", name: "React", category: "Frontend", level: 92, icon: null, sort_order: 1, is_featured: true },
  { id: "skill-nextjs", name: "Next.js", category: "Frontend", level: 88, icon: null, sort_order: 2, is_featured: true },
  { id: "skill-typescript", name: "TypeScript", category: "Frontend", level: 90, icon: null, sort_order: 3, is_featured: true },
  { id: "skill-javascript", name: "JavaScript", category: "Frontend", level: 88, icon: null, sort_order: 4, is_featured: false },
  { id: "skill-tailwind", name: "Tailwind CSS", category: "Frontend", level: 89, icon: null, sort_order: 5, is_featured: true },
  { id: "skill-framer-motion", name: "Framer Motion", category: "Frontend", level: 80, icon: null, sort_order: 6, is_featured: false },

  { id: "skill-fastapi", name: "FastAPI", category: "Backend", level: 85, icon: null, sort_order: 7, is_featured: true },
  { id: "skill-nodejs", name: "Node.js", category: "Backend", level: 83, icon: null, sort_order: 8, is_featured: true },
  { id: "skill-rest-api", name: "REST APIs", category: "Backend", level: 87, icon: null, sort_order: 9, is_featured: true },
  { id: "skill-python", name: "Python", category: "Backend", level: 84, icon: null, sort_order: 10, is_featured: true },
  { id: "skill-springboot", name: "Spring Boot", category: "Backend", level: 72, icon: null, sort_order: 11, is_featured: false },

  { id: "skill-postgres", name: "PostgreSQL", category: "Database", level: 84, icon: null, sort_order: 12, is_featured: true },
  { id: "skill-supabase", name: "Supabase", category: "Database", level: 88, icon: null, sort_order: 13, is_featured: true },

  { id: "skill-cloudinary", name: "Cloudinary", category: "Platform", level: 84, icon: null, sort_order: 14, is_featured: true },
  { id: "skill-vercel", name: "Vercel", category: "Platform", level: 86, icon: null, sort_order: 15, is_featured: true },
  { id: "skill-cloud", name: "Cloud Integrations", category: "Platform", level: 82, icon: null, sort_order: 16, is_featured: false },

  { id: "skill-git", name: "Git", category: "Tools", level: 88, icon: null, sort_order: 17, is_featured: false },
  { id: "skill-github", name: "GitHub", category: "Tools", level: 89, icon: null, sort_order: 18, is_featured: false },
  { id: "skill-vite", name: "Vite", category: "Tools", level: 84, icon: null, sort_order: 19, is_featured: false },

  { id: "skill-dsa", name: "Data Structures & Algorithms", category: "CS Fundamentals", level: 80, icon: null, sort_order: 20, is_featured: false },
  { id: "skill-problem-solving", name: "Problem Solving", category: "CS Fundamentals", level: 84, icon: null, sort_order: 21, is_featured: false },

  { id: "skill-ai", name: "AI Application Development", category: "AI/ML", level: 78, icon: null, sort_order: 22, is_featured: true },
  { id: "skill-ml", name: "Machine Learning", category: "AI/ML", level: 72, icon: null, sort_order: 23, is_featured: false }
],
  projects: [
    {
      id: "project-portfolio",
      title: "Portfolio Website",
      slug: "portfolio-website",
      short_description: "A responsive portfolio experience with project pages, contact flows, and admin-managed content.",
      description: "A full-stack portfolio built to present skills, services, project work, and contact paths in a clear production experience.",
      category: "Full-stack",
      tech_stack: ["React", "TypeScript", "FastAPI", "Supabase"],
      image_url: null,
      cloudinary_public_id: null,
      live_url: null,
      github_url: null,
      featured: true,
      sort_order: 1
    },
    {
      id: "project-client-portal",
      title: "Client Portal Concept",
      slug: "client-portal-concept",
      short_description: "A structured portal concept for requests, collaboration, assets, and delivery tracking.",
      description: "A product concept showing how client requests, assets, project status, and delivery workflows can be organized in one place.",
      category: "SaaS",
      tech_stack: ["React", "Python", "PostgreSQL", "Cloudinary"],
      image_url: null,
      cloudinary_public_id: null,
      live_url: null,
      github_url: null,
      featured: true,
      sort_order: 2
    },
    {
      id: "project-ai-assistant",
      title: "Portfolio AI Assistant",
      slug: "portfolio-ai-assistant",
      short_description: "A portfolio chat assistant designed to answer questions from structured project and profile context.",
      description: "An AI-assisted portfolio feature that responds from available profile, project, service, and experience content.",
      category: "AI",
      tech_stack: ["Gemini", "FastAPI", "React", "Supabase"],
      image_url: null,
      cloudinary_public_id: null,
      live_url: null,
      github_url: null,
      featured: true,
      sort_order: 3
    }
  ],
  services: [
    { id: "service-mvp", title: "MVP build", slug: "mvp-build", description: "Plan, design, and build a focused web app from idea to deployable first version.", features: ["Product scoping", "Full-stack implementation", "Deployment guidance"], starting_price: "Quote after scope", icon: null, sort_order: 1 },
    { id: "service-frontend", title: "Frontend polish", slug: "frontend-polish", description: "Improve UX, performance, accessibility, and visual quality for existing apps.", features: ["Responsive UI", "Design system cleanup", "Build verification"], starting_price: "Quote after audit", icon: null, sort_order: 2 },
    { id: "service-integration", title: "API integrations", slug: "api-integrations", description: "Wire real services with backend-owned secrets and clear error handling.", features: ["Backend-owned secrets", "Error handling", "Documentation"], starting_price: "Quote after integration review", icon: null, sort_order: 3 }
  ],
  experience: [],
  testimonials: []
};
