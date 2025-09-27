import React, { Suspense, useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import ConstellationScene from './ConstellationScene'
import ProjectModal from './ProjectModal'
import AboutModal from './AboutModal'
import NavigationUI from './NavigationUI'
import LoadingScreen from './LoadingScreen'
import { projects, aboutMe } from '../data/portfolioData'

const StarMap = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [showAbout, setShowAbout] = useState(false)
  const [hoveredStar, setHoveredStar] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const controlsRef = useRef()

  const handleStarClick = (project) => {
    if (project.id === 'about') {
      setShowAbout(true)
    } else {
      setSelectedProject(project)
    }
  }

  const handleStarHover = React.useCallback((project, pointerPosition) => {
    if (project && pointerPosition) {
      setHoveredStar({ ...project, screenPosition: pointerPosition })
    } else if (project) {
      setHoveredStar({ ...project })
    } else {
      setHoveredStar(null)
    }
  }, [])

  const closeModal = () => {
    setSelectedProject(null)
    setShowAbout(false)
  }

  // Simulate loading time
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      {/* Three.js Canvas */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Ambient space environment */}
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          
          {/* Background stars */}
          <Stars 
            radius={300} 
            depth={50} 
            count={3000} 
            factor={4} 
            saturation={0} 
            fade={true} 
          />
          
          {/* Main constellation scene */}
          <ConstellationScene
            projects={projects}
            aboutMe={aboutMe}
            onStarClick={handleStarClick}
            onStarHover={handleStarHover}
            hoveredStar={hoveredStar}
          />
          
          {/* Controls */}
          <OrbitControls
            ref={controlsRef}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={15}
            autoRotate={false}
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <NavigationUI 
        hoveredStar={hoveredStar}
        onAboutClick={() => setShowAbout(true)}
      />

      {/* Modals */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={closeModal}
          />
        )}
        
        {showAbout && (
          <AboutModal
            aboutData={aboutMe}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default StarMap
