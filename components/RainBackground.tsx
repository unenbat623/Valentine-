'use client';

import { useEffect, useRef } from 'react';

interface RainBackgroundProps {
    intensity?: number; // 0 to 1, default 0.5
    speed?: number; // 0 to 1, default 0.5
}

export default function RainBackground({ intensity = 0.5, speed = 0.5 }: RainBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const drops: { x: number; y: number; length: number; speed: number; opacity: number }[] = [];
        const maxDrops = 150 * intensity;

        for (let i = 0; i < maxDrops; i++) {
            drops.push({
                x: Math.random() * width,
                y: Math.random() * height,
                length: Math.random() * 20 + 10,
                speed: (Math.random() * 10 + 5) * speed,
                opacity: Math.random() * 0.5 + 0.1
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // More drops if intensity increases, remove if decreases (simple handling)
            if (drops.length < maxDrops) {
                for (let i = drops.length; i < maxDrops; i++) {
                    drops.push({
                        x: Math.random() * width,
                        y: Math.random() * -20, // Start above
                        length: Math.random() * 20 + 10,
                        speed: (Math.random() * 10 + 5) * speed,
                        opacity: Math.random() * 0.5 + 0.1
                    });
                }
            } else if (drops.length > maxDrops) {
                drops.splice(maxDrops);
            }

            drops.forEach(drop => {
                drop.y += drop.speed;
                if (drop.y > height) {
                    drop.y = Math.random() * -20;
                    drop.x = Math.random() * width;
                }

                ctx.beginPath();
                ctx.moveTo(drop.x, drop.y);
                // Angle the rain slightly
                ctx.lineTo(drop.x - 1, drop.y + drop.length);
                ctx.strokeStyle = `rgba(174, 194, 224, ${drop.opacity})`;
                ctx.lineWidth = 1;
                ctx.lineCap = 'round';
                ctx.stroke();
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
