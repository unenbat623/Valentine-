'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { RotateCw } from 'lucide-react';

interface EndingNoProps {
    onRetry: () => void;
}

export default function EndingNo({ onRetry }: EndingNoProps) {
    const [reason, setReason] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <section className="h-screen w-full flex flex-col items-center justify-center relative z-20 text-center px-4 overflow-hidden">

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="max-w-xl w-full bg-black/60 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative"
            >
                {/* Lightning Flash Triggered by Parent maybe? Or random here logic? - Parent handles rain intensity/thunder */}

                {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-playfair text-slate-300 font-light italic">
                                "If this is your answer, I respect it."
                            </h2>
                            <p className="text-white/60 font-inter text-sm md:text-base">
                                But tell me… why did your heart say no?
                            </p>
                        </div>

                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition min-h-[120px] resize-none font-inter text-sm"
                            placeholder="Your thoughts..."
                        />

                        <button
                            type="submit"
                            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white/80 rounded-full border border-white/10 transition uppercase tracking-widest text-xs"
                        >
                            Share
                        </button>
                    </form>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-8"
                    >
                        <h2 className="text-2xl md:text-3xl font-playfair text-white/90 font-light">
                            "Even if the ending hurts, I am grateful I met you."
                        </h2>
                        <p className="text-white/60 text-lg italic">
                            But if there is even a small doubt... can you think about it once more?
                        </p>

                        <button
                            onClick={onRetry}
                            className="group relative px-8 py-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-100 rounded-full border border-blue-400/30 transition overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-widest text-xs font-semibold">
                                <RotateCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
                                Replay The Final Scene
                            </span>
                            <div className="absolute inset-0 bg-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    </motion.div>
                )}
            </motion.div>

        </section>
    );
}
