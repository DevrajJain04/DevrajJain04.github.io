import React from 'react'
import { motion } from 'framer-motion'
import { experiences } from '../data/portfolioData'

const fade = { hidden: { opacity: 0, y: 16 }, visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.4 } }) }

const ExperienceContent = () => (
    <motion.div initial="hidden" animate="visible" style={{ position: 'relative', paddingLeft: '28px' }}>
        {/* Timeline line */}
        <div style={{
            position: 'absolute', left: '8px', top: '6px', bottom: '6px', width: '2px',
            background: 'linear-gradient(180deg, #64ffda, #bb86fc, #ffb74d)',
            borderRadius: '1px',
        }} />

        {experiences.map((exp, index) => (
            <motion.div
                key={exp.id}
                variants={fade}
                custom={index}
                style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderLeft: `3px solid ${exp.color}`,
                    borderRadius: '12px',
                    padding: '22px 24px',
                    marginBottom: index < experiences.length - 1 ? '20px' : '0',
                    position: 'relative',
                }}
            >
                {/* Timeline dot */}
                <div style={{
                    position: 'absolute', left: '-35px', top: '26px',
                    width: '12px', height: '12px', borderRadius: '50%',
                    background: exp.color, border: '3px solid #0c0a23',
                    boxShadow: `0 0 10px ${exp.color}60`,
                }} />

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                    <div>
                        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '3px' }}>{exp.role}</h3>
                        <p style={{ fontSize: '14px', fontWeight: 500, color: exp.color }}>{exp.company}</p>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{exp.duration}</p>
                        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>📍 {exp.location}</p>
                    </div>
                </div>

                {/* Bullets */}
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {exp.bullets.map((b, i) => (
                        <li key={i} style={{ paddingLeft: '16px', position: 'relative', fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                            <span style={{ position: 'absolute', left: 0, top: '7px', width: '5px', height: '5px', borderRadius: '50%', background: `${exp.color}80` }} />
                            {b}
                        </li>
                    ))}
                </ul>
            </motion.div>
        ))}
    </motion.div>
)

export default ExperienceContent
