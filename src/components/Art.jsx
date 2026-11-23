import React from "react";
import "../styles/Art.css";
import FadeInSection from "./FadeInSection";
import { Link } from "react-router-dom";

// Replace these with your own artwork (put the files in public/assets/art/)
const topArt = [
  { src: "/assets/art/fishy.jpg", title: "fish" },
  { src: "/assets/art/dali.jpg", title: "dali" },
  { src: "/assets/art/japan.jpg", title: "japan" },
  { src: "/assets/art/space.jpg", title: "space" },
  { src: "/assets/art/11th_grade.jpg", title: "11th grade" },
  { src: "/assets/art/cordyceps.jpg", title: "cordyceps" },
];

// Each column floats at a slightly different speed while scrolling
const SPEEDS = ["0.04", "-0.06", "0.08"];

const Art = () => {
  return (
    <div id="art">
      <div className="section-header">
        <span className="section-title">/ art</span>
        <Link to="/art" className="explore-link">
          Explore collection
        </Link>
      </div>
      <FadeInSection delay="200ms">
        <div className="art-description">
          Drawing is how I unwind. A few pieces from my sketchbook, in
          different styles and mediums.
        </div>
      </FadeInSection>
      <div className="art-container">
        <div className="art-grid">
          {topArt.map((art, i) => (
            <FadeInSection key={i} delay={(i + 1) * 100 + "ms"}>
              <div data-speed={SPEEDS[i % 3]}>
                <div className="art-card">
                  <img src={art.src} alt={art.title} className="art-image" loading="lazy" />
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Art;
