'use client';

import { motion } from 'framer-motion';

interface CinemaBarsProps {
    isActive: boolean;
}

export default function CinemaBars({ isActive }: CinemaBarsProps) {
    return (
        <>
            <motion.div
                initial={{ height: '10vh' }}
                animate={{ height: isActive ? '12vh' : '0vh' }}
                transition={{ duration: 3, ease: 'easeInOut' }}
                className="fixed top-0 left-0 w-full bg-black z-[1000] shadow-2xl"
            />
            <motion.div
                initial={{ height: '10vh' }}
                animate={{ height: isActive ? '12vh' : '0vh' }}
                transition={{ duration: 3, ease: 'easeInOut' }}
                className="fixed bottom-0 left-0 w-full bg-black z-[1000] shadow-2xl shadow-black/80"
            />
        </>
    );
}
