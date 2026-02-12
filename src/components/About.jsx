import React from 'react'
import { motion } from 'framer-motion'
import { aboutMe, activities } from '../data/portfolioData'

const fade = { hidden: { opacity: 0, y: 16 }, visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.4 } }) }

const AboutContent = () => (
    <motion.div initial="hidden" animate="visible">
        {/* Bio */}
        <motion.p variants={fade} custom={0} style={{
            color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: 1.8, marginBottom: '28px',
        }}>
            {aboutMe.bio}
        </motion.p>

        {/* Education */}
        <motion.div variants={fade} custom={1} style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '14px',
            padding: '22px 24px',
            marginBottom: '24px',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <span style={{ fontSize: '20px' }}>🎓</span>
                <span style={{ color: '#64ffda', fontSize: '13px', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase' }}>Education</span>
            </div>
            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>{aboutMe.education.institution}</h4>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', marginBottom: '4px' }}>{aboutMe.education.degree}</p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '8px' }}>
                <span style={{ fontSize: '13px', color: '#64ffda', fontWeight: 600 }}>CGPA: {aboutMe.education.cgpa}</span>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>{aboutMe.education.duration}</span>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>📍 {aboutMe.education.location}</span>
            </div>
        </motion.div>

        {/* Activities */}
        <motion.div variants={fade} custom={2} style={{
            background: 'rgba(187,134,252,0.06)',
            border: '1px solid rgba(187,134,252,0.15)',
            borderRadius: '14px',
            padding: '22px 24px',
            marginBottom: '24px',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ fontSize: '18px' }}>⚡</span>
                <span style={{ color: '#bb86fc', fontSize: '15px', fontWeight: 600 }}>{activities.org}</span>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>— {activities.role} · {activities.duration}</span>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {activities.highlights.map((h, i) => (
                    <li key={i} style={{ paddingLeft: '18px', position: 'relative', fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                        <span style={{ position: 'absolute', left: 0, top: '8px', width: '5px', height: '5px', borderRadius: '50%', background: '#bb86fc' }} />
                        {h}
                    </li>
                ))}
            </ul>
        </motion.div>

        {/* Social links */}
        <motion.div variants={fade} custom={3} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {[
                { label: 'GitHub', url: aboutMe.github, icon: '⚡' },
                { label: 'LinkedIn', url: aboutMe.linkedin, icon: '💼' },
                { label: aboutMe.email, url: `mailto:${aboutMe.email}`, icon: '✉️' },
            ].map((link) => (
                <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '10px 18px', background: 'rgba(100,255,218,0.08)',
                    border: '1px solid rgba(100,255,218,0.2)', borderRadius: '22px',
                    color: '#64ffda', textDecoration: 'none', fontSize: '13px', fontWeight: 500,
                    transition: 'all 0.3s',
                }}>
                    <span>{link.icon}</span>{link.label}
                </a>
            ))}
        </motion.div>
    </motion.div>
)

export default AboutContent
