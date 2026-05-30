import { useQuery } from "@tanstack/react-query";
import { motion, useScroll, useTransform } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { type ElementType, type MouseEvent, type ReactNode, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getHomeContent } from "../api/portfolio";
import type { HomeContent, HomeProjectItem } from "../types/api";

const portraitUrl =
  "/images/danish-portrait.png";

const marqueeImages = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif"
];

const decorImages = {
  moon: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png",
  object: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png",
  lego: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png",
  group: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
};

const services = [
  {
    number: "01",
    name: "3D Modeling",
    description: "Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations."
  },
  {
    number: "02",
    name: "Rendering",
    description: "High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life."
  },
  {
    number: "03",
    name: "Motion Design",
    description: "Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences."
  },
  {
    number: "04",
    name: "Branding",
    description: "Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence."
  },
  {
    number: "05",
    name: "Web Design",
    description: "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience."
  }
];

const projects = [
  {
    number: "01",
    name: "Nextlevel Studio",
    category: "Client",
    images: [
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85"
    ]
  },
  {
    number: "02",
    name: "Aura Brand Identity",
    category: "Personal",
    images: [
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85"
    ]
  },
  {
    number: "03",
    name: "Solaris Digital",
    category: "Client",
    images: [
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85"
    ]
  }
];

const defaultHomeContent: HomeContent = {
  hero: {
    nav: [
      { label: "About", to: "/about" },
      { label: "Price", to: "/services" },
      { label: "Projects", to: "/projects" },
      { label: "Contact", to: "/contact" }
    ],
    heading: "Hi, i'm danish",
    tagline: "a 3d creator driven by crafting striking and unforgettable projects",
    portrait_url: portraitUrl,
    contact_label: "Contact Me"
  },
  marquee: {
    images: marqueeImages
  },
  about: {
    heading: "About me",
    body: "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!",
    decor: decorImages
  },
  services: {
    heading: "Services",
    items: services
  },
  projects: {
    heading: "Project",
    items: projects
  }
};

function ContactButton({ label = "Contact Me" }: { label?: string }) {
  return (
    <Link
      to="/contact"
      className="inline-flex items-center justify-center rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white outline outline-2 outline-offset-[-3px] outline-white sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
      style={{
        background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
        boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset"
      }}
    >
      {label}
    </Link>
  );
}

function LiveProjectButton() {
  return (
    <Link
      to="/projects"
      className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#D7E2EA] px-6 py-3 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] transition hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-base"
    >
      Live Project <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

type FadeInProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
} & Omit<HTMLMotionProps<"div">, "as" | "children" | "className">;

function FadeIn<T extends ElementType = "div">({ as, children, className, delay = 0, duration = 0.7, x = 0, y = 30, ...props }: FadeInProps<T>) {
  const Component = motion(as ?? "div");

  return (
    <Component
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
      {...props}
    >
      {children}
    </Component>
  );
}

function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out"
}: {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translate3d(0, 0, 0)");
  const [transition, setTransition] = useState(inactiveTransition);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const inside =
      event.clientX >= rect.left - padding &&
      event.clientX <= rect.right + padding &&
      event.clientY >= rect.top - padding &&
      event.clientY <= rect.bottom + padding;

    if (!inside) {
      setTransition(inactiveTransition);
      setTransform("translate3d(0, 0, 0)");
      return;
    }

    const x = (event.clientX - (rect.left + rect.width / 2)) / strength;
    const y = (event.clientY - (rect.top + rect.height / 2)) / strength;
    setTransition(activeTransition);
    setTransform(`translate3d(${x}px, ${y}px, 0)`);
  }

  function reset() {
    setTransition(inactiveTransition);
    setTransform("translate3d(0, 0, 0)");
  }

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={reset} style={{ transform, transition, willChange: "transform" }}>
      {children}
    </div>
  );
}

function AnimatedCharacter({ char, index, length, progress }: { char: string; index: number; length: number; progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const start = index / length;
  const end = Math.min(start + 0.12, 1);
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  const displayChar = char === " " ? "\u00A0" : char;

  return (
    <span className="relative inline-block">
      <span className="opacity-0">{displayChar}</span>
      <motion.span className="absolute inset-0" style={{ opacity }}>
        {displayChar}
      </motion.span>
    </span>
  );
}

function AnimatedText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.2"] });

  return (
    <p ref={ref} aria-label={text} className="max-w-[560px] text-center text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-[#D7E2EA]">
      <span aria-hidden="true">
        {text.split("").map((char, index) => (
          <AnimatedCharacter key={`${char}-${index}`} char={char} index={index} length={text.length} progress={scrollYProgress} />
        ))}
      </span>
    </p>
  );
}

