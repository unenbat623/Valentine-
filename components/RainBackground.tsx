'use client';

import { useEffect, useRef } from 'react';

interface RainBackgroundProps {
    intensity?: number;
    speed?: number;
    phase?: 'intro' | 'storm' | 'twilight' | 'night';
}

export default function RainBackground({
    intensity = 0.5,
    speed = 0.5,
    phase = 'storm'
}: RainBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        // Intensity calculation based on phase
        const effectiveIntensity = phase === 'intro' ? 0.05 :
            phase === 'twilight' ? 0.15 :
                phase === 'night' ? 0 :
                    intensity;

        const drops: { x: number; y: number; length: number; speed: number; opacity: number; sparkle: boolean }[] = [];
        const maxDrops = 200 * effectiveIntensity;

        if (effectiveIntensity > 0) {
            for (let i = 0; i < maxDrops; i++) {
                drops.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    length: Math.random() * 20 + 10,
                    speed: (Math.random() * 10 + 5) * speed,
                    opacity: Math.random() * 0.5 + 0.1,
                    sparkle: Math.random() > 0.95 // 5% chance to sparkle
                });
            }
        }

        const animate = () => {
            if (effectiveIntensity === 0) {
                ctx.clearRect(0, 0, width, height);
                return;
            }
            ctx.clearRect(0, 0, width, height);

            drops.forEach(drop => {
                drop.y += drop.speed;
                if (drop.y > height) {
                    drop.y = Math.random() * -20;
                    drop.x = Math.random() * width;
                }

                ctx.beginPath();
                ctx.moveTo(drop.x, drop.y);
                ctx.lineTo(drop.x - 1, drop.y + drop.length);
                ctx.strokeStyle = `rgba(174, 194, 224, ${drop.opacity})`;
                ctx.lineWidth = 1;
                ctx.lineCap = 'round';
                ctx.stroke();

                // Reflection sparkles
                if (drop.sparkle && Math.random() > 0.8) {
                    ctx.fillStyle = `rgba(255, 255, 255, 0.8)`;
                    ctx.fillRect(drop.x - 1, drop.y + Math.random() * drop.length, 1, 1);
                }
            });

            requestAnimationFrame(animate);
        };

        let animationId = requestAnimationFrame(animate);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
        };
    }, [intensity, speed]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-10 mix-blend-screen"
        />
    );
}
