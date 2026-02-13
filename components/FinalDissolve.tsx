'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface FinalDissolveProps {
    accepted: boolean;
}

export default function FinalDissolve({ accepted }: FinalDissolveProps) {
    const [phase, setPhase] = useState<'reading' | 'dissolving' | 'stars'>('reading');
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (accepted && phase === 'reading') {
            const timer = setTimeout(() => {
                setPhase('dissolving');
                setTimeout(() => setPhase('stars'), 4000);
            }, 6000); // Give time to read
            return () => clearTimeout(timer);
        }
    }, [accepted, phase]);

    // Canvas Particle Logic
    useEffect(() => {
        if (phase !== 'dissolving' && phase !== 'stars') return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        interface Particle {
            x: number;
            y: number;
            targetX: number;
            targetY: number;
            vx: number;
            vy: number;
            size: number;
            alpha: number;
            delay: number;
            angle: number;
            isConstellation: boolean;
        }

        const particles: Particle[] = [];
        const particleCount = 200;

        // Heart Points
        const heartPoints: { x: number, y: number }[] = [];
        for (let t = 0; t <= Math.PI * 2; t += 0.1) {
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
            heartPoints.push({ x: x * 8 + width / 2, y: y * 8 + height / 2 - 50 });
        }

        for (let i = 0; i < particleCount; i++) {
            const isConstellation = i < heartPoints.length;
            particles.push({
                x: width / 2 + (Math.random() - 0.5) * 400,
                y: height / 2 + (Math.random() - 0.5) * 200,
                targetX: isConstellation ? heartPoints[i].x : Math.random() * width,
                targetY: isConstellation ? heartPoints[i].y : Math.random() * height * 0.4,
                vx: 0,
                vy: 0,
                size: Math.random() * 1.5 + 0.5,
                alpha: 0,
                delay: Math.random() * 2000,
                angle: Math.random() * Math.PI * 2,
                isConstellation
            });
        }

        let animationId: number;
        let startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p, i) => {
                if (elapsed < p.delay) return;

                // Move toward target
                const dx = p.targetX - p.x;
                const dy = p.targetY - p.y;
                p.vx = dx * 0.02;
                p.vy = dy * 0.02;

                p.x += p.vx;
                p.y += p.vy;

                // Twinkle / Alpha
                if (p.isConstellation) {
                    p.alpha = 0.4 + Math.sin(elapsed * 0.002 + p.angle) * 0.3;
                } else {
                    p.alpha = Math.max(0, 1 - (elapsed - p.delay) / 4000);
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
                if (p.isConstellation) {
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = "white";
                }
                ctx.fill();
                ctx.shadowBlur = 0;
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animationId);
    }, [phase]);

    return (
        <div className="relative min-h-[60vh] flex items-center justify-center p-8 z-30 w-full">
            <AnimatePresence mode="wait">
                {phase === 'reading' && (
                    <motion.div
                        key="text"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        transition={{ duration: 3 }}
                        className="max-w-3xl text-center z-10"
                    >
                        <h2 className="text-3xl md:text-5xl font-playfair text-white leading-relaxed font-light italic">
                            "Би чамаас хол зогсож байж магадгүй. Гэхдээ миний зүрх хэзээ ч холдоогүй. Би чамайг сонгож байна. Тэнгэр бүрийн дор. Цагийн бүс бүрт."
                        </h2>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Particle Canvas */}
            <canvas
                ref={canvasRef}
                className={`fixed inset-0 pointer-events-none transition-opacity duration-3000 ${phase === 'dissolving' || phase === 'stars' ? 'opacity-100' : 'opacity-0'}`}
            />

            {phase === 'stars' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 3 }}
                    className="absolute inset-0 flex flex-col items-center justify-end pb-32"
                >
                    <p className="text-white/20 tracking-[1em] uppercase text-[10px] font-light animate-pulse">
                        Бидний хязгааргүйд бичигдсэн
                    </p>
                </motion.div>
            )}
        </div>
    );
}
