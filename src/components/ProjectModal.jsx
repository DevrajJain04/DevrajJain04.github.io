import React from 'react'
import { motion } from 'framer-motion'

const ProjectModal = ({ project, onClose }) => {
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
          maxWidth: '600px',
          width: '100%',
          maxHeight: '80vh',
          overflowY: 'auto',
          border: `2px solid ${project.color}40`,
          boxShadow: `0 0 50px ${project.color}20`,
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

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: project.color,
                marginRight: '15px',
                boxShadow: `0 0 20px ${project.color}60`
              }}
            />
            <h2 style={{
              color: '#ffffff',
              fontSize: '28px',
              fontWeight: '400',
              margin: 0
            }}>
              {project.name}
            </h2>
          </div>
        </motion.div>

        {/* Project Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ marginBottom: '30px' }}
        >
          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '16px',
            lineHeight: '1.6',
            margin: 0
          }}>
            {project.description}
          </p>
        </motion.div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ marginBottom: '30px' }}
        >
          <h3 style={{
            color: project.color,
            fontSize: '18px',
            fontWeight: '500',
            marginBottom: '15px'
          }}>
            Technologies Used
          </h3>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            {project.technologies.map((tech, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                style={{
                  background: `${project.color}15`,
                  color: project.color,
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  border: `1px solid ${project.color}40`,
                  fontWeight: '500'
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Project Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            display: 'flex',
            gap: '15px',
            flexWrap: 'wrap'
          }}
        >
          {project.githubUrl && (
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '12px 24px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '25px',
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
            >
              <span style={{ marginRight: '8px' }}>⚡</span>
              View Code
            </motion.a>
          )}
          
          {project.liveUrl && (
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '12px 24px',
                background: `${project.color}20`,
                border: `1px solid ${project.color}60`,
                borderRadius: '25px',
                color: project.color,
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
            >
              <span style={{ marginRight: '8px' }}>🚀</span>
              Live Demo
            </motion.a>
          )}
        </motion.div>

        {/* Constellation Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            marginTop: '30px',
            padding: '20px',
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '15px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '8px'
          }}>
            Part of the {project.constellation} constellation
          </div>
          <div style={{
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: '14px'
          }}>
            This project connects to other stars in the {project.constellation} skill cluster
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default ProjectModal
