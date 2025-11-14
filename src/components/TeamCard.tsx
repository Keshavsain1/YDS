// src/components/TeamCard.tsx
import React, { useState } from "react";
import { Mail, Phone, Linkedin, Instagram } from "lucide-react";
import { TeamMember } from "../data/team";

interface TeamCardProps {
  member: TeamMember;
}

const TeamCard: React.FC<TeamCardProps> = ({ member }) => {
  // graceful image fallback for broken/missing URLs
  const [imgSrc, setImgSrc] = useState(member.image);
  const handleImgError = () => {
    if (!imgSrc.includes("data:image")) {
      const initials =
        member.name
          ?.split(" ")
          .map((w) => w[0])
          .join("")
          .toUpperCase() || "U";
      const svg = encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'>
          <rect width='100%' height='100%' fill='#f3f4f6'/>
          <text x='50%' y='50%' dy='.35em' text-anchor='middle' font-family='Inter, sans-serif' font-size='160' fill='#9ca3af'>${initials}</text>
        </svg>`
      );
      setImgSrc(`data:image/svg+xml;utf8,${svg}`);
    }
  };

  // determine whether to show a badge and what text to use
  const showBadge =
    !!(member.badge && member.badge.trim().length > 0) ||
    (member.isFounder && !(member.badge && member.badge.trim().toLowerCase() === "member"));

  const badgeText =
    member.badge && member.badge.trim().length > 0 ? member.badge : member.isFounder ? "Founder" : "";

  return (
    <article
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-transform duration-300"
      role="article"
      aria-label={`Team member: ${member.name}`}
    >
      {/* IMAGE — fixed aspect ratio so all cards match visually */}
      <div
        className="relative overflow-hidden bg-gray-100"
        // aspect ratio fallback: Tailwind aspect-* if available, plus inline style fallback
        style={{ aspectRatio: "4 / 3", WebkitMaskImage: "linear-gradient(#000, #000)" }}
      >
        <img
          src={imgSrc}
          alt={member.name}
          loading="lazy"
          decoding="async"
          onError={handleImgError}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
        />

        {showBadge && (
          <span className="absolute top-3 right-3 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
            {badgeText}
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
        <p className="text-blue-600 font-medium mb-3">{member.role}</p>
        <p className="text-gray-600 mb-4 line-clamp-4">{member.description}</p>

        {/* CONTACT / SOCIAL */}
        <div className="flex flex-wrap items-center gap-4 text-gray-600">
          {member.contact?.email && (
            <a
              href={`mailto:${member.contact.email}`}
              aria-label={`Email ${member.name}`}
              className="hover:text-blue-600 transition-colors"
            >
              <Mail size={18} aria-hidden="true" />
            </a>
          )}
          {member.contact?.phone && (
            <a
              href={`tel:${member.contact.phone}`}
              aria-label={`Call ${member.name}`}
              className="hover:text-blue-600 transition-colors"
            >
              <Phone size={18} aria-hidden="true" />
            </a>
          )}
          {member.social?.linkedin && (
            <a
              href={member.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="hover:text-blue-600 transition-colors"
            >
              <Linkedin size={18} aria-hidden="true" />
            </a>
          )}
          {member.social?.instagram && (
            <a
              href={member.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on Instagram`}
              className="hover:text-pink-600 transition-colors"
            >
              <Instagram size={18} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default TeamCard;
