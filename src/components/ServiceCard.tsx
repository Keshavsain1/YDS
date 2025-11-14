// src/components/ServiceCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Dot } from "lucide-react";
import { Service } from "../data/services";
import * as Icons from "lucide-react";

interface ServiceCardProps {
  service: Service;
  /**
   * variant:
   * - "default" (or omitted) -> original grid card used on Services page (keeps old layout)
   * - "home" -> horizontal card used on Home page where image and content sit side-by-side
   */
  variant?: "default" | "home";
  /**
   * Only used when variant="home". If true, image will be on the right and content on the left.
   * If false (default), image on left, content on right.
   */
  reverse?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, variant = "default", reverse = false }) => {
  const ServiceIcon =
    (Icons[service.icon as keyof typeof Icons] as React.ComponentType<any>) || Icons.LayoutDashboard;

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    img.onerror = null as any;
    img.src = "/assets/placeholder.jpg";
  };

  // ORIGINAL card (keeps old layout) for Services page
  if (variant !== "home") {
    return (
      <article
        className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-transform duration-300 focus-within:ring-4 focus-within:ring-indigo-100"
        role="article"
        aria-label={`Service: ${service.title}`}
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            loading="lazy"
            onError={handleImgError}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

          <div className="absolute bottom-4 left-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <ServiceIcon size={26} className="text-white" aria-hidden />
              <h3 className="text-xl font-semibold">{service.title}</h3>
            </div>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-600 mb-4">{service.description}</p>

          <ul className="space-y-2 mb-6">
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                <Dot size={16} className="text-sky-200" aria-hidden />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              to={`/projects?filter=${service.id}`}
              className="btn-gradient-swipe inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold shadow "
              aria-label={`View projects for ${service.title}`}
            >
              <span>View Projects</span>
              <ArrowRight size={18} />
            </Link>

            <Link
              to={`/services/${service.id}`}
              className="text-sm text-gray-600 hover:text-gray-800 transition"
              aria-label={`Learn more about ${service.title}`}
            >
              Learn more →
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // HOME variant: side-by-side layout, responsive, alternate left/right via reverse prop
  const containerDirection = reverse ? "md:flex-row-reverse" : "md:flex-row";
  const imgWrapperClasses = "w-full md:w-1/2 h-56 md:h-auto overflow-hidden";
  const contentWrapperClasses = "w-full md:w-1/2 p-6 flex flex-col justify-between";

  return (
    <article
      className={`bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-400 hover:-translate-y-1 ${containerDirection} flex flex-col md:flex-row items-stretch focus-within:ring-4 focus-within:ring-indigo-100`}
      role="article"
      aria-label={`Service (home): ${service.title}`}
    >
      <div className={`${imgWrapperClasses} bg-gray-100 relative`}>
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          onError={handleImgError}
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
          style={{ objectPosition: "center" }}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
      </div>

      <div className={contentWrapperClasses}>
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#F1FBFF] text-[#06b6d4] shadow-sm">
              <ServiceIcon size={20} aria-hidden />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
          </div>

          <p className="text-gray-700 mb-4">{service.description}</p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                <Dot size={16} className="mt-1 text-sky-200" aria-hidden />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between mt-3">
          <Link
            to={`/projects?filter=${service.id}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#222831] text-[#E6B566] font-medium hover:opacity-95 transition"
            aria-label={`View ${service.title} projects`}
          >
            View Projects
            <ArrowRight size={16} />
          </Link>

          <Link
            to={`/services/${service.id}`}
            className="text-sm text-gray-600 hover:text-gray-800 transition"
            aria-label={`Learn more about ${service.title}`}
          >
            Learn more →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ServiceCard;
