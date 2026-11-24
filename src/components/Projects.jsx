import React, { useEffect, useRef, useState } from "react";
import "../styles/Projects.css";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import FadeInSection from "./FadeInSection";
import GitHubIcon from "@mui/icons-material/GitHub";

const projects = [
  {
    title: "Banking System with Fraud Detection",
    meta: "Personal project · Nov 2026",
    desc: "Production-grade banking transaction web app with real-time fraud detection, built as Java microservices.",
    tech: ["Java", "Spring Boot", "Kafka", "Redis", "SAGA"],
    link: "https://github.com/Zineb06/Banking-System-With-Fraud-Detection-Java-Microservices",
    // sample image: replace with a screenshot of the project UI
    image: `${import.meta.env.BASE_URL}assets/projects/banking.svg`,
  },
  {
    title: "Ride Booking Platform",
    meta: "In progress · 2026",
    desc: "Platform for booking rides on demand: riders request a trip, get matched with a nearby driver and follow it end to end.",
    tech: ["Java", "Spring Boot"],
    // add the GitHub URL here once the repo is public
    link: "",
    // sample image: replace with a screenshot of the project UI
    image: `${import.meta.env.BASE_URL}assets/projects/car.svg`,
  },
  {
    title: "Restaurant Reservations",
    meta: "Personal project",
    desc: "Web application to manage a restaurant's table reservations, with a Laravel back end and a React front end.",
    tech: ["Laravel", "PHP", "React.js"],
    link: "https://github.com/Zineb06/restaurant-reservations-app",
    // sample image: replace with a screenshot of the project UI
    image: `${import.meta.env.BASE_URL}assets/projects/restaurant.svg`,
  },
  {
    title: "Expense Tracker",
    meta: "Personal project",
    desc: "Full-stack app to record, categorize and review personal expenses, with a REST API and a PostgreSQL database.",
    tech: ["Node.js", "React.js", "PostgreSQL"],
    link: "https://github.com/Zineb06/expense-tracker-nodejs-reactjs",
    // sample image: replace with a screenshot of the project UI
    image: `${import.meta.env.BASE_URL}assets/projects/expenses.svg`,
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
                        <img src={p.image} alt={`${p.title} screenshot`} />
                      </div>
                      <div className="card-body">
                        <div className="card-header">
                          <div className="card-meta">{p.meta}</div>
                        </div>
                        <div className="card-title">{p.title}</div>
                        <div className="card-desc">{p.desc}</div>
                        <ul className="card-tech">
                          {p.tech.map((t) => (
                            <li key={t}>{t}</li>
                          ))}
                        </ul>
                        {p.link && (
                          <a
                            className="card-link"
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            tabIndex={inView ? 0 : -1}
                          >
                            <GitHubIcon sx={{ fontSize: 18 }} />
                            View project
                          </a>
                        )}
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
