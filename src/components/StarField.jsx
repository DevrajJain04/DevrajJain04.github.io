import React, { useRef, useMemo, useCallback, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars, Billboard, Text } from '@react-three/drei'
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

    const getChildSpread = useCallback((parentId) => (
        parentId === 'projects' ? 1.45 : 1.2
    ), [])

    const getChildWorldPosition = useCallback((parent, child, parentId) => {
        const spread = getChildSpread(parentId)
        return [
            parent.position[0] + child.offset[0] * spread,
            parent.position[1] + child.offset[1] * spread,
            parent.position[2] + child.offset[2] * spread,
        ]
    }, [getChildSpread])

    useEffect(() => {
        if (expandedId && groupRef.current) {
            // Keep a stable frame of reference for camera focus when a sub-constellation opens.
            groupRef.current.rotation.set(0, 0, 0)
        }
    }, [expandedId])

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
                    return c ? getChildWorldPosition(parent, c, expandedId) : null
                })()
            const bPos = bId === '_parent' ? parent.position
                : (() => {
                    const c = children.find(ch => ch.id === bId)
                    return c ? getChildWorldPosition(parent, c, expandedId) : null
                })()
            if (aPos && bPos) { pts.push(...aPos, ...bPos) }
        }
        return new Float32Array(pts)
    }, [expandedId, getChildWorldPosition])

    useFrame((state) => {
        if (groupRef.current) {
            if (!hoveredId && !expandedId) {
                groupRef.current.rotation.y += 0.0008
            }
            const tilt = expandedId ? 0 : Math.sin(state.clock.elapsedTime * 0.12) * 0.06
            groupRef.current.rotation.x = THREE.MathUtils.lerp(
                groupRef.current.rotation.x, tilt, 0.02
            )
            if (expandedId) {
                groupRef.current.rotation.y = THREE.MathUtils.lerp(
                    groupRef.current.rotation.y, 0, 0.1
                )
            }
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
        if (!parent) return
        const worldPos = getChildWorldPosition(parent, child, parentId)
        onChildHover(child.id, { ...child, position: worldPos }, { x: e.clientX, y: e.clientY })
    }, [getChildWorldPosition, onChildHover])

    const handleChildPointerMove = useCallback((child, parentId, e) => {
        const parent = constellationNodes.find(n => n.id === parentId)
        if (!parent) return
        const worldPos = getChildWorldPosition(parent, child, parentId)
        onChildHover(child.id, { ...child, position: worldPos }, { x: e.clientX, y: e.clientY })
    }, [getChildWorldPosition, onChildHover])

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
                    const labelColor = isDimmed ? 'rgba(148,163,184,0.7)' : '#f8fafc'
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
                            <Billboard
                                position={[
                                    node.position[0],
                                    node.position[1] - (node.size * 2 + 0.55),
                                    node.position[2],
                                ]}
                                raycast={() => null}
                            >
                                <Text
                                    color={labelColor}
                                    fontSize={0.26}
                                    maxWidth={3.4}
                                    textAlign="center"
                                    anchorX="center"
                                    anchorY="middle"
                                    outlineWidth={0.022}
                                    outlineColor="#020617"
                                    raycast={() => null}
                                >
                                    {node.label}
                                </Text>
                            </Billboard>
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
                    if (!parent) return null
                    return childNodes[expandedId].map((child) => {
                        const pos = getChildWorldPosition(parent, child, expandedId)
                        const sizeBoost = expandedId === 'projects' ? 1.08 : 1
                        const childSize = child.size * sizeBoost
                        const childGlow = child.glowSize * sizeBoost
                        const labelFontSize = child.label.length > 12 ? 0.19 : 0.22
                        return (
                            <group key={child.id}>
                                <HeavenlyBody
                                    position={pos}
                                    color={child.color}
                                    emissive={child.emissive || child.color}
                                    size={childSize}
                                    glowSize={childGlow}
                                    isHovered={hoveredId === child.id}
                                    onClick={() => onChildClick(child.id)}
                                    onPointerOver={(e) => handleChildPointerOver(child, expandedId, e)}
                                    onPointerMove={(e) => handleChildPointerMove(child, expandedId, e)}
                                    onPointerOut={handleChildPointerOut}
                                />

                                <Billboard
                                    position={[pos[0], pos[1] - (childSize * 1.8 + 0.38), pos[2]]}
                                    raycast={() => null}
                                >
                                    <Text
                                        color={hoveredId === child.id ? '#ffffff' : '#e2e8f0'}
                                        fontSize={labelFontSize}
                                        maxWidth={3.1}
                                        textAlign="center"
                                        anchorX="center"
                                        anchorY="middle"
                                        outlineWidth={0.02}
                                        outlineColor="#020617"
                                        raycast={() => null}
                                    >
                                        {child.label}
                                    </Text>
                                </Billboard>
                            </group>
                        )
                    })
                })()}
            </group>
        </>
    )
}

export default StarField
