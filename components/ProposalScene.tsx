'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import EndingYes from './EndingYes';
import EndingNo from './EndingNo';

interface ProposalSceneProps {
    onDecision: (decision: 'yes' | 'no' | 'standby') => void;
}

export default function ProposalScene({ onDecision }: ProposalSceneProps) {
    const [status, setStatus] = useState<'standby' | 'yes' | 'no'>('standby');

    const handleChoice = (choice: 'yes' | 'no') => {
        setStatus(choice);
        onDecision(choice);
    };

    const handleRetry = () => {
        setStatus('standby');
        onDecision('standby');
    };

    return (
        <section className="min-h-screen w-full flex flex-col items-center justify-center relative z-20 overflow-hidden">

            <AnimatePresence mode="wait">

                {status === 'standby' && (
                    <motion.div
                        key="question"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5 }}
                        className="text-center space-y-12 max-w-2xl px-6"
                    >
                        <div className="space-y-6">
                            <h1 className="text-3xl md:text-5xl font-playfair text-white drop-shadow-lg leading-tight">
                                "I may not stand beside you tonight.<br />
                                But my heart already stands with you."
                            </h1>
                            <p className="text-xl md:text-2xl text-blue-100/80 font-light italic mt-8">
                                I choose you. Will you choose me too?
                            </p>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-12">
                            <button
                                onClick={() => handleChoice('yes')}
                                className="group relative px-8 py-4 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-400/30 rounded-full transition-all duration-500 overflow-hidden w-64"
                            >
                                <span className="relative z-10 text-white font-inter tracking-widest text-xs uppercase font-semibold">
                                    Yes — Let’s Continue Our Story
                                </span>
                                <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                            </button>

                            <button
                                onClick={() => handleChoice('no')}
                                className="group relative px-8 py-4 bg-transparent hover:bg-white/5 border border-white/10 hover:border-white/20 rounded-full transition-all duration-500 w-64"
                            >
                                <span className="relative z-10 text-white/60 group-hover:text-white/90 font-inter tracking-widest text-xs uppercase transition-colors">
                                    No — End It Here
                                </span>
                            </button>
                        </div>
                    </motion.div>
                )}

                {status === 'yes' && (
                    <motion.div
                        key="yes"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full"
                    >
                        <EndingYes />
                    </motion.div>
                )}

                {status === 'no' && (
                    <motion.div
                        key="no"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full"
                    >
                        <EndingNo onRetry={handleRetry} />
                    </motion.div>
                )}

            </AnimatePresence>
        </section>
    );
}
