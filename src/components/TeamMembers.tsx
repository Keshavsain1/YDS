// src/components/TeamMembers.tsx
import React, { useMemo } from "react";
import TeamMember from "./TeamMember";
import { teamMembers } from "../data/team";

interface TeamMembersProps {
  /**
   * When true, include founders/co-founders in the grid.
   * Default: false (show only non-founder team members — matches your requested behaviour).
   */
  includeFounders?: boolean;
}

const isFounderRole = (role?: string) => {
  if (!role) return false;
  return /^(founder|co-?founder)/i.test(role.trim());
};

const TeamMembers: React.FC<TeamMembersProps> = ({ includeFounders = false }) => {
  // compute displayed members once
  const membersToShow = useMemo(() => {
    if (includeFounders) return teamMembers;
    // exclude people whose role text says founder/co-founder
    return teamMembers.filter((m) => !isFounderRole(m.role));
  }, [includeFounders]);

  return (
    <section className="py-16 bg-gray-50" aria-labelledby="team-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="team-heading" className="text-4xl font-bold text-gray-900 mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The visionary designers and builders behind{" "}
            <span className="text-blue-600 font-semibold">Younick Design Studio</span>.
            Dedicated to creating extraordinary spaces with passion and expertise.
          </p>
        </div>

        {membersToShow.length === 0 ? (
          <div className="text-center text-gray-600 py-12">Team information is currently unavailable.</div>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            role="list"
            aria-live="polite"
          >
            {membersToShow.map((member) => (
              <div key={member.id} role="listitem">
                <TeamMember member={member} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamMembers;
