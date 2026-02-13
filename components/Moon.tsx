'use client';

import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { useState, useMemo, useEffect, useRef } from 'react';

interface LivingMoonProps {
    status: 'standby' | 'yes' | 'no';
    isFocused?: boolean;
    onInteraction?: (focused: boolean) => void;
}

const WHISPER_MESSAGES = [
    "Би яг одоо чамайг бодож байна.", // I can feel you right now. 
    "миний зүрх нэг хэмнэлээр...", // Our hearts together...
    "Чи надад итгэдэг үү?", // Do you trust me?
    "Энэ анир чимээгүй биднийх.", // This silence is ours.
];

export default function Moon({ status, isFocused = false, onInteraction }: LivingMoonProps) {
    const { scrollYProgress } = useScroll();
    const [clickCount, setClickCount] = useState(0);
    const [currentWhisper, setCurrentWhisper] = useState<string | null>(null);
    const [pulseTrigger, setPulseTrigger] = useState(0);
    const whisperTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Heartbeat loop when focused
    useEffect(() => {
        if (isFocused) {
            const interval = setInterval(() => {
                setPulseTrigger(p => p + 1);
            }, 3000); // Pulse every 3s
            return () => clearInterval(interval);
        }
    }, [isFocused]);

    // 1. Scroll-Synced Moon Motion (Top-Left -> Center)
    const moonX = useTransform(scrollYProgress,
        [0, 0.3, 0.7, 1],
        ["-20vw", "-12vw", "-5vw", "0vw"]
    );
    const moonY = useTransform(scrollYProgress,
        [0, 0.3, 0.7, 1],
        ["-15vh", "-10vh", "-8vh", "-6vh"]
    );

    const springX = useSpring(moonX, { stiffness: 40, damping: 20 });
    const springY = useSpring(moonY, { stiffness: 40, damping: 20 });

    const opacity = useTransform(scrollYProgress, [0, 0.85, 0.95], [0.4, 0.8, 1]);
    const scrollScale = useTransform(scrollYProgress, [0, 1], [0.7, 1.1]);
    const zoomScale = isFocused ? 1.3 : 1;

    const terminatorShift = useTransform(scrollYProgress, [0, 1], [0, -100]);

    const glowBase = status === 'yes' ? 'rgba(255, 200, 50, 0.55)' :
        status === 'no' ? 'rgba(255, 191, 0, 0.35)' :
            isFocused ? 'rgba(191, 219, 254, 0.7)' :
                'rgba(191, 219, 254, 0.4)';

    const handleClick = () => {
        if (status === 'yes') return;
        setPulseTrigger(p => p + 1);
        if (whisperTimerRef.current) clearTimeout(whisperTimerRef.current);

        const nextMsg = WHISPER_MESSAGES[clickCount % WHISPER_MESSAGES.length];
        setCurrentWhisper(nextMsg);
        setClickCount(prev => prev + 1);

        whisperTimerRef.current = setTimeout(() => {
            setCurrentWhisper(null);
            whisperTimerRef.current = null;
        }, 4500);
    };

    useEffect(() => {
        return () => {
            if (whisperTimerRef.current) clearTimeout(whisperTimerRef.current);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[50] flex items-center justify-center">
            {/* Ambient Aura when focused */}
            <AnimatePresence>
                {isFocused && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1.1 }}
                        exit={{ opacity: 0, scale: 1.5 }}
                        transition={{ duration: 3 }}
                        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(191,219,254,0.08)_0%,transparent_70%)] blur-3xl"
                    />
                )}
            </AnimatePresence>

            <motion.div
                style={{
                    x: springX,
                    y: springY,
                    opacity,
                    scale: scrollScale
                }}
                animate={{
                    scale: scrollScale.get() * zoomScale,
                    filter: isFocused ? "brightness(1.5) saturate(1.2)" : "brightness(1) saturate(1)"
                }}
                className="relative pointer-events-auto cursor-pointer"
                onClick={handleClick}
                onMouseEnter={() => onInteraction?.(true)}
                onMouseLeave={() => onInteraction?.(false)}
            >
                <div className="absolute top-[-80px] md:top-[-120px] left-1/2 -translate-x-1/2 w-[240px] md:w-[350px] text-center pointer-events-none">
                    <AnimatePresence mode="wait">
                        {currentWhisper && (
                            <motion.p
                                key={currentWhisper}
                                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                                animate={{
                                    opacity: 0.8,
                                    y: 0,
                                    filter: "blur(0px)",
                                    transition: { duration: 2, ease: "easeOut" }
                                }}
                                exit={{
                                    opacity: 0,
                                    y: -20,
                                    filter: "blur(20px)",
                                    transition: { duration: 3, ease: "easeIn" }
                                }}
                                className="text-white font-playfair italic tracking-[0.15em] md:tracking-[0.25em] text-base md:text-lg drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]"
                            >
                                {currentWhisper}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>

                <motion.div
                    key={pulseTrigger}
                    animate={{
                        scale: status === 'no' ? 1 :
                            (status === 'yes' || isFocused) ? [1, 1.05, 1.02, 1.08, 1] :
                                [1, 1.015, 1],
                        filter: status === 'no'
                            ? `drop-shadow(0 0 50px ${glowBase})`
                            : (status === 'yes' || isFocused)
                                ? [
                                    `drop-shadow(0 0 45px ${glowBase})`,
                                    `drop-shadow(0 0 110px ${glowBase})`,
                                    `drop-shadow(0 0 70px ${glowBase})`,
                                    `drop-shadow(0 0 130px ${glowBase})`,
                                    `drop-shadow(0 0 45px ${glowBase})`
                                ]
                                : [
                                    `drop-shadow(0 0 45px ${glowBase})`,
                                    `drop-shadow(0 0 75px ${glowBase})`,
                                    `drop-shadow(0 0 45px ${glowBase})`
                                ],
                        transition: {
                            scale: {
                                duration: (status === 'yes' || isFocused) ? 1.5 : 8,
                                repeat: status === 'no' ? 0 : Infinity,
                                repeatDelay: (status === 'yes' || isFocused) ? 2 : 0,
                                ease: "easeInOut"
                            },
                            filter: {
                                duration: (status === 'yes' || isFocused) ? 1.5 : 8,
                                repeat: status === 'no' ? 0 : Infinity,
                                repeatDelay: (status === 'yes' || isFocused) ? 2 : 0,
                                ease: "easeInOut"
                            }
                        }
                    }}
                    className="relative"
                >
                    <svg width="180" height="180" viewBox="0 0 100 100" className="md:w-64 md:h-64 overflow-visible">
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
                                    rx="50"
                                    ry="55"
                                    fill="black"
                                />
                            </mask>
                        </defs>

                        <circle cx="50" cy="50" r="48" fill="#030712" opacity="0.9" />
                        <circle cx="50" cy="50" r="48" fill="url(#moonBodyGradient)" mask="url(#moonTerminator)" />

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

                        <motion.ellipse
                            animate={{ x: [-120, 120] }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            cx="0" cy="50" rx="35" ry="12" fill="white" opacity="0.04" filter="blur(15px)"
                        />
                    </svg>

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
