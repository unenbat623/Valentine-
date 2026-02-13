'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

import SkyBackground from '@/components/SkyBackground';
import LetterScene from '@/components/LetterScene';
import Moon from '@/components/Moon';
import Birds from '@/components/Birds';
import FallingStar from '@/components/FallingStar';
import FinalDissolve from '@/components/FinalDissolve';
import CinemaBars from '@/components/CinemaBars';
import LightningEffect from '@/components/LightningEffect';
import RainBackground from '@/components/RainBackground';
import AudioPlayer from '@/components/AudioPlayer';

export default function Home() {
    const [proposalStatus, setProposalStatus] = useState<'standby' | 'yes' | 'no'>('standby');
    const [isRevealed, setIsRevealed] = useState(false);
    const { scrollYProgress } = useScroll();

    // Camera pull-back reveal logic
    const scale = isRevealed ? 0.38 : 1;
    const rotateX = isRevealed ? 12 : 0;
    const yOffset = isRevealed ? -100 : 0;
    const zTranslate = isRevealed ? -500 : 0;

    useEffect(() => {
        if (proposalStatus === 'yes') {
            const timer = setTimeout(() => {
                setIsRevealed(true);
            }, 18000); // Trigger cinema reveal after constellation forms
            return () => clearTimeout(timer);
        }
    }, [proposalStatus]);

    const handleDecision = (decision: 'yes' | 'no') => {
        setProposalStatus(decision);
    };

    return (
        <main className="relative min-h-[700vh] bg-[#020205] text-white selection:bg-blue-500/30 overflow-x-hidden perspective-[1200px]">

            {/* Background Layer: The Cinema Theater Room */}
            <AnimatePresence>
                {isRevealed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 5 }}
                        className="fixed inset-0 z-0 flex flex-col items-center justify-end overflow-hidden"
                    >
                        {/* Dim theater walls/atmosphere */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-[#050510] to-black opacity-90" />

                        {/* The Silhouettes */}
                        <div className="relative z-10 flex gap-32 md:gap-48 items-end mb-[-40px]">
                            {/* Person 1 */}
                            <div className="relative group">
                                <div className="w-40 h-60 md:w-56 md:h-80 bg-black rounded-t-[100px] shadow-[0_-20px_50px_rgba(0,0,0,1)] relative z-10" />
                                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-20 h-20 md:w-28 md:h-28 bg-black rounded-full z-20" />
                            </div>

                            {/* Person 2 */}
                            <div className="relative group">
                                <div className="w-40 h-60 md:w-56 md:h-80 bg-black rounded-t-[100px] shadow-[0_-20px_50px_rgba(0,0,0,1)] relative z-10" />
                                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-20 h-20 md:w-28 md:h-28 bg-black rounded-full z-20" />
                            </div>

                            {/* Connecting Arms / Hands (Implied connection) */}
                            <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-64 h-8 bg-black rounded-full blur-[2px]" />
                        </div>

                        {/* Final Text Reveal */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 4, duration: 4 }}
                            className="relative z-20 mb-24 max-w-2xl text-center px-8"
                        >
                            <p className="font-playfair text-xl md:text-3xl text-white/40 italic font-extralight tracking-widest leading-loose">
                                "Тэд хэзээ ч өөр ертөнцөд байгаагүй.<br />
                                Тэд үргэлж нэг түүхийг хуваалцах заяатай байсан."
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* The Cinematic Screen (The Interactive Experience) */}
            <motion.div
                style={{ transformStyle: 'preserve-3d' }}
                animate={{
                    scale,
                    rotateX,
                    y: yOffset,
                    translateZ: zTranslate,
                    boxShadow: isRevealed ? "0 40px 100px rgba(0, 0, 0, 0.8), 0 0 80px rgba(100, 149, 237, 0.1)" : "none",
                    borderRadius: isRevealed ? "8px" : "0px"
                }}
                transition={{ duration: 7, ease: [0.4, 0, 0.2, 1] }}
                className="relative z-10 w-full min-h-full origin-bottom overflow-hidden shadow-2xl border-white/5"
            >
                <SkyBackground />
                <Moon status={proposalStatus} />
                <Birds status={proposalStatus} />
                <FallingStar />
                <CinemaBars isActive={proposalStatus !== 'yes' && !isRevealed} />
                <LightningEffect />
                <AudioPlayer />

                <div className={`fixed inset-0 pointer-events-none transition-opacity duration-2000 ${proposalStatus === 'yes' ? 'opacity-0' : 'opacity-100'}`}>
                    <RainBackground intensity={proposalStatus === 'no' ? 0.9 : 0.4} />
                </div>

                <div className="relative z-20">
                    {/* Intro Hero */}
                    <section className="h-screen flex flex-col items-center justify-center text-center p-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 2.5 }}
                        >
                            <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl text-white/90 font-extralight tracking-[0.4em] uppercase">
                                Бидний Түүх
                            </h1>
                            <p className="mt-16 text-white/20 text-[10px] tracking-[0.8em] uppercase animate-pulse">
                                Үзэхийн тулд доош гүйлгэ
                            </p>
                        </motion.div>
                    </section>

                    {/* Letter Scenes */}
                    <LetterScene text="Зарим түүх нэг газраас эхэлдэггүй. Гэхдээ тэд ижил мэдрэмжээр эхэлдэг." />
                    <LetterScene text="Өөр өөр тэнгэр. Өөр өөр өглөө. Гэхдээ ижил зүрхний цохилт. Нэгэн хаяа болон нэгдэж буй хоёр аялал." />
                    <LetterScene text="Хайр зайгаар хэмжигддэггүй. Энэ нь хол байсан ч хэнийг сонгож байгаагаар хэмжигддэг." />
                    <LetterScene text="Цагийн бүс бүр. Нар мандах бүр. Бороо орох бүр. Би чамайг сонгож байна." />

                    {/* The Proposal Section */}
                    <section className="min-h-screen flex items-center justify-center p-8">
                        <AnimatePresence mode="wait">
                            {proposalStatus === 'standby' ? (
                                <motion.div
                                    key="proposal-card"
                                    exit={{ opacity: 0, scale: 0.98, filter: "blur(20px)" }}
                                    transition={{ duration: 3 }}
                                    className="text-center space-y-20 max-w-4xl"
                                >
                                    <h2 className="text-3xl md:text-5xl font-playfair italic font-extralight text-blue-50/90 leading-relaxed shadow-glow">
                                        "Чи энэхүү хаяаг надтай хуваалцах уу?"
                                    </h2>
                                    <div className="flex flex-col md:flex-row gap-16 justify-center items-center">
                                        <button
                                            onClick={() => handleDecision('yes')}
                                            className="group relative px-16 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-1000"
                                        >
                                            <span className="relative z-10 text-white tracking-[0.6em] uppercase text-[10px] font-medium">
                                                ТИЙМ — БИДНИЙ ТҮҮХИЙГ ЭХЛҮҮЛЬЕ
                                            </span>
                                            <div className="absolute inset-0 bg-blue-400/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </button>
                                        <button
                                            onClick={() => handleDecision('no')}
                                            className="text-white/20 hover:text-white/60 tracking-[0.5em] uppercase text-[9px] transition-colors duration-1000"
                                        >
                                            Хараахан бэлэн биш байна
                                        </button>
                                    </div>
                                </motion.div>
                            ) : proposalStatus === 'yes' ? (
                                <FinalDissolve accepted={true} key="yes-end" />
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    key="no-end"
                                    className="text-center space-y-12"
                                >
                                    <h2 className="text-2xl md:text-3xl font-playfair italic text-white/50 font-extralight">
                                        "Зай бол хайр хэр хол явж чадахыг шалгах шалгуур юм."
                                    </h2>
                                    <p className="text-white/20 tracking-widest text-sm">Сарыг дахин нэг хар. Тэр биднийг санаж байгаа.</p>
                                    <button
                                        onClick={() => setProposalStatus('standby')}
                                        className="mt-8 px-12 py-3 border border-white/5 rounded-full text-[9px] uppercase tracking-[0.4em] hover:bg-white/5 transition-all text-white/40"
                                    >
                                        Дахин нэг хар
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </section>
                </div>
            </motion.div>

            {/* Ambient Shine on Cinema Reveal */}
            {isRevealed && (
                <div className="fixed inset-0 pointer-events-none z-50 shadow-[inset_0_0_200px_rgba(0,0,0,1)]" />
            )}
        </main>
    );
}
