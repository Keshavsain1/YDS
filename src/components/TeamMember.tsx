// src/components/TeamMember.tsx
import React, { useState } from "react";
import { Mail, Phone, MessageCircle, Linkedin, Instagram } from "lucide-react";
import { TeamMember as TeamMemberType } from "../data/team";

interface TeamMemberProps {
  member: TeamMemberType;
}

const TeamMember: React.FC<TeamMemberProps> = ({ member }) => {
  const isCompact = !!(member.isFounder && (member.badge?.toLowerCase?.() !== "member"));

  const buildSrcSet = () => {
    const parts: string[] = [];
    if (member.image480) parts.push(`${member.image480} 480w`);
    if (member.image768) parts.push(`${member.image768} 768w`);
    if (member.image) parts.push(`${member.image} 1024w`);
    return parts.join(", ");
  };

  const srcSet = buildSrcSet();
  const sizes = "(max-width:600px) 480px, (max-width:1024px) 768px, 1024px";

  const initials =
    (member.name || "")
      .split(" ")
      .map((p) => p[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

  const placeholderSvg = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='512' height='512'><rect width='100%' height='100%' fill='#f3f4f6'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Inter, system-ui, sans-serif' font-size='180' fill='#9ca3af'>${initials}</text></svg>`
  );
  const placeholderDataUrl = `data:image/svg+xml;utf8,${placeholderSvg}`;

  const [imgSrc, setImgSrc] = useState<string>(member.image || placeholderDataUrl);
  const onImgError = () => {
    if (imgSrc !== placeholderDataUrl) setImgSrc(placeholderDataUrl);
  };

  const whatsappDigits = member.contact?.whatsapp ? member.contact.whatsapp.replace(/[^0-9+]/g, "") : "";

  const showBadge =
    !!(member.badge && member.badge.toString().trim().length > 0) ||
    (member.isFounder && (member.badge?.toLowerCase?.() !== "member"));

  const badgeText =
    member.badge && member.badge.toString().trim().length > 0
      ? member.badge
      : member.isFounder
      ? "Founder"
      : "";

  return (
    <article
      id={`member-${member.id}`}
      tabIndex={-1}
      className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 ${
        isCompact ? "hover:-translate-y-1" : "hover:-translate-y-2"
      } focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-100`}
      role="article"
      aria-label={`Team member: ${member.name}`}
    >
      {/* Image + Hover overlay */}
      <div className={`relative overflow-hidden ${isCompact ? "h-48" : "h-64"}`}>
        <img
          src={imgSrc}
          srcSet={srcSet || undefined}
          sizes={srcSet ? sizes : undefined}
          alt={member.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
          onError={onImgError}
        />

        {/* glass hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-400 flex items-end justify-center text-center p-4">
          <p className="text-sm text-gray-100 italic leading-snug max-w-xs">
            {member.description || "Passionate about creating beautiful, functional spaces."}
          </p>
        </div>

        {showBadge && (
          <div className="absolute top-3 right-3">
            <span className="bg-gradient-to-r from-amber-500 to-yellow-400 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm drop-shadow-sm">
              {badgeText}
            </span>
          </div>
        )}
      </div>

      <div className={`${isCompact ? "p-4" : "p-6"}`}>
        <h3 className={`${isCompact ? "text-lg" : "text-xl"} font-semibold text-gray-900 mb-1`}>
          {member.name}
        </h3>
        <p className={`${isCompact ? "text-sm" : "text-base"} text-[#748DAE] font-medium mb-3`}>
          {member.role}
        </p>

        <p className={`text-gray-600 mb-4 ${isCompact ? "text-sm" : ""}`}>
          {member.description}
        </p>

        {Array.isArray(member.expertise) && member.expertise.length > 0 && (
          <div className={`${isCompact ? "mb-3" : "mb-6"}`}>
            {!isCompact && (
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Expertise</h4>
            )}
            <div className="flex flex-wrap gap-2">
              {member.expertise.map((skill, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 rounded-full text-sm ${
                    isCompact
                      ? "bg-gray-100 text-gray-800"
                      : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                  } transition`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className={`space-y-2 border-t border-gray-100 ${isCompact ? "pt-2" : "pt-4"}`}>
          <h4 className="text-sm font-semibold text-gray-900">Contact</h4>

          {member.contact?.email && (
            <a
              href={`mailto:${member.contact.email}`}
              className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition text-sm"
            >
              <Mail size={14} />
              <span>{member.contact.email}</span>
            </a>
          )}

          {member.contact?.phone && (
            <a
              href={`tel:${member.contact.phone}`}
              className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition text-sm"
            >
              <Phone size={14} />
              <span>{member.contact.phone}</span>
            </a>
          )}

          {whatsappDigits && (
            <a
              href={`https://wa.me/${whatsappDigits.replace(/^\+/, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-gray-600 hover:text-green-600 transition text-sm"
            >
              <MessageCircle size={14} />
              <span>WhatsApp</span>
            </a>
          )}

          {(member.social?.linkedin || member.social?.instagram) && (
            <div className="flex space-x-3 pt-2">
              {member.social?.linkedin && (
                <a
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                  aria-label={`${member.name} LinkedIn`}
                >
                  <Linkedin size={14} />
                </a>
              )}
              {member.social?.instagram && (
                <a
                  href={member.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 bg-pink-50 text-pink-600 rounded-md hover:bg-pink-100 transition-colors"
                  aria-label={`${member.name} Instagram`}
                >
                  <Instagram size={14} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default TeamMember;
