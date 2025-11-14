// src/pages/Projects.tsx
import React, { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, Grid, List, X } from "lucide-react";
import { projects as ALL_PROJECTS } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import SEOHead from "../components/SEOHead";
import { pageSEO } from "../utils/seo";

const HERO_IMAGE_BASE = "/assets/optimized/hero/hero";

const slugify = (s?: string) =>
  (s || "")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");

const parseDateScore = (d?: string) => {
  if (!d) return 0;
  const parsed = Date.parse(d);
  if (!isNaN(parsed)) return parsed;
  try {
    const alt = Date.parse("1 " + d);
    if (!isNaN(alt)) return alt;
  } catch {}
  return 0;
};

const Projects: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtered, setFiltered] = useState(ALL_PROJECTS);
  const [selected, setSelected] = useState<null | typeof ALL_PROJECTS[0]>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [category, setCategory] = useState(searchParams.get("filter") || "all");
  const [locationFilter, setLocationFilter] = useState(
    searchParams.get("location") || "all"
  );
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchText, setSearchText] = useState(
    searchParams.get("search") || searchParams.get("navSearch") || ""
  );

  const [tempCat, setTempCat] = useState(category);
  const [tempLoc, setTempLoc] = useState(locationFilter);
  const [tempSort, setTempSort] = useState(sort);
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement | null>(null);

  const categories = useMemo(
    () => [
      "all",
      ...Array.from(
        new Set(ALL_PROJECTS.map((p) => p.category || "Uncategorized"))
      ),
    ],
    []
  );

  const locations = useMemo(
    () => [
      "all",
      ...Array.from(new Set(ALL_PROJECTS.map((p) => p.location || "Unknown"))),
    ],
    []
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
        setTempCat(category);
        setTempLoc(locationFilter);
        setTempSort(sort);
      }
    }
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [category, locationFilter, sort]);

  const updateParams = (params: Record<string, string | undefined>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value && value !== "all" && value !== "newest") newParams.set(key, value);
      else newParams.delete(key);
    });
    setSearchParams(newParams);
  };

  const applyFilters = () => {
    setCategory(tempCat);
    setLocationFilter(tempLoc);
    setSort(tempSort);
    updateParams({ filter: tempCat, location: tempLoc, sort: tempSort });
    setFilterOpen(false);
  };

  const clearAll = () => {
    setSearchText("");
    setCategory("all");
    setLocationFilter("all");
    setSort("newest");
    setTempCat("all");
    setTempLoc("all");
    setTempSort("newest");
    updateParams({
      search: "",
      filter: "all",
      location: "all",
      sort: "newest",
    });
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    updateParams({ search: searchText });
  };

  useEffect(() => {
    const appliedSearch =
      searchParams.get("search") || searchParams.get("navSearch") || "";
    const appliedFilter = searchParams.get("filter") || "all";
    const appliedLocation = searchParams.get("location") || "all";
    const appliedSort = searchParams.get("sort") || "newest";

    setCategory(appliedFilter);
    setLocationFilter(appliedLocation);
    setSort(appliedSort);
    setTempCat(appliedFilter);
    setTempLoc(appliedLocation);
    setTempSort(appliedSort);

    let results = [...ALL_PROJECTS];

    if (appliedFilter !== "all") {
      const want = slugify(appliedFilter);
      results = results.filter((p) => slugify(p.category) === want);
    }

    if (appliedLocation !== "all") {
      const wantLoc = slugify(appliedLocation);
      results = results.filter((p) => slugify(p.location) === wantLoc);
    }

    if (appliedSearch) {
      const s = appliedSearch.toLowerCase();
      results = results.filter((p) =>
        `${p.title} ${p.description || ""} ${p.category || ""} ${p.location || ""}`
          .toLowerCase()
          .includes(s)
      );
    }

    if (appliedSort === "az") results.sort((a, b) => a.title.localeCompare(b.title));
    else if (appliedSort === "za")
      results.sort((a, b) => b.title.localeCompare(a.title));
    else if (appliedSort === "newest") {
      results.sort(
        (a, b) => parseDateScore(b.completionDate) - parseDateScore(a.completionDate)
      );
    } else if (appliedSort === "oldest") {
      results.sort(
        (a, b) => parseDateScore(a.completionDate) - parseDateScore(b.completionDate)
      );
    }

    setFiltered(results);
  }, [searchParams]);

  const openProject = (proj: typeof ALL_PROJECTS[0]) => {
    setSelected(proj);
    setModalOpen(true);
  };
  const closeProject = () => {
    setModalOpen(false);
    setTimeout(() => setSelected(null), 150);
  };

  // --- SEO for Projects page (explicit fields)
  const seoForPage = {
    title: "Projects — Younick Design Studio",
    description:
      "Explore our portfolio of interior design and construction projects across Rajasthan — residential, commercial and bespoke spaces crafted by Younick Design Studio.",
    url: "/projects",
    image: "/assets/og/projects-cover.jpg",
    datePublished: "2025-11-01",
    dateModified: "2025-11-10",
  };

  return (
    <>
      {/* using explicit SEO props so social previews & search engines get correct metadata */}
      <SEOHead seo={seoForPage} type="article" />

      <header className="relative bg-gray-900 text-white">
        <picture className="absolute inset-0 w-full h-full">
          <source
            type="image/avif"
            srcSet={`${HERO_IMAGE_BASE}-1920.avif 1920w, ${HERO_IMAGE_BASE}-1440.avif 1440w, ${HERO_IMAGE_BASE}-1024.avif 1024w, ${HERO_IMAGE_BASE}-768.avif 768w, ${HERO_IMAGE_BASE}-480.avif 480w`}
            sizes="100vw"
          />
          <source
            type="image/webp"
            srcSet={`${HERO_IMAGE_BASE}-1920.webp 1920w, ${HERO_IMAGE_BASE}-1440.webp 1440w, ${HERO_IMAGE_BASE}-1024.webp 1024w, ${HERO_IMAGE_BASE}-768.webp 768w, ${HERO_IMAGE_BASE}-480.webp 480w`}
            sizes="100vw"
          />
          <img
            src={`${HERO_IMAGE_BASE}-1024.jpg`}
            alt="Projects hero"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            width={1920}
            height={1080}
            loading="eager"
            decoding="async"
          />
        </picture>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight"
            style={{
              fontFamily: "'Apple Chancery', cursive",
              textShadow: "0 6px 18px rgba(0,0,0,0.45)",
            }}
          >
            Our Projects
          </h1>
          <p className="mt-4 text-lg text-[#e2e3e9] max-w-3xl mx-auto">
            Explore our portfolio of exceptional interior design and construction
            projects across Rajasthan.
          </p>
        </div>
      </header>

      <main className="bg-gray-50 min-h-screen -mt-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 justify-between mb-6">
            <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xl">
              <label htmlFor="project-search" className="sr-only">
                Search projects
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="project-search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search projects, location or category"
                  className="w-full sm:w-48 md:w-64 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-lg bg-[#E6B566] text-[#493E25] text-sm hover:bg-[#d2a761]"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="flex items-center gap-3">
              <button
                onClick={clearAll}
                className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 text-sm"
              >
                Clear
              </button>

              <div className="relative" ref={filterRef}>
                <button
                  onClick={() => setFilterOpen((v) => !v)}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white text-gray-800 shadow-sm hover:shadow-md border border-gray-200 text-sm"
                >
                  <Filter size={16} /> Filters
                </button>

                {filterOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4 z-50 border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-semibold">Filters</h4>
                      <button
                        onClick={() => setFilterOpen(false)}
                        className="p-1 rounded hover:bg-gray-100"
                      >
                        <X size={14} />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-medium text-gray-600">
                          Category
                        </label>
                        <select
                          value={tempCat}
                          onChange={(e) => setTempCat(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-200 px-3 py-2 text-sm"
                        >
                          {categories.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-medium text-gray-600">
                          Location
                        </label>
                        <select
                          value={tempLoc}
                          onChange={(e) => setTempLoc(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-200 px-3 py-2 text-sm"
                        >
                          {locations.map((l) => (
                            <option key={l} value={l}>
                              {l}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-medium text-gray-600">
                          Sort
                        </label>
                        <select
                          value={tempSort}
                          onChange={(e) => setTempSort(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-200 px-3 py-2 text-sm"
                        >
                          <option value="newest">Newest</option>
                          <option value="oldest">Oldest</option>
                          <option value="az">A → Z</option>
                          <option value="za">Z → A</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between gap-3 pt-2">
                        <button
                          onClick={() => {
                            setTempCat("all");
                            setTempLoc("all");
                            setTempSort("newest");
                          }}
                          className="px-3 py-2 rounded-lg bg-gray-100 text-sm text-gray-700 hover:bg-gray-200"
                        >
                          Reset
                        </button>
                        <button
                          onClick={applyFilters}
                          className="px-4 py-2 rounded-lg bg-[#18181B] text-white text-sm hover:bg-[#2B2B2F]"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
                <button
                  onClick={() => setView("grid")}
                  className={`p-2 rounded ${
                    view === "grid" ? "bg-[#18181B] text-white" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-2 rounded ${
                    view === "list" ? "bg-[#D2A761] text-white" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6 text-sm text-gray-700">
            <div>
              Showing <strong>{filtered.length}</strong> of <strong>{ALL_PROJECTS.length}</strong> projects
            </div>
          </div>

          <div
            className={
              view === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-6"
            }
          >
            {filtered.map((proj) => (
              <div key={proj.id} className={view === "list" ? "bg-white p-4 rounded-lg shadow" : ""}>
                <ProjectCard project={proj} onClick={() => openProject(proj)} />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <Filter size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600">Try adjusting your filters or search to see more results.</p>
            </div>
          )}
        </div>

        {selected && <ProjectModal project={selected} isOpen={modalOpen} onClose={closeProject} />}
      </main>
    </>
  );
};

export default Projects;
