import { motion } from 'framer-motion'

const steps = [
  { label: '学生', sub: '提交申请', color: '#367BFF', icon: '👤' },
  { label: 'AI 引擎', sub: '智能分析', color: '#5B8CFF', icon: '🤖' },
  { label: '审批人', sub: '人工决策', color: '#7B5CFF', icon: '✅' },
  { label: '归档', sub: '通知闭环', color: '#39C589', icon: '📋' },
]

export default function Slide03Solution() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-20 py-14">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <span className="t-label text-primary">Solution · 解决方案</span>
        <h2 className="t-h1 mt-2" style={{ lineHeight: 1.2 }}>
          <span className="gradient-text">AI 辅助流程</span>，人保留决策
        </h2>
        <p className="t-h2 mt-2">
          AI 负责信息抽取、合规分析、建议生成；审批人始终掌握最终决定权
        </p>
      </motion.div>

      <div className="flex-1 flex flex-col justify-center">
        {/* Flow row — 4 uniform cards + 3 uniform arrows */}
        <div className="flex items-center justify-center gap-0">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.25 + i * 0.18 }}
                className="w-[160px] h-[120px] rounded-2xl flex flex-col items-center justify-center glass-card"
                style={{
                  borderColor: i === 3 ? 'rgba(57,197,137,0.18)' : 'rgba(54,123,255,0.10)',
                }}
              >
                <span className="text-3xl mb-1.5">{step.icon}</span>
                <span className="t-h3" style={{ color: step.color }}>{step.label}</span>
                <span className="t-body mt-0.5">{step.sub}</span>
              </motion.div>

              {/* Arrow — brand blue for first 3, green only for last */}
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.25, delay: 0.45 + i * 0.18 }}
                  className="mx-2"
                >
                  <svg width="50" height="20" viewBox="0 0 50 20">
                    <line x1="0" y1="10" x2="34" y2="10"
                      stroke={i === 2 ? '#39C589' : '#367BFF'}
                      strokeWidth="2.5" strokeLinecap="round"
                      opacity={i === 2 ? 0.5 : 0.45} />
                    <polygon points="34,5 44,10 34,15"
                      fill={i === 2 ? '#39C589' : '#367BFF'}
                      opacity={i === 2 ? 0.5 : 0.45} />
                  </svg>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom 3 principle cards — fixed 36px gap from flow, equal width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.95 }}
          className="grid grid-cols-3 gap-5 mt-[36px]"
        >
          {[
            { t: 'AI 不替代人', d: '所有审批决定由人类做出，AI 提供信息支撑' },
            { t: '全程可追溯', d: '每一步决策都有依据记录，支持回溯审计' },
            { t: '渐进式增强', d: '从辅助建议到自动预判，逐步提升AI参与度' },
          ].map((item, i) => (
            <div key={i} className="glass-card p-5 text-center">
              <div className="t-h3 text-gray-800 mb-1">{item.t}</div>
              <div className="t-body">{item.d}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
