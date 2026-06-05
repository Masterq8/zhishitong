import { motion } from 'framer-motion'
import MermaidDiagram from '../components/MermaidDiagram'

const mermaidChart = `flowchart LR
    subgraph KB["📚 政策知识库"]
        A1["校规校纪"] -.- A2["财务制度"]
        A2 -.- A3["学籍管理"]
        A3 -.- A4["科研规定"]
        A1 -.- A5["历史案例"]
    end

    KB -->|"1. Embedding"| V[("🔢 向量数据库<br/>ChromaDB")]

    Q["💬 用户查询"] -->|"2. Query Embedding"| V
    V -->|"3. 相似度检索<br/>Top-K 文档"| R["📋 候选文档集"]
    R -->|"4. Reranker<br/>重排序"| RR["📋 精排结果<br/>Top-N"]
    RR -->|"5. 上下文拼接"| C["🧠 LLM 分析<br/>Qwen"]
    C -->|"6. 合规分析"| O["📄 依据展示<br/>+ 引用来源"]

    style KB fill:#F0F6FF,stroke:#367BFF,stroke-width:2px,color:#333
    style V fill:#F4F8FF,stroke:#7B5CFF,stroke-width:2px,color:#333
    style Q fill:#F0F6FF,stroke:#5877FF,stroke-width:2px,color:#333
    style R fill:#F4F8FF,stroke:#FFB86C,stroke-width:2px,color:#333
    style RR fill:#F0F6FF,stroke:#FFB86C,stroke-width:2px,color:#333
    style C fill:#F4F8FF,stroke:#367BFF,stroke-width:2px,color:#333
    style O fill:#F0F6FF,stroke:#39C589,stroke-width:3px,color:#333`

export default function Slide08RAG() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-20 py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mb-6"
      >
        <span className="t-label text-primary">RAG · 知识增强</span>
        <h2 className="t-h1 mt-2">
          政策<span className="gradient-text">知识库</span>设计
        </h2>
        <p className="t-h2 mt-2">
          Embedding + 向量检索 + Reranker 重排序，确保每条建议都有据可查
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
