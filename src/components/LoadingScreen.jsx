import React from 'react'
import { motion } from 'framer-motion'

const LoadingScreen = () => (
  <div style={{
    position: 'fixed',
    inset: 0,
    background: 'radial-gradient(ellipse at center, #0d0b1a 0%, #030014 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  }}>
    {/* Animated ring */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
      style={{
        width: '56px',
        height: '56px',
        border: '2px solid rgba(100,255,218,0.1)',
        borderTop: '2px solid var(--accent, #64ffda)',
        borderRadius: '50%',
        marginBottom: '28px',
      }}
    />

    {/* Pulsing core */}
    <motion.div
      animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'absolute',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: '#64ffda',
        boxShadow: '0 0 20px #64ffda',
        top: 'calc(50% - 36px)',
      }}
    />

    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 0.6, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: '14px',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        color: '#64ffda',
      }}
    >
      Mapping Stars
    </motion.p>
  </div>
)

export default LoadingScreen
