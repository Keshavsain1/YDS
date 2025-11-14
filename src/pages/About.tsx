import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Heart, Clock, Users, ChevronDown } from "lucide-react";
import SEOHead from "../components/SEOHead";
import { pageSEO } from "../utils/seo";

type Faq = {
  question: string;
  answer: string;
};

const faqs: Faq[] = [
  {
    question: "Do you work nationwide?",
    answer:
      "We primarily operate across Rajasthan and Jaipur, and we take select projects nationwide. For remote projects we provide detailed visuals and phased on-site visits.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Timelines depend on scope — small renovations typically take 4–8 weeks; full residential projects commonly span several months with defined milestones.",
  },
  {
    question: "What's included in your design service?",
    answer:
      "Concept development, detailed drawings, 3D visualizations, material specifications, contractor coordination and site supervision (as required).",
  },
  {
    question: "Can you work with client's contractors?",
    answer:
      "Yes — we collaborate with client-preferred contractors or recommend trusted partners and manage quality to our standards.",
  },
];

const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-left">
          <h4 className="text-2xl font-bold text-gray-900">FAQs</h4>
          <p className="mt-2 text-gray-600 gap-3">
            Helpful answers about how we work, timelines and what to expect when you partner with Younick.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`relative rounded-2xl border border-white/10 bg-white/60 backdrop-blur-md shadow-lg overflow-hidden transition-transform duration-300
                  ${isOpen ? "scale-[1.01]" : "hover:scale-[1.005]"}`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${idx}`}
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-start justify-between gap-4 text-left focus:outline-none"
                >
                  <div>
                    <h5 id={`faq-${idx}`} className="text-lg font-semibold text-gray-900">
                      {faq.question}
                    </h5>
                    <p className="mt-1 text-sm text-gray-500">Tap to read the answer</p>
                  </div>

                  <ChevronDown
                    size={22}
                    className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-indigo-500" : "text-gray-400"}`}
                    aria-hidden
                  />
                </button>

                <div
                  id={`faq-panel-${idx}`}
                  role="region"
                  aria-labelledby={`faq-${idx}`}
                  className={`px-6 pb-6 transition-[max-height,opacity] duration-300 ease-[cubic-bezier(.2,.9,.2,1)] overflow-hidden ${
                    isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const About: React.FC = () => {
  return (
    <>
      <SEOHead seo={pageSEO.about} />

      <main className="pt-24 bg-gray-50 min-h-screen">
        <section className="relative bg-white pt-16 pb-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                About{" "}
                <span className="bg-gradient-to-r from-amber-600 to-teal-400 bg-clip-text text-transparent">
                  Younick Design Studio
                </span>
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                We design thoughtful interiors and deliver construction excellence across Rajasthan.
                Rooted in creativity and driven by craft, our work blends aesthetics, function and longevity.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm border border-gray-100 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                    <Briefcase size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Integrated Services</h4>
                    <p className="text-gray-600 text-sm">Design, visualization & construction under one roof.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm border border-gray-100 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                    <Heart size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Human-centered Design</h4>
                    <p className="text-gray-600 text-sm">We place people and lifestyle at the heart of every plan.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/younick-about-hero.jpg"
                  alt="Younick studio interior"
                  className="w-full h-80 object-cover transition-transform duration-500 hover:-translate-y-2"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="hidden sm:flex gap-3 mt-4">
                <img
                  src="/younick-thumb1.jpg"
                  alt="thumb 1"
                  className="w-32 h-20 object-cover rounded-md shadow-sm transition-transform duration-300 hover:-translate-y-2"
                  loading="lazy"
                  decoding="async"
                />
                <img
                  src="/younick-thumb2.jpg"
                  alt="thumb 2"
                  className="w-32 h-20 object-cover rounded-md shadow-sm transition-transform duration-300 hover:-translate-y-2"
                  loading="lazy"
                  decoding="async"
                />
                <img
                  src="/younick-thumb3.jpg"
                  alt="thumb 3"
                  className="w-32 h-20 object-cover rounded-md shadow-sm transition-transform duration-300 hover:-translate-y-2"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/younick-about-hero.jpg"
                alt="studio"
                className="w-full h-[520px] object-cover transition-transform duration-500 hover:-translate-y-2"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 pointer-events-none" />
            </div>

            <div>
              <div className="rounded-2xl bg-white/70 backdrop-blur-md border border-white/30 p-8 shadow-xl">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Design that lasts</h2>
                <p className="text-gray-700 mb-6">
                  We combine material thinking and craft-driven detailing to create environments that endure and comfort. Our approach balances architecture, interior detailing and site-sensitive construction.
                </p>

                <blockquote className="text-xl italic text-gray-600 mb-6">“Built with restraint. Finished with care.”</blockquote>

                <div className="flex gap-3">
                  <Link to="/projects" className="px-5 py-3 bg-[#18181B] text-[#e2e3e9] rounded-lg shadow hover:bg-[#E6B566] hover:text-[#18181B] transition">
                    Our Work
                  </Link>
                  <Link to="/contact" className="px-5 py-3 border border-gray-200 rounded-md hover:bg-gray-100 transition">
                    Contact
                  </Link>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">30+</div>
                    <div className="text-xs text-gray-500">Projects</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">2018</div>
                    <div className="text-xs text-gray-500">Since</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">Jaipur</div>
                    <div className="text-xs text-gray-500">Base</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-gray-100 bg-gray-50 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                  <Clock size={18} />
                </div>
                <h3 className="font-semibold text-gray-900">Timely Delivery</h3>
              </div>
              <p className="text-gray-600 text-sm">Organized timelines, clear milestones and efficient execution.</p>
            </div>

            <div className="p-6 rounded-xl border border-gray-100 bg-gray-50 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-green-50 text-green-600">
                  <Users size={18} />
                </div>
                <h3 className="font-semibold text-gray-900">Collaborative Teams</h3>
              </div>
              <p className="text-gray-600 text-sm">Cross-disciplinary teams working with clients and consultants.</p>
            </div>

            <div className="p-6 rounded-xl border border-gray-100 bg-gray-50 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-amber-50 text-amber-600">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 3v18" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                    <path d="M21 16V8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Quality Assurance</h3>
              </div>
              <p className="text-gray-600 text-sm">Inspections, material checks and finishing standards you can rely on.</p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-[#E6B566] text-[#0D0D0D] font-medium mb-14">Meet the Team</span>
            <h3 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#3BCFD4] to-[#FC9305] text-transparent bg-clip-text mb-10">The People Behind the Designs</h3>
            <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-base mb-20">
              We are a compact collective of designers, engineers and project managers who value craftsmanship, collaboration and clarity.
              Our process begins with listening — understanding how people live, move and inhabit spaces — and ends with carefully detailed execution.
              Each project is guided by practical timelines, material empathy and a focus on long-term value.
            </p>
            <div className="flex items-center justify-center font-semibold gap-4 mt-10">
              <Link
                to="/team"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#18181B] text-[#e2e3e9] rounded-lg shadow hover:bg-black/85 transition"
              >
                Meet The Full Team
              </Link>
            </div>
          </div>
        </section>

        <FAQSection />
      </main>
    </>
  );
};

export default About;
