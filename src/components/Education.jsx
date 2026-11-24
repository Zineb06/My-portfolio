import React from "react";
import "../styles/Education.css";
import FadeInSection from "./FadeInSection";

const degrees = [
  {
    title: "Master's in MIAGE Software Engineering (M1 + M2)",
    school: "Université Evry Paris Saclay · Evry, France",
    years: "2024 - 2026",
  },
  {
    title: "Research Master's in Business Intelligence (Informatique Décisionnelle)",
    school: "Faculté des Sciences et Techniques · Beni Mellal, Morocco",
    years: "2022 - 2024",
  },
];

const certifications = [
  {
    title: "IBM AI Engineering Professional Certificate",
    issuer: "IBM · Coursera",
    link: "https://www.coursera.org/account/accomplishments/professional-cert/certificate/SJR6SD2DYOIB",
  },
  {
    title: "Agile Project Management",
    issuer: "Google · Coursera",
    link: "https://www.coursera.org/account/accomplishments/verify/NTIOK5OIXYTH",
  },
  {
    title: "Introduction to Git and GitHub",
    issuer: "Google · Coursera",
    link: "https://www.coursera.org/account/accomplishments/verify/9BS01PKJVCFA",
  },
  {
    title: "TOEIC",
    issuer: "Score: 890",
    link: "https://www.etsglobal.org/fr/en/digital-score-report/B85E016333D4FFF44F13D7E59D50051968C8F2CA367CE137C997FABB9405DF7CQlNkM0wyQTlDNkRqMGY4S01rYXhubXRWSXowYm96NDBmMXZiVm8vcyt3QWxja3VE",
  },
];

const languages = [
  { name: "French", level: "Fluent" },
  { name: "English", level: "Fluent" },
  { name: "Arabic", level: "Native" },
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
                  <a
                    className="edu-card-main edu-card-link"
                    href={c.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {c.title}
                  </a>
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
