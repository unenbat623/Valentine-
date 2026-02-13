'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function SkyBackground() {
    const { scrollYProgress } = useScroll();
    const [mounted, setMounted] = useState(false);
    const [stars, setStars] = useState<{ width: string, height: string, top: string, left: string, opacity: number }[]>([]);

    useEffect(() => {
        setMounted(true);
        const generatedStars = [...Array(80)].map(() => ({
            width: Math.random() * 2 + 'px',
            height: Math.random() * 2 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            opacity: Math.random() * 0.4 + 0.3
        }));
        setStars(generatedStars);
    }, []);

    // Split logic: Initially 50/50, then merging
    // Left: Cool Midnight Blue (#040814)
    // Right: Deep Indigo Purple (#0d091a)
    // Unified: Deep Horizon Navy (#000411)

    const splitPos = useTransform(scrollYProgress, [0, 0.7], ["50%", "0%"]);
    const mistOpacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 0]);
    const unifiedOpacity = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);

    return (
        <div className="fixed inset-0 w-full h-full z-[-1] overflow-hidden pointer-events-none">
            {/* Base Layer (Right/Secondary world) */}
            <div className="absolute inset-0 bg-[#0d091a]" />

            {/* Left Layer (Primary world) */}
            <motion.div
                style={{ width: splitPos }}
                className="absolute inset-0 bg-[#040814] border-r border-white/5"
            />

            {/* Mist Divide */}
            <motion.div
                style={{ left: splitPos, opacity: mistOpacity }}
                className="absolute top-0 w-px h-full bg-gradient-to-b from-transparent via-blue-200/20 to-transparent blur-[8px]"
            />

            {/* Unified Deep Sky Layer (Gradually covers both) */}
            <motion.div
                style={{ opacity: unifiedOpacity }}
                className="absolute inset-0 bg-gradient-to-b from-[#000411] via-[#020617] to-black"
            />

            {/* Breathing Atmosphere */}
            <motion.div
                animate={{ opacity: [0.02, 0.05, 0.02] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute inset-0 bg-blue-400/5 mix-blend-overlay"
            />

            {/* Static Stars */}
            {mounted && (
                <div className="absolute inset-0 opacity-20">
                    {stars.map((star, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-blue-50 shadow-[0_0_5px_white]"
                            style={{
                                width: star.width,
                                height: star.height,
                                top: star.top,
                                left: star.left,
                                opacity: star.opacity
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
