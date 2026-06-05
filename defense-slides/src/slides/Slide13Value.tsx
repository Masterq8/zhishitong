import { motion } from 'framer-motion'

const stakeholders = [
  { name: '🏫 高校管理层', color: '#367BFF', values: [
    { metric: '审批效率', change: '↑ 60%', desc: '平均审批周期缩短' },
    { metric: '合规覆盖', change: '↑ 90%', desc: '政策自动匹配率' },
    { metric: '数据可视', change: '实时', desc: '全维度数据看板' },
  ]},
  { name: '🏛️ 学院/部门', color: '#7B5CFF', values: [
    { metric: '人工工作量', change: '↓ 40%', desc: '重复审核任务减少' },
    { metric: '审批准确率', change: '↑ 35%', desc: 'AI 辅助降低误判' },
    { metric: '跨部门协同', change: '无缝', desc: '泳道流程自动化' },
  ]},
  { name: '🔬 实验室/课题组', color: '#39C589', values: [
    { metric: '申请耗时', change: '↓ 50%', desc: '从提交到审批完成' },
    { metric: '退回率', change: '↓ 70%', desc: 'AI 预检减少不合规' },
    { metric: '进度透明', change: '100%', desc: '全流程状态追踪' },
  ]},
  { name: '📋 行政单位', color: '#FFB86C', values: [
    { metric: '审批吞吐', change: '↑ 3×', desc: '单位时间处理量提升' },
    { metric: '归档完整', change: '100%', desc: '自动归档无遗漏' },
    { metric: '审计追溯', change: '即时', desc: '完整决策链路回溯' },
  ]},
]

export default function Slide13Value() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-20 py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mb-8"
      >
        <span className="t-label text-primary">Value · 应用价值</span>
        <h2 className="t-h1 mt-2">
          多角色<span className="gradient-text">价值矩阵</span>
        </h2>
        <p className="t-h2 mt-2">
          每个利益相关方都能从智审通中获得可量化的价值提升
        </p>
      </motion.div>

      <div className="flex-1 grid grid-cols-2 gap-4">
        {stakeholders.map((stakeholder, i) => (
          <motion.div
            key={stakeholder.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.15 + i * 0.08 }}
            className="glass-card p-6"
            style={{ borderColor: `${stakeholder.color}18` }}
          >
            <div className="t-h3 mb-4" style={{ color: stakeholder.color }}>{stakeholder.name}</div>
            <div className="space-y-4">
              {stakeholder.values.map((v, j) => (
                <div key={v.metric} className="flex items-center justify-between">
                  <div>
                    <div className="t-h3 text-gray-700">{v.metric}</div>
                    <div className="t-body mt-0.5">{v.desc}</div>
                  </div>
                  <div
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: `${stakeholder.color}10`, color: stakeholder.color }}
                  >
                    {v.change}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
