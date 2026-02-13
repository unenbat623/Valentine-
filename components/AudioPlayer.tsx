'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showTitle, setShowTitle] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const toggleAudio = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.log("Audio play blocked", e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="fixed bottom-12 right-12 z-[100] flex flex-col items-end gap-2">
            <AnimatePresence>
                {showTitle && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 0.6, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="text-[9px] tracking-[0.3em] uppercase text-white/80 font-extralight mb-1"
                    >
                        Радиохэд — Jigsaw Falling Into Place
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex items-center gap-4">
                <motion.button
                    onClick={toggleAudio}
                    onMouseEnter={() => setShowTitle(true)}
                    onMouseLeave={() => setShowTitle(false)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    whileHover={{ opacity: 1 }}
                    className="group relative flex items-center gap-3"
                >
                    <span className="text-[10px] tracking-[0.4em] uppercase text-white font-light transition-all">
                        {isPlaying ? "Дуутай" : "Дуугүй"}
                    </span>
                    <div className="flex gap-[2px] h-3 items-end">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <motion.div
                                key={i}
                                animate={isPlaying ? { height: [4, 12, 6, 10, 4] } : { height: 2 }}
                                transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    delay: i * 0.15,
                                    ease: "easeInOut"
                                }}
                                className="w-[1px] bg-white shadow-[0_0_5px_white]"
                            />
                        ))}
                    </div>
                </motion.button>
                <audio
                    ref={audioRef}
                    loop
                    src="https://archive.org/download/radiohead2008-07-01aud2/radiohead2008-07-01aud2_t21.mp3"
                />
            </div>

            <p className="text-[8px] text-white/10 uppercase tracking-widest mt-1">
                {isPlaying ? "Ертөнцүүд нэгдэж байна" : "Чимээгүй хаяа"}
            </p>
        </div>
    );
}
