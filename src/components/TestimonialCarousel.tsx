// src/components/TestimonialCarousel.tsx
import React, { useEffect, useState, useCallback } from "react";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Ritika Sharma",
    meta: "Jaipur — Home Renovation",
    rating: 5,
    quote:
      "The team transformed our house into a dream home. Fantastic attention to detail and timely delivery.",
  },
  {
    name: "Amit Verma",
    meta: "Udaipur — Office Fitout",
    rating: 4,
    quote:
      "Very professional and collaborative. The workspace looks modern and functions perfectly.",
  },
  {
    name: "Neha & Raj",
    meta: "Jodhpur — Apartment",
    rating: 5,
    quote:
      "We loved the 3D visuals — it made decisions so much easier. The result exceeded expectations.",
  },
];

const TestimonialCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // auto-advance timer
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % TESTIMONIALS.length);
        setFade(true);
      }, 500);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // keyboard navigation
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setFade(false);
        setTimeout(() => {
          setIndex((i) => (i + 1) % TESTIMONIALS.length);
          setFade(true);
        }, 300);
      } else if (e.key === "ArrowLeft") {
        setFade(false);
        setTimeout(() => {
          setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
          setFade(true);
        }, 300);
      }
    },
    []
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const goPrev = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
      setFade(true);
    }, 300);
  };

  const goNext = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
      setFade(true);
    }, 300);
  };

  const t = TESTIMONIALS[index];

  return (
    <div
      className="relative max-w-4xl mx-auto"
      role="region"
      aria-label="Client testimonials carousel"
      aria-live="polite"
    >
      <div
        className={`relative bg-gradient-to-tr from-white via-[#FDFBF8] to-[#FFF9ED] border border-gray-100 rounded-2xl p-6 md:p-10 shadow-lg transition-all duration-500 ease-[cubic-bezier(.4,.1,.3,1)] ${
          fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        {/* subtle background accent */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at top right, rgba(230,181,102,0.08), transparent 70%)`,
          }}
        />
        <div className="relative z-10 flex flex-col md:flex-row items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex flex-wrap items-center mb-2">
              <h4 className="font-semibold text-gray-900 mr-3 text-lg">{t.name}</h4>
              <span className="text-sm text-gray-500">{t.meta}</span>
            </div>

            <div className="flex items-center text-[#FFD966] mb-4">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill="currentColor"
                  className="drop-shadow-sm transition-transform duration-500 group-hover:scale-110"
                />
              ))}
            </div>

            <p className="text-gray-700 leading-relaxed text-base italic">
              “{t.quote}”
            </p>
          </div>

          <div className="hidden md:flex flex-col space-y-2 items-center self-center">
            <button
              onClick={goPrev}
              aria-label="Previous testimonial"
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E6B566]"
            >
              ‹
            </button>
            <button
              onClick={goNext}
              aria-label="Next testimonial"
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E6B566]"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-6 space-x-3">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E6B566] ${
              i === index
                ? "bg-[#E6B566] scale-110 shadow"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
