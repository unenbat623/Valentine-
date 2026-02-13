'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

interface BirdsProps {
    status: 'standby' | 'yes' | 'no';
}

export default function Birds({ status }: BirdsProps) {
    const { scrollYProgress } = useScroll();

    // 1. Flight paths - birds start on opposite sides and converge
    // Bird 1: Left to Centerish
    const bird1X = useTransform(scrollYProgress, [0, 0.8], ["-10%", status === 'yes' ? "45%" : "30%"]);
    const bird1Y = useTransform(scrollYProgress, [0, 0.8], ["20%", status === 'yes' ? "42%" : "35%"]);

    // Bird 2: Right to Centerish
    const bird2X = useTransform(scrollYProgress, [0, 0.8], ["110%", status === 'yes' ? "55%" : "70%"]);
    const bird2Y = useTransform(scrollYProgress, [0, 0.8], ["15%", status === 'yes' ? "43%" : "25%"]);

    // 2. YES path: fly together toward moon
    const yesScale = useTransform(scrollYProgress, [0.8, 1], [1, 0.2]); // Fading into distance

    // 3. NO path logic (The fix for Rules of Hooks)
    const exitOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[15]">
            {/* Bird 1 */}
            <motion.div
                style={{
                    left: status === 'yes' ? (scrollYProgress.get() > 0.8 ? "48%" : bird1X) : bird1X,
                    top: status === 'yes' ? (scrollYProgress.get() > 0.8 ? "42%" : bird1Y) : bird1Y,
                    scale: status === 'yes' && scrollYProgress.get() > 0.8 ? yesScale : 1,
                    opacity: status === 'no' ? exitOpacity : 1
                }}
                className="absolute"
            >
                <BirdIcon isLeft={true} status={status} />
            </motion.div>

            {/* Bird 2 */}
            <motion.div
                style={{
                    left: status === 'yes' ? (scrollYProgress.get() > 0.8 ? "52%" : bird2X) : bird2X,
                    top: status === 'yes' ? (scrollYProgress.get() > 0.8 ? "42%" : bird2Y) : bird2Y,
                    scale: status === 'yes' && scrollYProgress.get() > 0.8 ? yesScale : 1,
                    opacity: status === 'no' ? exitOpacity : 1
                }}
                className="absolute"
            >
                <BirdIcon isLeft={false} status={status} />
            </motion.div>
        </div>
    );
}

function BirdIcon({ isLeft, status }: { isLeft: boolean, status: string }) {
    return (
        <motion.div
            animate={{
                y: [0, -5, 0],
                rotate: isLeft ? [0, 10, 0] : [0, -10, 0]
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            className="flex flex-col items-center"
        >
            <div className="relative w-8 h-4">
                {/* Left Wing */}
                <motion.div
                    animate={{ rotateZ: [-20, 40, -20] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute right-1/2 bottom-0 w-4 h-[2px] bg-black origin-right"
                />
                {/* Right Wing */}
                <motion.div
                    animate={{ rotateZ: [20, -40, 20] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute left-1/2 bottom-0 w-4 h-[2px] bg-black origin-left"
                />

                {/* Body / Eye */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-1 bg-black rounded-full">
                    {/* Glowing Eye */}
                    <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute right-0 top-0 w-0.5 h-0.5 bg-blue-200 rounded-full"
                    />
                </div>
            </div>

            {/* Visual indicator for "Yes" - soft trail or glow */}
            {status === 'yes' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute -inset-2 bg-blue-300/10 blur-xl rounded-full"
                />
            )}
        </motion.div>
    );
}