function HeroSection({ content }: { content: HomeContent["hero"] }) {
  return (
    <section className="relative flex h-[calc(100vh-64px)] min-h-[660px] flex-col overflow-x-clip bg-[#0C0C0C]">
      <FadeIn as="nav" delay={0} y={-20} className="relative z-20 flex justify-between px-6 pt-6 text-sm font-medium uppercase tracking-wider text-[#D7E2EA] md:px-10 md:pt-8 md:text-lg lg:text-[1.4rem]">
        {content.nav.map((item) => (
          <Link key={item.label} to={item.to} className="transition duration-200 hover:opacity-70">
            {item.label}
          </Link>
        ))}
      </FadeIn>

      <div className="relative z-0 mt-6 w-full overflow-hidden px-3 sm:mt-4 sm:px-4 md:-mt-5 md:px-5">
        <FadeIn as="h1" delay={0.15} y={40} className="hero-heading w-full whitespace-nowrap text-[13vw] font-black uppercase leading-none tracking-tight sm:text-[13.5vw] md:text-[14vw] lg:text-[13.8vw] xl:text-[13.4vw]">
          {content.heading}
        </FadeIn>
      </div>

      <div className="absolute bottom-[118px] left-1/2 z-10 w-[240px] -translate-x-1/2 sm:bottom-0 sm:w-[360px] md:w-[440px] lg:w-[520px]">
        <FadeIn delay={0.6} y={30}>
          <Magnet padding={150} strength={3} activeTransition="transform 0.3s ease-out" inactiveTransition="transform 0.6s ease-in-out">
            <img src={content.portrait_url} alt="Danish 3D portrait" className="w-full select-none object-contain" draggable={false} />
          </Magnet>
        </FadeIn>
      </div>

      <div className="relative z-20 mt-auto flex items-end justify-between pb-7 pl-6 pr-24 sm:pb-8 sm:pr-28 md:pb-10 md:pl-10 md:pr-32">
        <FadeIn delay={0.35} y={20}>
          <p className="max-w-[160px] text-[clamp(0.75rem,1.4vw,1.5rem)] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]">
            {content.tagline}
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton label={content.contact_label} />
        </FadeIn>
      </div>
    </section>
  );
}

function MarqueeRow({ images, direction }: { images: string[]; direction: "right" | "left" }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const repeatedImages = [...images, ...images, ...images];

  useEffect(() => {
    function updateOffset() {
      if (!sectionRef.current) return;
      const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
    }

    updateOffset();
    window.addEventListener("scroll", updateOffset, { passive: true });
    window.addEventListener("resize", updateOffset);

    return () => {
      window.removeEventListener("scroll", updateOffset);
      window.removeEventListener("resize", updateOffset);
    };
  }, []);

  const translate = direction === "right" ? offset - 200 : -(offset - 200);

  return (
    <div ref={sectionRef} className="flex gap-3" style={{ transform: `translateX(${translate}px)`, willChange: "transform" }}>
      {repeatedImages.map((src, index) => (
        <img key={`${src}-${index}`} src={src} alt="" loading="lazy" className="h-[270px] w-[420px] shrink-0 rounded-2xl object-cover" />
      ))}
    </div>
  );
}

function MarqueeSection({ images }: { images: string[] }) {
  return (
    <section className="overflow-hidden bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40">
      <div className="flex flex-col gap-3">
        <MarqueeRow images={images.slice(0, Math.ceil(images.length / 2))} direction="right" />
        <MarqueeRow images={images.slice(Math.ceil(images.length / 2))} direction="left" />
      </div>
    </section>
  );
}

