import { useQuery } from "@tanstack/react-query";
import { motion, useScroll, useTransform } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { type ElementType, type MouseEvent, type ReactNode, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getHomeContent } from "../api/portfolio";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Seo } from "../components/Seo";
import { HeroMedia } from "../components/sections/HeroMedia";
import type { HomeContent, HomeProjectItem } from "../types/api";
import { ContactPage } from "./ContactPage";
import { ExperiencePage } from "./ExperiencePage";
import { ProjectsPage } from "./ProjectsPage";
import { ResumePage } from "./ResumePage";
import { TestimonialsPage } from "./TestimonialsPage";

function ContactButton({ label = "Contact Me" }: { label?: string }) {
  return (
    <a
      href="#contact"
      className="inline-flex items-center justify-center rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white outline outline-2 outline-offset-[-3px] outline-white sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
      style={{
        background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
        boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset"
      }}
    >
      {label}
    </a>
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

function AnimatedText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0.25, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-3xl text-balance text-center text-[clamp(1rem,3vw,1.35rem)] font-medium leading-relaxed text-[#D7E2EA] [overflow-wrap:normal] [word-break:normal]"
    >
      {text}
    </motion.p>
  );
}

function HeroSection({ content }: { content: HomeContent["hero"] }) {
  return (
    <section id="home" className="relative flex h-[calc(100svh-64px)] min-h-[640px] scroll-mt-16 flex-col overflow-x-clip bg-[#0C0C0C]">
      <FadeIn as="nav" delay={0} y={-20} className="relative z-20 flex justify-between px-6 pt-6 text-sm font-medium uppercase tracking-wider text-[#D7E2EA] md:px-10 md:pt-8 md:text-lg lg:text-[1.4rem]">
        {content.nav.map((item) => (
          <a key={item.label} href={`#${item.to === "/services" ? "services" : item.to.replace("/", "")}`} className="transition duration-200 hover:opacity-70">
            {item.label}
          </a>
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
            <HeroMedia alt="Danish 3D portrait" className="w-full select-none object-contain" />
          </Magnet>
        </FadeIn>
      </div>

      <div className="relative z-20 mt-auto flex flex-col items-start gap-5 px-6 pb-7 sm:px-8 sm:pb-8 md:flex-row md:items-end md:justify-between md:px-10 md:pb-10 md:pr-32">
        <FadeIn delay={0.35} y={20}>
          <p className="max-w-md text-[clamp(0.85rem,2vw,1.5rem)] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] md:max-w-[260px]">
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
    <section id="about" className="relative flex min-h-screen scroll-mt-16 items-center justify-center overflow-hidden bg-[#0C0C0C] px-5 py-20 sm:px-8 md:px-10">
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

      <div className="relative z-10 flex w-full flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn as="h2" delay={0} y={40} className="hero-heading text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight">
          {content.heading}
        </FadeIn>
        <div className="flex w-full max-w-3xl flex-col items-center gap-12 px-3 sm:gap-16 md:gap-20">
          <AnimatedText text={content.body} />
          <ContactButton label={contactLabel} />
        </div>
      </div>
    </section>
  );
}

function ServicesSection({ content }: { content: HomeContent["services"] }) {
  return (
    <section id="services" className="scroll-mt-16 rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
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
    <section id="projects" className="relative z-10 -mt-10 scroll-mt-16 rounded-t-[40px] bg-[#0C0C0C] px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10">
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
  const { data: content, isLoading } = useQuery({ queryKey: ["home"], queryFn: getHomeContent });

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[#0C0C0C]">
        <LoadingSpinner label="Loading portfolio" />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[#0C0C0C] px-6 text-center text-[#D7E2EA]">
        Portfolio content is unavailable right now. Please refresh in a moment.
      </div>
    );
  }

  return (
    <div className="overflow-x-clip bg-[#0C0C0C]">
      <Seo />
      <HeroSection content={content.hero} />
      {content.marquee.images.length ? <MarqueeSection images={content.marquee.images} /> : null}
      <AboutSection content={content.about} contactLabel={content.hero.contact_label} />
      <ServicesSection content={content.services} />
      {content.projects.items.length ? <ProjectsSection content={content.projects} /> : <ProjectsPage />}
      <div id="experience" className="scroll-mt-16"><ExperiencePage /></div>
      <div id="resume" className="scroll-mt-16"><ResumePage /></div>
      <div id="testimonials" className="scroll-mt-16"><TestimonialsPage /></div>
      <div id="contact" className="scroll-mt-16"><ContactPage /></div>
    </div>
  );
}
