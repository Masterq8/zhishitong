import { motion } from 'framer-motion'
import GlassCard from '../components/GlassCard'
import ScreenshotPlaceholder from '../components/ScreenshotPlaceholder'

const quadrants = [
  { title: '🔒 安全', accent: 'blue' as const,   bg: 'bg-card-blue',   items: ['JWT + RBAC 鉴权', 'API 限流熔断', '敏感数据脱敏', '操作日志审计', 'HTTPS/TLS 加密'] },
  { title: '⚡ 稳定', accent: 'green' as const,  bg: 'bg-card-green',  items: ['FastAPI 异步架构', 'Redis 缓存加速', '数据库连接池', '优雅降级策略', '健康检查探针'] },
  { title: '📊 性能', accent: 'purple' as const, bg: 'bg-card-purple', items: ['React 虚拟滚动', 'Mermaid 懒加载', 'LLM 流式响应', '向量检索优化', 'CDN 静态资源'] },
  { title: '🛠️ 运维', accent: 'amber' as const,  bg: 'bg-card-blue',   items: ['Docker 容器化', 'Prometheus 监控', 'Grafana 仪表盘', '日志集中采集', '自动化 CI/CD'] },
]

export default function Slide10Engineering() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-20 py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mb-8"
      >
        <span className="t-label text-primary">Engineering · 工程化</span>
        <span className="ml-3 inline-block px-3 py-1 rounded-full text-[13px] font-semibold bg-[#FFB86C14] text-[#FFB86C]">💡 工程创新</span>
        <h2 className="t-h1 mt-2">
          系统<span className="gradient-text">工程化设计</span>
        </h2>
        <p className="t-h2 mt-2">
          安全、稳定、性能、运维 —— 四维保障体系
        </p>
      </motion.div>

      <div className="flex-1 grid grid-cols-2 gap-5">
        {quadrants.map((q, i) => (
          <GlassCard key={q.title} accent={q.accent} delay={0.15 + i * 0.10}>
            <div className="t-h3 text-gray-800 mb-3">{q.title}</div>
            <div className="flex gap-1.5 flex-wrap">
              {q.items.map((item) => (
                <span key={item} className={`px-3 py-1.5 rounded-full text-xs font-medium border border-gray-100/60 text-gray-600 ${q.bg}`}>
                  {item}
                </span>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.55 }}
        className="mt-5"
      >
        <ScreenshotPlaceholder
          label="监控截图"
          filename="10_monitoring_dashboard.png"
          description="Grafana 仪表盘：API 延迟、吞吐量、错误率"
          className="min-h-[100px]"
          aspectRatio="auto"
        />
      </motion.div>
    </div>
  )
}
