// src/pages/Home.tsx
import React, { useMemo, useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Users, Building, Award, Dot } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { projects, Project } from "../data/projects";
import { services } from "../data/services";
import { teamMembers } from "../data/team";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import SEOHead from "../components/SEOHead";
import { pageSEO } from "../utils/seo";
import TestimonialCarousel from "../components/TestimonialCarousel";
import useReveal from "../hooks/useReveal";
import type { LucideIcon } from "lucide-react";

const BRAND_PRIMARY = "#435663";
const BRAND_ACCENT = "#06b6d4";
const BRAND_ACCENT_2 = "#f59e0b";
const GLASS_OPACITY = 0.12;
const GLASS_BLUR = 8;

const Home: React.FC = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const featured = useMemo(() => projects.filter((p) => p.featured), []);
  const decor = useMemo(() => projects.slice(0, 6).map((p) => p.image || "/default-project.jpg"), []);

  const roleRE = useMemo(() => /^(founder|co-?founder|ceo)$/i, []);
  const leaders = useMemo(() => {
    const list = teamMembers.filter((m) => {
      if (m.isFounder === true) return true;
      if (typeof m.role === "string" && roleRE.test(m.role.trim())) return true;
      return false;
    });

    const orderPriority = (m: any) => {
      const role = (m.role || "").toLowerCase();
      if (role.includes("founder") && !role.includes("co")) return 0;
      if (role.includes("co") && role.includes("founder")) return 1;
      if (role.includes("ceo")) return 2;
      return 3;
    };

    const filtered = list.filter((m) => !/keshav\s*sain/i.test(m.name));
    return filtered.sort((a, b) => orderPriority(a) - orderPriority(b));
  }, [roleRE]);

  const stats = useMemo(
    () => [
      { icon: Building, label: "Projects Completed", value: "150+" },
      { icon: Users, label: "Happy Clients", value: "120+" },
      { icon: Award, label: "Years Experience", value: "10+" },
      { icon: Star, label: "Client Satisfaction", value: "98%" },
    ],
    []
  );

  const reduceMotionPref = useReducedMotion();
  const heroIdxRef = useRef(0);
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    if (reduceMotionPref || featured.length <= 1) return;
    const id = window.setInterval(() => {
      heroIdxRef.current = (heroIdxRef.current + 1) % featured.length;
      setHeroIdx(heroIdxRef.current);
    }, 4000);
    return () => window.clearInterval(id);
  }, [featured.length, reduceMotionPref]);

  const openProject = useCallback((project: Project) => {
    setSelected(project);
    setModalOpen(true);
  }, []);

  const onProjectKeyDown = useCallback(
    (e: React.KeyboardEvent, project: Project) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openProject(project);
      }
    },
    [openProject]
  );

  const StatCard: React.FC<{
    value: string;
    label: string;
    index: number;
    icon: LucideIcon;
  }> = ({ value, label, index, icon: Icon }) => {
    const { ref, visible } = useReveal<HTMLDivElement>();
    const gradientEven = `linear-gradient(90deg, ${BRAND_PRIMARY}22, ${BRAND_ACCENT}10)`;
    const gradientOdd = `linear-gradient(90deg, ${BRAND_ACCENT_2}22, ${BRAND_PRIMARY}08)`;

    // simple count-up
    const [displayVal, setDisplayVal] = useState<string>(value);
    useEffect(() => {
      if (!visible) return;
      // parse numeric part
      const match = `${value}`.match(/^(\d+)(.*)$/);
      if (!match) {
        setDisplayVal(value);
        return;
      }
      const target = parseInt(match[1], 10);
      const suffix = match[2] || "";
      let start = Math.max(0, Math.floor(target * 0.6));
      const duration = 700; // ms
      const stepTime = 30;
      const steps = Math.max(6, Math.round(duration / stepTime));
      let current = start;
      const inc = Math.max(1, Math.round((target - start) / steps));
      const t = window.setInterval(() => {
        current = Math.min(target, current + inc);
        setDisplayVal(`${current}${suffix}`);
        if (current >= target) {
          clearInterval(t);
        }
      }, stepTime);
      return () => clearInterval(t);
    }, [visible, value]);

    return (
      <div
        ref={ref}
        className={`relative flex flex-col items-center justify-center p-6 rounded-2xl transition-transform duration-500 transform-gpu will-change-transform
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          hover:-translate-y-3 hover:shadow-2xl`}
      >
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 shadow"
          style={{
            background: "rgba(255,255,255,0.18)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: BRAND_PRIMARY,
          }}
          aria-hidden
        >
          <Icon size={20} aria-hidden="true" />
        </div>

        <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{displayVal}</div>
        <div className="text-gray-700 text-sm">{label}</div>

        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: -1,
            transform: "translateY(0.35rem)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 16,
              opacity: 0.08,
              background: index % 2 === 0 ? gradientEven : gradientOdd,
              filter: "blur(18px)",
            }}
          />
        </div>
      </div>
    );
  };

  const FloatImage: React.FC<{ src: string; additionalClasses?: string }> = ({ src, additionalClasses }) => {
    const { ref, visible } = useReveal<HTMLDivElement>();
    return (
      <div
        ref={ref}
        className={`rounded-lg overflow-hidden shadow-lg transform-gpu will-change-transform transition duration-600
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          hover:-translate-y-3 hover:shadow-2xl ${additionalClasses || ""}`}
        aria-hidden
      >
        <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
      </div>
    );
  };

  return (
    <>
      <SEOHead seo={pageSEO.home} />
      <header className="relative h-screen flex items-center justify-center text-white">
        <picture className="absolute inset-0 w-full h-full">
          <source
            type="image/avif"
            srcSet="/assets/optimized/hero-1920.avif 1920w, /assets/optimized/hero-1024.avif 1024w, /assets/optimized/hero-768.avif 768w"
            sizes="(max-width: 768px) 100vw, 1240px"
          />
          <source
            type="image/webp"
            srcSet="/assets/optimized/hero-1920.webp 1920w, /assets/optimized/hero-1024.webp 1024w, /assets/optimized/hero-768.webp 768w"
            sizes="(max-width: 768px) 100vw, 1240px"
          />
          <img
            src="/assets/optimized/hero-768.jpg"
            alt="Modern interior design exterior at dusk by Younick Design Studio"
            className="absolute inset-0 w-full h-full object-cover hero-zoom"
            width={768}
            height={513}
            loading="eager"
            decoding="async"
            style={{ objectPosition: "center center" }}
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              if (!img.dataset.fallbackAttempted) {
                img.dataset.fallbackAttempted = "1";
                img.src = "/assets/hero.jpg";
                return;
              }
              if (!img.dataset.finalFallback) {
                img.dataset.finalFallback = "1";
                img.src = "/assets/hero-fallback.jpg";
              }
            }}
          />
        </picture>

        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight mb-6 text-[#FCF9EA]"
            style={{ fontFamily: "'Apple Chancery', cursive", textShadow: "0 6px 18px rgba(0,0,0,0.45)" }}
          >
            Interiors that feel timeless,
            <br /> crafted for the way you live
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto text-[#D3D4D8]">
            From smart space planning to premium finishes, we design and deliver homes that blend beauty with function.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#E6B566] to-[#D08E1A] text-[#0D0D0D] font-semibold shadow-lg hover:brightness-95 transition"
              aria-label="Start transformation"
            >
              Start My Transformation <ArrowRight size={18} />
            </Link>

            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-gray-900 font-semibold shadow hover:brightness-95 transition"
              aria-label="View portfolio"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </header>

      <section className="relative py-12">
        <div
          className="absolute inset-0"
          style={{
            background: `rgba(255,255,255,${GLASS_OPACITY})`,
            backdropFilter: `blur(${GLASS_BLUR}px)`,
          }}
          aria-hidden
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <StatCard key={i} value={s.value} label={s.label} index={i} icon={s.icon} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#FFF8F8] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-3xl md:text-4xl font-extrabold mb-6 bg-gradient-to-r from-[#86B0BD] to-[#E6B566] text-transparent bg-clip-text"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.10)",
                }}
              >
                Why Choose Younick Design Studio
              </h2>

              <p className="text-lg text-gray-700 mb-6 max-w-xl">
                Transforming spaces, elevating lives we design interiors that reflect who you are and how you live. Our approach blends creativity,
                technical expertise, and careful project management to deliver beautiful, functional spaces.
              </p>

              <ul className="grid gap-4 sm:grid-cols-2">
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 rounded-lg p-3" style={{ background: "linear-gradient(180deg,#f0f7ff,#ffffff)" }} aria-hidden>
                    <Dot size={20} className="text-blue-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-semibold">Tailored Creativity</h4>
                    <p className="text-gray-600 text-sm">Designs built around your lifestyle and tastes never one size fits all.</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 rounded-lg p-3" style={{ background: "linear-gradient(180deg,#f6fff6,#ffffff)" }} aria-hidden>
                    <Dot size={20} className="text-green-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-semibold">Quality Craftsmanship</h4>
                    <p className="text-gray-600 text-sm">On site standards and materials that last.</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 rounded-lg p-3" style={{ background: "linear-gradient(180deg,#fff8ec,#ffffff)" }} aria-hidden>
                    <Dot size={20} className="text-amber-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-semibold">Collaborative Process</h4>
                    <p className="text-gray-600 text-sm">We involve you from start to finish moodboards to final walkthroughs.</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 rounded-lg p-3" style={{ background: "linear-gradient(180deg,#f3f6ff,#ffffff)" }} aria-hidden>
                    <Dot size={20} className="text-indigo-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-semibold">Visualization & Precision</h4>
                    <p className="text-gray-600 text-sm">3D visuals and meticulous planning reduce surprises and speed delivery.</p>
                  </div>
                </li>
              </ul>

              <div className="mt-14">
                <Link
                  to="/about"
                  className="inline-flex items-center px-4 py-3 bg-[#222831] text-[#E6B566] rounded-lg shadow hover:-translate-y-0.5 hover:bg-gray-500 hover:shadow-lg transition font-medium"
                >
                  Learn More About Us
                </Link>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="w-full rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/assets/whychoose.avif"
                  alt="Sample interior by Younick"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[420px] object-cover rounded-2xl transition-transform duration-500 hover:-translate-y-1"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#FFFDF6] relative overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <img
            src="/assets/undraw_loving-story_k8gb.svg"
            alt=""
            className="hidden lg:block pointer-events-none absolute right-8 -top-6 w-80 opacity-5 z-0 select-none filter blur-sm"
            aria-hidden="true"
          />

          <div className="relative z-10 text-left mb-12 lg:pr-40">
            <h2
              className="text-4xl font-bold mb-8 bg-gradient-to-r from-[#19183B] to-[#E6B566] text-transparent bg-clip-text"
              style={{
                fontFamily: "'Apple Chancery', serif",
                textDecoration: "underline",
                textUnderlineOffset: "6px",
                textShadow: "0 6px 18px rgba(0,0,0,0.08)",
              }}
            >
              Featured Projects
            </h2>

            <p className="text-left text-lg max-w-3xl leading-relaxed text-gray-600 mb-16">
              Discover a curated selection of our most distinguished works each a reflection of our belief in design that feels personal, functional, and timeless.
              Our projects blend innovation with authenticity, creating interiors that inspire connection and comfort. Whether residential or commercial, every Younick project begins
              with understanding your vision and ends with an experience that feels effortlessly yours.
              <br />
              <strong>Explore how Younick Design Studio turns everyday spaces into living works of art.</strong>
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featured.map((project) => (
              <div
                key={project.id}
                role="button"
                tabIndex={0}
                onClick={() => openProject(project)}
                onKeyDown={(e) => onProjectKeyDown(e, project)}
                className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg transform transition hover:-translate-y-1"
                aria-label={`Open project ${project.title}`}
              >
                <ProjectCard project={project} onClick={() => openProject(project)} />
              </div>
            ))}
          </div>

          <div className="text-center relative z-10">
            <Link
              to="/projects"
              className="inline-flex items-center space-x-2 bg-[#222831] text-[#E6B566] rounded-lg shadow hover:-translate-y-0.5 hover:bg-gray-500 hover:shadow-lg transition font-medium px-6 py-3 hover:bg-opacity-70 "
              aria-label="View all projects"
            >
              <span>View All Projects</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* -------------- Services (REPLACED: alternating horizontal cards per your request) -------------- */}
      <section className="py-16 bg-gray-50 relative overflow-visible">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-10 relative">
          <div className="text-left mb-12 relative z-10 lg:pr-40">
            <h2
              className="text-left text-4xl font-bold text-gray-900 mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#19183B] to-[#E6B566]"
              style={{
                fontFamily: "'Apple Chancery', serif",
                textDecoration: "underline",
                textUnderlineOffset: "6px",
                textShadow: "0 6px 18px rgba(0,0,0,0.08)",
              }}
            >
              Our Services
            </h2>
            <p className="text-lg max-w-3xl leading-relaxed mb-16 text-gray-600 text-left">
              At <strong>YOUNICK Design Studio</strong>, we provide end to end design and construction services that blend creativity, precision, and craftsmanship. From the first sketch to 3D visualization and on site execution, our process ensures every project is delivered seamlessly on time, within budget, and beyond expectations.
            </p>
          </div>

          <div className="relative z-10 space-y-8">
            {services.map((service, i) => {
              const reverse = i % 2 === 1; // alternate image left/right
              return (
                <article
                  key={service.id}
                  className={`service-card group relative overflow-hidden bg-white rounded-2xl shadow-lg transition-all duration-500 ${reverse ? "md:flex-row-reverse" : ""} flex flex-col md:flex-row items-stretch`}
                  aria-label={`Service ${service.title}`}
                >
                  {/* image */}
                  <div className="service-img-wrapper md:w-1/2 w-full h-64 md:h-80 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="service-img w-full h-full object-cover transform transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  {/* content */}
                  <div className="service-content md:w-1/2 w-full p-8 flex flex-col justify-center transition-transform duration-500">
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">{service.title}</h3>
                    <p className="text-gray-700 mb-5">{service.description}</p>

                    <ul className="flex flex-wrap gap-3 mb-6">
                      {service.features.slice(0, 6).map((f, idx) => (
                        <li key={idx} className="text-sm bg-[#F5F7FA] px-3 py-1.5 rounded-full border border-gray-100">
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div>
                      <Link
                        to={`/projects?filter=${service.id}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#222831] text-[#E6B566] rounded-md font-medium hover:-translate-y-0.5 transition"
                      >
                        View Projects <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="absolute inset-0 -z-10" style={{ background: `linear-gradient(180deg, ${BRAND_PRIMARY}10, #ffffff)` }} aria-hidden />
        <div className="hidden lg:block absolute right-8 top-28 z-0">
          <div className="flex flex-col gap-2 items-end">
            <div style={{ width: 160, height: 120 }}>
              <FloatImage src={decor[0]} additionalClasses="w-40 h-28 rounded-xl" />
            </div>
            <div style={{ width: 140, height: 110 }} className="-translate-x-6">
              <FloatImage src={decor[1]} additionalClasses="w-32 h-24 rounded-lg" />
            </div>
            <div style={{ width: 120, height: 90 }} className="translate-y-6">
              <FloatImage src={decor[2]} additionalClasses="w-24 h-20 rounded-lg" />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Apple Chancery', cursive", textShadow: "0 6px 18px rgba(0,0,0,0.45)" }}>
              What Our Clients Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-10">
              Feedback from clients we’ve partnered with on design and construction projects each testimonial a reflection of our shared passion for creating spaces that inspire and endure.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto z-10">
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-transparent">
              <TestimonialCarousel />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-3 mt-10">Leadership</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-6 ">Founders, Co-Founders and CEO leading Younick Design Studio</p>
          </div>

          <div className="flex items-stretch justify-center gap-8 flex-wrap mb-12">
            {leaders.map((member) => {
              const imgSrc = (member as any).image || "/default-avatar.jpg";
              return (
                <div
                  key={member.id || member.name}
                  className="w-64 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:-translate-y-1 hover:shadow-xl transition"
                >
                  <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100">
                    <img src={imgSrc} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-[#748DAE] font-medium">{member.role}</p>
                  </div>
                  <p className="mt-3 text-sm text-gray-600 line-clamp-3">
                    {(member as any).bio || (member as any).about || "Core member of Younick leadership, driving design and innovation."}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link to="/team" className="inline-flex items-center space-x-1 bg-gradient-to-r from-[#BADFDB] to-[#FCF9EA] text-[#2F5755] px-5 py-3.5 rounded-lg transition font-medium">
              <span>Meet Our Full Team</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {selected && <ProjectModal project={selected} isOpen={modalOpen} onClose={() => setModalOpen(false)} />}

      {/* Custom small styles for the service-card hover/parallax and hero zoom */}
      <style>{`
        .service-card { will-change: transform; }
        .service-card .service-img { transform-origin: center; }
        /* hover effect (image zoom + content lift) */
        .service-card:hover .service-img,
        .service-card.group:hover .service-img {
          transform: scale(1.08);
        }
        .service-card:hover .service-content,
        .service-card.group:hover .service-content {
          transform: translateY(-8px);
        }
        /* small screens: stack image on top, no hover transform for accessibility */
        @media (max-width: 768px) {
          .service-card .service-img { transform: none !important; }
          .service-card .service-content { transform: none !important; }
        }

        /* subtle, slow zoom for hero image */
        .hero-zoom {
          animation: slowZoom 18s linear infinite;
          will-change: transform;
          transform-origin: center;
        }
        @keyframes slowZoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.04); }
          100% { transform: scale(1); }
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (max-width: 1024px) {
          .contact-page-bg .bg-white { background-clip: padding-box; }
        }

        @media (min-width: 1400px) {
          header h1 { font-size: 5.25rem; line-height: 1.02; }
        }
      `}</style>
    </>
  );
};

export default Home;
