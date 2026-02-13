'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Logo() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="fixed top-6 left-6 md:top-12 md:left-12 z-[600] pointer-events-none flex flex-col items-start gap-1"
        >
            <div className="flex items-center gap-4">
                <div className="relative w-10 h-10">
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-blue-400 rounded-full blur-xl"
                    />
                    <div className="relative w-full h-full overflow-hidden rounded-full border border-white/10 shadow-2xl">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            fill
                            className="object-cover scale-110"
                            priority
                        />
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="font-serif text-xl tracking-[0.2em] uppercase text-white/95 font-light whitespace-nowrap shadow-glow">
                        Our Story
                    </span>
                    <span className="font-sans text-[8px] tracking-[0.4em] uppercase text-blue-300/50 font-medium">
                        Between Hearts
                    </span>
                </div>
            </div>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 2, duration: 3 }}
                className="h-[1px] bg-gradient-to-r from-blue-200/20 via-white/10 to-transparent mt-2"
            />
        </motion.div>
    );
}
