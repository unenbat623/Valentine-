'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

import SkyBackground from '@/components/SkyBackground';
import LetterScene from '@/components/LetterScene';
import Moon from '@/components/Moon';
import Birds from '@/components/Birds';
import FallingStar from '@/components/FallingStar';
import CinemaBars from '@/components/CinemaBars';
import LightningEffect from '@/components/LightningEffect';
import RainBackground from '@/components/RainBackground';
import AudioPlayer from '@/components/AudioPlayer';
import Logo from '@/components/Logo';
import EndingNo from '@/components/EndingNo';
import EndingYes from '@/components/EndingYes';
import FloatingParticles from '@/components/FloatingParticles';
import SecretCinemaMode from '@/components/SecretCinemaMode';
import SceneDistance from '@/components/SceneDistance';
import SceneLateNight from '@/components/SceneLateNight';
import SceneWaiting from '@/components/SceneWaiting';

export default function Home() {
    const [proposalStatus, setProposalStatus] = useState<'standby' | 'yes' | 'no'>('standby');
    const [isRevealed, setIsRevealed] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [isMoonFocused, setIsMoonFocused] = useState(false);
    const [isSecretActive, setIsSecretActive] = useState(false);
    const { scrollYProgress } = useScroll();

    // Cinematic Phase logic
    // 0: intro, 1: storm, 2: twilight (interaction), 3: night (decision)
    const [cinematicPhase, setCinematicPhase] = useState<'intro' | 'storm' | 'twilight' | 'night'>('intro');

    useEffect(() => {
        if (proposalStatus !== 'standby') {
            setCinematicPhase('night');
        } else if (isMoonFocused) {
            setCinematicPhase('twilight');
        } else if (scrollYProgress.get() > 0.05) {
            setCinematicPhase('storm');
        } else {
            setCinematicPhase('intro');
        }
    }, [isMoonFocused, scrollYProgress, proposalStatus]);

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
        <main className={`relative min-h-[700vh] bg-[#020205] text-white selection:bg-blue-500/30 perspective-[1200px] overflow-x-clip ${!hasStarted ? 'h-screen overflow-hidden' : ''}`}>

            {/* Cinematic Entrance Overlay */}
            <AnimatePresence>
                {!hasStarted && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center p-8 text-center"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="bg-blue-400/20 blur-3xl w-64 h-64 absolute rounded-full"
                        />
                        <motion.button
                            onClick={() => setHasStarted(true)}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 3, delay: 1 }}
                            className="relative z-10 group"
                        >
                            <span className="font-serif text-xl md:text-2xl tracking-[0.3em] uppercase text-white/40 group-hover:text-white/80 transition-colors duration-1000">
                                Үргэлжлүүлэх
                            </span>
                            <div className="mt-4 h-[1px] w-0 group-hover:w-full bg-white/20 transition-all duration-1000 mx-auto" />
                        </motion.button>
                        <p className="absolute bottom-12 text-white/10 text-[9px] tracking-[0.4em] uppercase font-light">
                            Recommended with Sound
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Final Cinematic Floor Silhouettes (Persistent but dynamic) */}
            <div className={`fixed inset-0 z-0 flex flex-col items-center justify-end overflow-hidden transition-opacity duration-3000 pointer-events-none ${hasStarted ? 'opacity-100' : 'opacity-0'}`}>
                {/* The Silhouettes */}
                <motion.div
                    animate={{ y: isRevealed ? -40 : 100 }}
                    transition={{ duration: 4 }}
                    className="relative z-10 flex gap-12 md:gap-40 items-end mb-[-20px] md:mb-[-10px]"
                >
                    {/* Person 1 */}
                    <motion.div
                        animate={{
                            rotateY: isMoonFocused ? -15 : 0,
                            rotateZ: isMoonFocused ? -5 : 0,
                            x: isMoonFocused ? 10 : 0
                        }}
                        className="relative group scale-75 md:scale-100"
                    >
                        <div className="w-20 h-32 md:w-56 md:h-80 bg-black rounded-t-[50px] md:rounded-t-[100px] shadow-[0_-15px_30px_rgba(0,0,0,1)] relative z-10" />
                        <motion.div
                            animate={{ rotateX: isMoonFocused ? -30 : 0 }}
                            className="absolute -top-10 md:-top-16 left-1/2 -translate-x-1/2 w-12 h-12 md:w-28 md:h-28 bg-black rounded-full z-20"
                        />
                    </motion.div>

                    {/* Person 2 */}
                    <motion.div
                        animate={{
                            rotateY: isMoonFocused ? 15 : 0,
                            rotateZ: isMoonFocused ? 5 : 0,
                            x: isMoonFocused ? -10 : 0
                        }}
                        className="relative group scale-75 md:scale-100"
                    >
                        <div className="w-20 h-32 md:w-56 md:h-80 bg-black rounded-t-[50px] md:rounded-t-[100px] shadow-[0_-15px_30px_rgba(0,0,0,1)] relative z-10" />
                        <motion.div
                            animate={{ rotateX: isMoonFocused ? -30 : 0 }}
                            className="absolute -top-10 md:-top-16 left-1/2 -translate-x-1/2 w-12 h-12 md:w-28 md:h-28 bg-black rounded-full z-20"
                        />
                    </motion.div>
                </motion.div>
            </div>

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
                <SkyBackground phase={cinematicPhase} />
                <Moon
                    status={proposalStatus}
                    isFocused={isMoonFocused}
                    onInteraction={setIsMoonFocused}
                />
                <Birds phase={cinematicPhase} />
                <FallingStar />
                <CinemaBars isActive={cinematicPhase !== 'storm' || !isRevealed} />
                <LightningEffect status={proposalStatus} phase={cinematicPhase} />
                <AudioPlayer />
                <Logo />

                <SecretCinemaMode onToggle={setIsSecretActive} />

                {cinematicPhase === 'twilight' && <FloatingParticles />}

                <div className={`fixed inset-0 pointer-events-none transition-all duration-3000 ${cinematicPhase === 'night' ? 'bg-black/40 backdrop-blur-[2px] z-20' : 'bg-transparent z-0 opacity-0'}`} />

                <div className={`fixed inset-0 pointer-events-none transition-opacity duration-2000 ${cinematicPhase === 'night' ? 'opacity-0' : 'opacity-100'}`}>
                    <RainBackground intensity={0.4} phase={cinematicPhase} />
                </div>

                <div className="relative z-20 pointer-events-none">
                    {/* Intro Hero */}
                    <section className="h-screen flex flex-col items-center justify-center text-center p-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 3, ease: "easeOut" }}
                            className="space-y-6"
                        >
                            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white/95 font-light tracking-[0.15em] leading-tight shadow-glow">
                                Миний чамтай танилцсан түүх
                            </h1>
                            <p className="text-white/30 text-xs md:text-sm tracking-[0.8em] uppercase font-light">
                                My story with you
                            </p>
                            <div className="pt-12">
                                <p className="text-white/20 text-[10px] tracking-[0.8em] uppercase animate-pulse">
                                    Scroll down to see
                                </p>
                            </div>
                        </motion.div>
                    </section>

                    {/* Letter Scenes */}
                    <LetterScene text={"Би анх чамтай ярихдаа нэг их юм бодоогүй.\nЗүгээр л нэг хүнтэй танилцаж байна гэж бодсон.\nГэхдээ цаг өнгөрөх тусам,\nчамтай ярих тусам,\nчи миний хувьд зүгээр нэг хүн биш болсон."} />

                    <LetterScene text={"Би өөрийгөө төгс илэрхийлж чаддаг хүн биш.\nЗаримдаа юу мэдэрч байгаагаа үгээр хэлэх хэцүү.\nГэхдээ чамтай ярьж эхэлснээс хойш\nминий дотор маш олон мэдрэмж төрж эхэлсэн."} />

                    {/* Integrated Dynamic Scenes */}
                    <SceneDistance />

                    <LetterScene text={"Заримдаа боддог —\nЧамд би яг ямар хүн бол?\nЧамд би хэрэгтэй юу?\nЧамд би сайн зүйл авчирч чадах уу?"} />

                    <SceneLateNight />

                    <LetterScene
                        text={"Чамайг бодох тусам\nэнэ мэдрэмж илүү хүчтэй болдог.\nЗаримдаа бүр\nчамайг хайрламаар.\nЧамайг хамгаалмаар.\nЧиний төлөө өөрийгөө хүртэл золиосломоор санагддаг."}
                        highlightWords={["хайрламаар", "хамгаалмаар", "золиосломоор"]}
                    />

                    <LetterScene text={"Би төгс биш.\nМагадгүй би үгээр сайн илэрхийлж чаддаггүй.\nГэхдээ нэг зүйлд итгэлтэй —\nЧамд мэдэрч байгаа зүйл маань худлаа биш."} />

                    <SceneWaiting />

                    <LetterScene text={"Тийм болохоор\nчамд зориулж\nэнэ бүхнийг хийж байна.\nМиний чаддаг зүйл\nмагадгүй энэ л байх."} />

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
                                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif italic font-light text-blue-50/90 leading-relaxed shadow-glow">
                                        "Чи надтай энэ түүхийг үргэлжлүүлэх үү ?"
                                    </h2>
                                    <div className="flex flex-col md:flex-row gap-8 sm:gap-16 justify-center items-center pointer-events-auto">
                                        <button
                                            onClick={() => handleDecision('yes')}
                                            className="group relative px-10 md:px-16 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-1000 w-full md:w-auto"
                                        >
                                            <span className="relative z-10 text-white tracking-[0.2em] md:tracking-[0.6em] uppercase text-[9px] md:text-[10px] font-medium block">
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
                                <EndingYes key="yes-end" />
                            ) : (
                                <EndingNo key="no-end" />
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
