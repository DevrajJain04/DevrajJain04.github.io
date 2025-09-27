import React from 'react'
import { motion } from 'framer-motion'

const NavigationUI = ({ hoveredStar, onAboutClick }) => {
  const tooltipStyle = hoveredStar
    ? {
        position: 'fixed',
        left: hoveredStar.screenPosition?.x || 0,
        top: hoveredStar.screenPosition?.y || 0,
        transform: 'translate(24px, -24px)',
        zIndex: 1000,
        minWidth: '250px',
        pointerEvents: 'none'
      }
    : {
        position: 'fixed',
        top: '50%',
        right: '30px',
        transform: 'translateY(-50%)',
        zIndex: 1000,
        minWidth: '250px',
        pointerEvents: 'none'
      }

  const clampStyle = hoveredStar && typeof window !== 'undefined'
    ? {
        left: Math.min(
          window.innerWidth - 280,
          Math.max(20, hoveredStar.screenPosition.x + 24)
        ),
        top: Math.min(
          window.innerHeight - 180,
          Math.max(20, hoveredStar.screenPosition.y - 80)
        )
      }
    : {}

  const mergedTooltipStyle = hoveredStar
    ? { ...tooltipStyle, ...clampStyle, transform: 'none' }
    : tooltipStyle

  return (
    <>
      {/* Top Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={{
          position: 'fixed',
          top: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          background: 'rgba(15, 20, 25, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: '25px',
          padding: '15px 30px',
          border: '1px solid rgba(100, 255, 218, 0.3)'
        }}
      >
        <h1 style={{
          fontSize: '24px',
          fontWeight: '300',
          letterSpacing: '3px',
          color: '#ffffff',
          margin: 0,
          textAlign: 'center'
        }}>
          THE CAREER CONSTELLATION
        </h1>
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        style={{
          position: 'fixed',
          bottom: '30px',
          left: '30px',
          zIndex: 1000,
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '14px',
          lineHeight: '1.6',
          pointerEvents: 'none'
        }}
      >
        <div style={{ marginBottom: '10px' }}>
          <strong>Navigation:</strong>
        </div>
        <div>• Drag to explore the constellation</div>
        <div>• Scroll to zoom in/out</div>
        <div>• Click stars to view projects</div>
        <div>• Find the North Star for about me</div>
      </motion.div>

      {/* Hover Info Panel */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        style={mergedTooltipStyle}
      >
        {hoveredStar ? (
          <motion.div
            key={hoveredStar.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'rgba(15, 20, 25, 0.9)',
              backdropFilter: 'blur(15px)',
              borderRadius: '15px',
              padding: '20px',
              border: `1px solid ${hoveredStar.color}40`,
              boxShadow: `0 0 30px ${hoveredStar.color}20`
            }}
          >
            <h3 style={{
              color: hoveredStar.color,
              fontSize: '18px',
              marginBottom: '10px',
              fontWeight: '500'
            }}>
              {hoveredStar.name || hoveredStar.title}
            </h3>
            
            {hoveredStar.description && (
              <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '14px',
                lineHeight: '1.5',
                marginBottom: '15px'
              }}>
                {hoveredStar.description.substring(0, 100)}...
              </p>
            )}
            
            {hoveredStar.technologies && (
              <div style={{ marginTop: '15px' }}>
                <div style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '12px',
                  marginBottom: '8px'
                }}>
                  TECHNOLOGIES:
                </div>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px'
                }}>
                  {hoveredStar.technologies.slice(0, 4).map((tech, index) => (
                    <span
                      key={index}
                      style={{
                        background: `${hoveredStar.color}20`,
                        color: hoveredStar.color,
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        border: `1px solid ${hoveredStar.color}40`
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div style={{
              marginTop: '15px',
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.5)',
              textAlign: 'center'
            }}>
              Click to explore
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background: 'rgba(15, 20, 25, 0.6)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              padding: '20px',
              border: '1px solid rgba(100, 255, 218, 0.2)',
              textAlign: 'center'
            }}
          >
            <div style={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '14px'
            }}>
              Hover over stars to discover projects
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Quick About Button */}
      <motion.button
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAboutClick}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 1000,
          background: 'rgba(100, 255, 218, 0.1)',
          border: '1px solid rgba(100, 255, 218, 0.5)',
          borderRadius: '25px',
          padding: '12px 24px',
          color: '#64ffda',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          letterSpacing: '1px'
        }}
      >
        ABOUT ME ⭐
      </motion.button>
    </>
  )
}

export default NavigationUI
