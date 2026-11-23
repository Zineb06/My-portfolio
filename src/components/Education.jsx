import React from "react";
import "../styles/Education.css";
import FadeInSection from "./FadeInSection";

const degrees = [
  {
    title: "Master MIAGE, Software Engineering for the Web (M1 + M2)",
    school: "Université Évry Paris-Saclay · Évry, France",
    years: "2024 - 2026",
  },
  {
    title: "Research Master's in Business Intelligence",
    school: "Faculty of Science and Technology · Béni Mellal, Morocco",
    years: "2022 - 2024",
  },
];

const certifications = [
  { title: "IBM AI Engineering Professional Certificate", issuer: "IBM · Coursera" },
  { title: "Agile Project Management", issuer: "Google · Coursera" },
  { title: "TOEIC", issuer: "Score: 890" },
];

const languages = [
  { name: "Arabic", level: "Native" },
  { name: "French", level: "Fluent" },
  { name: "English", level: "Fluent" },
  { name: "Spanish", level: "Basic" },
];

const Education = () => {
  return (
    <div id="education">
      <FadeInSection>
        <div className="section-header">
          <span className="section-title">/ education</span>
        </div>

        <div className="edu-timeline">
          {degrees.map((d) => (
            <div className="edu-item" key={d.title}>
              <div className="edu-years">{d.years}</div>
              <div className="edu-title">{d.title}</div>
              <div className="edu-school">{d.school}</div>
            </div>
          ))}
        </div>

        <div className="edu-grid">
          <div className="edu-card glow-card">
            <div className="edu-card-title">certifications</div>
            <ul>
              {certifications.map((c) => (
                <li key={c.title}>
                  <span className="edu-card-main">{c.title}</span>
                  <span className="edu-card-sub">{c.issuer}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="edu-card glow-card">
            <div className="edu-card-title">languages</div>
            <ul>
              {languages.map((l) => (
                <li key={l.name}>
                  <span className="edu-card-main">{l.name}</span>
                  <span className="edu-card-sub">{l.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
};

export default Education;
