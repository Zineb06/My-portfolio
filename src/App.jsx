import React, { useEffect } from "react";
import Intro from "./components/Intro";
import Experience from "./components/Experience";
import About from "./components/About";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Art from "./components/Art";
import ArtGallery from "./components/ArtGallery";
import Credits from "./components/Credits";
import NavBar from "./components/NavBar";
import SidebarNav from "./components/SidebarNav";
import MagicBackground from "./components/MagicBackground";
import CursorSparkles from "./components/CursorSparkles";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import "./styles/Global.css";

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
      </div>
    </div>
  );
}

export default App;
