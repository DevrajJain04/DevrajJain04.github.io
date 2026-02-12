import React from 'react'
import { motion } from 'framer-motion'
import { constellationNodes, childNodes, projects, experiences } from '../data/portfolioData'

const SectionModal = ({ sectionId, childId, onClose, onBack, children }) => {
    // Determine title and color
    let color, title

    if (childId) {
        // Child detail view
        if (childId.startsWith('proj-')) {
            const p = projects[childId]
            title = p?.name || childId
            color = p?.color || '#64ffda'
        } else if (childId.startsWith('exp-')) {
            const e = experiences[childId]
            title = `${e?.role || childId}`
            color = e?.color || '#64ffda'
        }
    } else {
        const node = constellationNodes.find(n => n.id === sectionId)
        color = node?.color || '#64ffda'
        title = node?.label
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
                position: 'fixed', inset: 0,
                background: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(12px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 2000, padding: '24px',
            }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 40 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: 'rgba(12, 10, 35, 0.95)',
                    borderRadius: '20px', maxWidth: '720px', width: '100%',
                    maxHeight: '85vh', overflowY: 'auto',
                    border: `1.5px solid ${color}30`,
                    boxShadow: `0 0 60px ${color}15, 0 8px 32px rgba(0,0,0,0.5)`,
                    position: 'relative',
                }}
            >
                {/* Accent bar */}
                <div style={{
                    height: '3px',
                    background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                    borderRadius: '20px 20px 0 0',
                }} />

                {/* Header */}
                <div style={{
                    padding: '24px 36px 0',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        {/* Back button for child views */}
                        {childId && onBack && (
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={onBack}
                                style={{
                                    background: 'rgba(255,255,255,0.06)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'rgba(255,255,255,0.5)',
                                    fontSize: '14px', cursor: 'pointer',
                                    width: '32px', height: '32px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    borderRadius: '50%', marginRight: '4px',
                                }}
                            >
                                ←
                            </motion.button>
                        )}

                        <div style={{
                            width: '14px', height: '14px', borderRadius: '50%',
                            background: color, boxShadow: `0 0 16px ${color}70`,
                        }} />
                        <h2 style={{
                            fontFamily: "'Outfit', sans-serif", fontSize: '24px',
                            fontWeight: 600, color: '#ffffff', margin: 0,
                        }}>
                            {title}
                        </h2>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.15, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        style={{
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'rgba(255,255,255,0.5)',
                            fontSize: '18px', cursor: 'pointer',
                            width: '36px', height: '36px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            borderRadius: '50%',
                        }}
                    >
                        ✕
                    </motion.button>
                </div>

                <div style={{ padding: '24px 36px 36px' }}>
                    {children}
                </div>
            </motion.div>
        </motion.div>
    )
}

export default SectionModal
