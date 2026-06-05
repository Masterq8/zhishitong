import { motion } from 'framer-motion'

const layers = [
  { label: '用户层', color: '#367BFF', items: ['学生端', '审批端', '管理端', '移动端'] },
  { label: '前端层', color: '#5877FF', items: ['React SPA', 'TailwindCSS', 'Framer Motion', '状态管理'] },
  { label: 'API 网关', color: '#926DFF', items: ['FastAPI', 'JWT 认证', 'RBAC 鉴权', '限流熔断'] },
  { label: '服务层', color: '#5599FF', items: ['审批引擎', '表单服务', '通知服务', 'RAG 检索'] },
  { label: 'AI 服务层', color: '#36C974', items: ['Qwen LLM', 'OCR 识别', '规则引擎', '风险分析'], extra: 'AI 可插拔' },
  { label: '数据 & 监控', color: '#FF9933', items: ['PostgreSQL', 'Redis', 'Prometheus', 'Grafana'] },
]

const CARD_W = 175
const CARD_H = 62
const GAP = 14
const LEFT_X = 100
const ROW_H = 88
const START_Y = 40

export default function Slide04Architecture() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-20 py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <span className="t-label text-primary">Architecture · 系统架构</span>
        <span className="ml-3 inline-block px-3 py-1 rounded-full text-[13px] font-semibold bg-[#5877FF14] text-[#5877FF]">💡 架构创新</span>
        <h2 className="t-h1 mt-2" style={{ lineHeight: 1.2 }}>
          系统<span className="gradient-text">总体架构</span>
        </h2>
        <p className="t-h2 mt-1">
          分层解耦，微服务架构，AI 能力作为独立服务层可插拔
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, delay: 0.25 }}
        className="flex-1 flex items-center justify-center"
      >
        <svg viewBox="0 0 960 560" className="w-full h-full" style={{ maxWidth: 960, maxHeight: 560 }}>
          {layers.map((layer, li) => {
            const rowY = START_Y + li * ROW_H
            const totalW = layer.items.length * CARD_W + (layer.items.length - 1) * GAP
            const startX = LEFT_X + (4 * CARD_W + 3 * GAP - totalW) / 2

            return (
              <g key={layer.label}>
                {/* Layer label — vertically centered on row */}
                <rect x={8} y={rowY + 2} width={78} height={CARD_H} rx={10} fill={layer.color} fillOpacity="0.08" />
                <text x={47} y={rowY + CARD_H / 2 + 5} textAnchor="middle" fill={layer.color} fontSize="16" fontWeight="600" fontFamily="Inter, Noto Sans SC, sans-serif">
                  {layer.label}
                </text>

                {/* Vertical connector line — subtle, single line down center of row */}
                {li < layers.length - 1 && (
                  <line x1={47} y1={rowY + CARD_H} x2={47} y2={START_Y + (li + 1) * ROW_H}
                    stroke={layer.color} strokeOpacity="0.18" strokeWidth="1.5" strokeDasharray="4,5" />
                )}

                {/* Cards — uniform width */}
                {layer.items.map((item, ii) => {
                  const cx = startX + ii * (CARD_W + GAP)
                  return (
                    <g key={item}>
                      <rect x={cx} y={rowY} width={CARD_W} height={CARD_H} rx={12}
                        fill="white" fillOpacity="0.65"
                        stroke={layer.color} strokeOpacity="0.22" strokeWidth="1.5" />
                      <text x={cx + CARD_W / 2} y={rowY + CARD_H / 2 + 4}
                        textAnchor="middle" fill="#333" fontSize="16" fontWeight="500"
                        fontFamily="Inter, Noto Sans SC, sans-serif">
                        {item}
                      </text>
                    </g>
                  )
                })}

                {/* AI layer extra badge (integrated, not floating) */}
                {layer.extra && (
                  <g>
                    <rect x={startX + 4 * (CARD_W + GAP) - CARD_W - 20} y={rowY - 12} width={90} height={22} rx={11}
                      fill="white" fillOpacity="0.85" stroke="#36C974" strokeOpacity="0.30" strokeWidth="1" />
                    <text x={startX + 4 * (CARD_W + GAP) - CARD_W + 25} y={rowY + 2}
                      fill="#36C974" fontSize="14" fontWeight="600"
                      fontFamily="Inter, Noto Sans SC, sans-serif">
                      🟢 {layer.extra}
                    </text>
                  </g>
                )}
              </g>
            )
          })}
        </svg>
      </motion.div>
    </div>
  )
}
