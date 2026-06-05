interface ScreenshotPlaceholderProps {
  label: string
  filename: string
  description: string
  className?: string
  aspectRatio?: string
}

export default function ScreenshotPlaceholder({
  label,
  filename,
  description,
  className = '',
  aspectRatio = '16/9',
}: ScreenshotPlaceholderProps) {
  return (
    <div
      className={`screenshot-placeholder ${className}`}
      style={{ aspectRatio }}
    >
      <div className="icon">🖼️</div>
      <div style={{ fontWeight: 600, fontSize: 18 }}>[{label}]</div>
      {filename && (
        <div style={{ fontSize: 14, opacity: 0.50 }}>{filename}</div>
      )}
      <div style={{ fontSize: 14, opacity: 0.45, maxWidth: '80%', textAlign: 'center' }}>
        {description}
      </div>
    </div>
  )
}
