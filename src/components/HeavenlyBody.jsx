import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Sprite texture for soft glow
const createGlowTexture = () => {
    const size = 128
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.15, 'rgba(255,255,255,0.8)')
    gradient.addColorStop(0.4, 'rgba(255,255,255,0.2)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
    return new THREE.CanvasTexture(canvas)
}

const HeavenlyBody = ({
    position,
    color,
    emissive,
    size = 0.5,
    glowSize = 1.2,
    isNorthStar = false,
    isHovered = false,
    onClick,
    onPointerOver,
    onPointerOut,
    onPointerMove,
}) => {
    const meshRef = useRef()
    const glowRef = useRef()
    const raysRef = useRef()
    const outerGlowRef = useRef()
    const lightRef = useRef()

    const glowTexture = useMemo(createGlowTexture, [])

    useFrame((state) => {
        const t = state.clock.elapsedTime

        if (meshRef.current) {
            const pulse = Math.sin(t * 2 + position[0]) * 0.06 + 1
            const targetScale = isHovered ? size * 1.35 : size * pulse
            meshRef.current.scale.lerp(
                new THREE.Vector3(targetScale, targetScale, targetScale),
                0.08
            )
            if (isNorthStar) {
                meshRef.current.rotation.y += 0.005
            }
        }

        // Glow sprite pulsing
        if (glowRef.current) {
            const gPulse = Math.sin(t * 1.2 + position[1]) * 0.25 + 1
            const s = isHovered ? glowSize * 4.5 : glowSize * 3 * gPulse
            glowRef.current.scale.set(s, s, 1)
            glowRef.current.material.opacity = isHovered ? 0.7 : 0.4
        }

        // Outer haze
        if (outerGlowRef.current) {
            const oPulse = Math.sin(t * 0.8 + position[2]) * 0.2 + 1
            const s = isHovered ? glowSize * 7 : glowSize * 5 * oPulse
            outerGlowRef.current.scale.set(s, s, 1)
            outerGlowRef.current.material.opacity = isHovered ? 0.3 : 0.12
        }

        // Point light intensity
        if (lightRef.current) {
            const lPulse = Math.sin(t * 1.5 + position[0]) * 0.3 + 1
            lightRef.current.intensity = isHovered
                ? (isNorthStar ? 4 : 2.5)
                : (isNorthStar ? 2.5 : 1.2) * lPulse
        }

        if (raysRef.current) {
            raysRef.current.rotation.z += 0.012
            const rPulse = Math.sin(t * 2.5) * 0.15 + 1
            raysRef.current.scale.setScalar(rPulse)
        }
    })

    return (
        <group position={position}>
            {/* Point light — makes the star actually illuminate surroundings */}
            <pointLight
                ref={lightRef}
                color={color}
                intensity={isNorthStar ? 2.5 : 1.2}
                distance={isNorthStar ? 12 : 8}
                decay={2}
            />

            {/* Outer haze sprite */}
            <sprite ref={outerGlowRef} scale={[glowSize * 5, glowSize * 5, 1]}>
                <spriteMaterial
                    map={glowTexture}
                    color={color}
                    transparent
                    opacity={0.12}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </sprite>

            {/* Main glow sprite */}
            <sprite ref={glowRef} scale={[glowSize * 3, glowSize * 3, 1]}>
                <spriteMaterial
                    map={glowTexture}
                    color={color}
                    transparent
                    opacity={0.4}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </sprite>

            {/* Core sphere */}
            <mesh
                ref={meshRef}
                scale={[size, size, size]}
                onClick={(e) => { e.stopPropagation(); onClick?.() }}
                onPointerOver={(e) => {
                    e.stopPropagation()
                    document.body.style.cursor = 'pointer'
                    onPointerOver?.(e)
                }}
                onPointerMove={(e) => {
                    e.stopPropagation()
                    onPointerMove?.(e)
                }}
                onPointerOut={(e) => {
                    e.stopPropagation()
                    document.body.style.cursor = 'default'
                    onPointerOut?.(e)
                }}
            >
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial
                    color="#ffffff"
                    emissive={emissive || color}
                    emissiveIntensity={isHovered ? 2.5 : (isNorthStar ? 2 : 1.5)}
                    metalness={0}
                    roughness={0.1}
                    toneMapped={false}
                />
            </mesh>

            {/* North Star cross rays */}
            {isNorthStar && (
                <group ref={raysRef}>
                    {[0, 45, 90, 135].map((deg, i) => (
                        <mesh
                            key={i}
                            rotation={[0, 0, (deg * Math.PI) / 180]}
                            scale={[0.04, size * 3.5, 0.04]}
                        >
                            <boxGeometry args={[1, 1, 1]} />
                            <meshBasicMaterial
                                color="#ffffff"
                                transparent
                                opacity={0.6}
                                blending={THREE.AdditiveBlending}
                                depthWrite={false}
                            />
                        </mesh>
                    ))}
                </group>
            )}

            {/* Hover orbiting ring */}
            {isHovered && (
                <mesh rotation={[Math.PI / 2, 0, 0]} scale={[size * 2.2, size * 2.2, size * 2.2]}>
                    <ringGeometry args={[0.9, 1, 64]} />
                    <meshBasicMaterial
                        color={color}
                        transparent
                        opacity={0.5}
                        blending={THREE.AdditiveBlending}
                        depthWrite={false}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            )}
        </group>
    )
}

export default HeavenlyBody
