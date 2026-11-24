import React, { useEffect, useRef } from "react";
import "../styles/MagicBackground.css";

/*
  Site-wide "magic" layer:
  - twinkling starfield
  - glowing blue / violet fireflies drifting around
  - an occasional shooting star
  - slowly drifting aurora blobs (CSS)
  - the cursor glow on .glow-card
*/

const COLORS = ["122, 184, 255", "177, 140, 255", "214, 226, 255"];
const rand = (a, b) => a + Math.random() * (b - a);

const MagicBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let stars = [];
    let flies = [];
    let shooting = null;
    let nextShoot = performance.now() + rand(3000, 7000);
    let raf = 0;

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const area = w * h;
      const count = Math.round(Math.min(260, area / 5500));
      stars = Array.from({ length: count }, () => {
        const depth = [0.04, 0.1, 0.2][Math.floor(Math.random() * 3)];
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: depth * rand(4, 8),
          depth,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          phase: Math.random() * Math.PI * 2,
          speed: rand(0.6, 1.6),
        };
      });

      const flyCount = w < 700 ? 10 : 22;
      flies = Array.from({ length: flyCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: rand(1.2, 2.6),
        vx: rand(-0.15, 0.15),
        vy: rand(-0.25, -0.05),
        phase: Math.random() * Math.PI * 2,
        color: Math.random() > 0.5 ? COLORS[0] : COLORS[1],
        depth: rand(0.25, 0.5),
      }));
    };

    const wrap = (v, max) => ((v % max) + max) % max;

    const drawStar = (s, t) => {
      const y = s.y;
      const tw = reduced ? 0.8 : 0.55 + 0.45 * Math.sin(t * 0.001 * s.speed + s.phase);
      ctx.beginPath();
      ctx.fillStyle = `rgba(${s.color}, ${tw})`;
      ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
      ctx.fill();
      if (s.depth === 0.2 && tw > 0.85) {
        // little cross sparkle on the brightest near stars
        ctx.strokeStyle = `rgba(${s.color}, ${(tw - 0.85) * 3})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(s.x - s.r * 4, y);
        ctx.lineTo(s.x + s.r * 4, y);
        ctx.moveTo(s.x, y - s.r * 4);
        ctx.lineTo(s.x, y + s.r * 4);
        ctx.stroke();
      }
    };

    const drawFly = (f, t) => {
      if (!reduced) {
        f.x += f.vx + Math.sin(t * 0.0006 + f.phase) * 0.25;
        f.y += f.vy;
      }
      const x = wrap(f.x, w);
      const y = wrap(f.y, h + 40) - 20;
      const pulse = 0.45 + 0.55 * Math.abs(Math.sin(t * 0.0012 + f.phase));
      const g = ctx.createRadialGradient(x, y, 0, x, y, f.r * 7);
      g.addColorStop(0, `rgba(${f.color}, ${0.9 * pulse})`);
      g.addColorStop(0.3, `rgba(${f.color}, ${0.3 * pulse})`);
      g.addColorStop(1, `rgba(${f.color}, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, f.r * 7, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawShooting = (t) => {
      if (!shooting && t > nextShoot) {
        shooting = {
          x: rand(w * 0.2, w * 1.0),
          y: rand(0, h * 0.4),
          len: rand(120, 220),
          speed: rand(9, 14),
          life: 0,
        };
      }
      if (!shooting) return;
      const s = shooting;
      s.life += 1;
      s.x -= s.speed;
      s.y += s.speed * 0.45;
      const alpha = Math.max(0, 1 - s.life / 70);
      const tailX = s.x + s.len;
      const tailY = s.y - s.len * 0.45;
      const g = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
      g.addColorStop(0, `rgba(230, 236, 255, ${alpha})`);
      g.addColorStop(0.3, `rgba(177, 140, 255, ${alpha * 0.6})`);
      g.addColorStop(1, "rgba(122, 184, 255, 0)");
      ctx.strokeStyle = g;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();
      if (alpha <= 0) {
        shooting = null;
        nextShoot = t + rand(5000, 11000);
      }
    };

    const frame = (t) => {
      ctx.clearRect(0, 0, w, h);
      stars.forEach((s) => drawStar(s, t));
      flies.forEach((f) => drawFly(f, t));
      if (!reduced) drawShooting(t);
      raf = requestAnimationFrame(frame);
    };

    // Cursor-following glow on glass cards
    const onPointerMove = (e) => {
      const card = e.target.closest && e.target.closest(".glow-card");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };

    build();
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", build);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div className="magic-bg" aria-hidden="true">
      <div className="aurora aurora--1" />
      <div className="aurora aurora--2" />
      <div className="aurora aurora--3" />
      <canvas ref={canvasRef} className="magic-canvas" />
    </div>
  );
};

export default MagicBackground;
