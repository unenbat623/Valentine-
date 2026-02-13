'use client';

import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';

interface LivingMoonProps {
    status: 'standby' | 'yes' | 'no';
}

const WHISPER_MESSAGES = [
    "Би хүлээх болно...", // I will wait...
    "Чи хэдэн ч удаа 'үгүй' гэж хэлсэн...", // No matter how many times you say no...
    "Би бидний түүх эхлэх хүртэл энд байх болно.", // I will be here, until our story begins.
    "Чи бидний аялалыг хамтдаа эхлүүлэхэд бэлэн үү?" // Are you ready to begin our journey together?
];

export default function Moon({ status }: LivingMoonProps) {
    const { scrollYProgress } = useScroll();
    const [clickCount, setClickCount] = useState(0);
    const [currentWhisper, setCurrentWhisper] = useState<string | null>(null);
    const [pulseTrigger, setPulseTrigger] = useState(0);

    // 1. Scroll-Synced Moon Motion (Top-Left -> Center)
    // Ease-in-out cubic like progression for position
    const moonX = useTransform(scrollYProgress,
        [0, 0.3, 0.7, 1],
        ["-35vw", "-20vw", "-5vw", "0vw"]
    );
    const moonY = useTransform(scrollYProgress,
        [0, 0.3, 0.7, 1],
        ["-35vh", "-20vh", "-12vh", "-8vh"] // Settle slightly above center for cinematic breathing room
    );

    // Spring physics for organic "weight"
    const springX = useSpring(moonX, { stiffness: 40, damping: 20 });
    const springY = useSpring(moonY, { stiffness: 40, damping: 20 });

    // Opacity fades in over the first 12%
    const opacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.7, 1.3]);

    // 2. Phase Change (Half -> Full) via Curved Mask
    const terminatorShift = useTransform(scrollYProgress, [0, 1], [50, 100]);

    // Emotional Glow Feedback
    const glowBase = status === 'yes' ? 'rgba(255, 215, 0, 0.5)' :
        status === 'no' ? 'rgba(148, 163, 184, 0.3)' :
            'rgba(191, 219, 254, 0.4)';

    const handleClick = () => {
        if (status === 'yes') return;

        // Pulse moon on click
        setPulseTrigger(p => p + 1);

        // Whisper logic
        const nextMsg = WHISPER_MESSAGES[clickCount % WHISPER_MESSAGES.length];
        setCurrentWhisper(nextMsg);
        setClickCount(prev => prev + 1);

        // Hide after reading time
        setTimeout(() => setCurrentWhisper(null), 4500);
    };

    return (
        <div className="fixed inset-0 pointer-events-none z-10 flex items-center justify-center">
            <motion.div
                style={{
                    x: springX,
                    y: springY,
                    opacity,
                    scale
                }}
                className="relative pointer-events-auto cursor-pointer"
                onClick={handleClick}
            >
                {/* 4. Floating Whisper Text */}
                <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[350px] text-center pointer-events-none">
                    <AnimatePresence mode="wait">
                        {currentWhisper && (
                            <motion.p
                                key={currentWhisper}
                                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                                animate={{
                                    opacity: 0.6,
                                    y: 0,
                                    filter: "blur(0px)",
                                    transition: { duration: 2.5, ease: "easeOut" }
                                }}
                                exit={{
                                    opacity: 0,
                                    y: -60,
                                    filter: "blur(20px)",
                                    transition: { duration: 3, ease: "easeIn" }
                                }}
                                className="text-white font-playfair italic tracking-[0.25em] text-lg drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                            >
                                {currentWhisper}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>

                {/* 3. Breathing & Continuous Glow Pulse */}
                <motion.div
                    key={pulseTrigger} // Re-trigger click pulse if needed
                    animate={{
                        scale: [1, 1.015, 1],
                        filter: [
                            `drop-shadow(0 0 45px ${glowBase})`,
                            `drop-shadow(0 0 75px ${glowBase})`,
                            `drop-shadow(0 0 45px ${glowBase})`
                        ],
                        // Extra subtle pulse on click
                        transition: {
                            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                            filter: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                        }
                    }}
                    className="relative"
                >
                    {/* Living Moon Shell */}
                    <svg width="220" height="220" viewBox="0 0 100 100" className="md:w-64 md:h-64 overflow-visible">
                        <defs>
                            <radialGradient id="moonBodyGradient" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="#f8fafc" />
                                <stop offset="70%" stopColor="#e2e8f0" />
                                <stop offset="100%" stopColor="#cbd5e1" />
                            </radialGradient>

                            <mask id="moonTerminator">
                                <rect x="0" y="0" width="100" height="100" fill="white" />
                                <motion.ellipse
                                    cx={terminatorShift}
                                    cy="50"
                                    rx="51"
                                    ry="51"
                                    fill="black"
                                />
                            </mask>
                        </defs>

                        {/* Deep Shadow backing for moon (dark side visibility) */}
                        <circle cx="50" cy="50" r="48" fill="#030712" opacity="0.9" />

                        {/* Visible Part of the Moon */}
                        <circle cx="50" cy="50" r="48" fill="url(#moonBodyGradient)" mask="url(#moonTerminator)" />

                        {/* Surface Cratering & Shadows (Subtle Drift) */}
                        <motion.g
                            mask="url(#moonTerminator)"
                            animate={{
                                x: [-2, 2, -2],
                                opacity: [0.06, 0.1, 0.06]
                            }}
                            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <circle cx="35" cy="40" r="6" fill="black" opacity="0.1" filter="blur(2px)" />
                            <circle cx="60" cy="60" r="9" fill="black" opacity="0.08" filter="blur(3px)" />
                            <circle cx="50" cy="75" r="4" fill="black" opacity="0.12" filter="blur(1px)" />
                            <circle cx="75" cy="35" r="5" fill="black" opacity="0.07" filter="blur(2px)" />
                        </motion.g>

                        {/* 5. Emotional Story Particles (Rise on YES) */}
                        <AnimatePresence>
                            {status === 'yes' && (
                                <motion.g
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {[...Array(20)].map((_, i) => (
                                        <motion.circle
                                            key={i}
                                            r={Math.random() * 1 + 0.5}
                                            fill="white"
                                            initial={{ cx: 50, cy: 50, opacity: 0 }}
                                            animate={{
                                                cx: 50 + (Math.random() - 0.5) * 100,
                                                cy: -100 - Math.random() * 100,
                                                opacity: [0, 1, 0]
                                            }}
                                            transition={{
                                                duration: 4 + Math.random() * 4,
                                                repeat: Infinity,
                                                delay: Math.random() * 5
                                            }}
                                        />
                                    ))}
                                </motion.g>
                            )}
                        </AnimatePresence>

                        {/* Subtle Floating Mist across face */}
                        <motion.ellipse
                            animate={{ x: [-120, 120] }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            cx="0" cy="50" rx="35" ry="12" fill="white" opacity="0.04" filter="blur(15px)"
                        />
                    </svg>

                    {/* Warm YES Aura */}
                    <AnimatePresence>
                        {status === 'yes' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{
                                    opacity: 0.6,
                                    scale: 1.4,
                                    transition: { duration: 6, ease: "easeOut" }
                                }}
                                className="absolute inset-0 rounded-full bg-amber-300/10 blur-3xl mix-blend-screen"
                            />
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Click Hint Signal (Standby only) */}
                {status === 'standby' && clickCount === 0 && (
                    <motion.div
                        animate={{
                            opacity: [0.1, 0.4, 0.1],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-[0.5em] text-white/20 whitespace-nowrap"
                    >
                        Хүрч үзнэ үү
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
