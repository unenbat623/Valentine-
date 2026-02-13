'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function LightningEffect() {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        // Random lightning loop
        const loop = () => {
            const delay = Math.random() * 15000 + 5000; // 5-20 seconds between flashes
            const timeout = setTimeout(() => {
                setIsActive(true);
                setTimeout(() => setIsActive(false), 300); // short flash
                loop();
            }, delay);
            return timeout;
        };

        const timer = loop();
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isActive && (
                <motion.div
                    key="lightning"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.4, 0, 0.2, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'linear' }}
                    className="fixed inset-0 w-full h-full bg-blue-100 z-40 pointer-events-none mix-blend-soft-light"
                />
            )}
        </AnimatePresence>
    );
}
