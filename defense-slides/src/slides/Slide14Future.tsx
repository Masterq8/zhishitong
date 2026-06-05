import { motion } from 'framer-motion'
import GlassCard from '../components/GlassCard'

const futures = [
  { icon: '🤖', title: 'Agent 智能体',   desc: '从被动分析到主动服务，AI Agent 自主完成审批预处理、异常检测与主动提醒', color: '#367BFF', accent: 'blue' as const,   tags: ['自主决策', '主动服务', '多步推理'] },
  { icon: '🔌', title: 'MCP 协议集成', desc: 'Model Context Protocol 标准化 AI-工具交互，审批系统接入更多外部能力（日历、邮件、财务系统）', color: '#5877FF', accent: 'blue' as const,   tags: ['标准化协议', '生态扩展', '即插即用'] },
  { icon: '🧠', title: '知识图谱',     desc: '构建高校审批知识图谱，实现跨领域推理与关联分析，从单条审批到全局视角', color: '#7B5CFF', accent: 'purple' as const, tags: ['图数据库', '关系推理', '知识可视化'] },
  { icon: '🏫', title: '多校联盟部署', desc: '支持跨校审批互认与联合部署，降低每校运维成本，形成高校审批标准平台', color: '#39C589', accent: 'green' as const,  tags: ['SaaS 多租户', '跨校互认', '标准平台'] },
]

export default function Slide14Future() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-20 py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mb-8"
      >
        <span className="t-label text-primary">Future · 未来工作</span>
        <h2 className="t-h1 mt-2">
          下一步<span className="gradient-text">演进方向</span>
        </h2>
        <p className="t-h2 mt-2">
          从辅助工具到智能平台，持续演进
        </p>
      </motion.div>

      <div className="flex-1 grid grid-cols-2 gap-5">
        {futures.map((item, i) => (
          <GlassCard key={item.title} accent={item.accent} delay={0.15 + i * 0.10}>
            <div className="flex items-start gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: `${item.color}12` }}
              >
                {item.icon}
              </div>
              <div className="flex-1">
                <div className="t-h3 text-gray-800 mb-1">{item.title}</div>
                <div className="t-body leading-relaxed mb-3">{item.desc}</div>
                <div className="flex gap-1.5 flex-wrap">
                  {item.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-full text-[13px] font-medium" style={{ background: `${item.color}10`, color: item.color }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
