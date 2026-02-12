import React from 'react'
import { motion } from 'framer-motion'
import { projects } from '../data/portfolioData'

const fade = { hidden: { opacity: 0, y: 16 }, visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.4 } }) }

const ProjectDetail = ({ childId }) => {
    const project = projects[childId]
    if (!project) return null

    return (
        <motion.div initial="hidden" animate="visible">
            <motion.p variants={fade} custom={0} style={{
                color: 'rgba(255,255,255,0.75)', fontSize: '15px', lineHeight: 1.8, marginBottom: '24px',
            }}>
                {project.description}
            </motion.p>

            {/* Tech tags */}
            <motion.div variants={fade} custom={1} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
                {project.technologies.map((tech) => (
                    <span key={tech} style={{
                        padding: '6px 14px', fontSize: '12px', fontWeight: 500, borderRadius: '16px',
                        background: `${project.color}12`, color: project.color,
                        border: `1px solid ${project.color}25`,
                    }}>
                        {tech}
                    </span>
                ))}
            </motion.div>

            {/* Links */}
            <motion.div variants={fade} custom={2} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        padding: '12px 24px', background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.12)', borderRadius: '24px',
                        color: '#ffffff', textDecoration: 'none', fontSize: '13px', fontWeight: 500,
                        transition: 'all 0.3s',
                    }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                        View Code
                    </a>
                )}

                {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        padding: '12px 24px', background: `${project.color}`,
                        borderRadius: '24px', color: '#030014',
                        textDecoration: 'none', fontSize: '13px', fontWeight: 600,
                        transition: 'all 0.3s', boxShadow: `0 0 20px ${project.color}40`,
                    }}>
                        🚀 Live Demo
                    </a>
                )}
            </motion.div>
        </motion.div>
    )
}

export default ProjectDetail
