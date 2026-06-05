import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Slide01Cover from './slides/Slide01Cover'
import Slide02Problem from './slides/Slide02Problem'
import Slide03Solution from './slides/Slide03Solution'
import Slide04Innovation from './slides/Slide12Innovation'
import Slide05Architecture from './slides/Slide04Architecture'
import Slide06Workflow from './slides/Slide05Workflow'
import Slide07HumanInTheLoop from './slides/Slide06HumanInTheLoop'
import Slide08AIPipeline from './slides/Slide07AIPipeline'
import Slide09RAG from './slides/Slide08RAG'
import Slide10MultiRole from './slides/Slide09MultiRole'
import Slide11Engineering from './slides/Slide10Engineering'
import Slide12Demo from './slides/Slide11Demo'
import Slide13Value from './slides/Slide13Value'
import Slide14Future from './slides/Slide14Future'
import Slide15QA from './slides/Slide15QA'

const slides = [
  Slide01Cover,
  Slide02Problem,
  Slide03Solution,
  Slide04Innovation,
  Slide05Architecture,
  Slide06Workflow,
  Slide07HumanInTheLoop,
  Slide08AIPipeline,
  Slide09RAG,
  Slide10MultiRole,
  Slide11Engineering,
  Slide12Demo,
  Slide13Value,
  Slide14Future,
  Slide15QA,
]

const totalSlides = slides.length

export default function App() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides) {
      setDirection(index > current ? 1 : -1)
      setCurrent(index)
    }
  }, [current])

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault()
        next()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        prev()
      } else if (e.key === 'Home') {
        e.preventDefault()
        goTo(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        goTo(totalSlides - 1)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [next, prev, goTo])

  // Touch support
  useEffect(() => {
    let touchStartX = 0
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX
    }
    const handleTouchEnd = (e: TouchEvent) => {
      const diff = touchStartX - e.changedTouches[0].clientX
      if (Math.abs(diff) > 60) {
        if (diff > 0) next()
        else prev()
      }
    }
    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchend', handleTouchEnd)
    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [next, prev])

  const CurrentSlide = slides[current]

  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #F8FBFF 0%, #F4F8FF 50%, #EEF6FF 100%)' }}>
      {/* Progress bar */}
      <div
        className="progress-bar"
        style={{ width: `${((current + 1) / totalSlides) * 100}%` }}
      />

      {/* Slide */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          initial={{ opacity: 0, x: direction * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -40 }}
          transition={{ duration: 0.30, ease: [0.4, 0, 0.2, 1] }}
          className="w-full h-full absolute inset-0"
        >
          <CurrentSlide />
        </motion.div>
      </AnimatePresence>

      {/* Navigation dots */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-50">
        <button
          onClick={prev}
          disabled={current === 0}
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg text-gray-500 hover:text-gray-700 disabled:opacity-30 transition-colors"
        >
          ←
        </button>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`nav-dot ${i === current ? 'active' : ''}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
        <button
          onClick={next}
          disabled={current === totalSlides - 1}
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg text-gray-500 hover:text-gray-700 disabled:opacity-30 transition-colors"
        >
          →
        </button>
      </div>

      {/* Slide counter */}
      <div className="fixed bottom-6 right-8 text-sm text-gray-500 z-50 font-mono">
        {String(current + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
      </div>

      {/* Hint */}
      <div className="fixed bottom-6 left-8 text-sm text-gray-500 z-50">
        ← → 导航 · 空格下一页
      </div>
    </div>
  )
}
