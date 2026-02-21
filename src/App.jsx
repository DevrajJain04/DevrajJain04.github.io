import React, { Suspense, useState, useCallback, useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { AnimatePresence, motion } from 'framer-motion'
import * as THREE from 'three'
import StarField from './components/StarField'
import HUD from './components/HUD'
import SectionModal from './components/SectionModal'
import LoadingScreen from './components/LoadingScreen'
import IntroOverlay from './components/IntroOverlay'
import AboutContent from './components/About'
import SkillsContent from './components/Skills'
import ContactContent from './components/Contact'
import ProjectDetail from './components/ProjectDetail'
import ExperienceDetail from './components/ExperienceDetail'
import { constellationNodes } from './data/portfolioData'
import './App.css'

// Direct modals (non-expandable stars)
const directModals = {
  about: AboutContent,
  skills: SkillsContent,
  contact: ContactContent,
}

const CameraFocus = ({ expandedId, controlsRef }) => {
  const { camera } = useThree()
  const transitionRef = useRef({
    progress: 1,
    settled: true,
    fromPos: new THREE.Vector3(0, 0, 12),
    toPos: new THREE.Vector3(0, 0, 12),
    fromTarget: new THREE.Vector3(0, 0, 0),
    toTarget: new THREE.Vector3(0, 0, 0),
  })

  useEffect(() => {
    const controls = controlsRef.current
    if (!controls) return

    const transition = transitionRef.current
    transition.settled = false

    if (expandedId) {
      // Normalize from a known baseline so prior zoom/pan does not skew focus alignment.
      camera.position.set(0, 0, 12)
      controls.target.set(0, 0, 0)
      controls.update()
    }

    transition.progress = 0
    transition.fromPos.copy(camera.position)
    transition.fromTarget.copy(controls.target)

    if (expandedId) {
      const parent = constellationNodes.find((n) => n.id === expandedId)
      if (parent) {
        transition.toTarget.set(parent.position[0], parent.position[1], parent.position[2])
        transition.toPos.set(parent.position[0], parent.position[1] + 0.25, parent.position[2] + 6.4)
      }
    } else {
      transition.toTarget.set(0, 0, 0)
      transition.toPos.set(0, 0, 12)
    }
  }, [expandedId, camera, controlsRef])

  useFrame((_, delta) => {
    const controls = controlsRef.current
    if (!controls) return

    const transition = transitionRef.current
    if (transition.progress >= 1) {
      if (!transition.settled) {
        camera.position.copy(transition.toPos)
        controls.target.copy(transition.toTarget)
        controls.update()
        transition.settled = true
      }
      return
    }

    transition.progress = Math.min(1, transition.progress + delta * 2.2)
    const eased = 1 - Math.pow(1 - transition.progress, 3)

    camera.position.lerpVectors(transition.fromPos, transition.toPos, eased)
    controls.target.lerpVectors(transition.fromTarget, transition.toTarget, eased)
    controls.update()
  })

  return null
}

const App = () => {
  const [loading, setLoading] = useState(true)
  const [introVisible, setIntroVisible] = useState(true)
  const [introFading, setIntroFading] = useState(false)
  const controlsRef = useRef(null)

  // Main star hover
  const [hoveredId, setHoveredId] = useState(null)
  const [hoveredNode, setHoveredNode] = useState(null)
  const [hoveredPos, setHoveredPos] = useState(null)

  // Expanded parent (nested constellation visible)
  const [expandedId, setExpandedId] = useState(null)

  // Active modal
  const [activeModal, setActiveModal] = useState(null)  // { type: 'section' | 'child', sectionId, childId? }

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(t)
  }, [])

  const handleEnter = useCallback(() => {
    setIntroFading(true)
    setTimeout(() => setIntroVisible(false), 800)
  }, [])

  // Main star click
  const handleStarClick = useCallback((id) => {
    const node = constellationNodes.find(n => n.id === id)
    if (!node) return

    if (node.expandable) {
      // Toggle expansion or collapse if clicking same
      setExpandedId(prev => prev === id ? null : id)
      setHoveredId(null)
      setHoveredNode(null)
      setHoveredPos(null)
    } else {
      // Open modal directly
      setActiveModal({ type: 'section', sectionId: id })
      setHoveredId(null)
      setHoveredNode(null)
      setHoveredPos(null)
    }
  }, [])

  // Child star click
  const handleChildClick = useCallback((childId) => {
    setActiveModal({ type: 'child', sectionId: expandedId, childId })
    setHoveredId(null)
    setHoveredNode(null)
    setHoveredPos(null)
  }, [expandedId])

  const handleStarHover = useCallback((id, node, pos) => {
    setHoveredId(id)
    setHoveredNode(node)
    setHoveredPos(pos)
  }, [])

  const handleChildHover = useCallback((id, node, pos) => {
    setHoveredId(id)
    setHoveredNode(node)
    setHoveredPos(pos)
  }, [])

  const handleNavigate = useCallback((id) => {
    const node = constellationNodes.find(n => n.id === id)
    if (node?.expandable) {
      setExpandedId(id)
    } else {
      setActiveModal({ type: 'section', sectionId: id })
    }
  }, [])

  const closeModal = useCallback(() => {
    setActiveModal(null)
  }, [])

  const handleBackFromDetail = useCallback(() => {
    // Close child modal, keep constellation expanded
    setActiveModal(null)
  }, [])

  const handleCollapseConstellation = useCallback(() => {
    setExpandedId(null)
  }, [])

  if (loading) return <LoadingScreen />

  return (
    <div className="app">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 55 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.08} />
          <pointLight position={[15, 10, 10]} intensity={0.3} color="#ffffff" />
          <pointLight position={[-10, -8, 5]} intensity={0.15} color="#64ffda" />

          <CameraFocus expandedId={expandedId} controlsRef={controlsRef} />

          <StarField
            hoveredId={hoveredId}
            onStarClick={handleStarClick}
            onStarHover={handleStarHover}
            expandedId={expandedId}
            onChildClick={handleChildClick}
            onChildHover={handleChildHover}
          />

          <OrbitControls
            ref={controlsRef}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={expandedId ? 3.8 : 5}
            maxDistance={expandedId ? 12 : 18}
            autoRotate={false}
            zoomSpeed={expandedId ? 0.72 : 0.6}
            rotateSpeed={0.5}
            enableDamping={true}
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>

      {/* HUD */}
      <AnimatePresence>
        {!introVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <HUD
              hoveredNode={hoveredNode}
              hoveredPos={hoveredPos}
              onNavigate={handleNavigate}
              expandedId={expandedId}
              onCollapse={handleCollapseConstellation}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Intro Overlay */}
      <AnimatePresence>
        {introVisible && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: introFading ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <IntroOverlay onEnter={handleEnter} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <AnimatePresence>
        {activeModal?.type === 'section' && directModals[activeModal.sectionId] && (() => {
          const Content = directModals[activeModal.sectionId]
          return (
            <SectionModal sectionId={activeModal.sectionId} onClose={closeModal}>
              <Content />
            </SectionModal>
          )
        })()}

        {activeModal?.type === 'child' && activeModal.childId?.startsWith('proj-') && (
          <SectionModal
            sectionId={activeModal.sectionId}
            childId={activeModal.childId}
            onClose={closeModal}
            onBack={handleBackFromDetail}
          >
            <ProjectDetail childId={activeModal.childId} />
          </SectionModal>
        )}

        {activeModal?.type === 'child' && activeModal.childId?.startsWith('exp-') && (
          <SectionModal
            sectionId={activeModal.sectionId}
            childId={activeModal.childId}
            onClose={closeModal}
            onBack={handleBackFromDetail}
          >
            <ExperienceDetail childId={activeModal.childId} />
          </SectionModal>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
