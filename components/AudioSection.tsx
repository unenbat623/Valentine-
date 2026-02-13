'use client';

import { Play, Pause } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AudioSection() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Flash effect on play start
        if (isPlaying) {
            // Logic for flash is handled in render
        }
    }, [isPlaying]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <section className="min-h-screen w-full flex items-center justify-center p-6 relative z-20">

            {/* Local Lightning Flash Logic */}
            <AnimatePresence>
                {isPlaying && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.4, 0] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 bg-blue-100 mix-blend-overlay pointer-events-none z-30"
                    />
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className={`
           relative w-full max-w-sm p-8 rounded-3xl 
           bg-white/5 backdrop-blur-xl border border-white/10 
           shadow-[0_0_40px_rgba(0,0,0,0.3)]
           transition-all duration-700
           ${isPlaying ? 'border-blue-300/30 shadow-[0_0_60px_rgba(59,130,246,0.2)]' : 'hover:border-white/20'}
         `}
            >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent rounded-3xl pointer-events-none" />

                <div className="text-center space-y-8 relative z-10">
                    <h3 className="text-lg md:text-xl font-light text-white/90 tracking-wide">
                        "Үүнийг би чамд зориуллаа."
                    </h3>

                    <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
                        {/* Pulse Ring */}
                        {isPlaying && (
                            <motion.div
                                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute inset-0 rounded-full border border-blue-400/30"
                            />
                        )}

                        <button
                            onClick={togglePlay}
                            className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/15 active:scale-95 flex items-center justify-center transition-all duration-300 border border-white/20 group"
                        >
                            {isPlaying ? (
                                <Pause className="w-6 h-6 text-white" />
                            ) : (
                                <Play className="w-6 h-6 text-white ml-1 group-hover:scale-110 transition-transform" />
                            )}
                        </button>
                    </div>

                    <div className="space-y-2">
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: isPlaying ? "100%" : "0%" }}
                                transition={{ duration: 180, ease: "linear" }}
                                className="h-full bg-blue-400/80 shadow-[0_0_10px_blue]"
                            />
                        </div>
                        <div className="flex justify-between text-[10px] text-white/40 font-mono tracking-widest">
                            <span>0:00</span>
                            <span>3:00</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Hidden Audio Element */}
            <audio ref={audioRef} src="/your-song.mp3" loop />
        </section>
    );
}
