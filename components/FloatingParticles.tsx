'use client';

import { motion } from 'framer-motion';
import { useMemo, useState, useEffect } from 'react';

export default function FloatingParticles() {
    const [mounted, setMounted] = useState(false);

    const particles = useMemo(() => {
        return [...Array(25)].map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            duration: 10 + Math.random() * 20,
            delay: Math.random() * 5,
        }));
    }, []);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[45] overflow-hidden">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{
                        opacity: 0,
                        x: `${p.x}vw`,
                        y: `${p.y + 10}vh`
                    }}
                    animate={{
                        opacity: [0, 0.4, 0],
                        y: [`${p.y + 10}vh`, `${p.y - 20}vh`],
                        x: [`${p.x}vw`, `${p.x + (Math.random() * 10 - 5)}vw`]
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear"
                    }}
                    className="absolute bg-blue-200/40 rounded-full blur-[1px] shadow-[0_0_8px_rgba(191,219,254,0.4)]"
                    style={{
                        width: p.size,
                        height: p.size,
                    }}
                />
            ))}
        </div>
    );
}
