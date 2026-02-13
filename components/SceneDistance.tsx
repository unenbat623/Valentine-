'use client';

import { motion } from 'framer-motion';

export default function SceneDistance() {
    return (
        <section className="h-screen w-full flex flex-col items-center justify-center relative z-20 px-4">

            {/* Map Visualization */}
            <div className="relative w-full max-w-2xl h-64 md:h-80 flex items-center justify-center">

                {/* SVG Path */}
                <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 50">
                    <defs>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="1" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>
                    <motion.path
                        d="M 20 25 Q 50 5 80 25"
                        stroke="rgba(255, 255, 255, 0.4)"
                        strokeWidth="0.3"
                        fill="transparent"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 4, ease: "easeInOut" }}
                        filter="url(#glow)"
                    />
                </svg>

                {/* Mongolia - Left */}
                <motion.div
                    className="absolute left-[20%] top-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                >
                    <div className="w-2 h-2 bg-blue-100 rounded-full shadow-[0_0_15px_3px_rgba(147,197,253,0.6)] animate-pulse" />
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-blue-200/80 font-light translate-y-4">Left Side</span>
                </motion.div>

                {/* Germany - Right */}
                <motion.div
                    className="absolute left-[80%] top-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 3.5 }} // Appears after line connects
                    viewport={{ once: true }}
                >
                    <div className="w-2 h-2 bg-blue-100 rounded-full shadow-[0_0_15px_3px_rgba(147,197,253,0.6)] animate-pulse" />
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-blue-200/80 font-light translate-y-4">Right Side</span>
                </motion.div>
            </div>

            {/* Text Content */}
            <motion.div
                className="mt-12 text-center space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 2, duration: 1.5 }}
            >
                <h2 className="text-xl md:text-2xl font-playfair text-white font-light">
                    Different skies.
                </h2>
                <h2 className="text-xl md:text-2xl font-playfair text-white font-light">
                    Different time zones.
                </h2>
                <h2 className="text-xl md:text-2xl font-playfair text-white font-light">
                    Different mornings.
                </h2>
                <motion.h2
                    className="text-2xl md:text-3xl font-playfair text-blue-200 italic mt-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 4.5, duration: 1.5 }}
                    viewport={{ once: true }}
                >
                    But the same heartbeat.
                </motion.h2>
            </motion.div>

        </section>
    );
}
