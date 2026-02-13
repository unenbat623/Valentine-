'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

interface StarData {
    width: string;
    height: string;
    top: string;
    left: string;
    opacity: number;
}

interface SkyBackgroundProps {
    phase?: 'intro' | 'storm' | 'twilight' | 'night';
}

export default function SkyBackground({ phase = 'storm' }: SkyBackgroundProps) {
    const { scrollYProgress } = useScroll();
    const [mounted, setMounted] = useState(false);

    // Pre-calculate stars to avoid hydration mismatch
    const starCount = 80;
    const stars = useMemo(() => {
        return [...Array(starCount)].map(() => ({
            width: Math.random() * 2 + 'px',
            height: Math.random() * 2 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            opacity: Math.random() * 0.4 + 0.3
        }));
    }, []);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Split logic: Initially 50/50, then merging
    // Left: Cool Midnight Blue (#040814)
    // Right: Deep Indigo Purple (#0d091a)
    // Unified: Deep Horizon Navy (#000411)

    const splitPos = useTransform(scrollYProgress, [0, 0.7], ["50%", "0%"]);
    const mistOpacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 0]);

    // Phase-based background overrides
    const phaseColors = {
        intro: "bg-slate-900", // Gray day
        storm: "bg-[#040814]", // Stormy night
        twilight: "bg-[#1e1b4b]", // Deep purple/blue focus
        night: "bg-[#000411]" // Galaxy black
    };

    const unifiedOpacity = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);

    return (
        <div className="fixed inset-0 w-full h-full z-[-1] overflow-hidden pointer-events-none transition-colors duration-5000">
            {/* Base Layer */}
            <div className={`absolute inset-0 transition-colors duration-5000 ${phaseColors[phase]}`} />

            {/* Clouds Overlay Fallback - Using CSS Gradients */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: phase === 'intro' ? 0.2 : (phase === 'storm' ? 0.4 : 0.1),
                    scale: 1.1
                }}
                transition={{ duration: 4 }}
                className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(100,149,237,0.1),transparent_70%)] mix-blend-soft-light"
            />
            <motion.div
                animate={{
                    opacity: [0.1, 0.2, 0.1],
                    x: ["-5%", "5%", "-5%"]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-x-[-10%] top-0 bottom-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.05),transparent_50%),radial-gradient(ellipse_at_70%_60%,rgba(255,255,255,0.03),transparent_50%)] blur-[100px]"
            />

            {/* Left Layer (Primary world) - Only visible in early phases */}
            {phase !== 'night' && phase !== 'twilight' && (
                <motion.div
                    style={{ width: splitPos }}
                    className="absolute inset-0 bg-[#040814] border-r border-white/5 opacity-50"
                />
            )}

            {/* Mist Divide */}
            {phase === 'intro' && (
                <motion.div
                    style={{ left: splitPos, opacity: mistOpacity }}
                    className="absolute top-0 w-px h-full bg-gradient-to-b from-transparent via-blue-200/20 to-transparent blur-[8px]"
                />
            )}

            {/* Unified Deep Sky Layer (Gradually covers both) */}
            <motion.div
                style={{ opacity: unifiedOpacity }}
                className="absolute inset-0 bg-gradient-to-b from-[#000411] via-[#020617] to-black"
            />

            {/* Breathing Atmosphere */}
            <motion.div
                animate={{ opacity: phase === 'twilight' ? [0.05, 0.15, 0.05] : [0.02, 0.05, 0.02] }}
                transition={{ duration: 8, repeat: Infinity }}
                className={`absolute inset-0 mix-blend-overlay ${phase === 'twilight' ? 'bg-indigo-400' : 'bg-blue-400'}`}
            />

            {/* Static Stars */}
            {mounted && (
                <motion.div
                    animate={{ opacity: (phase === 'twilight' || phase === 'night') ? 0.6 : 0.2 }}
                    className="absolute inset-0 transition-opacity duration-3000"
                >
                    {stars.map((star, i) => (
                        <div
                            key={i}
                            className={`absolute rounded-full bg-blue-50 shadow-[0_0_5px_white] transition-colors duration-3000 ${phase === 'twilight' ? 'bg-blue-100' : 'bg-blue-50'}`}
                            style={{
                                width: star.width,
                                height: star.height,
                                top: star.top,
                                left: star.left,
                                opacity: star.opacity
                            }}
                        />
                    ))}
                </motion.div>
            )}
        </div>
    );
}
