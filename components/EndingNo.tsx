'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';

export default function EndingNo() {
    const [mounted, setMounted] = useState(false);
    const [step, setStep] = useState(0);

    // Stars positions
    const stars = useMemo(() => {
        return [...Array(20)].map(() => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`
        }));
    }, []);

    // Floating subtle orbs (memory glow)
    const orbs = useMemo(() => {
        return [...Array(6)].map(() => ({
            duration: 8 + Math.random() * 4,
            delay: Math.random() * 5,
            left: 45 + Math.random() * 10
        }));
    }, []);

    useEffect(() => {
        setMounted(true);
        const timers = [
            setTimeout(() => setStep(1), 2500),
            setTimeout(() => setStep(2), 6000)
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    if (!mounted) return null;

    return (
        <div className="relative min-h-[80vh] flex flex-col items-center justify-center p-8 w-full overflow-hidden text-center">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#050510_0%,#000_95%)] opacity-40 rounded-3xl" />

            {/* Stars */}
            {stars.map((star, i) => (
                <motion.div
                    key={i}
                    animate={{ opacity: [0.2, 0.7, 0.2] }}
                    transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5 }}
                    className="absolute w-[1px] h-[1px] bg-white rounded-full"
                    style={{ top: star.top, left: star.left }}
                />
            ))}

            {/* Floating orbs */}
            {orbs.map((orb, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{
                        opacity: [0, 0.25, 0],
                        y: [-20, -60],
                        x: (i % 2 === 0 ? [0, 10, 0] : [0, -10, 0])
                    }}
                    transition={{
                        duration: orb.duration,
                        repeat: Infinity,
                        delay: orb.delay,
                        ease: "easeOut"
                    }}
                    className="absolute bottom-[15%] w-1 h-1 bg-blue-100 rounded-full blur-[1px]"
                    style={{ left: `${orb.left}%` }}
                />
            ))}

            {/* Silhouettes */}
            <div className="absolute bottom-[10%] w-full flex justify-center pointer-events-none">
                <div className="relative flex items-end gap-24 md:gap-96">
                    {/* Left */}
                    <motion.div
                        animate={{ rotate: [-0.5, 0.5, -0.5], scale: [0.95, 0.97, 0.95] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                        className="relative opacity-30"
                    >
                        <div className="w-6 h-18 bg-black rounded-t-full shadow-[0_0_12px_rgba(0,0,0,0.5)]" />
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-5 h-5 bg-black rounded-full" />
                    </motion.div>
                    {/* Right */}
                    <motion.div
                        animate={{ rotate: [0.5, -0.5, 0.5], scale: [0.95, 0.97, 0.95] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                        className="relative opacity-30"
                    >
                        <div className="w-6 h-18 bg-black rounded-t-full shadow-[0_0_12px_rgba(0,0,0,0.5)]" />
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-5 h-5 bg-black rounded-full" />
                    </motion.div>
                </div>
            </div>

            {/* Poetic Text */}
            <div className="relative z-10 max-w-3xl space-y-8">
                <AnimatePresence>
                    {step >= 1 && (
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 0.6, y: 0 }}
                            transition={{ duration: 1.5 }}
                            className="font-serif text-xl md:text-2xl text-white/90 italic font-light tracking-wide leading-relaxed"
                        >
                            “Бид нэг тэнгэр дор.”
                        </motion.p>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {step >= 2 && (
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 0.5, y: 0 }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            className="font-serif text-lg md:text-xl text-white/70 italic font-light tracking-wide leading-relaxed"
                        >
                            “Би яарахгүй.<br />
                            Миний мэдрэмж энд хэвээрээ.”
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom Marker */}
            <p className="absolute bottom-6 text-white/10 text-[8px] tracking-[0.8em] uppercase font-light">
                Reasoned Acceptance — Patience
            </p>
        </div>
    );
}
