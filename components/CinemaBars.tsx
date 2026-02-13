'use client';

import { motion } from 'framer-motion';

interface CinemaBarsProps {
    isActive: boolean;
}

export default function CinemaBars({ isActive }: CinemaBarsProps) {
    return (
        <>
            <motion.div
                initial={{ height: '0vh' }}
                animate={{ height: isActive ? '4vh' : '0vh' }}
                className="md:hidden fixed top-0 left-0 w-full bg-gradient-to-b from-black via-black/90 to-transparent z-[500] pointer-events-none"
                transition={{ duration: 3, ease: 'easeInOut' }}
            />
            <motion.div
                initial={{ height: '0vh' }}
                animate={{ height: isActive ? '8vh' : '0vh' }}
                className="hidden md:block fixed top-0 left-0 w-full bg-gradient-to-b from-black via-black/90 to-transparent z-[500] pointer-events-none"
                transition={{ duration: 3, ease: 'easeInOut' }}
            />

            <motion.div
                initial={{ height: '0vh' }}
                animate={{ height: isActive ? '4vh' : '0vh' }}
                className="md:hidden fixed bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/90 to-transparent z-[500] pointer-events-none"
                transition={{ duration: 3, ease: 'easeInOut' }}
            />
            <motion.div
                initial={{ height: '0vh' }}
                animate={{ height: isActive ? '8vh' : '0vh' }}
                className="hidden md:block fixed bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/90 to-transparent z-[500] pointer-events-none"
                transition={{ duration: 3, ease: 'easeInOut' }}
            />
        </>
    );
}
