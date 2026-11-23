import React, { useEffect, useRef, useState } from "react";
import "../styles/Projects.css";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import FadeInSection from "./FadeInSection";
import ExternalLinks from "./ExternalLinks";

const projects = [
  {
    title: "Banking System with Fraud Detection",
    meta: "Personal project · Nov 2026",
    desc: "Production-grade banking transaction web app with real-time fraud detection, built as Java microservices.",
    tech: ["Java", "Spring Boot", "Kafka", "Redis", "SAGA"],
    // sample image: replace with a screenshot of the project UI
    image: "/assets/projects/banking.svg",
  },
  {
    title: "Virtual Try-On AI Assistant",
    meta: "Capgemini · 2026",
    desc: "Conversational AI agent orchestrating speech recognition, gesture recognition, recommendations and virtual clothing try-on.",
    tech: ["Python", "React.js", "LLM agents", "Tool calling"],
    // sample image: replace with a screenshot of the project UI
    image: "/assets/projects/tryon.svg",
  },
  {
    title: "Meet and Go",
    meta: "Team project · Oct 2024 - Jan 2025",
    desc: "Web app for cultural outings between locals, with visitor, user, admin and moderator roles, outings and comments.",
    tech: ["ASP.NET", "Angular", "SQL"],
    // sample image: replace with a screenshot of the project UI
    image: "/assets/projects/meetandgo.svg",
  },
  {
    title: "Housing Comparison Platform",
    meta: "Chronnocorp · 2025",
    desc: "Compare housing using reviews and ratings from former tenants. JWT auth, unit and E2E tests, CI/CD.",
    tech: ["FastAPI", "React.js", "JWT", "CI/CD"],
    // sample image: replace with a screenshot of the project UI
    image: "/assets/projects/housing.svg",
  },
  {
    title: "Skin Cancer Classification (BDA)",
    meta: "TIAD Lab research · 2024",
    desc: "Bilevel optimization based on gradient descent aggregation (BDA) applied to skin cancer image classification.",
    tech: ["Python", "Deep Learning", "Optimization"],
    // sample image: replace with a screenshot of the project UI
    image: "/assets/projects/skincancer.svg",
  },
  {
    title: "School Management Admin",
    meta: "HiziConnect · 2023",
    desc: "Admin area of a school management app: RESTful APIs, secure authentication and role-based access control.",
    tech: ["Java", "Angular", "REST", "RBAC"],
    // sample image: replace with a screenshot of the project UI
    image: "/assets/projects/school.svg",
  },
];

const getVisibleCount = () => {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth <= 640) return 1;
  if (window.innerWidth <= 960) return 2;
  return 3;
};

const Projects = () => {
  const [visible, setVisible] = useState(getVisibleCount);
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(null);

  const maxIndex = Math.max(0, projects.length - visible);

  useEffect(() => {
    const onResize = () => setVisible(getVisibleCount());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  // Loop around at both ends
  const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1));
  const next = () => setIndex((i) => (i >= maxIndex ? 0 : i + 1));

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchStartX.current = null;
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  return (
    <div id="projects">
      <div className="section-header ">
        <span className="section-title">/ projects</span>
        <a
          href="https://github.com/zineb06"
          className="explore-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          View my GitHub
        </a>
      </div>

      <FadeInSection>
        <div
          className="project-carousel"
          style={{ "--visible": visible }}
          tabIndex={0}
          onKeyDown={onKeyDown}
          aria-roledescription="carousel"
          aria-label="Projects"
        >
          <button
            className="carousel-arrow carousel-arrow--prev"
            onClick={prev}
            aria-label="Previous projects"
          >
            <ChevronLeftRoundedIcon />
          </button>

          <div
            className="project-viewport"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <ul
              className="project-track"
              style={{ transform: `translateX(-${(index * 100) / visible}%)` }}
            >
              {projects.map((p, i) => {
                const inView = i >= index && i < index + visible;
                return (
                  <li className="project-slide" key={p.title} aria-hidden={!inView}>
                    <div className="projects-card glow-card">
                      <div className="card-image">
                        <img src={p.image} alt={`${p.title} screenshot`} data-speed="0.06" />
                      </div>
                      <div className="card-body">
                        <div className="card-header">
                          <div className="card-meta">{p.meta}</div>
                          <ExternalLinks githubLink={p.link} openLink={p.open} />
                        </div>
                        <div className="card-title">{p.title}</div>
                        <div className="card-desc">{p.desc}</div>
                        <ul className="card-tech">
                          {p.tech.map((t) => (
                            <li key={t}>{t}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <button
            className="carousel-arrow carousel-arrow--next"
            onClick={next}
            aria-label="Next projects"
          >
            <ChevronRightRoundedIcon />
          </button>
        </div>

        <div className="carousel-dots">
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              className={`carousel-dot${i === index ? " carousel-dot--active" : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </FadeInSection>
    </div>
  );
};

export default Projects;
