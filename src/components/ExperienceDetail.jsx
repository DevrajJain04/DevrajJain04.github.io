import React from 'react'
import { motion } from 'framer-motion'
import { experiences } from '../data/portfolioData'

const fade = { hidden: { opacity: 0, y: 16 }, visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.4 } }) }

const ExperienceDetail = ({ childId }) => {
    const exp = experiences[childId]
    if (!exp) return null

    return (
        <motion.div initial="hidden" animate="visible">
            {/* Role & Company */}
            <motion.div variants={fade} custom={0} style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 600, fontFamily: "'Outfit', sans-serif", marginBottom: '6px' }}>
                    {exp.role}
                </h3>
                <p style={{ fontSize: '15px', fontWeight: 500, color: exp.color }}>{exp.company}</p>
                <div style={{ display: 'flex', gap: '16px', marginTop: '10px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>📅 {exp.duration}</span>
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>📍 {exp.location}</span>
                </div>
            </motion.div>

            {/* Divider */}
            <div style={{ height: '1px', background: `linear-gradient(90deg, transparent, ${exp.color}40, transparent)`, marginBottom: '20px' }} />

            {/* Bullets */}
            <motion.ul variants={fade} custom={1} style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {exp.bullets.map((b, i) => (
                    <motion.li key={i} variants={fade} custom={i + 1} style={{
                        paddingLeft: '20px', position: 'relative', fontSize: '14px',
                        color: 'rgba(255,255,255,0.75)', lineHeight: 1.7,
                    }}>
                        <span style={{
                            position: 'absolute', left: 0, top: '9px',
                            width: '7px', height: '7px', borderRadius: '50%',
                            background: exp.color, boxShadow: `0 0 6px ${exp.color}60`,
                        }} />
                        {b}
                    </motion.li>
                ))}
            </motion.ul>
        </motion.div>
    )
}

export default ExperienceDetail
