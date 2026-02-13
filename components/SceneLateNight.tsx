'use client';

import { motion } from 'framer-motion';

export default function SceneLateNight() {
    const bubbles = [
        { id: 1, left: '15%', top: '25%', width: '180px', height: '60px', delay: 0 },
        { id: 2, left: '75%', top: '35%', width: '140px', height: '50px', delay: 1.5 },
        { id: 3, left: '25%', top: '65%', width: '200px', height: '70px', delay: 0.8 },
        { id: 4, left: '70%', top: '75%', width: '160px', height: '55px', delay: 2.2 },
    ];

    return (
        <section className="min-h-screen w-full flex flex-col items-center justify-center relative z-20 overflow-hidden">

            {/* Background Floating Bubbles */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                {bubbles.map((bubble) => (
                    <motion.div
                        key={bubble.id}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        whileInView={{
                            opacity: [0.1, 0.3, 0.1],
                            y: [0, -30, 0],
                            scale: [0.9, 1.1, 0.9]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            delay: bubble.delay,
                            ease: "easeInOut"
                        }}
                        className="absolute bg-white/5 backdrop-blur-sm rounded-2xl border border-white/5 shadow-2xl skew-x-[-1deg]"
                        style={{
                            left: bubble.left,
                            top: bubble.top,
                            width: bubble.width,
                            height: bubble.height
                        }}
                    >
                        {/* Fake text lines */}
                        <div className="w-3/4 h-2 bg-white/10 rounded-full mt-4 ml-4" />
                        <div className="w-1/2 h-2 bg-white/10 rounded-full mt-2 ml-4" />
                    </motion.div>
                ))}
            </div>

            <div className="relative z-30 text-center max-w-2xl px-6">
                <motion.h2
                    initial={{ opacity: 0, filter: 'blur(10px)' }}
                    whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-2xl md:text-4xl font-playfair font-light leading-relaxed text-blue-50 drop-shadow-glow"
                >
                    "When the world sleeps,<br />
                    we stay awake in each other."<br />
                    "Even silence feels warm."
                </motion.h2>
            </div>

        </section>
    );
}
