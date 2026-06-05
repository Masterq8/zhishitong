import { motion } from 'framer-motion'

export default function Slide15QA() {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      {/* Background — single subdued decoration */}
      <div className="absolute inset-0 dot-pattern opacity-60" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, #367BFF 0%, #39C589 50%, transparent 70%)' }} />

      <div className="relative z-10 text-center">
        {/* Screenshot placeholder — clean, no filename */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="glass-card mb-10 mx-auto flex items-center justify-center flex-col"
          style={{ width: 600, height: 300, borderColor: 'rgba(54,123,255,0.10)' }}
        >
          <div className="text-4xl mb-3 opacity-30">🖼️</div>
          <div className="t-body">[系统最佳截图]</div>
        </motion.div>

        {/* Main quote — unified typography */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.20 }}
        >
          <h2 className="t-h1-lg gradient-text mb-6" style={{ lineHeight: 1.3 }}>
            "把 AI 放进流程
            <br />
            而不是替代流程"
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.40 }}
          className="space-y-2"
        >
          <p className="t-h2">
            智审通 · Human-in-the-Loop Smart Approval System
          </p>
          <p className="t-body">
            AI 辅助 · 人工决策 · 高校审批智能化
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.60 }}
          className="mt-8"
        >
          <span className="inline-block px-8 py-3 glass-card rounded-full t-h3 text-primary">
            💬 Q & A
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.80 }}
          className="mt-6 t-body"
        >
          感谢聆听 · Thank You
        </motion.div>
      </div>
    </div>
  )
}
