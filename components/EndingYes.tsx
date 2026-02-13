'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';

export default function EndingYes() {
    const [mounted, setMounted] = useState(false);
    const [step, setStep] = useState(0);

    // Pre-generate stars
    const stars = useMemo(() => {
        return [...Array(40)].map(() => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            duration: 6 + Math.random() * 6,
            delay: Math.random() * 5
        }));
    }, []);

    useEffect(() => {
        setMounted(true);
        const timers = [
            setTimeout(() => setStep(1), 3000),
            setTimeout(() => setStep(2), 6000)
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    if (!mounted) return null;

    return (
        <div className="relative min-h-[80vh] flex items-center justify-center p-8 w-full overflow-hidden text-center">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#0a0815_0%,#000_85%)] opacity-60 rounded-3xl" />

            {/* Stars */}
            {stars.map((star, i) => (
                <motion.div
                    key={i}
                    animate={{ opacity: [0.2, 0.7, 0.2], scale: [1, 1.1, 1] }}
                    transition={{
                        duration: star.duration,
                        repeat: Infinity,
                        delay: star.delay,
                        ease: "easeInOut"
                    }}
                    className="absolute w-[1px] h-[1px] bg-white rounded-full shadow-[0_0_4px_white]"
                    style={{ top: star.top, left: star.left }}
                />
            ))}

            {/* Tiny comet / falling star */}
            <motion.div
                initial={{ x: "-10vw", y: "15vh", opacity: 0 }}
                animate={{ x: "110vw", y: "10vh", opacity: [0, 1, 1, 0] }}
                transition={{ duration: 10, delay: 2, ease: "linear" }}
                className="absolute rotate-[-3deg]"
            >
                <div className="relative w-48 h-[1px]">
                    <div className="absolute right-0 w-2 h-2 bg-white rounded-full blur-[1px] shadow-[0_0_10px_white]" />
                    <div className="absolute inset-0 bg-gradient-to-l from-white/60 to-transparent" />
                </div>
            </motion.div>

            {/* Soft rising mist */}
            <motion.div
                animate={{ y: [-5, -15], opacity: [0, 0.1, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-200/5 to-transparent blur-3xl"
            />

            {/* Silhouettes - smooth steps */}
            <div className="absolute bottom-[10%] w-full flex justify-center pointer-events-none">
                <div className="relative flex items-end gap-24 md:gap-96">
                    {/* Left */}
                    <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: 25 }}
                        transition={{ duration: 10, ease: "easeInOut" }}
                        className="relative opacity-30 scale-95"
                    >
                        <div className="w-6 h-18 bg-black rounded-t-full shadow-[0_0_15px_rgba(0,0,0,0.5)]" />
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-5 h-5 bg-black rounded-full" />
                    </motion.div>

                    {/* Right */}
                    <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: -25 }}
                        transition={{ duration: 10, ease: "easeInOut" }}
                        className="relative opacity-30 scale-95"
                    >
                        <div className="w-6 h-18 bg-black rounded-t-full shadow-[0_0_15px_rgba(0,0,0,0.5)]" />
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-5 h-5 bg-black rounded-full" />
                    </motion.div>
                </div>
            </div>

            {/* Poetic Text */}
            <div className="relative z-10 max-w-4xl space-y-12 px-4">
                <AnimatePresence>
                    {step >= 1 && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 2 }}
                            className="font-playfair text-base sm:text-lg md:text-2xl lg:text-3xl text-white/95 italic font-extralight tracking-[0.05em] sm:tracking-[0.1em] md:tracking-widest leading-relaxed"
                        >
                            Бидний аялал эндээс эхэлж байна.
                        </motion.p>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {step >= 2 && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 0.8, y: 0 }}
                            transition={{ duration: 2 }}
                            className="font-playfair text-sm sm:text-base md:text-xl lg:text-2xl text-white/80 italic font-extralight tracking-[0.05em] sm:tracking-[0.1em] md:tracking-widest leading-relaxed"
                        >
                            Хариулт нь надад харагдахгүй болгож хийсэн чамаас хариултыг нь авмаар байсан болхоор

                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            {/* End marker */}
            <p className="absolute bottom-6 text-white/5 text-[8px] tracking-[0.8em] uppercase font-light">
                Complete Love — Story Begins
            </p>
        </div>
    );
}
