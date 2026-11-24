import React, { Suspense, lazy, useEffect } from "react";
import Intro from "./components/Intro";
import About from "./components/About";
import NavBar from "./components/NavBar";
import SidebarNav from "./components/SidebarNav";
import MagicBackground from "./components/MagicBackground";
import CursorSparkles from "./components/CursorSparkles";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import "./styles/Global.css";

// Below-the-fold sections and the gallery page load in separate chunks,
// so the intro renders without waiting for MUI tabs, the carousel, etc.
const Experience = lazy(() => import("./components/Experience"));
const Projects = lazy(() => import("./components/Projects"));
const Education = lazy(() => import("./components/Education"));
const Art = lazy(() => import("./components/Art"));
const ArtGallery = lazy(() => import("./components/ArtGallery"));
const Credits = lazy(() => import("./components/Credits"));

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="App">
      <MagicBackground />
      <CursorSparkles />
      <NavBar />
      <SidebarNav />
      <div id="content">
        <Suspense fallback={null}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Intro />
                <About />
                <Experience />
                <Projects />
                <Education />
                <Art />
                <Credits />
              </>
            }
          />
          <Route path="/art" element={<ArtGallery />} />
        </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
