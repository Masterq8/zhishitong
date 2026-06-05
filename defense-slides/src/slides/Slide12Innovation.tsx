import { motion } from 'framer-motion'

const innovations = [
  { icon: '🔄', title: '流程创新', desc: 'NL → 结构化 → 审批的全链路 AI 增强，学生用自然语言即可发起审批', color: '#367BFF', tags: ['自然语言交互', '端到端自动化'] },
  { icon: '🏗️', title: '架构创新', desc: 'AI 服务独立可插拔，模型可替换升级，业务逻辑与 AI 能力解耦', color: '#5877FF', tags: ['微服务分层', 'AI 可插拔'] },
  { icon: '🤝', title: '交互创新', desc: 'Human-in-the-Loop 设计，AI 提供证据链而非黑盒结论，审批人可追溯每条建议的来源', color: '#7B5CFF', tags: ['证据链追溯', '可解释 AI'] },
  { icon: '⚖️', title: '治理创新', desc: '多角色泳道审批 + 完整决策留痕，满足高校合规审计要求', color: '#39C589', tags: ['多角色协同', '审计追溯'] },
  { icon: '⚙️', title: '工程创新', desc: '容器化部署 + 全链路监控 + CI/CD 自动化，保障系统可靠运行', color: '#FFB86C', tags: ['Docker 部署', '全链路监控'] },
]

export default function Slide12Innovation() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-20 py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mb-8"
      >
        <span className="t-label text-primary">Innovation · 创新点</span>
        <h2 className="t-h1 mt-2">
          五大<span className="gradient-text">核心创新</span>
        </h2>
        <p className="t-h2 mt-2">
          从流程到架构，从交互到治理，全方位创新
        </p>
      </motion.div>

      {/* Single 5-column grid — no asymmetric 3+2 layout */}
      <div className="flex-1 grid grid-cols-5 gap-4">
        {innovations.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.15 + i * 0.08 }}
            className="glass-card p-5 flex flex-col"
            style={{ borderColor: `${item.color}18` }}
          >
            <div className="text-2xl mb-2">{item.icon}</div>
            <div className="t-h3 text-gray-800 mb-2">{item.title}</div>
            <div className="t-body leading-relaxed mb-3 flex-1">{item.desc}</div>
            <div className="flex gap-1.5 flex-wrap">
              {item.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 rounded-full text-[13px] font-medium" style={{ background: `${item.color}10`, color: item.color }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
