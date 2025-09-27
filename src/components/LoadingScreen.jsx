import React from 'react'
import { motion } from 'framer-motion'

const LoadingScreen = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'radial-gradient(ellipse at center, #0f1419 0%, #020508 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          textAlign: 'center',
          color: '#ffffff'
        }}
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            width: '60px',
            height: '60px',
            margin: '0 auto 20px',
            border: '2px solid transparent',
            borderTop: '2px solid #64ffda',
            borderRadius: '50%',
            position: 'relative'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '6px',
            height: '6px',
            background: '#64ffda',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 20px #64ffda'
          }} />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            fontSize: '24px',
            fontWeight: '300',
            letterSpacing: '2px',
            marginBottom: '10px'
          }}
        >
          MAPPING THE STARS
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{
            fontSize: '14px',
            letterSpacing: '1px'
          }}
        >
          Preparing your constellation...
        </motion.p>
      </motion.div>
    </div>
  )
}

export default LoadingScreen
