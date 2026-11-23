import React, { useEffect, useState } from "react";
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

// Delays for each ground leaf cluster (long-g--0 … long-g--7)
const LONG_G_DELAYS = [
  ["3s", "2.2s", "3.4s", "3.6s"],
  ["3.6s", "3.8s", "4s", "4.2s"],
  ["4s", "4.2s", "4.4s", "4.6s"],
  ["4s", "4.2s", "3s", "3.6s"],
  ["4s", "4.2s", "3s", "3.6s"],
  ["4s", "4.2s", "3s", "3.6s"],
  ["4.2s", "4.4s", "4.6s", "4.8s"],
  ["3s", "3.2s", "3.5s", "3.6s"],
];

const FlowerScene = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`flower-scene${loaded ? "" : " not-loaded"}`} aria-hidden="true">
      <div className="night" />
      <div className="flowers">
        <Flower n={1} stemLeaves={6} />
        <Flower n={2} stemLeaves={4} />
        <Flower n={3} stemLeaves={4} />

        <Grow d="1.2s">
          <div className="flower__g-long">
            <div className="flower__g-long__top" />
            <div className="flower__g-long__bottom" />
          </div>
        </Grow>

        <Grass n={1} />
        <Grass n={2} />

        <Grow d="2.4s">
          <div className="flower__g-right flower__g-right--1">
            <div className="leaf" />
          </div>
        </Grow>
        <Grow d="2.8s">
          <div className="flower__g-right flower__g-right--2">
            <div className="leaf" />
          </div>
        </Grow>

        <Grow d="2.8s">
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

        <Grow d="3.2s">
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
