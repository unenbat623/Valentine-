'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function FallingStar() {
    const [star, setStar] = useState<{ id: number; x: number; y: number } | null>(null);
    const [message, setMessage] = useState(false);

    useEffect(() => {
        const trigger = () => {
            if (Math.random() > 0.7) {
                setStar({
                    id: Date.now(),
                    x: Math.random() * 80 + 10,
                    y: Math.random() * 30
                });
                setTimeout(() => setStar(null), 1000);
            }
        };

        const interval = setInterval(trigger, 15000); // Check every 15s
        return () => clearInterval(interval);
    }, []);

    const handleClick = () => {
        if (star) {
            setMessage(true);
            setStar(null);
            setTimeout(() => setMessage(false), 3000);
        }
    };

    return (
        <>
            <AnimatePresence>
                {star && (
                    <motion.div
                        key={star.id}
                        initial={{ x: `${star.x}%`, y: `${star.y}%`, opacity: 0 }}
                        animate={{
                            x: `${star.x - 20}%`,
                            y: `${star.y + 40}%`,
                            opacity: [0, 1, 0]
                        }}
                        transition={{ duration: 0.8, ease: "linear" }}
                        className="fixed w-1.5 h-1.5 bg-white rounded-full z-10 cursor-pointer pointer-events-auto shadow-[0_0_15px_white]"
                        onClick={handleClick}
                    >
                        <div className="absolute top-0 right-0 w-20 h-[1px] bg-gradient-to-l from-white to-transparent rotate-[-45deg] origin-right" />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {message && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-[40%] left-1/2 -translate-x-1/2 z-[100] bg-white/5 backdrop-blur-md px-6 py-2 rounded-full border border-white/20"
                    >
                        <span className="text-white font-playfair italic tracking-widest text-sm">Чамайг сонгосоор л байна.</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
