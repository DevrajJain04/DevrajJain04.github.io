import React from 'react'
import { motion } from 'framer-motion'

const AboutModal = ({ aboutData, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        padding: '20px'
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          background: 'rgba(15, 20, 25, 0.95)',
          borderRadius: '20px',
          padding: '40px',
          maxWidth: '700px',
          width: '100%',
          maxHeight: '80vh',
          overflowY: 'auto',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 0 50px rgba(255, 255, 255, 0.1)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '24px',
            cursor: 'pointer',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'all 0.3s ease'
          }}
        >
          ✕
        </motion.button>

        {/* North Star Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            textAlign: 'center',
            marginBottom: '40px'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px'
          }}>
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{
                width: '40px',
                height: '40px',
                position: 'relative',
                marginRight: '15px'
              }}
            >
              {/* North Star with rays */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#ffffff',
                boxShadow: '0 0 30px #ffffff'
              }} />
              {[0, 45, 90, 135].map((rotation, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                    width: '2px',
                    height: '30px',
                    background: 'linear-gradient(to top, transparent, #ffffff, transparent)',
                    transformOrigin: 'center'
                  }}
                />
              ))}
            </motion.div>
            <h2 style={{
              color: '#ffffff',
              fontSize: '32px',
              fontWeight: '300',
              margin: 0,
              letterSpacing: '2px'
            }}>
              THE NORTH STAR
            </h2>
          </div>
          <p style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '16px',
            margin: 0
          }}>
            Your guiding light in the constellation
          </p>
        </motion.div>

        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ marginBottom: '30px' }}
        >
          <h3 style={{
            color: '#ffffff',
            fontSize: '24px',
            fontWeight: '400',
            marginBottom: '10px'
          }}>
            {aboutData.name}
          </h3>
          <p style={{
            color: '#64ffda',
            fontSize: '18px',
            fontWeight: '500',
            marginBottom: '20px'
          }}>
            {aboutData.title}
          </p>
          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '16px',
            lineHeight: '1.6',
            margin: 0
          }}>
            {aboutData.description}
          </p>
        </motion.div>

        {/* Skills Constellation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ marginBottom: '30px' }}
        >
          <h4 style={{
            color: '#64ffda',
            fontSize: '18px',
            fontWeight: '500',
            marginBottom: '20px'
          }}>
            Core Constellations
          </h4>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px'
          }}>
            {[
              { name: 'Frontend', color: '#ff6b6b', techs: ['React', 'Vue.js', 'TypeScript'] },
              { name: 'Backend', color: '#4ecdc4', techs: ['Node.js', 'Python', 'APIs'] },
              { name: 'Mobile', color: '#bb8fce', techs: ['React Native', 'Flutter'] },
              { name: 'Creative', color: '#f7dc6f', techs: ['Three.js', 'WebGL', 'Animation'] }
            ].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                style={{
                  background: `${skill.color}15`,
                  border: `1px solid ${skill.color}40`,
                  borderRadius: '15px',
                  padding: '15px',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  color: skill.color,
                  fontSize: '16px',
                  fontWeight: '500',
                  marginBottom: '8px'
                }}>
                  {skill.name}
                </div>
                <div style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '12px'
                }}>
                  {skill.techs.join(' • ')}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            display: 'flex',
            gap: '15px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          {[
            { label: 'Email', url: `mailto:${aboutData.email}`, icon: '✉️' },
            { label: 'LinkedIn', url: aboutData.linkedin, icon: '💼' },
            { label: 'GitHub', url: aboutData.github, icon: '⚡' },
          ].map((link, index) => (
            <motion.a
              key={link.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '12px 20px',
                background: 'rgba(100, 255, 218, 0.1)',
                border: '1px solid rgba(100, 255, 218, 0.3)',
                borderRadius: '25px',
                color: '#64ffda',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
            >
              <span style={{ marginRight: '8px' }}>{link.icon}</span>
              {link.label}
            </motion.a>
          ))}
        </motion.div>

        {/* Location */}
        {aboutData.location && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            style={{
              marginTop: '30px',
              textAlign: 'center',
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: '14px'
            }}
          >
            📍 {aboutData.location}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default AboutModal
