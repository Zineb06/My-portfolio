import React from "react";

import "../styles/SidebarNav.css";
import FadeInSection from "./FadeInSection";

import { useMediaQuery } from "@mui/material";

const SidebarNav = () => {
  const isMobile = useMediaQuery("(max-width: 800px)");
  const links = [
    <a key="1" href={`${import.meta.env.BASE_URL}#intro`}><span className="nav-slash">/</span>home</a>,
    <a key="2" href={`${import.meta.env.BASE_URL}#about`}><span className="nav-slash">/</span>about</a>,
    <a key="3" href={`${import.meta.env.BASE_URL}#experience`}><span className="nav-slash">/</span>experience</a>,
    <a key="4" href={`${import.meta.env.BASE_URL}#projects`}><span className="nav-slash">/</span>projects</a>,
    <a key="5" href={`${import.meta.env.BASE_URL}#education`}><span className="nav-slash">/</span>education</a>,
    <a key="6" href={`${import.meta.env.BASE_URL}#art`}><span className="nav-slash">/</span>art</a>
  ];

  return (
    <div className="sidebar-nav">
      {!isMobile && (
        <div className="sidebar-links">
          {links.map((link, i) => (
            <FadeInSection key={i} delay={(i + 1) * 100 + "ms"}>
              <div>{link}</div>
            </FadeInSection>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarNav;
