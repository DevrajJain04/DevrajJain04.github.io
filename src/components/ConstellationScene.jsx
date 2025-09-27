import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import Star from './Star'

const ConstellationScene = ({ 
  projects, 
  aboutMe, 
  onStarClick, 
  onStarHover, 
  hoveredStar 
}) => {
  const groupRef = useRef()
  const linesRef = useRef()
  const lastTiltRef = useRef(0)

  const GOLDEN_ANGLE = useMemo(() => Math.PI * (3 - Math.sqrt(5)), [])
  const PROJECT_STAR_SIZE = 0.6

  const pseudoRandom = useMemo(() => {
    return (seed) => {
      const s = Math.sin(seed) * 43758.5453123
      return s - Math.floor(s)
    }
  }, [])

  const { arrangedProjects, linePositions } = useMemo(() => {
    if (!projects || projects.length === 0) {
      return { arrangedProjects: [], linePositions: new Float32Array() }
    }

    const radius = 7
    const jitterStrength = 0.6

    const arranged = projects.map((project, index) => {
      const ratio = (index + 0.5) / projects.length
      const phi = Math.acos(1 - 2 * ratio)
      const theta = GOLDEN_ANGLE * (index + 1)

      const baseX = Math.cos(theta) * Math.sin(phi)
      const baseY = Math.cos(phi)
      const baseZ = Math.sin(theta) * Math.sin(phi)

      const jitterX = (pseudoRandom((index + 1) * 13.37) - 0.5) * jitterStrength
      const jitterY = (pseudoRandom((index + 1) * 23.17) - 0.5) * jitterStrength
      const jitterZ = (pseudoRandom((index + 1) * 31.73) - 0.5) * jitterStrength

      return {
        ...project,
        position: [
          (baseX + jitterX) * radius,
          (baseY + jitterY) * radius,
          (baseZ + jitterZ) * radius
        ]
      }
    })

    const edges = new Set()

    arranged.forEach((project, i) => {
      const neighbors = arranged
        .map((other, j) => {
          if (i === j) return null
          const dx = project.position[0] - other.position[0]
          const dy = project.position[1] - other.position[1]
          const dz = project.position[2] - other.position[2]
          return { index: j, distance: Math.sqrt(dx * dx + dy * dy + dz * dz) }
        })
        .filter(Boolean)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 2)

      neighbors.forEach(({ index: neighborIndex }) => {
        const key = i < neighborIndex ? `${i}-${neighborIndex}` : `${neighborIndex}-${i}`
        edges.add(key)
      })
    })

    const linePoints = []
    edges.forEach((key) => {
      const [a, b] = key.split('-').map(Number)
      const posA = arranged[a]?.position
      const posB = arranged[b]?.position

      if (posA && posB) {
        linePoints.push(...posA, ...posB)
      }
    })

    return {
      arrangedProjects: arranged,
      linePositions: new Float32Array(linePoints)
    }
  }, [projects, GOLDEN_ANGLE, pseudoRandom])

  // Animate the constellation
  useFrame((state) => {
    const group = groupRef.current
    if (group) {
      if (!hoveredStar) {
        group.rotation.y += 0.0015
        const tilt = Math.sin(state.clock.elapsedTime * 0.2) * 0.15
        group.rotation.x = tilt
        lastTiltRef.current = tilt
      }
    }
    
    if (hoveredStar && group) {
      group.rotation.x = lastTiltRef.current
    }

    if (linesRef.current) {
      linesRef.current.material.opacity = 0.1 + Math.sin(state.clock.elapsedTime) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Constellation connection lines */}
      {linePositions.length > 0 && (
        <lineSegments ref={linesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={linePositions}
              count={linePositions.length / 3}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial 
            attach="material" 
            color="#64ffda" 
            transparent 
            opacity={0.18}
            blending={THREE.AdditiveBlending}
            linewidth={0.5}
          />
        </lineSegments>
      )}

      {/* Project Stars */}
      {arrangedProjects.map((project) => (
        <Star
          key={project.id}
          position={project.position}
          color={project.color}
          size={PROJECT_STAR_SIZE}
          onClick={() => onStarClick(project)}
          onPointerOver={(event) => onStarHover(project, { x: event.clientX, y: event.clientY })}
          onPointerMove={(event) => onStarHover(project, { x: event.clientX, y: event.clientY })}
          onPointerOut={() => onStarHover(null)}
          isHovered={hoveredStar?.id === project.id}
          label={project.name}
        />
      ))}

      {/* About Me - North Star */}
      <Star
        position={aboutMe.position}
        color={aboutMe.color}
        size={aboutMe.size}
        onClick={() => onStarClick({ id: 'about', ...aboutMe })}
        onPointerOver={(event) => onStarHover({ id: 'about', ...aboutMe }, { x: event.clientX, y: event.clientY })}
        onPointerMove={(event) => onStarHover({ id: 'about', ...aboutMe }, { x: event.clientX, y: event.clientY })}
        onPointerOut={() => onStarHover(null)}
        isHovered={hoveredStar?.id === 'about'}
        label="About Me"
        isNorthStar={true}
      />

      {/* Floating labels for hovered stars */}
      {hoveredStar && (
        <Text
          position={[
            hoveredStar.position[0],
            hoveredStar.position[1] + 1,
            hoveredStar.position[2]
          ]}
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          material-transparent={true}
          material-opacity={0.9}
        >
          {hoveredStar.name || hoveredStar.title}
        </Text>
      )}
    </group>
  )
}

export default ConstellationScene
