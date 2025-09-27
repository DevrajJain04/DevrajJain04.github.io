import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import StarMap from './components/StarMap'
import LoadingScreen from './components/LoadingScreen'
import './App.css'

const App = () => {
  return (
    <div className="app">
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<StarMap />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
