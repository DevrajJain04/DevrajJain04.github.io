import React from 'react'
import { motion } from 'framer-motion'

const IntroOverlay = ({ onEnter }) => (
    <motion.div
        initial={{ opacity: 1 }}
        style={{
            position: 'fixed',
            inset: 0,
            zIndex: 5000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(ellipse at center, rgba(13,11,26,0.97) 0%, rgba(3,0,20,0.99) 100%)',
            cursor: 'pointer',
        }}
        onClick={onEnter}
    >
        {/* Subtle grid pattern */}
        <div style={{
            position: 'absolute', inset: 0, opacity: 0.04,
            backgroundImage: 'linear-gradient(rgba(100,255,218,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(100,255,218,0.3) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
        }} />

        {/* Greeting */}
        <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(14px, 2vw, 17px)',
                color: '#64ffda',
                letterSpacing: '5px',
                textTransform: 'uppercase',
                fontWeight: 500,
                marginBottom: '20px',
            }}
        >
            Hello, I'm
        </motion.p>

        {/* Name */}
        <motion.h1
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.6, duration: 1, ease: 'easeOut' }}
            style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 'clamp(48px, 10vw, 100px)',
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: '-2px',
                marginBottom: '16px',
                background: 'linear-gradient(135deg, #ffffff 0%, #64ffda 50%, #bb86fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textAlign: 'center',
            }}
        >
            Devraj Jain
        </motion.h1>

        {/* Title */}
        <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(16px, 2.5vw, 22px)',
                color: 'rgba(255,255,255,0.7)',
                fontWeight: 400,
                marginBottom: '12px',
                textAlign: 'center',
            }}
        >
            Full Stack & Flutter Developer
        </motion.p>

        {/* Tagline */}
        <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(13px, 1.5vw, 16px)',
                color: 'rgba(255,255,255,0.4)',
                fontWeight: 300,
                maxWidth: '560px',
                textAlign: 'center',
                lineHeight: 1.7,
                padding: '0 24px',
                marginBottom: '48px',
            }}
        >
            Building polished, production-ready software — from mobile apps on the Play Store to AI-powered web platforms.
        </motion.p>

        {/* Enter button */}
        <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            whileHover={{ scale: 1.06, boxShadow: '0 0 40px rgba(100,255,218,0.3)' }}
            whileTap={{ scale: 0.97 }}
            onClick={onEnter}
            style={{
                background: 'transparent',
                border: '1.5px solid #64ffda',
                color: '#64ffda',
                padding: '14px 42px',
                fontSize: '15px',
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                borderRadius: '30px',
                cursor: 'pointer',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                transition: 'all 0.4s',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            Explore My Universe
        </motion.button>

        {/* Scroll hint */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 2.5, duration: 1 }}
            style={{
                position: 'absolute',
                bottom: '32px',
                color: 'rgba(255,255,255,0.3)',
                fontSize: '12px',
                fontFamily: "'Inter', sans-serif",
                letterSpacing: '1px',
            }}
        >
            or click anywhere
        </motion.div>

        {/* Floating particles decoration */}
        {[...Array(20)].map((_, i) => (
            <motion.div
                key={i}
                initial={{
                    opacity: 0,
                    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000) - 500,
                    y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 600) - 300,
                }}
                animate={{
                    opacity: [0, 0.4, 0],
                    y: [0, -60, -120],
                }}
                transition={{
                    delay: Math.random() * 3,
                    duration: 4 + Math.random() * 3,
                    repeat: Infinity,
                    ease: 'linear',
                }}
                style={{
                    position: 'absolute',
                    width: `${2 + Math.random() * 3}px`,
                    height: `${2 + Math.random() * 3}px`,
                    borderRadius: '50%',
                    background: i % 3 === 0 ? '#64ffda' : i % 3 === 1 ? '#bb86fc' : '#fff',
                    filter: 'blur(0.5px)',
                    pointerEvents: 'none',
                }}
            />
        ))}
    </motion.div>
)

export default IntroOverlay
