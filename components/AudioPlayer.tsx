'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioPlayerProps {
    shouldAutoPlay?: boolean;
}

export default function AudioPlayer({ shouldAutoPlay = false }: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showTitle, setShowTitle] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Sync state with actual audio element events
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);

        audio.addEventListener('play', onPlay);
        audio.addEventListener('pause', onPause);

        return () => {
            audio.removeEventListener('play', onPlay);
            audio.removeEventListener('pause', onPause);
        };
    }, []);

    // Auto-play when shouldAutoPlay becomes true
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !shouldAutoPlay) return;

        // Attempt to autoplay when triggered
        audio.play().catch(e => {
            console.log("Autoplay blocked by browser. User interaction required:", e);
        });
    }, [shouldAutoPlay]);

    const toggleAudio = () => {
        if (!audioRef.current) return;

        if (audioRef.current.paused) {
            audioRef.current.play().catch(e => console.log("Playback blocked:", e));
        } else {
            audioRef.current.pause();
        }
    };

    return (
        <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[100] flex flex-col items-end gap-2 pointer-events-auto">
            <AnimatePresence>
                {showTitle && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 0.6, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="text-[9px] tracking-[0.3em] uppercase text-white/80 font-extralight mb-1 text-right"
                    >
                        Cigarettes After Sex — Apocalypse
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex items-center gap-4 pointer-events-none">
                <motion.div
                    onClick={toggleAudio}
                    onMouseEnter={() => setShowTitle(true)}
                    onMouseLeave={() => setShowTitle(false)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    whileHover={{ opacity: 1 }}
                    className="group relative flex items-center gap-3 cursor-pointer pointer-events-auto"
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
                </motion.div>
                <audio
                    ref={audioRef}
                    loop
                    preload="auto"
                    src="https://archive.org/download/cigarettes-after-sex-songs-compilation_202203/Apocalypse%20-%20Cigarettes%20After%20Sex.mp3"
                />
            </div>

            <p className="text-[8px] text-white/10 uppercase tracking-widest mt-1">
                {isPlaying ? "Ертөнцүүд нэгдэж байна" : "Чимээгүй хаяа"}
            </p>
        </div>
    );
}

