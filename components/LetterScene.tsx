'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

interface LetterSceneProps {
    text: string;
    className?: string;
    delay?: number;
    highlightWords?: string[];
}

export default function LetterScene({ text, className = "", delay = 0, highlightWords = [] }: LetterSceneProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Split text into lines to preserve paragraph structure
    const lines = useMemo(() => text.split("\n"), [text]);

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: {
                staggerChildren: 0.025,
                delayChildren: delay * i,
            },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            rotate: 0,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 120,
            },
        },
        hidden: (custom: { x: number, y: number, rotate: number }) => ({
            opacity: 0,
            x: custom.x,
            y: custom.y,
            rotate: custom.rotate,
            filter: "blur(12px)",
        }),
    };

    // Pre-calculate random offsets if we want that "shattered" look back, 
    // but drift is often more cinematic. Let's use subtle random drift.
    const getRandomDrift = () => ({
        x: Math.random() * 40 - 20,
        y: Math.random() * 40 - 20,
        rotate: Math.random() * 20 - 10,
    });

    if (!mounted) return <section className={`min-h-[70vh] ${className}`} />;

    return (
        <section className={`min-h-[70vh] flex items-center justify-center px-8 md:px-24 mb-48 ${className}`}>
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-5xl w-full space-y-6 text-center md:text-left"
            >
                {lines.map((line, lineIdx) => (
                    <div key={lineIdx} className="flex flex-wrap justify-center md:justify-start gap-y-2">
                        {line.split(" ").map((word, wordIdx) => {
                            // Clean word for matching (remove punctuation)
                            const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
                            const isHighlighted = highlightWords.some(hw =>
                                cleanWord.toLowerCase() === hw.toLowerCase() ||
                                word.toLowerCase() === hw.toLowerCase()
                            );

                            return (
                                <div key={wordIdx} className="inline-flex mr-[0.4em] py-1">
                                    {word.split("").map((char, charIdx) => (
                                        <motion.span
                                            key={charIdx}
                                            variants={child}
                                            custom={getRandomDrift()}
                                            className={`
                                                font-playfair text-2xl md:text-4xl lg:text-5xl 
                                                leading-[1.5] inline-block drop-shadow-md
                                                ${isHighlighted
                                                    ? "text-blue-100 font-normal drop-shadow-[0_0_10px_rgba(191,219,254,0.5)]"
                                                    : "text-white/70 font-extralight"
                                                }
                                            `}
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </motion.div>
        </section>
    );
}
