import { useEffect, useRef } from "react";

const ParticlesBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let nodes = [];
    let signals = [];
    let animationFrame;
    const nodeCount = 80;

    class NeuralNode {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.r = Math.random() * 3 + 1.5;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.02 + 0.005;
        this.type = Math.random() < 0.2 ? "hub" : "regular";

        if (this.type === "hub") {
          this.r += 2;
        }
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulse += this.pulseSpeed;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
    }

    class Signal {
      constructor(from, to) {
        this.from = from;
        this.to = to;
        this.t = 0;
        this.speed = Math.random() * 0.012 + 0.006;
        this.color = ["#00ffe7", "#0088ff", "#7b2fff", "#00ff88"][
          Math.floor(Math.random() * 4)
        ];
      }

      update() {
        this.t += this.speed;
      }

      get done() {
        return this.t >= 1;
      }

      get x() {
        return this.from.x + (this.to.x - this.from.x) * this.t;
      }

      get y() {
        return this.from.y + (this.to.y - this.from.y) * this.t;
      }
    }

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      nodes = Array.from({ length: nodeCount }, () => new NeuralNode());
      signals = [];
    };

    const addSignal = () => {
      if (signals.length >= 40 || nodes.length === 0) return;

      const from = nodes[Math.floor(Math.random() * nodes.length)];
      const to = nodes[Math.floor(Math.random() * nodes.length)];
      const dx = to.x - from.x;
      const dy = to.y - from.y;

      if (Math.sqrt(dx * dx + dy * dy) < 280) {
        signals.push(new Signal(from, to));
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.min(width, height) * 0.6,
      );
      gradient.addColorStop(0, "rgba(0, 30, 60, 0.4)");
      gradient.addColorStop(0.5, "rgba(0, 10, 30, 0.2)");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      nodes.forEach((node) => node.update());
      signals.forEach((signal) => signal.update());
      signals = signals.filter((signal) => !signal.done);

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0, 136, 255, ${(1 - distance / 200) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((node) => {
        const pulse = (Math.sin(node.pulse) + 1) / 2;
        const alpha = 0.4 + pulse * 0.4;
        const radius = node.r + pulse * 1.5;

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle =
          node.type === "hub"
            ? `rgba(0, 255, 231, ${alpha})`
            : `rgba(0, 136, 255, ${alpha})`;
        ctx.fill();

        if (node.type === "hub") {
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius + 4, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 255, 231, ${alpha * 0.3})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      signals.forEach((signal) => {
        ctx.beginPath();
        ctx.arc(signal.x, signal.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = signal.color;
        ctx.shadowColor = signal.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    const signalTimer = window.setInterval(addSignal, 120);
    window.addEventListener("resize", resize);
    draw();

    return () => {
      window.clearInterval(signalTimer);
      window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="neural-background" />
      <div className="scanline-overlay" />
    </>
  );
};

export default ParticlesBackground