// src/pages/Career.tsx
import React, { useState } from "react";
import SEOHead from "../components/SEOHead";
import { pageSEO } from "../utils/seo";

const Career: React.FC = () => {
  const [status, setStatus] = useState<null | "idle" | "sending" | "success">("idle");

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("success"), 800);
  };

  return (
    <>
      <SEOHead seo={pageSEO.career ?? { title: "Career - Younick" }} />
      <header className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Work With Us</h1>
          <p className="mt-4 text-lg text-gray-200 max-w-3xl mx-auto">We welcome designers, architects and makers — internships and roles open periodically.</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-2">Apply for Internship</h3>
            <p className="text-gray-600 mb-4">Short-term internships with mentorship and hands-on project work.</p>
            <form onSubmit={handleApply} className="space-y-3">
              <input required name="name" placeholder="Full name" className="w-full border px-3 py-2 rounded" />
              <input required name="email" placeholder="Email" type="email" className="w-full border px-3 py-2 rounded" />
              <input name="portfolio" placeholder="Portfolio link" className="w-full border px-3 py-2 rounded" />
              <button type="submit" className="px-4 py-2 bg-[#18181B] text-white rounded">Send Application</button>
              {status === "sending" && <div className="text-sm text-gray-500">Sending…</div>}
              {status === "success" && <div className="text-sm text-green-600">Application received — we will contact you.</div>}
            </form>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-2">Apply for Job</h3>
            <p className="text-gray-600 mb-4">Permanent roles with career growth and real responsibilities on projects.</p>
            <div className="space-y-3">
              <a href="/contact" className="inline-flex items-center px-4 py-2 bg-[#DFEFF0] text-gray-900 rounded">Contact HR</a>
              <p className="text-sm text-gray-500 mt-4">Or email your CV to <a href="mailto:careers@younickdesign.com" className="text-indigo-600">careers@younickdesign.com</a></p>
            </div>
          </div>
        </div>

        <section className="text-center">
          <h4 className="text-lg font-semibold mb-2">Why join Younick?</h4>
          <p className="text-gray-600 max-w-2xl mx-auto">Collaborative environment, mentorship from experienced designers, and exposure to full project lifecycle — from concept to completion.</p>
        </section>
      </main>
    </>
  );
};

export default Career;
