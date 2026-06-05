import { motion } from 'framer-motion'
import ScreenshotPlaceholder from '../components/ScreenshotPlaceholder'

const demoSteps = [
  { step: '01', title: '工作台', desc: '系统首页，待办事项一览', color: '#367BFF' },
  { step: '02', title: '智能预填', desc: 'NL 输入 → 表单自动填充', color: '#5877FF' },
  { step: '03', title: '合规分析', desc: 'RAG 检索 + 风险评分', color: '#7B5CFF' },
  { step: '04', title: '审批决策', desc: 'Human-in-the-Loop 决策', color: '#FFB86C' },
  { step: '05', title: '通知归档', desc: '结果推送 + 自动归档', color: '#39C589' },
]

export default function Slide11Demo() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-20 py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mb-8"
      >
        <span className="t-label text-primary">Demo · 演示路线</span>
        <h2 className="t-h1 mt-2">
          系统<span className="gradient-text">演示路线</span>
        </h2>
        <p className="t-h2 mt-2">
          五个关键步骤展示智审通核心能力
        </p>
      </motion.div>

      <div className="flex-1 flex flex-col">
        {/* Timeline bar */}
        <div className="relative mb-6">
          <div className="absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-primary/10" />
          <div className="flex justify-between relative" style={{ paddingLeft: '10%', paddingRight: '10%' }}>
            {demoSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.20 + i * 0.10 }}
                className="flex flex-col items-center"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm z-10"
                  style={{ background: step.color }}
                >
                  {step.step}
                </div>
                <div className="mt-2 t-h3 text-gray-700">{step.title}</div>
                <div className="t-body mt-0.5">{step.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Screenshot placeholders — 16px gap */}
        <div className="grid grid-cols-5 gap-4 flex-1">
          {demoSteps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.40 + i * 0.08 }}
            >
              <ScreenshotPlaceholder
                label={`截图 ${step.step}`}
                filename={`11_demo_${step.title.toLowerCase()}.png`}
                description={step.desc}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
