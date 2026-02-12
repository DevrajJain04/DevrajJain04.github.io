import React from 'react'
import { motion } from 'framer-motion'
import { projects } from '../data/portfolioData'

const fade = { hidden: { opacity: 0, y: 16 }, visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.4 } }) }

const ProjectsContent = () => (
    <motion.div initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {projects.map((project, index) => (
            <motion.div
                key={project.id}
                variants={fade}
                custom={index}
                style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '14px',
                    overflow: 'hidden',
                }}
            >
                {/* Color accent bar */}
                <div style={{ height: '3px', background: `linear-gradient(90deg, ${project.color}, ${project.color}30)` }} />

                <div style={{ padding: '22px 24px' }}>
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>{project.name}</h3>
                        {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.4)', transition: 'color 0.3s' }} title="View Code">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                            </a>
                        )}
                    </div>

                    {/* Description */}
                    <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(255,255,255,0.65)', marginBottom: '16px' }}>
                        {project.description}
                    </p>

                    {/* Tech tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {project.technologies.map((tech, i) => (
                            <span key={i} style={{
                                padding: '4px 12px', fontSize: '11px', fontWeight: 500, borderRadius: '14px',
                                background: `${project.color}12`,
                                color: project.color,
                                border: `1px solid ${project.color}25`,
                            }}>
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        ))}
    </motion.div>
)

export default ProjectsContent
