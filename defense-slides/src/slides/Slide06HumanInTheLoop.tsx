import { motion } from 'framer-motion'

const aiItems = [
  { y: 130, icon: '📄', t: 'OCR 文档解析', d: '自动识别申请表、证明文件' },
  { y: 190, icon: '🧠', t: 'LLM 字段抽取', d: '自然语言 → 结构化字段' },
  { y: 250, icon: '📚', t: 'RAG 合规检索', d: '检索政策库 + 历史案例' },
  { y: 310, icon: '⚠️', t: '风险多维分析', d: '预算/合规/时效综合评分' },
  { y: 370, icon: '💡', t: '审批建议生成', d: '建议 + 依据 + 风险提示' },
]

const humanItems = [
  { y: 140, icon: '👁️', t: '审查 AI 建议', d: '查看 AI 分析与风险评估', color: '#7B5CFF' },
  { y: 205, icon: '📋', t: '查看证据依据', d: '每条建议附引用来源', color: '#7B5CFF' },
  { y: 270, icon: '✏️', t: '修改/补充意见', d: '可调整建议，保留修改记录', color: '#7B5CFF' },
  { y: 335, icon: '✅', t: '做出最终决定', d: '批准 / 驳回 / 退回修改', color: '#39C589' },
  { y: 395, icon: '📝', t: '决策留痕归档', d: '完整决策链路可追溯', color: '#39C589' },
]

export default function Slide06HumanInTheLoop() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-20 py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mb-8"
      >
        <span className="t-label text-primary">Human-in-the-Loop · 人机协同</span>
        <span className="ml-3 inline-block px-3 py-1 rounded-full text-[13px] font-semibold bg-[#7B5CFF14] text-[#7B5CFF]">💡 交互创新</span>
        <h2 className="t-h1 mt-2">
          <span className="gradient-text">AI 提供建议</span>，人负责审批
        </h2>
        <p className="t-h2 mt-2">
          不是 AI 替代人，而是 AI 增强人的决策能力
        </p>
      </motion.div>

      <div className="flex-1 flex items-center gap-8">
        {/* Left: AI Engine */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.20 }}
          className="flex-1"
        >
          <svg viewBox="0 0 380 500" className="w-full" style={{ maxHeight: 500 }}>
            <defs>
              <linearGradient id="aiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#367BFF" />
                <stop offset="100%" stopColor="#5877FF" />
              </linearGradient>
            </defs>
            <rect x={40} y={40} width={300} height={420} rx={20} fill="white" fillOpacity="0.50" stroke="url(#aiGrad)" strokeOpacity="0.18" strokeWidth="2" />
            <text x={190} y={85} textAnchor="middle" fill="#367BFF" fontSize="22" fontWeight="700" fontFamily="Inter, Noto Sans SC, sans-serif">🤖 AI 引擎</text>
            <line x1={90} y1={100} x2={290} y2={100} stroke="#367BFF" strokeOpacity="0.12" strokeWidth="1" />
            {aiItems.map((item, i) => (
              <g key={i}>
                <rect x={65} y={item.y - 15} width={250} height={50} rx={10} fill="white" fillOpacity="0.55" stroke="#367BFF" strokeOpacity="0.08" strokeWidth="1" />
                <text x={80} y={item.y + 8} fontSize="18">{item.icon}</text>
                <text x={108} y={item.y + 6} fill="#333" fontSize="16" fontWeight="600" fontFamily="Inter, Noto Sans SC, sans-serif">{item.t}</text>
                <text x={108} y={item.y + 24} fill="#888" fontSize="14" fontFamily="Inter, Noto Sans SC, sans-serif">{item.d}</text>
              </g>
            ))}
          </svg>
        </motion.div>

        {/* Center: Evidence bridge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.30, delay: 0.40 }}
          className="flex flex-col items-center gap-4"
        >
          <svg width="60" height="200" viewBox="0 0 60 200">
            <defs>
              <linearGradient id="bridgeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#367BFF" />
                <stop offset="100%" stopColor="#7B5CFF" />
              </linearGradient>
            </defs>
            <rect x={20} y={10} width={20} height={180} rx={10} fill="url(#bridgeGrad)" opacity="0.12" />
            <text x={30} y={105} textAnchor="middle" fill="#7B5CFF" fontSize="14" fontWeight="600" fontFamily="Inter, Noto Sans SC, sans-serif" transform="rotate(-90, 30, 105)">Evidence</text>
            <polygon points="25,25 30,10 35,25" fill="#367BFF" opacity="0.35" />
            <polygon points="25,175 30,190 35,175" fill="#7B5CFF" opacity="0.35" />
          </svg>
          <div className="glass-card p-3 text-center" style={{ borderColor: 'rgba(123,92,255,0.12)' }}>
            <div className="text-[13px] text-gray-400">AI 输出 → 结构化证据链 → 审批人可见</div>
          </div>
        </motion.div>

        {/* Right: Human Decision */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.60 }}
          className="flex-1"
        >
          <svg viewBox="0 0 380 500" className="w-full" style={{ maxHeight: 500 }}>
            <defs>
              <linearGradient id="humanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7B5CFF" />
                <stop offset="100%" stopColor="#39C589" />
              </linearGradient>
            </defs>
            <rect x={40} y={40} width={300} height={420} rx={20} fill="white" fillOpacity="0.50" stroke="url(#humanGrad)" strokeOpacity="0.18" strokeWidth="2" />
            <text x={190} y={85} textAnchor="middle" fill="#7B5CFF" fontSize="22" fontWeight="700" fontFamily="Inter, Noto Sans SC, sans-serif">👤 审批人决策</text>
            <line x1={90} y1={100} x2={290} y2={100} stroke="#7B5CFF" strokeOpacity="0.12" strokeWidth="1" />
            {humanItems.map((item, i) => (
              <g key={i}>
                <rect x={65} y={item.y - 15} width={250} height={46} rx={10} fill="white" fillOpacity="0.55" stroke={item.color} strokeOpacity="0.10" strokeWidth="1" />
                <text x={80} y={item.y + 8} fontSize="18">{item.icon}</text>
                <text x={108} y={item.y + 4} fill="#333" fontSize="16" fontWeight="600" fontFamily="Inter, Noto Sans SC, sans-serif">{item.t}</text>
                <text x={108} y={item.y + 20} fill="#888" fontSize="14" fontFamily="Inter, Noto Sans SC, sans-serif">{item.d}</text>
              </g>
            ))}
          </svg>
        </motion.div>
      </div>
    </div>
  )
}
