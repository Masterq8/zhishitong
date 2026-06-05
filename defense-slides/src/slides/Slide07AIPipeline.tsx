import { motion } from 'framer-motion'
import MermaidDiagram from '../components/MermaidDiagram'

const mermaidChart = `flowchart LR
    A["📄 文档上传"] --> B["🔍 OCR 识别"]
    B --> C["🧠 LLM 字段抽取"]
    C --> D["📋 表单预填"]
    D --> E["📚 RAG 政策检索"]
    E --> F["⚙️ 规则引擎校验"]

    J["👤 人工决策"] --> I["💡 审批建议生成"]
    I --> H["⚠️ 风险多维评分"]
    H --> G["🤖 Qwen 深度分析"]
    G --> F

    B -.->|异步| K[("📦 文档库")]
    E -.-> L[("📚 知识库")]
    G -.-> L
    H -.-> M[("📊 风险日志")]

    style A fill:#EEF6FF,stroke:#367BFF,stroke-width:2px,color:#333
    style B fill:#EEF6FF,stroke:#5877FF,stroke-width:2px,color:#333
    style C fill:#EEF6FF,stroke:#5877FF,stroke-width:2px,color:#333
    style D fill:#F4F8FF,stroke:#7B5CFF,stroke-width:2px,color:#333
    style E fill:#F4F8FF,stroke:#367BFF,stroke-width:2px,color:#333
    style F fill:#EEF6FF,stroke:#FFB86C,stroke-width:2px,color:#333
    style G fill:#EEF6FF,stroke:#367BFF,stroke-width:2px,color:#333
    style H fill:#F4F8FF,stroke:#FFB86C,stroke-width:2px,color:#333
    style I fill:#EEF6FF,stroke:#5877FF,stroke-width:2px,color:#333
    style J fill:#F4F8FF,stroke:#39C589,stroke-width:3px,color:#333,font-weight:bold`

export default function Slide07AIPipeline() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-20 py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mb-6"
      >
        <span className="t-label text-primary">AI Pipeline · 智能流水线</span>
        <h2 className="t-h1 mt-2">
          <span className="gradient-text">AI 工作流</span>全景
        </h2>
        <p className="t-h2 mt-2">
          OCR → LLM → 规则引擎 → RAG → Qwen → 风险分析 → 审批建议
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.20 }}
        className="flex-1 flex items-center justify-center"
      >
        <MermaidDiagram chart={mermaidChart} className="w-full h-full flex items-center justify-center" />
      </motion.div>
    </div>
  )
}
