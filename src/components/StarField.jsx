import React, { useRef, useMemo, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'
import HeavenlyBody from './HeavenlyBody'
import {
    constellationNodes, constellationLines,
    childNodes, childLines,
} from '../data/portfolioData'

const StarField = ({
    hoveredId,
    onStarClick,
    onStarHover,
    expandedId,       // which parent is expanded (e.g. 'projects')
    onChildClick,     // (childId) => void
    onChildHover,     // (childId, childNode, screenPos) => void
}) => {
    const linesRef = useRef()
    const groupRef = useRef()
    const childLinesRef = useRef()

    // Main constellation lines
    const linePositions = useMemo(() => {
        const pts = []
        for (const [aId, bId] of constellationLines) {
            const a = constellationNodes.find(n => n.id === aId)
            const b = constellationNodes.find(n => n.id === bId)
            if (a && b) { pts.push(...a.position, ...b.position) }
        }
        return new Float32Array(pts)
    }, [])

    // Child constellation lines (computed when expanded)
    const childLinePositions = useMemo(() => {
        if (!expandedId || !childLines[expandedId]) return null
        const parent = constellationNodes.find(n => n.id === expandedId)
        if (!parent) return null
        const children = childNodes[expandedId]
        const lines = childLines[expandedId]
        const pts = []
        for (const [aId, bId] of lines) {
            const aPos = aId === '_parent' ? parent.position
                : (() => {
                    const c = children.find(ch => ch.id === aId)
                    return c ? [parent.position[0] + c.offset[0], parent.position[1] + c.offset[1], parent.position[2] + c.offset[2]] : null
                })()
            const bPos = bId === '_parent' ? parent.position
                : (() => {
                    const c = children.find(ch => ch.id === bId)
                    return c ? [parent.position[0] + c.offset[0], parent.position[1] + c.offset[1], parent.position[2] + c.offset[2]] : null
                })()
            if (aPos && bPos) { pts.push(...aPos, ...bPos) }
        }
        return new Float32Array(pts)
    }, [expandedId])

    useFrame((state) => {
        if (groupRef.current) {
            if (!hoveredId) {
                groupRef.current.rotation.y += 0.0008
            }
            const tilt = Math.sin(state.clock.elapsedTime * 0.12) * 0.06
            groupRef.current.rotation.x = THREE.MathUtils.lerp(
                groupRef.current.rotation.x, tilt, 0.02
            )
        }

        if (linesRef.current) {
            const mainOpacity = expandedId ? 0.03 : (0.08 + Math.sin(state.clock.elapsedTime * 0.6) * 0.04)
            linesRef.current.material.opacity = mainOpacity
        }

        if (childLinesRef.current) {
            childLinesRef.current.material.opacity =
                0.15 + Math.sin(state.clock.elapsedTime * 1.2) * 0.06
        }
    })

    const handlePointerOver = useCallback((node, e) => {
        onStarHover(node.id, node, { x: e.clientX, y: e.clientY })
    }, [onStarHover])

    const handlePointerMove = useCallback((node, e) => {
        onStarHover(node.id, node, { x: e.clientX, y: e.clientY })
    }, [onStarHover])

    const handlePointerOut = useCallback(() => {
        onStarHover(null, null, null)
    }, [onStarHover])

    const handleChildPointerOver = useCallback((child, parentId, e) => {
        const parent = constellationNodes.find(n => n.id === parentId)
        const worldPos = [
            parent.position[0] + child.offset[0],
            parent.position[1] + child.offset[1],
            parent.position[2] + child.offset[2],
        ]
        onChildHover(child.id, { ...child, position: worldPos }, { x: e.clientX, y: e.clientY })
    }, [onChildHover])

    const handleChildPointerMove = useCallback((child, parentId, e) => {
        const parent = constellationNodes.find(n => n.id === parentId)
        const worldPos = [
            parent.position[0] + child.offset[0],
            parent.position[1] + child.offset[1],
            parent.position[2] + child.offset[2],
        ]
        onChildHover(child.id, { ...child, position: worldPos }, { x: e.clientX, y: e.clientY })
    }, [onChildHover])

    const handleChildPointerOut = useCallback(() => {
        onChildHover(null, null, null)
    }, [onChildHover])

    return (
        <>
            <Stars radius={200} depth={80} count={6000} factor={5} saturation={0.15} fade speed={0.5} />
            <fog attach="fog" args={['#030014', 15, 40]} />

            <group ref={groupRef}>
                {/* Main constellation lines */}
                {linePositions.length > 0 && (
                    <lineSegments ref={linesRef}>
                        <bufferGeometry>
                            <bufferAttribute attach="attributes-position" array={linePositions}
                                count={linePositions.length / 3} itemSize={3} />
                        </bufferGeometry>
                        <lineBasicMaterial color="#64ffda" transparent opacity={0.1}
                            blending={THREE.AdditiveBlending} depthWrite={false} />
                    </lineSegments>
                )}

                {/* Main heavenly bodies */}
                {constellationNodes.map((node) => {
                    // Dim non-expanded parents when something is expanded
                    const isDimmed = expandedId && expandedId !== node.id
                    return (
                        <group key={node.id} visible={true}>
                            <HeavenlyBody
                                position={node.position}
                                color={isDimmed ? '#555555' : node.color}
                                emissive={isDimmed ? '#333333' : (node.emissive || node.color)}
                                size={isDimmed ? node.size * 0.6 : node.size}
                                glowSize={isDimmed ? node.glowSize * 0.4 : node.glowSize}
                                isNorthStar={node.isNorthStar && !isDimmed}
                                isHovered={hoveredId === node.id && !isDimmed}
                                onClick={() => onStarClick(node.id)}
                                onPointerOver={(e) => !isDimmed && handlePointerOver(node, e)}
                                onPointerMove={(e) => !isDimmed && handlePointerMove(node, e)}
                                onPointerOut={handlePointerOut}
                            />
                        </group>
                    )
                })}

                {/* Child constellation lines */}
                {expandedId && childLinePositions && childLinePositions.length > 0 && (
                    <lineSegments ref={childLinesRef}>
                        <bufferGeometry>
                            <bufferAttribute attach="attributes-position" array={childLinePositions}
                                count={childLinePositions.length / 3} itemSize={3} />
                        </bufferGeometry>
                        <lineBasicMaterial
                            color={constellationNodes.find(n => n.id === expandedId)?.color || '#64ffda'}
                            transparent opacity={0.18}
                            blending={THREE.AdditiveBlending} depthWrite={false}
                        />
                    </lineSegments>
                )}

                {/* Child heavenly bodies */}
                {expandedId && childNodes[expandedId] && (() => {
                    const parent = constellationNodes.find(n => n.id === expandedId)
                    return childNodes[expandedId].map((child) => {
                        const pos = [
                            parent.position[0] + child.offset[0],
                            parent.position[1] + child.offset[1],
                            parent.position[2] + child.offset[2],
                        ]
                        return (
                            <HeavenlyBody
                                key={child.id}
                                position={pos}
                                color={child.color}
                                emissive={child.emissive || child.color}
                                size={child.size}
                                glowSize={child.glowSize}
                                isHovered={hoveredId === child.id}
                                onClick={() => onChildClick(child.id)}
                                onPointerOver={(e) => handleChildPointerOver(child, expandedId, e)}
                                onPointerMove={(e) => handleChildPointerMove(child, expandedId, e)}
                                onPointerOut={handleChildPointerOut}
                            />
                        )
                    })
                })()}
            </group>
        </>
    )
}

export default StarField
