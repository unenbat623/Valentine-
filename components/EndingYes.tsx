'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function EndingYes() {
    const hearts = Array.from({ length: 15 });

    return (
        <section className="h-screen w-full flex flex-col items-center justify-center relative z-20 text-center overflow-hidden">

            {/* Floating Light Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 30 }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: "110%", x: `${Math.random() * 100}%` }}
                        animate={{
                            opacity: [0, 0.8, 0],
                            y: "-10%",
                            x: `${(Math.random() * 100) + (Math.random() * 20 - 10)}%`
                        }}
                        transition={{
                            duration: 10 + Math.random() * 10,
                            repeat: Infinity,
                            delay: Math.random() * 10,
                            ease: "linear"
                        }}
                        className="absolute w-1 h-1 bg-blue-200 rounded-full blur-[1px] shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                    />
                ))}
            </div>

            {/* Floating Hearts */}
            <div className="absolute inset-0 pointer-events-none">
                {hearts.map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 100, x: Math.random() * 100 - 50 }}
                        animate={{ opacity: [0, 1, 0], y: -500 }}
                        transition={{
                            duration: 15 + Math.random() * 5,
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                        className="absolute text-blue-200/20"
                        style={{ left: `${Math.random() * 100}%`, bottom: '-10%' }}
                    >
                        <Heart fill="currentColor" className="w-4 h-4 md:w-6 md:h-6" />
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 3 }}
                className="space-y-8 z-10"
            >
                <h1 className="text-4xl md:text-6xl font-playfair text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                    Then this is not the end.
                </h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3, duration: 2 }}
                    className="space-y-6 text-xl md:text-2xl font-light text-white/80 font-playfair italic max-w-2xl"
                >
                    <p>This is only the beginning.</p>
                    <div className="pt-8 space-y-4 text-lg md:text-xl not-italic">
                        <p>No matter the distance, I will love you.</p>
                        <p>I will wait for you.</p>
                        <p>And one day, we will stand under the same sky.</p>
                    </div>
                </motion.div>
            </motion.div>

        </section>
    );
}
