import { motion } from 'framer-motion'

const problems = [
  {
    role: '🎓 学生',
    title: '填表繁琐，流程不透明',
    items: [
      '反复跑部门提交纸质材料',
      '审批进度黑盒，无法追踪',
      '同一信息多次重复填写',
      '材料不合规被打回重来',
    ],
    bg: 'bg-card-blue',
    border: 'rgba(54,123,255,0.12)',
  },
  {
    role: '✅ 审批人',
    title: '信息过载，决策疲劳',
    items: [
      '大量重复性审批占用时间',
      '缺少辅助信息与风险提示',
      '跨部门沟通成本高',
      '历史案例难以快速检索',
    ],
    bg: 'bg-card-purple',
    border: 'rgba(123,92,255,0.12)',
  },
  {
    role: '🏫 学校',
    title: '效率低下，监管困难',
    items: [
      '审批周期长影响教学进度',
      '缺乏统一的数据分析平台',
      '合规风险难以实时监控',
      '各部门系统数据孤岛',
    ],
    bg: 'bg-card-green',
    border: 'rgba(57,197,137,0.12)',
  },
]

export default function Slide02Problem() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-20 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <span className="t-label text-primary">Problem · 问题分析</span>
        <h2 className="t-h1 mt-2" style={{ lineHeight: 1.2 }}>
          高校审批面临<span className="gradient-text">三大挑战</span>？
        </h2>
        <p className="t-h2 mt-2">
          传统审批流程在高校场景中暴露出的核心痛点
        </p>
      </motion.div>

      {/* Three cards — uniform width, 24px gap, light backgrounds */}
      <div className="grid grid-cols-3 gap-6 flex-1">
        {problems.map((p, i) => (
          <motion.div
            key={p.role}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.20 + i * 0.12 }}
            className={`${p.bg} rounded-glass p-6 flex flex-col`}
            style={{ border: `1px solid ${p.border}`, borderRadius: 24 }}
          >
            <div className="t-h3 text-gray-800 mb-1">{p.role}</div>
            <div className="t-h3 text-gray-700 mb-5">{p.title}</div>
            <ul className="space-y-3 flex-1">
              {p.items.map((item, j) => (
                <li
                  key={j}
                  className="flex items-start gap-3 t-body"
                >
                  <span className="icon-x-mark flex-shrink-0 mt-0.5">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
