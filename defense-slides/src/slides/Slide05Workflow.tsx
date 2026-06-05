import { motion } from 'framer-motion'

const flowSteps = [
  { id: '01', label: '自然语言输入', sub: '学生用日常语言描述需求', icon: '💬', color: '#367BFF', accent: false },
  { id: '02', label: '字段智能抽取', sub: 'LLM 提取关键审批字段', icon: '🔍', color: '#367BFF', accent: false },
  { id: '03', label: '表单自动预填', sub: '结构化数据填入表单', icon: '📝', color: '#367BFF', accent: false },
  { id: '04', label: 'RAG 合规检索', sub: '检索相关政策与历史案例', icon: '📚', color: '#367BFF', accent: false },
  { id: '05', label: '风险智能分析', sub: '多维度风险评估打分', icon: '⚠️', color: '#FFB86C', accent: true },
  { id: '06', label: '审批建议生成', sub: 'AI 给出建议 + 依据', icon: '💡', color: '#367BFF', accent: false },
  { id: '07', label: '人工最终决策', sub: '审批人基于建议做出决定', icon: '👤', color: '#367BFF', accent: false },
  { id: '08', label: '通知 & 归档', sub: '结果推送 + 材料自动归档', icon: '📋', color: '#39C589', accent: true },
]

const CARD_W = 200
const CARD_H = 100
const GAP_X = 28
const ROW1_Y = 30
const ROW2_Y = 200
const LEFT_PAD = 30

