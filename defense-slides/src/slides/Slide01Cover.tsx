import { motion } from 'framer-motion'
import ScreenshotPlaceholder from '../components/ScreenshotPlaceholder'

const tags = ['AI Pipeline', 'RAG 知识库', '多角色协同', 'Human-in-the-Loop']

export default function Slide01Cover() {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      {/* Background decoration — small, low-opacity, corner only */}
      <div className="absolute inset-0 dot-pattern opacity-50" />
      <div className="absolute -bottom-16 -left-16 w-[280px] h-[280px] rounded-full opacity-6"
        style={{ background: 'radial-gradient(circle, #7B5CFF 0%, transparent 70%)' }} />

      {/* 6:4 two-column grid */}
      <div className="flex items-center gap-0 w-full h-full px-20 z-10">
        {/* Left 60% — text + tags */}
        <div className="flex-[0_0_60%] pr-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full t-label text-primary bg-primary/8">
              Competition Defense · 比赛答辩
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="t-h1-lg gradient-text mt-8 mb-4"
          >
            智审通
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.40 }}
            className="t-h2 mb-3"
          >
            Human-in-the-Loop Smart Approval System
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.50 }}
            className="t-body"
          >
            AI 辅助 · 人工决策 · 高校审批智能化
          </motion.p>

          {/* 4 buttons evenly spaced */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="grid grid-cols-4 gap-3 mt-9"
          >
            {tags.map((tag) => (
              <div key={tag} className="glass-card px-0 py-3 rounded-full text-center text-[13px] text-gray-600 font-medium">
                {tag}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right 40% — screenshot preview (clean, no filename clutter) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.45 }}
          className="flex-[0_0_40%]"
        >
          <ScreenshotPlaceholder
            label="系统预览"
            filename=""
            description="智审通主工作台界面"
          />
        </motion.div>
      </div>
    </div>
  )
}
