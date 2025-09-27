import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const Star = ({ 
  position, 
  color, 
  size = 0.5, 
  onClick, 
  onPointerOver, 
  onPointerOut, 
  onPointerMove,
  isHovered = false,
  isNorthStar = false,
  label 
}) => {
  const meshRef = useRef()
  const glowRef = useRef()
  const [clicked, setClicked] = useState(false)

  // Animation loop
  useFrame((state) => {
    if (meshRef.current) {
      // Base pulsing animation
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1
      meshRef.current.scale.setScalar(size * pulse)

      // North Star special animation
      if (isNorthStar) {
        meshRef.current.rotation.z += 0.02
        const brightPulse = Math.sin(state.clock.elapsedTime * 3) * 0.2 + 1.2
        meshRef.current.scale.setScalar(size * brightPulse)
      }

      // Hover effect
      if (isHovered) {
        const hoverScale = size * 1.5
        meshRef.current.scale.setScalar(hoverScale)
      }

      // Click effect
      if (clicked) {
        const clickScale = size * 2
        meshRef.current.scale.setScalar(clickScale)
      }
    }

    // Glow effect
    if (glowRef.current) {
      const glowPulse = Math.sin(state.clock.elapsedTime * 1.5) * 0.3 + 0.7
      glowRef.current.scale.setScalar((size + 0.3) * glowPulse)
      glowRef.current.material.opacity = isHovered ? 0.6 : 0.3
    }
  })

  const handleClick = (e) => {
    e.stopPropagation()
    setClicked(true)
    setTimeout(() => setClicked(false), 200)
    onClick && onClick()
  }

  return (
    <group position={position}>
      {/* Glow effect */}
      <mesh
        ref={glowRef}
        scale={[size + 0.3, size + 0.3, size + 0.3]}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Main star */}
      <mesh
        ref={meshRef}
        scale={[size, size, size]}
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation()
          document.body.style.cursor = 'pointer'
          onPointerOver && onPointerOver(e)
        }}
        onPointerMove={(e) => {
          e.stopPropagation()
          onPointerMove && onPointerMove(e)
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          document.body.style.cursor = 'default'
          onPointerOut && onPointerOut(e)
        }}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isNorthStar ? 0.8 : 0.5}
          metalness={0.1}
          roughness={0.2}
        />
      </mesh>

      {/* Star rays for North Star */}
      {isNorthStar && (
        <>
          {[0, 45, 90, 135].map((rotation, i) => (
            <mesh
              key={i}
              rotation={[0, 0, (rotation * Math.PI) / 180]}
              scale={[0.1, size * 2, 0.1]}
            >
              <boxGeometry args={[1, 1, 1]} />
              <meshBasicMaterial
                color={color}
                transparent
                opacity={0.7}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          ))}
        </>
      )}
    </group>
  )
}

export default Star
