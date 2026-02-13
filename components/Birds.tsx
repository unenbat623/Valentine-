'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

interface BirdsProps {
    phase?: 'intro' | 'storm' | 'twilight' | 'night';
}

export default function Birds({ phase = 'storm' }: BirdsProps) {
    const { scrollYProgress } = useScroll();

    // flight paths for 4 birds
    const b1X = useTransform(scrollYProgress, [0, 1], ["5%", "30%"]);
    const b1Y = useTransform(scrollYProgress, [0, 1], ["15%", "35%"]);

    const b2X = useTransform(scrollYProgress, [0, 1], ["95%", "70%"]);
    const b2Y = useTransform(scrollYProgress, [0, 1], ["10%", "25%"]);

    const b3X = useTransform(scrollYProgress, [0, 1], ["-10%", "40%"]);
    const b3Y = useTransform(scrollYProgress, [0, 1], ["40%", "45%"]);

    const b4X = useTransform(scrollYProgress, [0, 1], ["110%", "60%"]);
    const b4Y = useTransform(scrollYProgress, [0, 1], ["35%", "50%"]);

    const birdConfig = [
        { x: b1X, y: b1Y, left: true, delay: 0 },
        { x: b2X, y: b2Y, left: false, delay: 0.5 },
        { x: b3X, y: b3Y, left: true, delay: 1.2 },
        { x: b4X, y: b4Y, left: false, delay: 0.8 },
    ];

    return (
        <div className="fixed inset-0 pointer-events-none z-[60]">
            {(phase === 'intro' || phase === 'storm') && birdConfig.map((bird, i) => (
                <motion.div
                    key={i}
                    style={{
                        left: bird.x,
                        top: bird.y,
                        scale: 1,
                        opacity: 1
                    }}
                    className="absolute"
                >
                    <BirdIcon isLeft={bird.left} delay={bird.delay} />
                </motion.div>
            ))}
        </div>
    );
}

function BirdIcon({ isLeft, delay = 0 }: { isLeft: boolean, delay?: number }) {
    return (
        <motion.div
            initial={{ y: 0 }}
            animate={{
                y: [0, -5, 0],
                rotate: isLeft ? [0, 10, 0] : [0, -10, 0]
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay
            }}
            className="flex flex-col items-center"
        >
            <div className="relative w-8 h-4">
                {/* Left Wing */}
                <motion.div
                    animate={{ rotateZ: [-20, 40, -20] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute right-1/2 bottom-0 w-4 h-[2px] bg-white/40 shadow-[0_0_8px_white] origin-right"
                />
                {/* Right Wing */}
                <motion.div
                    animate={{ rotateZ: [20, -40, 20] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute left-1/2 bottom-0 w-4 h-[2px] bg-white/40 shadow-[0_0_8px_white] origin-left"
                />

                {/* Body / Eye */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-1 bg-white/40 rounded-full">
                    {/* Glowing Eye */}
                    <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute right-0 top-0 w-0.5 h-0.5 bg-blue-200 rounded-full"
                    />
                </div>
            </div>
        </motion.div>
    );
}
