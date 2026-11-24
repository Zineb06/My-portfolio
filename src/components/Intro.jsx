import React from "react";
import "../styles/Intro.css";
import { TypeAnimation } from "react-type-animation";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import FadeInSection from "./FadeInSection";
import FlowerScene from "./FlowerScene";

const Intro = () => {
  return (
    <div id="intro">
      <div className="intro-simulation">
        <FlowerScene />
      </div>
      <div className="intro-block">
        <div className="intro-title">
          {"Hi, "}
          <span className="intro-name">
            <TypeAnimation
              sequence={["Zineb"]}
              wrapper="span"
              cursor={false}
              repeat={0}
            />
          </span>
          {" here."}
          <span className="intro-cursor">|</span>
        </div>
        <FadeInSection>
          <div className="intro-desc">
            I'm  a Fullstack software engineer based in France. I build web
            applications end to end and love bringing AI into them, from LLM
            agents and RAG pipelines to machine learning. I love art and creativity, and the
            intersection between tech and art is my passion.
          </div>
          <a href="mailto:houmaidi.zineb@gmail.com" className="intro-contact">
            <EmailRoundedIcon />
            {" Say hi!"}
          </a>
        </FadeInSection>
      </div>
    </div>
  );
};

export default Intro;
