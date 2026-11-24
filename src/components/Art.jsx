import React from "react";
import "../styles/Art.css";
import FadeInSection from "./FadeInSection";
import { Link } from "react-router-dom";

const topArt = [
  { src: `${import.meta.env.BASE_URL}assets/art/sisters.jpg`, title: "sisters" },
  { src: `${import.meta.env.BASE_URL}assets/art/wild-hair.jpg`, title: "wild hair" },
  { src: `${import.meta.env.BASE_URL}assets/art/candlelight.jpg`, title: "candlelight" },
  { src: `${import.meta.env.BASE_URL}assets/art/laugh.jpg`, title: "laugh" },
  { src: `${import.meta.env.BASE_URL}assets/art/cat-butterflies.jpg`, title: "cat and butterflies" },
  { src: `${import.meta.env.BASE_URL}assets/art/grimace.jpg`, title: "grimace" },
];

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
              <div>
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