export default function Slide05Workflow() {
  const cols = 4

  return (
    <div className="w-full h-full flex flex-col justify-center px-20 py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <span className="t-label text-primary">Workflow · 业务流程</span>
        <span className="ml-3 inline-block px-3 py-1 rounded-full text-[13px] font-semibold bg-[#367BFF14] text-[#367BFF]">💡 流程创新</span>
        <h2 className="t-h1 mt-2" style={{ lineHeight: 1.2 }}>
          端到端<span className="gradient-text">智能审批</span>流程
        </h2>
        <p className="t-h2 mt-1">
          从自然语言输入到人工决策归档，全链路 AI 增强
        </p>
      </motion.div>

      <div className="flex-1 flex items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.50, delay: 0.25 }}
          className="w-full"
        >
          <svg viewBox="0 0 960 500" className="w-full" style={{ maxHeight: 500 }}>
            {/* Top row: 01–04 */}
            {flowSteps.slice(0, cols).map((step, i) => {
              const cx = LEFT_PAD + i * (CARD_W + GAP_X)
              const border = step.accent ? step.color : '#367BFF'
              const opacity = step.accent ? '0.35' : '0.18'
              return (
                <g key={step.id}>
                  <rect x={cx} y={ROW1_Y} width={CARD_W} height={CARD_H} rx={14}
                    fill="white" fillOpacity="0.70"
                    stroke={border} strokeOpacity={opacity} strokeWidth="1.5" />
                  <text x={cx + 14} y={ROW1_Y + 22} fill={step.color} fontSize="16" fontWeight="700"
                    fontFamily="Inter, Noto Sans SC, sans-serif">{step.id}</text>
                  <text x={cx + 14} y={ROW1_Y + 46} fill="#333" fontSize="16" fontWeight="600"
                    fontFamily="Inter, Noto Sans SC, sans-serif">{step.label}</text>
                  <text x={cx + 14} y={ROW1_Y + 68} fill="#888" fontSize="14"
                    fontFamily="Inter, Noto Sans SC, sans-serif">{step.sub}</text>
                  <text x={cx + CARD_W - 20} y={ROW1_Y + CARD_H - 16} textAnchor="end" fontSize="24">{step.icon}</text>
                </g>
              )
            })}

            {/* Top row solid arrows */}
            {[0, 1, 2].map((i) => {
              const fromX = LEFT_PAD + (i + 1) * CARD_W + i * GAP_X
              const toX = fromX + GAP_X
              const midY = ROW1_Y + CARD_H / 2
              return (
                <g key={`arr-t-${i}`}>
                  <line x1={fromX} y1={midY} x2={toX - 6} y2={midY}
                    stroke="#367BFF" strokeOpacity="0.35" strokeWidth="2" />
                  <polygon points={`${toX - 12},${midY - 5} ${toX - 2},${midY} ${toX - 12},${midY + 5}`}
                    fill="#367BFF" fillOpacity="0.35" />
                </g>
              )
            })}

            {/* Inter-row dashed connectors (annotations only) */}
            {[0, 1, 2, 3].map((i) => {
              const cx = LEFT_PAD + i * (CARD_W + GAP_X) + CARD_W / 2
              return (
                <line key={`conn-${i}`} x1={cx} y1={ROW1_Y + CARD_H} x2={cx} y2={ROW2_Y}
                  stroke="#367BFF" strokeOpacity="0.15" strokeWidth="1.5" strokeDasharray="5,5" />
              )
            })}

            {/* Bottom row: 05–08 */}
            {flowSteps.slice(cols, 8).map((step, i) => {
              const cx = LEFT_PAD + i * (CARD_W + GAP_X)
              const border = step.accent ? step.color : '#367BFF'
              const opacity = step.accent ? '0.35' : '0.18'
              return (
                <g key={step.id}>
                  <rect x={cx} y={ROW2_Y} width={CARD_W} height={CARD_H} rx={14}
                    fill="white" fillOpacity="0.70"
                    stroke={border} strokeOpacity={opacity} strokeWidth="1.5" />
                  <text x={cx + 14} y={ROW2_Y + 22} fill={step.color} fontSize="16" fontWeight="700"
                    fontFamily="Inter, Noto Sans SC, sans-serif">{step.id}</text>
                  <text x={cx + 14} y={ROW2_Y + 46} fill="#333" fontSize="16" fontWeight="600"
                    fontFamily="Inter, Noto Sans SC, sans-serif">{step.label}</text>
                  <text x={cx + 14} y={ROW2_Y + 68} fill="#888" fontSize="14"
                    fontFamily="Inter, Noto Sans SC, sans-serif">{step.sub}</text>
                  <text x={cx + CARD_W - 20} y={ROW2_Y + CARD_H - 16} textAnchor="end" fontSize="24">{step.icon}</text>
                </g>
              )
            })}

            {/* Bottom row solid arrows */}
            {[0, 1, 2].map((i) => {
              const fromX = LEFT_PAD + (i + 1) * CARD_W + i * GAP_X
              const toX = fromX + GAP_X
              const midY = ROW2_Y + CARD_H / 2
              return (
                <g key={`arr-b-${i}`}>
                  <line x1={fromX} y1={midY} x2={toX - 6} y2={midY}
                    stroke="#367BFF" strokeOpacity="0.35" strokeWidth="2" />
                  <polygon points={`${toX - 12},${midY - 5} ${toX - 2},${midY} ${toX - 12},${midY + 5}`}
                    fill="#367BFF" fillOpacity="0.35" />
                </g>
              )
            })}

            {/* Middle note bar — full width, centered */}
            <rect x={LEFT_PAD} y={ROW2_Y + CARD_H + 28} width={CARD_W * 4 + GAP_X * 3} height={48} rx={12}
              fill="white" fillOpacity="0.70" stroke="#7B5CFF" strokeOpacity="0.25" strokeWidth="1.5" />
            <text x={LEFT_PAD + (CARD_W * 4 + GAP_X * 3) / 2} y={ROW2_Y + CARD_H + 48}
              textAnchor="middle" fill="#7B5CFF" fontSize="16" fontWeight="700"
              fontFamily="Inter, Noto Sans SC, sans-serif">
              🔑 Human Decision Point — AI 提供建议与依据，审批人基于完整信息做出最终决定
            </text>

            {/* Bottom closed-loop bar — wider, directly below note */}
            <rect x={LEFT_PAD + 80} y={ROW2_Y + CARD_H + 92} width={CARD_W * 4 + GAP_X * 3 - 160} height={42} rx={21}
              fill="#39C589" fillOpacity="0.08" stroke="#39C589" strokeOpacity="0.25" strokeWidth="1.5" />
            <text x={LEFT_PAD + (CARD_W * 4 + GAP_X * 3) / 2} y={ROW2_Y + CARD_H + 118}
              textAnchor="middle" fill="#39C589" fontSize="16" fontWeight="600"
              fontFamily="Inter, Noto Sans SC, sans-serif">
              ✅ 流程闭环完成
            </text>

            {/* Dashed down arrow from note to closed-loop */}
            <line x1={LEFT_PAD + (CARD_W * 4 + GAP_X * 3) / 2} y1={ROW2_Y + CARD_H + 76}
              x2={LEFT_PAD + (CARD_W * 4 + GAP_X * 3) / 2} y2={ROW2_Y + CARD_H + 92}
              stroke="#39C589" strokeOpacity="0.30" strokeWidth="1.5" strokeDasharray="4,4" />
          </svg>
        </motion.div>
      </div>
    </div>
  )
}
