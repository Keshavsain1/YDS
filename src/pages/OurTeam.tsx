// src/pages/OurTeam.tsx
import React, { useEffect } from "react";
import { teamMembers } from "../data/team";
import TeamMember from "../components/TeamMember";
import SEOHead from "../components/SEOHead";
import { pageSEO } from "../utils/seo";
import { useLocation } from "react-router-dom";
import { Building, Users, Award, Star } from "lucide-react";

const StatItem: React.FC<{ icon: any; label: string; value: string }> = ({ icon: Icon, label, value }) => {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm">
      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        <Icon size={20} />
      </div>
      <div>
        <div className="text-lg font-semibold text-gray-900">{value}</div>
        <div className="text-sm text-gray-600">{label}</div>
      </div>
    </div>
  );
};

const OurTeam: React.FC = () => {
  // helper to detect founder/co-founder roles from role text
  const isFounderRole = (roleRaw?: string) => {
    const role = (roleRaw || "").toString().toLowerCase().trim();
    return /^(founder|co-?founder)/i.test(role);
  };

  // Leaders: include only true founders & co-founders (role text must match)
  const leaders = teamMembers.filter((member) => member.isFounder === true && isFounderRole(member.role));

  /**
   * Grid members: include everyone *except* founders/co-founders.
   * This handles anomalies where someone may have isFounder:true but a role like "CEO" —
   * if their role text is not founder/co-founder, they'll still appear in the grid.
   */
  const gridMembers = teamMembers.filter((member) => {
    return !isFounderRole(member.role);
  });

  const loc = useLocation();

  useEffect(() => {
    if (!loc.hash) return;
    const id = loc.hash.replace("#", "");
    const el = document.getElementById(`member-${id}`);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        (el as HTMLElement).focus();
        el.classList.add("ring-4", "ring-blue-200", "rounded-xl");
        setTimeout(() => el.classList.remove("ring-4", "ring-blue-200", "rounded-xl"), 2200);
      }, 80);
    }
  }, [loc.hash]);

  return (
    <>
      <SEOHead seo={pageSEO.team} />

      <div className="pt-28 relative overflow-hidden">
        {/* layered decorative background (multiple layers for depth) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(250,250,252,1) 0%, rgba(245,247,250,1) 40%, rgba(255,255,255,1) 100%)",
          }}
        />
        {/* subtle radial layers */}
        <div
          aria-hidden
          className="absolute -left-20 -top-40 w-[520px] h-[520px] rounded-full -z-20 opacity-30 hidden lg:block"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.08) 0%, rgba(99,102,241,0.02) 40%, rgba(255,255,255,0) 60%)",
            filter: "blur(36px)",
          }}
        />
        <div
          aria-hidden
          className="absolute -right-28 top-10 w-[420px] h-[420px] rounded-full -z-20 opacity-25 hidden lg:block"
          style={{
            background:
              "radial-gradient(circle at 70% 40%, rgba(6,182,212,0.06) 0%, rgba(6,182,212,0.01) 45%, rgba(255,255,255,0) 70%)",
            filter: "blur(44px)",
          }}
        />
        <div
          aria-hidden
          className="absolute left-1/2 -bottom-40 -translate-x-1/2 w-[900px] h-[400px] -z-20 opacity-12"
          style={{
            background:
              "linear-gradient(90deg, rgba(250,243,236,1) 0%, rgba(245,250,255,1) 50%, rgba(250,243,236,1) 100%)",
            filter: "blur(24px)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 relative">
          {/* ---------- HERO SECTION (airy, slightly bigger) ---------- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12 mt-6">
            <div className="lg:col-span-4 flex items-start">
              <h1
                className="text-6xl sm:text-6xl md:text-5xl font-extrabold leading-tight text-gray-900"
                style={{ lineHeight: 0.95 }}
              >
                The people
                <br />
                shaping beautiful
                <br />
                homes
              </h1>
            </div>

            <div className="lg:col-span-8 flex items-center">
              <p className="text-lg lg:text-2xl text-gray-600 max-w-3xl">
                We pride ourselves in providing design services of the highest quality and our clients can have bespoke designs made up for them.
                We enjoy working on bespoke designs for our potential clients. Our leadership and design team work closely with clients to ensure design
                and execution are completed with the utmost satisfaction and consideration. Designers, engineers and makers — a close-knit, focused team
                who turn ideas into crafted living spaces.
              </p>
            </div>
          </div>

          {/* ---------- QUICK STATS (compact) ---------- */}
          <section className="mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatItem icon={Building} label="Projects Completed" value="150+" />
              <StatItem icon={Users} label="Happy Clients" value="120+" />
              <StatItem icon={Award} label="Years Experience" value="10+" />
            </div>
          </section>

          {/* ---------- VALUES ---------- */}
          <section className="mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Values</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-gray-700">
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-blue-600">
                    <Star size={18} />
                  </div>
                  <div>
                    <div className="font-semibold">Client First</div>
                    <div className="text-sm">Design decisions rooted in client needs and lifestyle.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 text-blue-600">
                    <Star size={18} />
                  </div>
                  <div>
                    <div className="font-semibold">Craftsmanship</div>
                    <div className="text-sm">Attention to detail from sketch to site execution.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 text-blue-600">
                    <Star size={18} />
                  </div>
                  <div>
                    <div className="font-semibold">Sustainability</div>
                    <div className="text-sm">Long-lasting, responsible material choices.</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ---------- SELECTED WORK (gallery using real thumbnails) ---------- */}
          <section className="py-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Selected Work</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="rounded-lg overflow-hidden h-56 bg-gray-100 shadow-sm">
                <img
                  src="/assets/optimized/gallery/g1-768.jpeg"
                  alt="Selected project 1"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="rounded-lg overflow-hidden h-56 bg-gray-100 shadow-sm">
                <img
                  src="/assets/optimized/gallery/g2-768.jpeg"
                  alt="Selected project 2"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="rounded-lg overflow-hidden h-56 bg-gray-100 shadow-sm">
                <img
                  src="/assets/optimized/gallery/g3-768.jpeg"
                  alt="Selected project 3"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </section>

          {/* ---------- LEADERS SECTION (founders/co-founders) ---------- */}
          <section className="space-y-10 mt-6">
            {leaders.length === 0 ? (
              <div className="text-center text-gray-600">Leadership profiles are not available right now.</div>
            ) : (
              leaders.map((lead) => (
                <section
                  key={lead.id}
                  id={`member-${lead.id}`}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-white rounded-2xl shadow p-6"
                >
                  <div className="lg:col-span-4">
                    <div className="w-full h-56 overflow-hidden rounded-lg bg-gray-100">
                      <img
                        src={lead.image}
                        alt={lead.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-8">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-900">{lead.name}</h2>
                        <p className="text-sm text-[#748DAE] font-medium mb-3">{lead.role}</p>
                      </div>

                      {lead.badge && (
                        <div className="hidden md:block">
                          <span className="text-xs px-3 py-1 rounded-full bg-amber-500 text-white font-semibold shadow">
                            {lead.badge}
                          </span>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-700 mb-4">{lead.description}</p>

                    <div className="md:flex md:items-start md:gap-8">
                      <div className="mb-4 md:mb-0">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Expertise</h4>
                        <div className="flex flex-wrap gap-2">
                          {lead.expertise.map((s, i) => (
                            <span key={i} className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Contact</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          {lead.contact?.email && (
                            <div>
                              Email:{" "}
                              <a className="text-indigo-600" href={`mailto:${lead.contact.email}`}>
                                {lead.contact.email}
                              </a>
                            </div>
                          )}
                          {lead.contact?.phone && (
                            <div>
                              Phone: <a className="text-indigo-600" href={`tel:${lead.contact.phone}`}>{lead.contact.phone}</a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              ))
            )}
          </section>

          {/* ---------- MEET THE TEAM GRID (everyone except founders/co-founders) ---------- */}
          <section className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Meet The Team</h3>
            <p className="text-gray-700 mb-6">Our talented team is the backbone of our success — get to know the people who make it all happen.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridMembers.map((m) => (
                <TeamMember key={m.id} member={m} />
              ))}
            </div>
          </section>

          {/* ---------- JOIN US CTA ---------- */}
          <div className="mt-12">
            <div className="rounded-lg bg-white/60 p-6 border border-gray-100">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Join the team</h4>
                  <p className="text-sm text-gray-600">Designers, architects & builders — send your CV/Portfolio.</p>
                </div>
                <a
                  href="mailto:careers@younickdesign.com"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-[#BADFDB] to-[#FCF9EA] text-[#2F5755] rounded-md hover:opacity-95 transition"
                >
                  Send Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        [id^="member-"]:focus {
          outline: none;
          box-shadow: 0 0 0 4px rgba(37,99,235,0.12);
          border-radius: 12px;
        }
      `}</style>
    </>
  );
};

export default OurTeam;
