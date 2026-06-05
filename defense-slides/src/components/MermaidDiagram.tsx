import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

// Initialize mermaid once
let initialized = false

interface MermaidDiagramProps {
  chart: string
  className?: string
}

export default function MermaidDiagram({ chart, className = '' }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!initialized) {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        themeVariables: {
          primaryColor: '#EEF6FF',
          primaryBorderColor: '#367BFF',
          primaryTextColor: '#1a1a2e',
          lineColor: '#5B8CFF',
          secondaryColor: '#F4F8FF',
          tertiaryColor: '#F8FBFF',
          fontSize: '18px',
          fontFamily: 'Inter, Noto Sans SC, system-ui, sans-serif',
        },
        flowchart: {
          useMaxWidth: true,
          htmlLabels: true,
          curve: 'basis',
          padding: 20,
        },
        sequence: {
          useMaxWidth: true,
          boxMargin: 10,
        },
      })
      initialized = true
    }
  }, [])

  useEffect(() => {
    if (!ref.current) return
    const id = `mermaid-${Date.now()}-${Math.random().toString(36).slice(2)}`
    mermaid
      .render(id, chart)
      .then(({ svg }) => {
        if (ref.current) {
          ref.current.innerHTML = svg
        }
      })
      .catch((err) => {
        console.error('Mermaid render error:', err)
        if (ref.current) {
          ref.current.innerHTML = `<div style="color:#999;padding:40px;text-align:center;">图表渲染中...</div>`
        }
      })
  }, [chart])

  return <div ref={ref} className={`mermaid-container ${className}`} />
}
