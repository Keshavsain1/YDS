// src/pages/Services.tsx
import React from "react";
import SEOHead from "../components/SEOHead";
import { pageSEO } from "../utils/seo";
import ServiceCard from "../components/ServiceCard";
import { services } from "../data/services";
import { ArrowRight } from "lucide-react";

const Services: React.FC = () => {
  return (
    <>
      <SEOHead seo={pageSEO.services ?? { title: "Services - Younick" }} />

      <header className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 pointer-events-none">
          <picture>
            <source
              type="image/avif"
              srcSet="/assets/optimized/hero/hero-1920.avif 1920w, /assets/optimized/hero/hero-1440.avif 1440w, /assets/optimized/hero/hero-1024.avif 1024w"
              sizes="100vw"
            />
            <source
              type="image/webp"
              srcSet="/assets/optimized/hero/hero-1920.webp 1920w, /assets/optimized/hero/hero-1440.webp 1440w, /assets/optimized/hero/hero-1024.webp 1024w"
              sizes="100vw"
            />
            <img
              src="/assets/optimized/hero/hero-1024.jpg"
              alt="Curated interior by Younick Design Studio — sample project photo"
              className="absolute inset-0 w-full h-full object-cover opacity-40"
              width={1920}
              height={1080}
              loading="eager"
              decoding="async"
            />
          </picture>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">Services</h1>
          <p className="mt-4 text-lg text-gray-200 max-w-3xl mx-auto">
            End-to-end design and delivery — from concept and visualization to execution and project management.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <section aria-labelledby="services-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <h2 id="services-grid" className="sr-only">Our Services</h2>
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </section>

        <section className="bg-[#FFF8F8] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6" aria-label="Call to action — Start a project">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Have a project in mind?</h3>
            <p className="text-gray-600">Tell us about your space and we'll propose a tailored approach to meet your goals.</p>
          </div>
          <a
            href="/contact"
            role="button"
            aria-label="Start my project — contact Younick Design Studio"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#4D606E] text-[#EAEFEF] rounded-full font-semibold"
          >
            Start My Project <ArrowRight size={16} />
          </a>
        </section>
      </main>
    </>
  );
};

export default Services;
