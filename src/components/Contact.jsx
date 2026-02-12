import React from 'react'
import { motion } from 'framer-motion'
import { aboutMe } from '../data/portfolioData'

const fade = { hidden: { opacity: 0, y: 12 }, visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.4 } }) }

const ContactContent = () => (
    <motion.div initial="hidden" animate="visible" style={{ textAlign: 'center' }}>
        <motion.p variants={fade} custom={0} style={{
            color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.8, marginBottom: '32px', maxWidth: '480px', margin: '0 auto 32px',
        }}>
            I'm always open to discussing new opportunities, interesting projects, or just having a conversation about tech. Feel free to reach out!
        </motion.p>

        <motion.div variants={fade} custom={1} style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
            <a href={`mailto:${aboutMe.email}`} style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 28px', background: '#64ffda', color: '#030014',
                borderRadius: '28px', fontWeight: 600, fontSize: '14px', textDecoration: 'none',
                transition: 'box-shadow 0.3s', fontFamily: "'Inter', sans-serif",
            }}>
                ✉️ Say Hello
            </a>

            <a href={aboutMe.github} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 28px', background: 'transparent', color: '#64ffda',
                border: '1.5px solid #64ffda', borderRadius: '28px', fontWeight: 600,
                fontSize: '14px', textDecoration: 'none', transition: 'all 0.3s',
                fontFamily: "'Inter', sans-serif",
            }}>
                ⚡ GitHub
            </a>

            <a href={aboutMe.linkedin} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 28px', background: 'transparent', color: '#bb86fc',
                border: '1.5px solid #bb86fc', borderRadius: '28px', fontWeight: 600,
                fontSize: '14px', textDecoration: 'none', transition: 'all 0.3s',
                fontFamily: "'Inter', sans-serif",
            }}>
                💼 LinkedIn
            </a>
        </motion.div>

        <motion.div variants={fade} custom={2}>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px' }}>
                📍 {aboutMe.location}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '12px', marginTop: '16px' }}>
                Designed & Built by <span style={{ color: '#64ffda' }}>Devraj Jain</span>
            </p>
        </motion.div>
    </motion.div>
)

export default ContactContent
