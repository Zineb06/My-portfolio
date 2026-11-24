import React from "react";
import "../styles/ArtGallery.css";
import FadeInSection from "./FadeInSection";
import { Link } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

const ArtGallery = () => {
  const allArt = [
    { src: `${import.meta.env.BASE_URL}assets/art/sisters.jpg`, title: "sisters" },
    { src: `${import.meta.env.BASE_URL}assets/art/wild-hair.jpg`, title: "wild hair" },
    { src: `${import.meta.env.BASE_URL}assets/art/candlelight.jpg`, title: "candlelight" },
    { src: `${import.meta.env.BASE_URL}assets/art/laugh.jpg`, title: "laugh" },
    { src: `${import.meta.env.BASE_URL}assets/art/cat-butterflies.jpg`, title: "cat and butterflies" },
    { src: `${import.meta.env.BASE_URL}assets/art/grimace.jpg`, title: "grimace" },
    { src: `${import.meta.env.BASE_URL}assets/art/pout.jpg`, title: "pout" },
    { src: `${import.meta.env.BASE_URL}assets/art/candle-skull.jpg`, title: "candle skull" },
    { src: `${import.meta.env.BASE_URL}assets/art/ballerinas.jpg`, title: "ballerinas" }
  ];

  return (
    <div className="art-gallery-page">
      <div className="section-header">
        <Link to="/" className="back-button">
          <ArrowBackRoundedIcon />
        </Link>
        <span className="section-title">/ art gallery</span>
      </div>
      <FadeInSection delay="200ms">
        <div className="gallery-description">
          Drawing is how I unwind. Here is the full collection from my sketchbook.
        </div>
      </FadeInSection>
      <div className="gallery-grid">
        {allArt.map((art, i) => (
          <FadeInSection key={i} delay={(i + 1) * 100 + "ms"}>
            <div className="gallery-card">
              <img src={art.src} alt={art.title} className="gallery-image" />
            </div>
          </FadeInSection>
        ))}
      </div>
    </div>
  );
};

export default ArtGallery;
