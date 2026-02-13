'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SecretCinemaModeProps {
    onToggle: (isActive: boolean) => void;
}

export default function SecretCinemaMode({ onToggle }: SecretCinemaModeProps) {
    const [isActive, setIsActive] = useState(false);
    const [currentLine, setCurrentLine] = useState(0);

    const lyrics = [
        "Do you remember when it all began?",
        "The distance felt so heavy then.",
        "But tonight, I want to say...",
        "My heart has always been yours.",
        "No matter where we stand."
    ];

    /* Simulate lyrics timing */
    useEffect(() => {
        if (!isActive) return;
        const interval = setInterval(() => {
            setCurrentLine((prev) => (prev + 1) % lyrics.length);
        }, 4500);
        return () => clearInterval(interval);
    }, [isActive]);

    const handleToggle = () => {
        const newState = !isActive;
        setIsActive(newState);
        onToggle(newState);
    };

    return (
        <>
            <button
                onClick={handleToggle}
                className="fixed top-6 right-6 z-50 text-2xl opacity-40 hover:opacity-100 hover:scale-110 transition-all duration-300"
                title="Cinematic Mode"
            >
                🎬
            </button>

            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 w-full h-full bg-black/95 z-[100] flex flex-col items-center justify-end pb-32"
                    >
                        {/* Projector Flickering Light Effect */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black pointer-events-none" />
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vh] bg-white/5 blur-3xl rounded-full opacity-20 animate-pulse" />

                        {/* Subtitles */}
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={currentLine}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.8 }}
                                className="text-yellow-400 font-serif italic text-xl md:text-2xl drop-shadow-md text-center max-w-2xl px-4"
                            >
                                {lyrics[currentLine]}
                            </motion.p>
                        </AnimatePresence>

                        {/* Exit Hint */}
                        <button
                            onClick={handleToggle}
                            className="absolute top-6 right-6 text-white/50 hover:text-white text-sm uppercase tracking-widest"
                        >
                            Exit
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
