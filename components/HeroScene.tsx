'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

interface HeroSceneProps {
    onStart: () => void;
}

export default function HeroScene({ onStart }: HeroSceneProps) {
    return (
        <section className="h-screen w-full flex flex-col items-center justify-center relative z-20 text-center px-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 3, ease: 'easeInOut' }}
            >
                <h1 className="font-playfair text-3xl md:text-5xl lg:text-6xl leading-tight font-extralight tracking-wide text-white drop-shadow-lg">
                    Some stories do not begin <br className="hidden md:block" />
                    in the same place.
                </h1>
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4, duration: 2.5, ease: 'easeOut' }}
                className="mt-8 text-lg md:text-xl text-white/80 font-inter font-light tracking-wider"
            >
                But they begin in the same feeling.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 6.5, duration: 1.5 }}
                className="mt-16"
            >
                <button
                    onClick={onStart}
                    className="group relative px-8 py-3 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/20 rounded-full transition-all duration-500 overflow-hidden"
                >
                    <span className="relative z-10 flex items-center gap-3 font-inter text-sm uppercase tracking-[0.2em] text-white/90">
                        <Play className="w-4 h-4 text-white/80 fill-white/80" />
                        Press Play
                    </span>
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </button>
            </motion.div>
        </section>
    );
}
