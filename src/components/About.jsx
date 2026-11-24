import React from "react";
import "../styles/About.css";
import FadeInSection from "./FadeInSection";

const About = () => {

  const one = (
    <p>
      I am a <b>Fullstack Software Engineer</b> with a Master's Degree in MIAGE
      Software Engineering from{" "}
      <a href="https://www.univ-evry.fr/" target="_blank" rel="noopener noreferrer">
        Université Paris Saclay
      </a>{" "}
      and a research Master's in Business Intelligence (Informatique Décisionnelle). Most recently I was an intern at{" "}
      <a href="https://www.capgemini.com/" target="_blank" rel="noopener noreferrer">
        Capgemini
      </a>
      , building a conversational AI agent for virtual try-on and clothing
      recommendations.
    </p>
  );
  const two = (
    <p>
      I combine fullstack skills with a background in machine learning and AI (LLMs, RAG,
      fine-tuning..etc). Trilingual in French, English and Arabic. Outside of code
      you'll find me volunteering, drawing, Rock climbing, or reading.
    </p>
  );

  const techStack = [
    "Java · Spring Boot",
    "Python · FastAPI",
    "TypeScript · Angular",
    "React.js",
    "LLMs · RAG · Fine-tuning",
    "Docker · GitLab CI/CD",
    "Microservices · Kafka",
  ];

  return (
    <div id="about">
      <FadeInSection>
        <div className="section-header ">
          <span className="section-title">/ about me</span>
        </div>
        <div className="about-content">
          <div className="about-description">
            {one}
            {"Here are some technologies I have been working with:"}
            <ul className="tech-stack">
              {techStack.map((techItem, i) => (
                <FadeInSection key={i} delay={(i + 1) * 100 + "ms"}>
                  <li>{techItem}</li>
                </FadeInSection>
              ))}
            </ul>
            {two}
          </div>
          <div className="about-image">
            <div className="about-photo-parallax">
              <div className="about-photo-frame">
                <div className="about-photo-clip">
                  <img alt="Zineb Houmaidi" src={`${import.meta.env.BASE_URL}assets/zineb.jpg`} />
                </div>
              </div>
              <span className="about-sparkle about-sparkle--1">✦</span>
              <span className="about-sparkle about-sparkle--2">✧</span>
              <span className="about-sparkle about-sparkle--3">✦</span>
            </div>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
};

export default About;