function AboutSection({ content, contactLabel }: { content: HomeContent["about"]; contactLabel: string }) {
  const decor = content.decor;

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0C0C0C] px-5 py-20 sm:px-8 md:px-10">
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute left-[1%] top-[4%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]">
        <img src={decor.moon} alt="" loading="lazy" className="w-full" />
      </FadeIn>
      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]">
        <img src={decor.object} alt="" loading="lazy" className="w-full" />
      </FadeIn>
      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute right-[1%] top-[4%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]">
        <img src={decor.lego} alt="" loading="lazy" className="w-full" />
      </FadeIn>
      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]">
        <img src={decor.group} alt="" loading="lazy" className="w-full" />
      </FadeIn>

      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn as="h2" delay={0} y={40} className="hero-heading text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight">
          {content.heading}
        </FadeIn>
        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <AnimatedText text={content.body} />
          <ContactButton label={contactLabel} />
        </div>
      </div>
    </section>
  );
}

function ServicesSection({ content }: { content: HomeContent["services"] }) {
  return (
    <section className="rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
      <FadeIn as="h2" className="mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight text-[#0C0C0C] sm:mb-20 md:mb-28">
        {content.heading}
      </FadeIn>
      <div className="mx-auto max-w-5xl">
        {content.items.map((service, index) => (
          <FadeIn
            key={service.number}
            delay={index * 0.1}
            className="grid gap-5 border-t border-[rgba(12,12,12,0.15)] py-8 last:border-b sm:grid-cols-[minmax(130px,0.36fr)_1fr] sm:gap-8 sm:py-10 md:py-12"
          >
            <p className="text-[clamp(3rem,10vw,140px)] font-black leading-none text-[#0C0C0C]">{service.number}</p>
            <div className="flex flex-col justify-center gap-3">
              <h3 className="text-[clamp(1rem,2.2vw,2.1rem)] font-medium uppercase text-[#0C0C0C]">{service.name}</h3>
              <p className="max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] font-light leading-relaxed text-[#0C0C0C] opacity-60">{service.description}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index, totalCards }: { project: HomeProjectItem; index: number; totalCards: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={ref} className="h-[85vh]">
      <motion.article
        className="sticky rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
        style={{ top: `calc(6rem + ${index * 28}px)`, scale }}
      >
        <div className="mb-6 grid items-center gap-4 md:grid-cols-[0.35fr_0.5fr_1fr_auto]">
          <p className="text-[clamp(3rem,10vw,140px)] font-black leading-none text-[#D7E2EA]">{project.number}</p>
          <p className="text-sm font-medium uppercase tracking-widest text-[#D7E2EA]/70 md:text-base">{project.category}</p>
          <h3 className="text-[clamp(1.8rem,5vw,5rem)] font-black uppercase leading-none tracking-tight text-[#D7E2EA]">{project.name}</h3>
          <LiveProjectButton />
        </div>
        <div className="grid gap-4 md:grid-cols-[0.4fr_0.6fr]">
          <div className="grid gap-4">
            <img src={project.images[0] ?? ""} alt={`${project.name} preview 1`} loading="lazy" className="h-[clamp(130px,16vw,230px)] w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]" />
            <img src={project.images[1] ?? project.images[0] ?? ""} alt={`${project.name} preview 2`} loading="lazy" className="h-[clamp(160px,22vw,340px)] w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]" />
          </div>
          <img src={project.images[2] ?? project.images[0] ?? ""} alt={`${project.name} featured preview`} loading="lazy" className="h-[clamp(320px,40vw,586px)] w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]" />
        </div>
      </motion.article>
    </div>
  );
}

function ProjectsSection({ content }: { content: HomeContent["projects"] }) {
  return (
    <section className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10">
      <FadeIn as="h2" className="hero-heading mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28">
        {content.heading}
      </FadeIn>
      <div className="mx-auto max-w-7xl">
        {content.items.map((project, index) => (
          <ProjectCard key={project.number} project={project} index={index} totalCards={content.items.length} />
        ))}
      </div>
    </section>
  );
}

export function HomePage() {
  const { data } = useQuery({ queryKey: ["home"], queryFn: getHomeContent });
  const content = data ?? defaultHomeContent;

  return (
    <div className="overflow-x-clip bg-[#0C0C0C]">
      <HeroSection content={content.hero} />
      <MarqueeSection images={content.marquee.images} />
      <AboutSection content={content.about} contactLabel={content.hero.contact_label} />
      <ServicesSection content={content.services} />
      <ProjectsSection content={content.projects} />
    </div>
  );
}
