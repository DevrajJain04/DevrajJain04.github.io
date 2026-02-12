import React from 'react'
import { motion } from 'framer-motion'
import { aboutMe, constellationNodes } from '../data/portfolioData'

const HUD = ({ hoveredNode, hoveredPos, onNavigate, expandedId, onCollapse }) => (
    <>
        {/* Top-left: Name + Title + Tagline */}
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
                position: 'fixed', top: '28px', left: '32px', zIndex: 100,
                pointerEvents: 'none', maxWidth: '380px',
            }}
        >
            <h1 style={{
                fontFamily: "'Outfit', sans-serif", fontSize: '28px', fontWeight: 700,
                lineHeight: 1.1, marginBottom: '6px',
                background: 'linear-gradient(135deg, #ffffff, #64ffda)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
                {aboutMe.name}
            </h1>
            <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 500,
                color: '#64ffda', letterSpacing: '0.5px', marginBottom: '8px',
            }}>
                {aboutMe.title}
            </p>
            <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 300,
                color: 'rgba(255,255,255,0.35)', lineHeight: 1.6,
            }}>
                {aboutMe.tagline}
            </p>
        </motion.div>

        {/* Top-right: Star legend nav */}
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{
                position: 'fixed', top: '28px', right: '32px', zIndex: 100,
                display: 'flex', gap: '8px', flexWrap: 'wrap',
                justifyContent: 'flex-end', maxWidth: '340px',
            }}
        >
            {expandedId && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onCollapse}
                    style={{
                        background: 'rgba(100,255,218,0.08)',
                        border: '1px solid rgba(100,255,218,0.25)',
                        borderRadius: '22px', padding: '8px 16px',
                        color: '#64ffda', fontSize: '12px', fontWeight: 600,
                        cursor: 'pointer', fontFamily: "'Inter', sans-serif",
                        backdropFilter: 'blur(10px)',
                        display: 'flex', alignItems: 'center', gap: '6px',
                    }}
                >
                    ← Back to Stars
                </motion.button>
            )}
            {constellationNodes.map((node) => (
                <motion.button
                    key={node.id}
                    whileHover={{ scale: 1.08, y: -2, boxShadow: `0 4px 20px ${node.color}30` }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onNavigate(node.id)}
                    style={{
                        background: expandedId === node.id ? `${node.color}20` : 'rgba(12, 10, 35, 0.7)',
                        border: `1px solid ${expandedId === node.id ? `${node.color}60` : `${node.color}40`}`,
                        borderRadius: '22px', padding: '8px 16px',
                        color: node.color, fontSize: '12px', fontWeight: 500,
                        cursor: 'pointer', fontFamily: "'Inter', sans-serif",
                        backdropFilter: 'blur(10px)', transition: 'all 0.3s',
                        display: 'flex', alignItems: 'center', gap: '7px',
                    }}
                >
                    <span style={{
                        width: '8px', height: '8px', borderRadius: '50%',
                        background: node.color, boxShadow: `0 0 8px ${node.color}`,
                        display: 'inline-block',
                    }} />
                    {node.label}
                </motion.button>
            ))}
        </motion.div>

        {/* Bottom: Controls hint + Social links */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            style={{
                position: 'fixed', bottom: '28px', left: '32px', right: '32px',
                zIndex: 100, display: 'flex', justifyContent: 'space-between',
                alignItems: 'flex-end', pointerEvents: 'none',
            }}
        >
            <div style={{
                color: 'rgba(255,255,255,0.3)', fontSize: '11px',
                fontFamily: "'Inter', sans-serif", lineHeight: 1.7,
                letterSpacing: '0.3px',
            }}>
                <div>⟲ Drag to rotate</div>
                <div>⊕ Scroll to zoom</div>
                <div>◉ Click a star to explore</div>
            </div>

            <div style={{ display: 'flex', gap: '12px', pointerEvents: 'all' }}>
                {[
                    { href: aboutMe.github, label: 'GH', title: 'GitHub' },
                    { href: aboutMe.linkedin, label: 'in', title: 'LinkedIn' },
                    { href: `mailto:${aboutMe.email}`, label: '✉', title: 'Email' },
                ].map((l) => (
                    <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" title={l.title} style={{
                        width: '36px', height: '36px', borderRadius: '50%',
                        background: 'rgba(100,255,218,0.06)', border: '1px solid rgba(100,255,218,0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#64ffda', fontSize: '13px', fontWeight: 700,
                        textDecoration: 'none', transition: 'all 0.3s',
                        fontFamily: "'Inter', sans-serif",
                    }}>
                        {l.label}
                    </a>
                ))}
            </div>
        </motion.div>

        {/* Cursor tooltip */}
        {hoveredNode && hoveredPos && (
            <motion.div
                key={hoveredNode.id}
                initial={{ opacity: 0, scale: 0.9, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                style={{
                    position: 'fixed',
                    left: Math.min(
                        (typeof window !== 'undefined' ? window.innerWidth : 900) - 280,
                        Math.max(20, hoveredPos.x + 20)
                    ),
                    top: Math.min(
                        (typeof window !== 'undefined' ? window.innerHeight : 600) - 130,
                        Math.max(20, hoveredPos.y - 65)
                    ),
                    zIndex: 200, pointerEvents: 'none', minWidth: '220px',
                }}
            >
                <div style={{
                    background: 'rgba(8, 6, 24, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '14px', padding: '16px 20px',
                    border: `1px solid ${hoveredNode.color}45`,
                    boxShadow: `0 0 40px ${hoveredNode.color}18, 0 8px 24px rgba(0,0,0,0.6)`,
                }}>
                    <h3 style={{
                        color: hoveredNode.color, fontSize: '16px', fontWeight: 600,
                        margin: '0 0 6px 0', fontFamily: "'Outfit', sans-serif",
                    }}>
                        {hoveredNode.label}
                    </h3>
                    <p style={{
                        color: 'rgba(255,255,255,0.6)', fontSize: '13px', margin: 0, lineHeight: 1.5,
                    }}>
                        {hoveredNode.description}
                    </p>
                    <p style={{
                        color: hoveredNode.color, fontSize: '11px', fontWeight: 500,
                        margin: '10px 0 0', opacity: 0.7, textAlign: 'center',
                    }}>
                        Click to explore →
                    </p>
                </div>
            </motion.div>
        )}
    </>
)

export default HUD
