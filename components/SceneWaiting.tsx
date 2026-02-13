'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function SceneWaiting() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const moonY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
    const moonScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

    return (
        <section ref={ref} className="h-screen w-full flex flex-col items-center justify-center relative z-20 overflow-hidden">

            {/* Background Moon */}
            <motion.div
                style={{ y: moonY, scale: moonScale }}
                className="absolute top-[10%] left-1/2 -translate-x-1/2 w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-slate-200 to-slate-400 opacity-80 blur-sm shadow-[0_0_80px_rgba(255,255,255,0.15)] z-0"
            >
                <div className="absolute inset-0 bg-white/20 rounded-full blur-md" />
            </motion.div>

            {/* Mist Effect */}
            <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-[#0a0e17] via-[#0a0e17]/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-blue-900/5 mix-blend-overlay z-10" />

            {/* Text */}
            <div className="relative z-20 text-center max-w-xl px-6 mt-32">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-2xl md:text-3xl font-playfair font-light text-slate-100 space-y-4"
                >
                    <p>"Love is not measured by distance."</p>
                    <p>"It is measured by who you choose even when they are far."</p>
                    <br />
                    <p className="italic">"If I must wait, I will wait with love."</p>
                </motion.h2>
            </div>

        </section>
    );
}
