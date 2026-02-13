'use client';

import { motion } from 'framer-motion';

export default function CinemaTitle() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 4 }}
            className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center p-8 text-center"
        >
            <motion.h1
                initial={{ opacity: 0, letterSpacing: "1em" }}
                animate={{ opacity: 1, letterSpacing: "0.2em" }}
                transition={{ duration: 5, ease: "easeOut" }}
                className="font-playfair text-3xl md:text-5xl lg:text-6xl text-white font-extralight"
            >
                Our Story
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 3 }}
                className="mt-12 text-blue-100/60 font-inter text-sm md:text-base tracking-[0.4em] uppercase"
            >
                is only beginning.
            </motion.p>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 8, duration: 2 }}
                className="absolute bottom-16"
            >
                <div className="w-1 h-1 bg-white/20 rounded-full animate-pulse" />
            </motion.div>
        </motion.div>
    );
}
