'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LetterSceneProps {
    text: string;
    className?: string;
    delay?: number;
}

export default function LetterScene({ text, className = "", delay = 0 }: LetterSceneProps) {
    const characters = text.split("");
    const [mounted, setMounted] = useState(false);
    const [randomOffsets, setRandomOffsets] = useState<{ x: number, y: number, rotate: number }[]>([]);

    useEffect(() => {
        setMounted(true);
        const offsets = characters.map(() => ({
            x: Math.random() * 60 - 30,
            y: Math.random() * 40 - 20,
            rotate: Math.random() * 40 - 20
        }));
        setRandomOffsets(offsets);
    }, [text]); // Re-generate if text changes

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.02, delayChildren: delay * i },
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
                damping: 15,
                stiffness: 80,
            },
        },
        hidden: (custom: { x: number; y: number; rotate: number }) => ({
            opacity: 0,
            x: custom.x,
            y: custom.y,
            rotate: custom.rotate,
            filter: "blur(8px)",
        }),
    };

    return (
        <section className={`min-h-[70vh] flex items-center justify-center px-8 md:px-24 mb-48 ${className}`}>
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-4xl text-center md:text-left flex flex-wrap justify-center md:justify-start"
            >
                {mounted && characters.map((char, index) => (
                    <motion.span
                        key={index}
                        variants={child}
                        custom={randomOffsets[index] || { x: 0, y: 0, rotate: 0 }}
                        className={`font-playfair text-2xl md:text-4xl leading-relaxed text-blue-50 inline-block whitespace-pre drop-shadow-sm`}
                    >
                        {char}
                    </motion.span>
                ))}
            </motion.div>
        </section>
    );
}
