import { motion } from 'framer-motion'

const lanes = [
  { name: '学生',   color: '#367BFF', steps: [{ label: '提交申请', desc: '自然语言描述' }, { label: '查看进度', desc: '实时追踪状态' }, { label: '补充材料', desc: '按 AI 提示修改' }, { label: '接收通知', desc: '审批结果推送' }] },
  { name: '部门审批', color: '#7B5CFF', steps: [{ label: '审核初审', desc: 'AI 辅助预审' }, { label: '合规检查', desc: 'RAG 依据比对' }, { label: '部门意见', desc: '批准/驳回/退回' }] },
  { name: '财务审核', color: '#FFB86C', steps: [{ label: '预算核查', desc: '自动匹配预算' }, { label: '风险提示', desc: '超标/异常预警' }, { label: '财务决策', desc: 'AI + 人工复核' }] },
  { name: '学校审批', color: '#39C589', steps: [{ label: '终审裁决', desc: '全局视角决策' }, { label: '归档通知', desc: '全链路闭环' }] },
]

const STEP_W = 140
const STEP_H = 52
const STEP_GAP = 24
const LANE_H = 100
const LANE_START_Y = 30

export default function Slide09MultiRole() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-20 py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mb-6"
      >
        <span className="t-label text-primary">Multi-Role · 多角色协同</span>
        <span className="ml-3 inline-block px-3 py-1 rounded-full text-[13px] font-semibold bg-[#39C58914] text-[#39C589]">💡 治理创新</span>
        <h2 className="t-h1 mt-2">
          多角色<span className="gradient-text">审批泳道</span>
        </h2>
        <p className="t-h2 mt-2">
          学生 → 部门 → 财务 → 学校，四级审批链路清晰可控
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, delay: 0.20 }}
        className="flex-1 flex items-center"
      >
        <svg viewBox="0 0 940 480" className="w-full" style={{ maxHeight: 480 }}>
          <defs>
            {lanes.map((lane) => (
              <linearGradient key={lane.name} id={`swG-${lane.name}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={lane.color} stopOpacity="0.07" />
                <stop offset="100%" stopColor={lane.color} stopOpacity="0.02" />
              </linearGradient>
            ))}
          </defs>

          {/* Swimlanes */}
          {lanes.map((lane, li) => {
            const laneY = LANE_START_Y + li * 110
            const stepCount = lane.steps.length
            const totalW = stepCount * STEP_W + (stepCount - 1) * STEP_GAP
            const startX = (940 - 100 - totalW) / 2 + 100 // center steps after label

            return (
              <g key={lane.name}>
                <rect x={0} y={laneY} width={940} height={LANE_H} rx={14} fill={`url(#swG-${lane.name})`} stroke={lane.color} strokeOpacity="0.14" strokeWidth="1" />

                {/* Lane label */}
                <rect x={10} y={laneY + 5} width={75} height={28} rx={8} fill={lane.color} fillOpacity="0.10" />
                <text x={47} y={laneY + 24} textAnchor="middle" fill={lane.color} fontSize="15" fontWeight="700" fontFamily="Inter, Noto Sans SC, sans-serif">{lane.name}</text>

                {/* Steps — centered within lane */}
                {lane.steps.map((step, si) => {
                  const sx = startX + si * (STEP_W + STEP_GAP)
                  return (
                    <g key={`${lane.name}-${si}`}>
                      <rect x={sx} y={laneY + 40} width={STEP_W} height={STEP_H} rx={10} fill="white" fillOpacity="0.75" stroke={lane.color} strokeOpacity="0.22" strokeWidth="1.5" />
                      <text x={sx + STEP_W / 2} y={laneY + 60} textAnchor="middle" fill="#333" fontSize="15" fontWeight="600" fontFamily="Inter, Noto Sans SC, sans-serif">{step.label}</text>
                      <text x={sx + STEP_W / 2} y={laneY + 80} textAnchor="middle" fill="#888" fontSize="13" fontFamily="Inter, Noto Sans SC, sans-serif">{step.desc}</text>
                    </g>
                  )
                })}

                {/* Arrows between steps */}
                {lane.steps.slice(1).map((_, si) => {
                  const fromX = startX + si * (STEP_W + STEP_GAP) + STEP_W
                  const toX = startX + (si + 1) * (STEP_W + STEP_GAP)
                  const midY = laneY + 66
                  return (
                    <g key={`arr-${lane.name}-${si}`}>
                      <line x1={fromX} y1={midY} x2={toX - 10} y2={midY} stroke={lane.color} strokeOpacity="0.25" strokeWidth="1.5" />
                      <polygon points={`${toX - 16},${midY - 5} ${toX - 6},${midY} ${toX - 16},${midY + 5}`} fill={lane.color} fillOpacity="0.25" />
                    </g>
                  )
                })}
              </g>
            )
          })}

          {/* Cross-lane connectors — single main line with branches */}
          <line x1={60} y1={LANE_START_Y + LANE_H} x2={60} y2={LANE_START_Y + 3 * 110 + 66} stroke="#367BFF" strokeOpacity="0.15" strokeWidth="1.5" strokeDasharray="5,5" />

          {/* Notification column */}
          <g>
            <rect x={800} y={45} width={110} height={46} rx={12} fill="white" fillOpacity="0.65" stroke="#39C589" strokeOpacity="0.25" strokeWidth="1.5" />
            <text x={855} y={66} textAnchor="middle" fontSize="17">📬</text>
            <text x={855} y={82} textAnchor="middle" fill="#666" fontSize="13" fontWeight="600" fontFamily="Inter, Noto Sans SC, sans-serif">通知推送</text>
            {lanes.map((_, li) => {
              const ly = LANE_START_Y + li * 110 + 66
              return <line key={`notify-${li}`} x1={800} y1={ly} x2={770} y2={ly} stroke="#39C589" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="4,4" />
            })}
          </g>
        </svg>
      </motion.div>
    </div>
  )
}
