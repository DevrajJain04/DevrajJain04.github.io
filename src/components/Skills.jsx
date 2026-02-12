import React from 'react'
import { motion } from 'framer-motion'
import { skills } from '../data/portfolioData'

const fade = { hidden: { opacity: 0, y: 12 }, visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.4 } }) }

const categoryMeta = {
    "Languages & Databases": { icon: "💻", color: "#64ffda" },
    "Frameworks & Libraries": { icon: "🧩", color: "#bb86fc" },
    "Developer Tools": { icon: "🛠️", color: "#ffb74d" },
}

const SkillsContent = () => (
    <motion.div initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {Object.entries(skills).map(([category, techs], catIdx) => {
            const meta = categoryMeta[category] || { icon: '⚡', color: '#64ffda' }
            return (
                <motion.div
                    key={category}
                    variants={fade}
                    custom={catIdx}
                    style={{
                        background: `${meta.color}06`,
                        border: `1px solid ${meta.color}18`,
                        borderRadius: '14px',
                        padding: '22px 24px',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                        <span style={{ fontSize: '18px' }}>{meta.icon}</span>
                        <h3 style={{ color: meta.color, fontSize: '15px', fontWeight: 600 }}>{category}</h3>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {techs.map((tech) => (
                            <span key={tech} style={{
                                padding: '6px 14px', fontSize: '12px', fontWeight: 500, borderRadius: '16px',
                                background: `${meta.color}10`, color: meta.color, border: `1px solid ${meta.color}22`,
                            }}>
                                {tech}
                            </span>
                        ))}
                    </div>
                </motion.div>
            )
        })}
    </motion.div>
)

export default SkillsContent
