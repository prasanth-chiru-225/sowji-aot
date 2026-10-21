import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  fadeSpeed: number;
  type: 'dust' | 'feather' | 'ember';
  rotation: number;
  rotationSpeed: number;
}

interface AtmosphereEffectsProps {
  intensity?: 'fog' | 'dramatic' | 'sunrise';
}

export const AtmosphereEffects: React.FC<AtmosphereEffectsProps> = ({
  intensity = 'fog'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Reduced motion check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return () => window.removeEventListener('resize', handleResize);
    }

    const particleCount = intensity === 'sunrise' ? 45 : intensity === 'dramatic' ? 35 : 25;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 1,
        speedX: (Math.random() - 0.4) * 0.4,
        speedY: (Math.random() * -0.6) - 0.2, // drifting upwards or downwards
        opacity: Math.random() * 0.5 + 0.1,
        fadeSpeed: (Math.random() * 0.005) + 0.002,
        type: i % 7 === 0 ? 'feather' : (intensity === 'sunrise' && i % 3 === 0 ? 'ember' : 'dust'),
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    let isVisible = true;
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const drawFeather = (x: number, y: number, size: number, angle: number, alpha: number, isGold: boolean) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.ellipse(0, 0, size * 2.5, size * 6, Math.PI / 12, 0, Math.PI * 2);
      ctx.fillStyle = isGold 
        ? `rgba(245, 197, 66, ${alpha * 0.7})` 
        : `rgba(220, 235, 255, ${alpha * 0.5})`;
      ctx.fill();
      
      // Central quill line
      ctx.beginPath();
      ctx.moveTo(0, -size * 5);
      ctx.lineTo(0, size * 5);
      ctx.strokeStyle = isGold 
        ? `rgba(255, 220, 100, ${alpha * 0.9})` 
        : `rgba(255, 255, 255, ${alpha * 0.8})`;
      ctx.lineWidth = 0.7;
      ctx.stroke();
      ctx.restore();
    };

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        p.opacity += p.fadeSpeed;

        if (p.opacity > 0.7 || p.opacity < 0.1) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        // Wrap around screen edges
        if (p.y < -30) {
          p.y = height + 20;
          p.x = Math.random() * width;
        } else if (p.y > height + 30) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        if (p.x < -20) p.x = width + 20;
        else if (p.x > width + 20) p.x = -20;

        if (p.type === 'feather') {
          drawFeather(p.x, p.y, p.size, p.rotation, p.opacity, intensity === 'sunrise');
        } else if (p.type === 'ember') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 180, 50, ${p.opacity * 0.8})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(245, 180, 50, 0.6)';
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        } else {
          // Dust mote
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(215, 225, 235, ${p.opacity * 0.4})`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      aria-hidden="true"
    />
  );
};
