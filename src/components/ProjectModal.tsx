// src/components/ProjectModal.tsx
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "../data/projects";

type Props = {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function ProjectModal({ project, isOpen, onClose }: Props) {
  const portalRoot = typeof document !== "undefined" ? document.body : null;
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => setActiveIndex(0), [project?.id]);

  useEffect(() => {
    if (!portalRoot) return;
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(0, i - 1));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setActiveIndex((i) =>
          Math.min((project?.images?.length || 1) - 1, i + 1)
        );
      } else if (e.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      setTimeout(() => closeBtnRef.current?.focus(), 0);
      return () => {
        document.removeEventListener("keydown", handleKey);
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen, onClose, portalRoot, project?.images]);

  if (!portalRoot || !isOpen || !project) return null;

  const imgs = project.images?.length ? project.images : [project.image];
  const onOverlayClick = () => {
    setAnimating(true);
    setTimeout(onClose, 150);
  };
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 py-8 transition-opacity duration-300 ${
        animating ? "opacity-0" : "opacity-100"
      }`}
      onClick={onOverlayClick}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        ref={dialogRef}
        onClick={stop}
        className="relative z-10 mx-auto w-full max-w-6xl rounded-2xl overflow-hidden border border-[#2A2A2E] shadow-2xl transform transition-transform duration-300 scale-100 bg-gradient-to-br from-[#0d0d0f] via-[#121214] to-[#1b1b1f] text-[#EAEAEA]"
        style={{ height: "92vh" }}
      >
        <button
          ref={closeBtnRef}
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E6B566]"
        >
          <X />
        </button>

        <div className="flex flex-col md:flex-row h-full min-h-0">
          {/* --- Image Viewer --- */}
          <div
            className="flex-shrink-0 md:flex-1 relative bg-[#141414] flex items-center justify-center overflow-auto h-full"
            style={{ maxWidth: "60%", width: "100%" }}
          >
            <div className="flex items-center justify-center w-full px-5">
              <img
                src={imgs[activeIndex]}
                alt={`${project.title} ${activeIndex + 1}`}
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  img.onerror = null;
                  if (img.src.endsWith(".heic")) {
                    img.src = img.src.replace(/\.heic$/i, ".jpg");
                    return;
                  }
                  img.src = project.image || "/default-project.jpg";
                }}
                className="rounded-md object-contain transition-transform duration-700 will-change-transform hover:scale-[1.02]"
                style={{
                  maxHeight: "calc(92vh - 120px)",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            </div>

            {/* subtle glass glow */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 to-transparent" />

            {imgs.length > 1 && (
              <>
                <button
                  aria-label="Previous image"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex((i) => Math.max(0, i - 1));
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/40 text-white p-2 hover:bg-black/60 hover:scale-110 transition"
                >
                  <ArrowLeft />
                </button>
                <button
                  aria-label="Next image"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex((i) => Math.min(imgs.length - 1, i + 1));
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/40 text-white p-2 hover:bg-black/60 hover:scale-110 transition"
                >
                  <ArrowRight />
                </button>

                {/* Image dots */}
                <div className="absolute left-1/2 bottom-4 z-20 flex -translate-x-1/2 gap-2 rounded-md bg-black/40 px-2 py-1">
                  {imgs.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Go to image ${i + 1}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveIndex(i);
                      }}
                      className={`h-2 w-8 rounded-sm transition-all ${
                        i === activeIndex
                          ? "bg-[#E6B566] opacity-100"
                          : "bg-white/60 opacity-60 hover:opacity-90"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* --- Details Panel --- */}
          <div
            className="flex-1 overflow-auto p-6 md:p-8 bg-gradient-to-br from-[#111111] via-[#18181B] to-[#1E1E21] h-full"
            style={{ maxWidth: "40%" }}
          >
            <header>
              <h2 className="text-2xl font-semibold text-[#E6B566] tracking-tight">{project.title}</h2>
              {project.subtitle && (
                <p className="mt-1 text-sm text-[#bdbdbd]">{project.subtitle}</p>
              )}
            </header>

            <div className="mt-4 text-[#d7d7d7] leading-relaxed space-y-4">
              <p>{project.longDescription || project.description}</p>

              <dl className="space-y-3 text-sm text-[#bdbdbd]">
                {project.clientContact && (
                  <div>
                    <dt className="font-medium text-[#E6B566]">Client</dt>
                    <dd>{project.clientContact}</dd>
                  </div>
                )}

                {project.workScope && (
                  <div>
                    <dt className="font-medium text-[#E6B566]">Scope</dt>
                    <dd className="flex flex-wrap gap-2 mt-1">
                      {project.workScope.map((s, idx) => (
                        <span
                          key={idx}
                          className="rounded-full border border-[#3A3A3F] bg-[#1F1F22] text-[#E6B566] px-2 py-0.5 text-xs font-medium hover:bg-[#2A2A2E] transition"
                        >
                          {s}
                        </span>
                      ))}
                    </dd>
                  </div>
                )}

                {project.completionDate && (
                  <div>
                    <dt className="font-medium text-[#E6B566]">Completed</dt>
                    <dd>{project.completionDate}</dd>
                  </div>
                )}

                {project.area && (
                  <div>
                    <dt className="font-medium text-[#E6B566]">Area</dt>
                    <dd>{project.area}</dd>
                  </div>
                )}

                {project.location && (
                  <div>
                    <dt className="font-medium text-[#E6B566]">Location</dt>
                    <dd>{project.location}</dd>
                  </div>
                )}

                {project.tech && (
                  <div>
                    <dt className="font-medium text-[#E6B566]">Tech / Materials</dt>
                    <dd className="flex flex-wrap gap-2 mt-1">
                      {project.tech.map((t, i) => (
                        <span
                          key={i}
                          className="rounded-full border border-[#3A3A3F] bg-[#1F1F22] text-[#EAEAEA] px-2 py-0.5 text-xs font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="mt-6 flex gap-3">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-[#3A3A3F] bg-[#1F1F22] px-4 py-2 text-sm text-[#E6B566] hover:bg-[#2A2A2E] hover:text-[#F3C979] transition"
                >
                  View Live
                </a>
              )}

              <button
                onClick={onClose}
                className="rounded-md bg-[#E6B566] px-4 py-2 text-sm text-[#1b1b1b] font-medium hover:bg-[#f0c97e] transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>

        {/* --- Thumbnails --- */}
        {imgs.length > 1 && (
          <div className="hidden md:flex items-center gap-2 overflow-x-auto border-t px-4 py-3 bg-[#0d0d0f]">
            {imgs.map((src, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(i);
                }}
                aria-label={`Thumbnail ${i + 1}`}
                className={`flex-none rounded-md overflow-hidden border transition-transform ${
                  i === activeIndex
                    ? "border-[#E6B566] ring-1 ring-[#E6B566] scale-105"
                    : "border-[#2A2A2E] hover:scale-105"
                }`}
              >
                <img
                  src={src}
                  alt={`${project.title} ${i + 1}`}
                  className="h-16 w-24 object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    img.onerror = null;
                    if (img.src.endsWith(".heic")) {
                      img.src = img.src.replace(/\.heic$/i, ".jpg");
                      return;
                    }
                    img.src = project.image || "/default-project.jpg";
                  }}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>,
    portalRoot
  );
}
