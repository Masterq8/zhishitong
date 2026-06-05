import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  accent?: 'blue' | 'purple' | 'green' | 'amber'
  delay?: number
  onClick?: () => void
}

const accentMap = {
  blue: 'glass-card',
  purple: 'glass-card-accent-purple',
  green: 'glass-card-accent-green',
  amber: 'glass-card-accent-amber',
}

export default function GlassCard({ children, className = '', accent = 'blue', delay = 0, onClick }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay, ease: [0.4, 0, 0.2, 1] }}
      className={`${accentMap[accent]} p-6 ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
