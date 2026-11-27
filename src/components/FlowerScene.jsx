import React, { useEffect, useRef, useState } from "react";
import "../styles/FlowerScene.css";

const range = (n) => Array.from({ length: n }, (_, i) => i + 1);

const Flower = ({ n, stemLeaves }) => (
  <div className={`flower flower--${n}`}>
    <div className={`flower__leafs flower__leafs--${n}`}>
      {range(4).map((i) => (
        <div key={i} className={`flower__leaf flower__leaf--${i}`} />
      ))}
      <div className="flower__white-circle" />
      {range(8).map((i) => (
        <div key={i} className={`flower__light flower__light--${i}`} />
      ))}
    </div>
    <div className="flower__line">
      {range(stemLeaves).map((i) => (
        <div key={i} className={`flower__line__leaf flower__line__leaf--${i}`} />
      ))}
    </div>
  </div>
);

const Grass = ({ n }) => (
  <div className="growing-grass">
    <div className={`flower__grass flower__grass--${n}`}>
      <div className="flower__grass--top" />
      <div className="flower__grass--bottom" />
      {range(8).map((i) => (
        <div key={i} className={`flower__grass__leaf flower__grass__leaf--${i}`} />
      ))}
      <div className="flower__grass__overlay" />
    </div>
  </div>
);

const Grow = ({ d, children }) => (
  <div className="grow-ans" style={{ "--d": d }}>
    {children}
  </div>
);

// How much faster than the original the intro bloom plays
const BLOOM_SPEED = 1.5;

// Delays for each ground leaf cluster (long-g--0 … long-g--7)
const LONG_G_DELAYS = [
  ["1.05s", "0.77s", "1.19s", "1.26s"],
  ["1.26s", "1.33s", "1.4s", "1.47s"],
  ["1.4s", "1.47s", "1.54s", "1.61s"],
  ["1.4s", "1.47s", "1.05s", "1.26s"],
  ["1.4s", "1.47s", "1.05s", "1.26s"],
  ["1.4s", "1.47s", "1.05s", "1.26s"],
  ["1.47s", "1.54s", "1.61s", "1.68s"],
  ["1.05s", "1.12s", "1.22s", "1.26s"],
];

const FlowerScene = () => {
  const [loaded, setLoaded] = useState(false);

  const sceneRef = useRef(null);

  useEffect(() => {
    // Start blooming on the first frame instead of holding the scene back
    const raf = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!loaded || !sceneRef.current?.getAnimations) return;
    // Speed up the one-shot blooming (delays included) without touching
    // the infinite swaying loops
    sceneRef.current.getAnimations({ subtree: true }).forEach((anim) => {
      if (anim.effect?.getTiming().iterations !== Infinity) {
        anim.playbackRate = BLOOM_SPEED;
      }
    });
  }, [loaded]);

  return (
    <div
      ref={sceneRef}
      className={`flower-scene${loaded ? "" : " not-loaded"}`}
      aria-hidden="true"
    >
      <div className="night" />
      <div className="flowers">
        <Flower n={1} stemLeaves={6} />
        <Flower n={2} stemLeaves={4} />
        <Flower n={3} stemLeaves={4} />

        <Grow d="0.15s">
          <div className="flower__g-long">
            <div className="flower__g-long__top" />
            <div className="flower__g-long__bottom" />
          </div>
        </Grow>

        <Grass n={1} />
        <Grass n={2} />

        <Grow d="0.29s">
          <div className="flower__g-right flower__g-right--1">
            <div className="leaf" />
          </div>
        </Grow>
        <Grow d="0.34s">
          <div className="flower__g-right flower__g-right--2">
            <div className="leaf" />
          </div>
        </Grow>

        <Grow d="0.34s">
          <div className="flower__g-front">
            {range(8).map((i) => (
              <div
                key={i}
                className={`flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--${i}`}
              >
                <div className="flower__g-front__leaf" />
              </div>
            ))}
            <div className="flower__g-front__line" />
          </div>
        </Grow>

        <Grow d="0.39s">
          <div className="flower__g-fr">
            <div className="leaf" />
            {range(8).map((i) => (
              <div key={i} className={`flower__g-fr__leaf flower__g-fr__leaf--${i}`} />
            ))}
          </div>
        </Grow>

        {LONG_G_DELAYS.map((delays, g) => (
          <div key={g} className={`long-g long-g--${g}`}>
            {delays.map((d, i) => (
              <Grow key={i} d={d}>
                <div className={`leaf leaf--${i}`} />
              </Grow>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlowerScene;
