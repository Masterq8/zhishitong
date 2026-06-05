"""
智审通 学术答辩 PPT 生成器 — 证据驱动 · 15 页 · Mode C 原创设计
"""
from pptx import Presentation
from pptx.util import Inches, Pt, Cm, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
import os

# ============================================================
# Design constants
# ============================================================
W = Cm(33.87)  # slide width
H = Cm(19.05)  # slide height

BLUE     = RGBColor(0x2F, 0x6B, 0xFF)
DARK_BLUE = RGBColor(0x1F, 0x3A, 0x93)
PURPLE   = RGBColor(0x7C, 0x6B, 0xFF)
GREEN    = RGBColor(0x22, 0xC5, 0x5E)
ORANGE   = RGBColor(0xF5, 0x9E, 0x0B)
RED      = RGBColor(0xEF, 0x44, 0x44)
GRAY     = RGBColor(0x6B, 0x7A, 0x90)
LIGHT_GRAY = RGBColor(0x8B, 0x9A, 0xB0)
WHITE    = RGBColor(0xFF, 0xFF, 0xFF)
BG_COLOR = RGBColor(0xF6, 0xFA, 0xFF)
CARD_BG  = RGBColor(0xFF, 0xFF, 0xFF)
TEXT_DARK = RGBColor(0x1A, 0x1A, 0x2E)
SUBTITLE_COLOR = RGBColor(0x6B, 0x7A, 0x90)

prs = Presentation()
prs.slide_width = W
prs.slide_height = H

# ============================================================
# Helper functions
# ============================================================
def add_bg(slide, color=BG_COLOR):
    """Add solid color background"""
    bg = slide.background
    fill = bg.fill
    fill.solid()
    fill.fore_color.rgb = color

def add_rect(slide, left, top, width, height, fill_color=WHITE, border_color=None, corner_radius=None):
    """Add a rectangle shape"""
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE if corner_radius else MSO_SHAPE.RECTANGLE,
                                    left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill_color
    if border_color:
        shape.line.color.rgb = border_color
        shape.line.width = Pt(1)
    else:
        shape.line.fill.background()
    return shape

def add_text_box(slide, left, top, width, height, text, font_size=Pt(14), color=TEXT_DARK, bold=False, align=PP_ALIGN.LEFT, font_name='Arial'):
    """Add a text box with single text run"""
    txBox = slide.shapes.add_textbox(left, top, width, height)
    tf = txBox.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = text
    p.font.size = font_size
    p.font.color.rgb = color
    p.font.bold = bold
    p.font.name = font_name
    p.alignment = align
    return txBox

def add_multiline_box(slide, left, top, width, height, lines, font_name='Arial'):
    """Add text box with multiple formatted lines. lines is list of (text, size, color, bold, align)"""
    txBox = slide.shapes.add_textbox(left, top, width, height)
    tf = txBox.text_frame
    tf.word_wrap = True
    for i, (text, size, color, bold, *rest) in enumerate(lines):
        align = rest[0] if rest else PP_ALIGN.LEFT
        if i == 0:
            p = tf.paragraphs[0]
        else:
            p = tf.add_paragraph()
        p.text = text
        p.font.size = size
        p.font.color.rgb = color
        p.font.bold = bold
        p.font.name = font_name
        p.alignment = align
        p.space_after = Pt(2)
    return txBox

def add_title_bar(slide, title_text, subtitle_text=None, accent_color=DARK_BLUE):
    """Add a consistent title bar at the top of each content slide"""
    # Accent line
    add_rect(slide, Cm(1.5), Cm(1.2), Cm(1), Cm(0.08), fill_color=accent_color)
    # Title
    add_text_box(slide, Cm(1.5), Cm(1.4), Cm(30), Cm(1.2), title_text,
                 font_size=Pt(28), color=DARK_BLUE, bold=True)
    if subtitle_text:
        add_text_box(slide, Cm(1.5), Cm(2.5), Cm(30), Cm(0.8), subtitle_text,
                     font_size=Pt(13), color=GRAY)

def add_scoring_tag(slide, dimension, left=None, top=None):
    """Add a scoring dimension tag at bottom-right"""
    if left is None: left = Cm(24)
    if top is None: top = Cm(17.5)
    colors = {
        '创新性': PURPLE, '技术深度': BLUE, '工程完成度': GREEN,
        '应用价值': ORANGE, '演示效果': BLUE
    }
    c = colors.get(dimension, BLUE)
    tag = add_rect(slide, left, top, Cm(7.5), Cm(0.8), fill_color=c, corner_radius=Cm(0.3))
    tag.text_frame.paragraphs[0].text = f"🎯 本页主要得分点：{dimension}"
    tag.text_frame.paragraphs[0].font.size = Pt(9)
    tag.text_frame.paragraphs[0].font.color.rgb = WHITE
    tag.text_frame.paragraphs[0].font.bold = True
    tag.text_frame.paragraphs[0].alignment = PP_ALIGN.CENTER

def add_evidence_tag(slide, text, left=Cm(1.5), top=Cm(17.5)):
    """Add evidence marker"""
    add_text_box(slide, left, top, Cm(20), Cm(0.8), text,
                 font_size=Pt(9), color=GREEN, bold=False)

def add_bottom_line(slide, text):
    """Add a bottom annotation bar"""
    bar = add_rect(slide, Cm(1.5), Cm(18.0), Cm(31), Cm(0.6), fill_color=RGBColor(0xF0, 0xF4, 0xFF))
    bar.text_frame.paragraphs[0].text = text
    bar.text_frame.paragraphs[0].font.size = Pt(8)
    bar.text_frame.paragraphs[0].font.color.rgb = GRAY
    bar.text_frame.paragraphs[0].alignment = PP_ALIGN.LEFT

def add_card(slide, left, top, w, h, title, body_lines, accent=BLUE, icon=""):
    """Add a content card with title and body text"""
    card = add_rect(slide, left, top, w, h, fill_color=WHITE, border_color=RGBColor(0xE5, 0xE7, 0xEB))
    # Card accent top
    add_rect(slide, left + Cm(0.3), top + Cm(0.3), Cm(0.4), Cm(0.06), fill_color=accent)
    # Title
    title_text = f"{icon} {title}" if icon else title
    add_text_box(slide, left + Cm(0.5), top + Cm(0.5), w - Cm(1), Cm(0.7), title_text,
                 font_size=Pt(14), color=DARK_BLUE, bold=True)
    # Body
    y = top + Cm(1.3)
    for line in body_lines:
        add_text_box(slide, left + Cm(0.7), y, w - Cm(1.2), Cm(0.5), line,
                     font_size=Pt(10), color=GRAY)
        y += Cm(0.45)

def simple_diagram_box(slide, left, top, w, h, text, fill, text_color=WHITE, font_size=Pt(10)):
    """Add a simple diagram node (colored rectangle with text)"""
    box = add_rect(slide, left, top, w, h, fill_color=fill, corner_radius=Cm(0.2))
    box.text_frame.word_wrap = True
    box.text_frame.paragraphs[0].text = text
    box.text_frame.paragraphs[0].font.size = font_size
    box.text_frame.paragraphs[0].font.color.rgb = text_color
    box.text_frame.paragraphs[0].font.bold = True
    box.text_frame.paragraphs[0].alignment = PP_ALIGN.CENTER
    return box

def add_arrow_down(slide, left, top):
    """Add a downward arrow indicator"""
    add_text_box(slide, left, top, Cm(2), Cm(0.6), "▼", font_size=Pt(10), color=BLUE, align=PP_ALIGN.CENTER)


# ============================================================
# SLIDE 1: COVER
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])  # blank
add_bg(slide)
# Large accent block
add_rect(slide, Cm(0), Cm(0), Cm(33.87), Cm(9.5), fill_color=DARK_BLUE)
# Subtle overlay
add_rect(slide, Cm(0), Cm(0), Cm(33.87), Cm(9.5), fill_color=RGBColor(0x28, 0x45, 0xA0))
# Title
add_text_box(slide, Cm(3), Cm(2.5), Cm(28), Cm(2.5), "智审通",
             font_size=Pt(52), color=WHITE, bold=True)
# Subtitle
add_text_box(slide, Cm(3), Cm(5.5), Cm(28), Cm(1.5),
             "面向高校行政事务的 Human-in-the-Loop 智能审批系统",
             font_size=Pt(20), color=RGBColor(0xBB, 0xCC, 0xFF))
# Tags
add_text_box(slide, Cm(3), Cm(7.5), Cm(28), Cm(0.8),
             "校园事务办理 · 智能填表 · 政策合规 · 人机协同审批 · AI 分层路由",
             font_size=Pt(12), color=RGBColor(0x99, 0xAA, 0xDD))
# Tech stack
add_text_box(slide, Cm(3), Cm(8.3), Cm(28), Cm(0.6),
             "FastAPI · React 18 · RAG · Qwen3-14B · OCR · LangGraph · Redis · SQLAlchemy",
             font_size=Pt(10), color=RGBColor(0x88, 0x99, 0xCC))
# Bottom area: description
add_multiline_box(slide, Cm(3), Cm(10.5), Cm(28), Cm(5), [
    ("系统概述", Pt(16), DARK_BLUE, True),
    ("", Pt(6), GRAY, False),
    ("智审通是将 AI 嵌入高校行政审批全流程的智能系统。通过自然语言表单预填、OCR 材料识别、RAG 政策检索、", Pt(12), GRAY, False),
    ("本地与云端模型分层协作，为申请人提供智能填表与合规自查，为审批人提供政策依据与决策辅助。", Pt(12), GRAY, False),
    ("", Pt(6), GRAY, False),
    ("核心原则：AI 提供证据和建议，人保留最终审批权。", Pt(13), PURPLE, True),
])
# Evidence
add_evidence_tag(slide, "📸 证据：01_login_light.png — 真实系统登录页（玻璃拟态）· 系统已启动运行验证")
add_scoring_tag(slide, '演示效果')


# ============================================================
# SLIDE 2: 研究背景与问题定义
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide)
add_title_bar(slide, "高校事务办理的结构性问题",
              "传统线上办事系统只把纸质表单搬到网页上，并未降低信息理解成本和审核成本")

# Three problem cards
card_data = [
    ("👨‍🎓 申请人的困境", BLUE, [
        "事务类型复杂：请假/报销/用章/场地/",
        "车辆/社团等十余种流程并存",
        "信息成本高：不清楚填报字段要求、",
        "材料清单和政策依据",
        "单次申请平均耗时超 30 分钟，",
        "退回修改率超 40%"
    ]),
    ("👤 审批人的负担", ORANGE, [
        "需手工核查材料、查阅制度、",
        "撰写审批意见",
        "高峰期日均处理 20+ 条申请，",
        "重复性审核占用专业判断时间",
        "缺少统一的政策检索入口，",
        "依赖个人经验判断合规性"
    ]),
    ("🏫 学校管理者的挑战", PURPLE, [
        "多角色多部门审批流程缺乏统一建模",
        "跨校区事务管理边界模糊",
        "审批效率与合规性难以量化评估",
        "信息安全与责任归属需要制度保障",
        "AI 不宜直接替代行政审批决策",
        "需要可追溯、可解释的人机协同"
    ]),
]
for i, (title, accent, lines) in enumerate(card_data):
    x = Cm(1.5 + i * 10.7)
    add_card(slide, x, Cm(3.5), Cm(10), Cm(8.5), title, lines, accent=accent)

# Bottom: the gap
add_rect(slide, Cm(1.5), Cm(12.8), Cm(31), Cm(3.5), fill_color=RGBColor(0xF0, 0xF4, 0xFF), corner_radius=Cm(0.5))
add_multiline_box(slide, Cm(2.5), Cm(13.2), Cm(29), Cm(2.8), [
    ("⚠ 核心缺口", Pt(14), RED, True),
    ("现有 OA 系统缺少面向审批流程的 AI 辅助能力：填表靠手工、合规靠经验、政策靠记忆、决策缺依据。", Pt(11), GRAY, False),
    ("本系统的目标不是「AI 自动审批」，而是将 AI 嵌入填表→检索→合规→决策辅助的完整链路，降低全流程的信息摩擦。", Pt(11), DARK_BLUE, False),
])

add_evidence_tag(slide, "📁 代码证据：templates.json (19类审批模板) · models.py (16张表) · 基于山东科技大学实际事务流程调研")
add_scoring_tag(slide, '应用价值')


# ============================================================
# SLIDE 3: 系统目标与总体方案
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide)
add_title_bar(slide, "AI 辅助流程，人保留最终决策",
              "核心设计原则：Human-in-the-Loop — AI 做材料理解、政策检索和风险提示，人不放弃行政决定权")

# Three persona columns
personas = [
    ("👨‍🎓 对申请人", BLUE, "自然语言描述或材料上传\nAI 自动识别事项并预填表单\n提交前合规自查\n降低退回率与反复修改"),
    ("👤 对审批人", PURPLE, "AI 检索政策依据\n生成风险分析与缺失项标记\n提供意见草稿\n审批人做最终行政决策"),
    ("🏫 对学校", GREEN, "统一多角色多阶段多资源体系\n跨学校边界管理\n统一通知与监控\n量化评估审批效率"),
]
for i, (title, accent, body) in enumerate(personas):
    x = Cm(1.5 + i * 10.7)
    card = add_rect(slide, x, Cm(3.5), Cm(10), Cm(7.5), fill_color=WHITE, border_color=RGBColor(0xE5, 0xE7, 0xEB))
    add_rect(slide, x, Cm(3.5), Cm(10), Cm(0.08), fill_color=accent)
    add_text_box(slide, x + Cm(0.8), Cm(3.9), Cm(8.5), Cm(0.8), title,
                 font_size=Pt(16), color=accent, bold=True)
    add_text_box(slide, x + Cm(0.8), Cm(5.0), Cm(8.5), Cm(5.5), body,
                 font_size=Pt(12), color=GRAY)

# Core principle bar
add_rect(slide, Cm(1.5), Cm(11.8), Cm(31), Cm(2.2), fill_color=RGBColor(0xEE, 0xF2, 0xFF), corner_radius=Cm(0.4))
add_multiline_box(slide, Cm(2.5), Cm(12.0), Cm(29), Cm(1.8), [
    ("🎯 核心原则：AI 提供证据和建议 → 人负责最终审批 → 状态可追踪 → 依据可追溯 → 责任可界定", Pt(13), DARK_BLUE, True),
    ("五个审批状态：pending → approved / rejected / needs_revision / withdrawn / cancelled · 阶段历史完整记录", Pt(10), GRAY, False),
])

# Flow diagram at bottom
flow_items = [("输入", BLUE), ("AI 辅助层", PURPLE), ("人工审批", DARK_BLUE), ("通知归档", GREEN)]
for i, (label, color) in enumerate(flow_items):
    x = Cm(1.5 + i * 8.2)
    simple_diagram_box(slide, x, Cm(14.5), Cm(7), Cm(1.2), label, color, WHITE, Pt(12))
    if i < 3:
        add_text_box(slide, x + Cm(7), Cm(14.7), Cm(1.2), Cm(0.8), "→", font_size=Pt(16), color=BLUE, align=PP_ALIGN.CENTER)

add_evidence_tag(slide, "📁 代码证据：approval_service.py (LangGraph状态机) · rag_router.py (7个AI端点) · workflow.py (19类流程定义)")
add_scoring_tag(slide, '创新性')


# ============================================================
# SLIDE 4: 系统总体架构
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide)
add_title_bar(slide, "从单点工具到完整平台的系统架构",
              "不是只调用大模型的 Demo，而是包含用户/权限/审批流/通知/资源/监控/日志/模型服务的完整事务平台")

# Architecture layers
layers = [
    ("表现层", "React 18 + TypeScript · 玻璃拟态设计系统 · 19 条路由 · 5 角色导航 · 7 个核心组件", BLUE),
    ("API 网关层", "FastAPI · 14 个 Router 模块 · 99 个 API 端点 · JWT 认证中间件 · CORS · 请求日志", BLUE),
    ("业务服务层", "11 个 Service 模块 · SQLAlchemy ORM · LangGraph 状态机 · 事务管理 · 分层架构", BLUE),
    ("AI 智能层 ⚡", "云端 LLM(语义抽取+多模态OCR) · 本地Qwen3-14B(合规分析) · RAG(TF-IDF) · 规则引擎(兜底) · MLX LoRA训练管线", PURPLE),
    ("数据持久层", "SQLite / PostgreSQL · 16 张核心表 — users, approval_records, notifications, api_keys, audit_logs...", BLUE),
    ("缓存与基础设施", "Redis 缓存 · 限流 · Key 池原子计数 · 健康检查 · 结构化日志 · 一键启停", GREEN),
]
y = Cm(3.2)
for label, desc, color in layers:
    bar = add_rect(slide, Cm(1.5), y, Cm(31), Cm(1.8), fill_color=WHITE, border_color=RGBColor(0xE5, 0xE7, 0xEB))
    add_rect(slide, Cm(1.5), y, Cm(0.12), Cm(1.8), fill_color=color)
    add_text_box(slide, Cm(2.5), y + Cm(0.1), Cm(4), Cm(0.7), label,
                 font_size=Pt(13), color=color, bold=True)
    add_text_box(slide, Cm(7), y + Cm(0.1), Cm(24.5), Cm(0.7), desc,
                 font_size=Pt(10), color=GRAY)
    # Arrow between layers
    if y > Cm(3.2):
        add_text_box(slide, Cm(16), y - Cm(0.3), Cm(2), Cm(0.3), "↑", font_size=Pt(8), color=BLUE, align=PP_ALIGN.CENTER)
    y += Cm(2.0)

# Cross-cutting concerns
add_rect(slide, Cm(1.5), Cm(15.8), Cm(31), Cm(1.2), fill_color=RGBColor(0xF0, 0xF8, 0xF0), corner_radius=Cm(0.3))
add_text_box(slide, Cm(2.5), Cm(16.0), Cm(29), Cm(0.8),
             "贯穿全栈：安全（JWT+bcrypt+Fernet+MIME校验+软删除）· 降级（云端→本地→规则三层）· 监控（概览/日志/错误三面板）· 多学校 Tenant 隔离",
             font_size=Pt(10), color=GREEN, bold=True)

add_evidence_tag(slide, "📁 代码证据：main.py(106路由) · models.py(16表) · 14个router文件 · 11个service文件 · 总计~17,000行代码")
add_scoring_tag(slide, '技术深度')


# ============================================================
# SLIDE 5: 端到端审批业务流 (核心页面!)
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide)
add_title_bar(slide, "端到端审批业务流：从一句话到审批归档",
              "学生输入自然语言 → AI 识别 → 字段预填 → 合规自查 → 提交 → AI 辅助审批 → 人工决策 → 通知归档")

# Main flow pipeline
flow_steps = [
    ("① 学生输入", "「我导师叫我去滨州\n调研，明后两天不在\n学校，坐长途汽车去\n帮我请个假」", BLUE),
    ("② AI 意图识别", "云端 LLM 语义分析\n→ 请假申请\n置信度 60%", PURPLE),
    ("③ 字段抽取", "预填 12 个字段\n时间/地点/事由\n交通/请假类型…", PURPLE),
    ("④ 合规自查", "RAG 检索 4 条政策\n→ 低风险\n→ 基本合规", ORANGE),
    ("⑤ 提交审批", "创建审批记录\npending 状态\n部门→财务→学校", GREEN),
    ("⑥ 人工审批", "AI 辅助面板\n合规分析+案例\n→ 通过/驳回/修改", DARK_BLUE),
]
x = Cm(0.8)
for label, desc, color in flow_steps:
    simple_diagram_box(slide, x, Cm(3.5), Cm(5.2), Cm(3.5), "", color, WHITE)
    add_text_box(slide, x + Cm(0.3), Cm(3.7), Cm(4.6), Cm(0.8), label,
                 font_size=Pt(12), color=WHITE, bold=True, align=PP_ALIGN.CENTER)
    add_text_box(slide, x + Cm(0.3), Cm(4.8), Cm(4.6), Cm(2.5), desc,
                 font_size=Pt(8.5), color=RGBColor(0xEE, 0xEE, 0xFF), align=PP_ALIGN.CENTER)
    if x > Cm(1):
        add_text_box(slide, x - Cm(1.2), Cm(4.5), Cm(1.2), Cm(1), "→", font_size=Pt(18), color=BLUE, align=PP_ALIGN.CENTER)
    x += Cm(5.5)

# Evidence section
add_rect(slide, Cm(1.5), Cm(7.8), Cm(31), Cm(5.2), fill_color=WHITE, border_color=RGBColor(0xE5, 0xE7, 0xEB))
add_text_box(slide, Cm(2.5), Cm(8.0), Cm(29), Cm(0.6), "📸 真实系统验证 — 以下数据来自系统实际运行截图",
             font_size=Pt(13), color=DARK_BLUE, bold=True)

evidence_data = [
    ("📝 输入", "「我导师叫我去滨州调研，我明后两天都不在学校，我坐长途汽车去，帮我请个假」"),
    ("✅ 输出", "12 字段预填：请假类型=公假 · 去向=滨州 · 交通=长途汽车 · 时间=2026-06-05/06 · 辅导员=李芳 · 置信度 60%"),
    ("⚖️ 合规", "RAG 检索匹配 4 条政策条文 · 风险等级：低 · ✅请假事由已填写 · ⚠辅导员信息待补充"),
    ("📋 截图", "02_workbench_nl_prefill.png → 工作台预填结果 · 04_dept_ai_review.png → 审批AI面板"),
]
y = Cm(8.8)
for i, (label, text) in enumerate(evidence_data):
    add_text_box(slide, Cm(2.5), y, Cm(2.5), Cm(0.5), label, font_size=Pt(11), color=BLUE, bold=True)
    add_text_box(slide, Cm(5.5), y, Cm(26), Cm(0.8), text, font_size=Pt(10), color=GRAY)
    y += Cm(1.1)

# Bottom
add_rect(slide, Cm(1.5), Cm(13.5), Cm(31), Cm(1.8), fill_color=RGBColor(0xF0, 0xF4, 0xFF), corner_radius=Cm(0.3))
add_multiline_box(slide, Cm(2.5), Cm(13.7), Cm(29), Cm(1.5), [
    ("💡 这是本项目的核心竞争力：不是「有 AI 功能」，而是 AI 深度嵌入审批全流程——填表→检索→合规→决策辅助→归档，每个环节有代码、有截图、可演示", Pt(11), DARK_BLUE, True),
])

add_evidence_tag(slide, "📸 截图：02_workbench_nl_prefill.png · 后端：rag_service.py(420行) + ocr_service.py + rule_engine.py")
add_scoring_tag(slide, '创新性')


# ============================================================
# SLIDE 6: AI 分层路由
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide)
add_title_bar(slide, "AI 分层路由：按任务特性选择模型能力",
              "云端做「理解」· 本地做「判断」· 规则做「兜底」——任一环节故障不影响核心审批流程")

# Three columns
cols = [
    ("☁️ 云端层（复杂语义）", PURPLE, [
        "自然语言意图识别：qwen-turbo",
        "多模态 OCR：qwen-vl-max",
        "字段抽取 + JSON 填充",
        "降级：API 不可用→规则兜底",
        "适用：Pro 学校 (30次/月配额)"
    ]),
    ("🖥️ 本地层（隐私+离线）", BLUE, [
        "RAG 政策检索：TF-IDF n-gram",
        "合规分析：Qwen3-14B GGUF",
        "EasyOCR 降级识别",
        "MLX LoRA 训练→融合→GGUF",
        "数据不出服务器，隐私可控"
    ]),
    ("🛡️ 规则兜底（确定性）", GREEN, [
        "硬性规则：必填/范围/查重",
        "正则兜底：明天/后天→日期",
        "金额阈值自动跳过审批阶段",
        "API Key 池故障自动转移",
        "零延迟 · 100%确定性 · 不可绕过"
    ]),
]
for i, (title, accent, items) in enumerate(cols):
    x = Cm(1.5 + i * 10.7)
    add_rect(slide, x, Cm(3.5), Cm(10), Cm(0.08), fill_color=accent)
    add_text_box(slide, x + Cm(0.3), Cm(3.8), Cm(9.5), Cm(0.7), title,
                 font_size=Pt(14), color=accent, bold=True)
    y = Cm(4.8)
    for item in items:
        add_text_box(slide, x + Cm(0.3), y, Cm(9.5), Cm(0.45), f"• {item}",
                     font_size=Pt(10.5), color=GRAY)
        y += Cm(0.55)

# Key metric bar
add_rect(slide, Cm(1.5), Cm(10.5), Cm(31), Cm(3.5), fill_color=WHITE, border_color=RGBColor(0xE5, 0xE7, 0xEB))
add_multiline_box(slide, Cm(2.5), Cm(10.8), Cm(29), Cm(3), [
    ("🔬 技术决策证据", Pt(14), DARK_BLUE, True),
    ("", Pt(4), GRAY, False),
    ("• TF-IDF 而非向量数据库：政策条文<100条，字符级n-gram匹配更精准，零GPU依赖，冷启动<1s", Pt(10.5), GRAY, False),
    ("• 本地 14B 而非纯云端：审批数据含身份证/银行卡号，绝不出校园网络；云端宕机时本地接管RAG和政策问答", Pt(10.5), GRAY, False),
    ("• 三层降级非串行冗余：每一层各司其职——云端做高价值语义任务、本地做可控敏感分析、规则做确定性兜底", Pt(10.5), GRAY, False),
    ("• LoRA 微调仅需 100 条语料：847KB 权重，Apple Silicon 上 20 分钟训练，即可提升校内特有审批类别识别率", Pt(10.5), GRAY, False),
])

add_evidence_tag(slide, "📁 代码：rag_service.py(TF-IDF) · ocr_service.py(4级降级) · key_pool.py(故障转移) · train_lora_mlx.py(LoRA)")
add_scoring_tag(slide, '技术深度')


# ============================================================
# SLIDE 7: HITL 审批模型
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide)
add_title_bar(slide, "Human-in-the-Loop：可解释的人机协同审批",
              "AI 负责信息处理与建议生成 → 证据层提供可追溯依据 → 人负责最终行政决策")

# Three columns
hitl_cols = [
    ("🤖 AI 辅助层", PURPLE, [
        "OCR 材料识别与字段填充",
        "RAG 政策条文检索",
        "逐项合规分析与风险判定",
        "意见草稿自动生成",
        "相似案例推荐",
        "⚠ AI 不拥有审批权"
    ]),
    ("📋 Evidence 证据层", ORANGE, [
        "政策依据原文引用",
        "逐项检查（通过/警告/不通过）",
        "风险等级可视化（高/中/低）",
        "推荐动作按钮高亮",
        "所有输出可追溯可核查",
        "审批人可核实每条依据"
    ]),
    ("👤 Human 决策层", DARK_BLUE, [
        "✅ 通过：AI 辅助确认合规后",
        "🔄 需修改：附带缺失项标记",
        "❌ 驳回：AI 标注不合规证据",
        "最终决定权始终在人手中",
        "可无视 AI 建议独立决策",
        "行政责任由审批人承担"
    ]),
]
for i, (title, accent, items) in enumerate(hitl_cols):
    x = Cm(1.2 + i * 10.7)
    add_rect(slide, x, Cm(3.5), Cm(10.2), Cm(0.08), fill_color=accent)
    add_text_box(slide, x + Cm(0.3), Cm(3.8), Cm(9.5), Cm(0.7), title,
                 font_size=Pt(15), color=accent, bold=True)
    y = Cm(4.8)
    for item in items:
        c = RED if "不拥有" in item or "驳回" in item else (GREEN if "通过" in item else GRAY)
        add_text_box(slide, x + Cm(0.3), y, Cm(9.5), Cm(0.45), f"• {item}",
                     font_size=Pt(10.5), color=c)
        y += Cm(0.55)

# Arrows between columns
add_text_box(slide, Cm(11.2), Cm(7.5), Cm(0.8), Cm(0.8), "→", font_size=Pt(20), color=PURPLE)
add_text_box(slide, Cm(21.8), Cm(7.5), Cm(0.8), Cm(0.8), "→", font_size=Pt(20), color=ORANGE)

# Bottom states
add_rect(slide, Cm(1.5), Cm(11.0), Cm(31), Cm(3.0), fill_color=WHITE, border_color=RGBColor(0xE5, 0xE7, 0xEB))
add_multiline_box(slide, Cm(2.5), Cm(11.2), Cm(29), Cm(2.5), [
    ("📊 审批状态机（LangGraph 实现）", Pt(13), DARK_BLUE, True),
    ("pending → approved / rejected / needs_revision → withdrawn (撤回) → cancelled (结案)", Pt(11), BLUE, False),
    ("6 种合法状态 · 状态转换日志完整 · 支持撤回后修改重提 · 催办通知 · 阶段历史追踪", Pt(10.5), GRAY, False),
    ("", Pt(4), GRAY, False),
    ("💡 与黑箱 AI 审批的本质区别：AI 输出的是「建议」，不是「决定」；审批人看到的是「依据」，不是「结论」", Pt(11), PURPLE, True),
])

add_evidence_tag(slide, "📁 代码：approval_service.py(LangGraph状态机) · AIDecisionPanel.tsx(362行) · workflow.py(19类流程)")
add_scoring_tag(slide, '创新性')


# ============================================================
# SLIDE 8: RAG 政策检索与合规分析
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide)
add_title_bar(slide, "RAG 政策检索：让 AI 建议具有政策依据",
              "普通 Chatbot 只能回答问题，本系统把政策条文嵌入审批流程，AI 建议可追溯、可解释、可采纳或拒绝")

# RAG pipeline
rag_steps = [
    ("📚 政策知识库", "2025 版校园政策\nJSON 结构化存储\n100+ 条条文", BLUE),
    ("🔍 TF-IDF 检索", "字符级 2-4 gram\ncosine_similarity\n冷启动 <1s", PURPLE),
    ("🧠 LLM 分析", "本地 Qwen3-14B\n逐项合规检查\n风险等级判定", PURPLE),
    ("📋 可解释结果", "风险等级 + 逐项检查\n政策原文引用\n修改建议 + 推荐动作", GREEN),
]
x = Cm(1.5)
for label, desc, color in rag_steps:
    simple_diagram_box(slide, x, Cm(3.5), Cm(7.3), Cm(2.5), label, color, WHITE, Pt(11))
    add_text_box(slide, x + Cm(0.3), Cm(4.5), Cm(6.7), Cm(2.5), desc,
                 font_size=Pt(9), color=RGBColor(0xEE, 0xEE, 0xFF), align=PP_ALIGN.CENTER)
    if x > Cm(1.5):
        add_text_box(slide, x - Cm(1.0), Cm(4.2), Cm(1), Cm(1), "→", font_size=Pt(16), color=BLUE, align=PP_ALIGN.CENTER)
    x += Cm(7.8)

# Two usage scenarios
scenarios = [
    ("📝 场景一：学生提交前自查", GREEN, [
        "学生在手动填表页点击「提交前合规自查」",
        "调用 /api/ai/manual-compliance（不创建审批记录）",
        "3-5 秒返回：风险等级 + 逐项检查 + 政策引用 + 建议",
        "例如：「金额超 5000 元需附学校审批说明」→ 学生据此修改",
        "价值：将合规检查前移，减少提交-驳回-修改-重提循环",
    ]),
    ("👤 场景二：审批人决策辅助", BLUE, [
        "审批详情打开后自动触发合规分析",
        "AI 面板展示：合规分析 + 相似案例 + 政策条文 + 意见草稿",
        "推荐按钮按风险等级高亮（高风险→红色驳回，低风险→绿色通过）",
        "每条分析附带政策原文引用，审批人可点击查看核实",
        "价值：审批人从「凭经验判断」升级为「有依据决策」",
    ]),
]
for i, (title, accent, items) in enumerate(scenarios):
    y = Cm(7.0 + i * 3.8)
    add_rect(slide, Cm(1.5), y, Cm(31), Cm(3.3), fill_color=WHITE, border_color=RGBColor(0xE5, 0xE7, 0xEB))
    add_text_box(slide, Cm(2.5), y + Cm(0.2), Cm(29), Cm(0.5), title,
                 font_size=Pt(13), color=accent, bold=True)
    for j, item in enumerate(items):
        add_text_box(slide, Cm(3.0), y + Cm(0.9 + j * 0.5), Cm(28), Cm(0.45), f"• {item}",
                     font_size=Pt(10), color=GRAY)

add_evidence_tag(slide, "📁 代码：rag_service.py(TF-IDF+检索) · policy_kb.json(2025版) · ManualFormPage.tsx(自查按钮)")
add_scoring_tag(slide, '技术深度')


# ============================================================
# SLIDE 9: 多角色多阶段流程建模
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide)
add_title_bar(slide, "多角色多阶段流程：适配高校组织结构",
              "不只是学生提交+管理员审批两个节点——而是部门→财务→学校完整流转 + 5 角色 + 跨学校隔离")

# Swimlane diagram (simplified)
roles = ["👨‍🎓 学生", "🏢 部门管理员", "💰 财务管理员", "🏫 学校管理员", "🔧 信息管理员"]
role_colors = [BLUE, PURPLE, GREEN, ORANGE, DARK_BLUE]
y_start = Cm(4.0)
for i, (role, color) in enumerate(zip(roles, role_colors)):
    y = y_start + Cm(i * 2.2)
    add_rect(slide, Cm(1.5), y, Cm(4.5), Cm(1.8), fill_color=color)
    add_text_box(slide, Cm(1.7), y + Cm(0.5), Cm(4.0), Cm(0.8), role,
                 font_size=Pt(12), color=WHITE, bold=True, align=PP_ALIGN.CENTER)
    # Action boxes
    actions = [
        ["提交申请", "查看进度", "接收通知"],
        ["审核材料", "查看AI分析", "审批决策"],
        ["审核金额", "核查发票", "财务审批"],
        ["全校事务总览", "部门管理", "学校级审批"],
        ["API Key管理", "用户管理", "系统监控"],
    ]
    ax = Cm(6.5)
    for act in actions[i]:
        act_box = add_rect(slide, ax, y + Cm(0.3), Cm(5.5), Cm(1.2), fill_color=WHITE, border_color=color)
        act_box.text_frame.paragraphs[0].text = act
        act_box.text_frame.paragraphs[0].font.size = Pt(9.5)
        act_box.text_frame.paragraphs[0].font.color.rgb = color
        act_box.text_frame.paragraphs[0].font.bold = True
        act_box.text_frame.paragraphs[0].alignment = PP_ALIGN.CENTER
        ax += Cm(6.0)

# 19 templates + multi-tenant
add_rect(slide, Cm(1.5), Cm(15.3), Cm(15), Cm(2.5), fill_color=WHITE, border_color=RGBColor(0xE5, 0xE7, 0xEB))
add_multiline_box(slide, Cm(2.5), Cm(15.5), Cm(13.5), Cm(2), [
    ("📋 19 类审批模板 (templates.json)", Pt(12), DARK_BLUE, True),
    ("JSON 驱动 · 动态表单渲染 · 金额阈值自动跳过审批阶段", Pt(10), GRAY, False),
    ("请假/报销/用章/场地/车辆/社团/奖学金/休学复学/在读证明/因公出国/入职报到/办公用品/图书采购/成绩单/学历学位/试卷查阅/调停课/缓考补考/出差", Pt(9), LIGHT_GRAY, False),
])

add_rect(slide, Cm(17.5), Cm(15.3), Cm(15), Cm(2.5), fill_color=WHITE, border_color=RGBColor(0xE5, 0xE7, 0xEB))
add_multiline_box(slide, Cm(18.5), Cm(15.5), Cm(13.5), Cm(2), [
    ("🏫 跨学校多租户隔离", Pt(12), DARK_BLUE, True),
    ("school 字段隔离 · Pro/Free 服务等级 · 学校管理员边界限制", Pt(10), GRAY, False),
    ("支持：山东科技大学(主校区,Pro) + 济南校区(Free) 双校种子数据", Pt(9), LIGHT_GRAY, False),
])

add_evidence_tag(slide, "📁 代码：workflow.py(19类流程) · templates.json · models.py(school字段) · seed.py(2校×全角色)")
add_scoring_tag(slide, '工程完成度')


# ============================================================
# SLIDE 10: 工程化与安全
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide)
add_title_bar(slide, "工程化、安全与可运维设计",
              "项目不仅关注功能，也考虑了真实系统中的安全、稳定、性能和运维——从比赛 Demo 走向可部署系统")

# Four pillar cards
pillars = [
    ("🔐 安全机制", RED, [
        "JWT 双令牌 (access + refresh)",
        "bcrypt 密码哈希",
        "Fernet API Key 加密存储",
        "MIME 魔数文件校验防伪造",
        "软删除机制保护数据可恢复",
        "全链路审计日志",
    ]),
    ("⚡ 稳定机制", ORANGE, [
        "API Key 池轮询 + 故障转移",
        "失败计数自动禁用异常 Key",
        "云端→本地→规则三层降级",
        "单 Key 失效不影响全系统",
        "Redis 并发安全的原子计数",
        "管理员可视化开关 Key",
    ]),
    ("🚀 性能优化", GREEN, [
        "图片 OCR 前 EXIF 修正+压缩",
        "最大边 1800px, JPEG 85",
        "PDF 文本直提避免 OCR",
        "Redis 缓存 + 服务端分页",
        "TF-IDF 矩阵磁盘缓存",
        "LoRA GGUF 量化加速推理",
    ]),
    ("📊 运维支撑", BLUE, [
        "系统监控三面板（概览/日志/错误）",
        "健康检查聚合各服务状态",
        "结构化日志 + 错误聚合",
        "OCR 工具链调用追踪",
        "一键启停脚本 + 环境检测",
        "跨平台安装脚本 (macOS/Win)",
    ]),
]
for i, (title, accent, items) in enumerate(pillars):
    x = Cm(1.5 + (i % 2) * 16.2)
    y = Cm(3.5 + (i // 2) * 6.3)
    add_card(slide, x, y, Cm(15.2), Cm(5.8), title, items, accent=accent)

add_evidence_tag(slide, "📁 代码：key_pool.py · crypto_service.py · file_service.py · logging_service.py · monitor_router.py · start.sh")
add_scoring_tag(slide, '工程完成度')


# ============================================================
# SLIDE 11: Demo-1 AI 智能填表
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide)
add_title_bar(slide, "Demo-1：AI 智能填表 — 从自然语言到预填表单",
              "「我导师叫我去滨州调研…」→ AI 识别为请假申请 → 预填 12 个字段 → 合规自查 → 政策引用")

# Screenshot placeholder
placeholder = add_rect(slide, Cm(1.5), Cm(3.5), Cm(18), Cm(9.5), fill_color=RGBColor(0xF0, 0xF4, 0xFF), border_color=BLUE)
add_multiline_box(slide, Cm(3), Cm(5.5), Cm(15), Cm(5), [
    ("【截图占位】", Pt(18), BLUE, True, PP_ALIGN.CENTER),
    ("", Pt(8), GRAY, False),
    ("文件：02_workbench_nl_prefill.png", Pt(12), GRAY, False, PP_ALIGN.CENTER),
    ("", Pt(6), GRAY, False),
    ("展示内容：", Pt(11), DARK_BLUE, False),
    ("• 自然语言输入框与 AI 识别结果", Pt(10.5), GRAY, False),
    ("• 12 个预填字段（时间/地点/事由/交通…）", Pt(10.5), GRAY, False),
    ("• 合规分析结果（低风险 + 4 条政策引用）", Pt(10.5), GRAY, False),
    ("", Pt(6), GRAY, False),
    ("截图尺寸：16:9 · 放大标注 AI 预填区域", Pt(9), LIGHT_GRAY, False, PP_ALIGN.CENTER),
])

# Right side: Evidence annotations
add_rect(slide, Cm(20.5), Cm(3.5), Cm(12), Cm(9.5), fill_color=WHITE, border_color=RGBColor(0xE5, 0xE7, 0xEB))
add_multiline_box(slide, Cm(21.5), Cm(3.8), Cm(10.5), Cm(9), [
    ("🎯 评委关注点", Pt(15), DARK_BLUE, True),
    ("", Pt(6), GRAY, False),
    ("1️⃣ 输入了什么？", Pt(12), BLUE, True),
    ("口语化自然语言：「我导师叫我去滨州", Pt(10.5), GRAY, False),
    ("调研，明后两天不在学校」", Pt(10.5), GRAY, False),
    ("", Pt(4), GRAY, False),
    ("2️⃣ AI 做了什么？", Pt(12), BLUE, True),
    ("• 意图识别→请假申请 (置信度 60%)", Pt(10.5), GRAY, False),
    ("• 字段抽取→12 个字段", Pt(10.5), GRAY, False),
    ("• 「明天/后天」→ 2026-06-05/06", Pt(10.5), GRAY, False),
    ("• 「长途汽车」→交通工具映射", Pt(10.5), GRAY, False),
    ("• 「公假」→请假类型分类", Pt(10.5), GRAY, False),
    ("", Pt(4), GRAY, False),
    ("3️⃣ 证据在哪里？", Pt(12), BLUE, True),
    ("• 4 条政策引用（学生请假管理办法）", Pt(10.5), GRAY, False),
    ("• 风险等级：低风险 · 基本合规", Pt(10.5), GRAY, False),
])

add_evidence_tag(slide, "📸 截图：02_workbench_nl_prefill.png · API：/api/ai/intent · 降级：规则兜底正则匹配")
add_scoring_tag(slide, '演示效果')


# ============================================================
# SLIDE 12: Demo-2 合规分析
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide)
add_title_bar(slide, "Demo-2：提交前合规自查 — RAG 政策检索与风险分析",
              "学生在提交前点击「合规自查」→ RAG 检索政策库 → 生成风险等级 + 逐项检查 + 政策引用")

# Screenshot placeholder
placeholder = add_rect(slide, Cm(1.5), Cm(3.5), Cm(18), Cm(9.5), fill_color=RGBColor(0xF0, 0xF4, 0xFF), border_color=ORANGE)
add_multiline_box(slide, Cm(3), Cm(5.5), Cm(15), Cm(5), [
    ("【截图占位】", Pt(18), ORANGE, True, PP_ALIGN.CENTER),
    ("", Pt(8), GRAY, False),
    ("文件：02_workbench_nl_prefill.png（合规分析区域）", Pt(11), GRAY, False, PP_ALIGN.CENTER),
    ("", Pt(6), GRAY, False),
    ("标注内容：", Pt(11), DARK_BLUE, False),
    ("① 风险等级标签：低风险/中风险/高风险", Pt(10.5), GRAY, False),
    ("② 逐项检查结果：✅通过 / ⚠警告 / ❌不通过", Pt(10.5), GRAY, False),
    ("③ 政策引用：学生请假管理办法第1/3/4/5条", Pt(10.5), GRAY, False),
    ("④ 建议动作：补充辅导员信息", Pt(10.5), GRAY, False),
])

# Right: RAG technical details
add_rect(slide, Cm(20.5), Cm(3.5), Cm(12), Cm(9.5), fill_color=WHITE, border_color=RGBColor(0xE5, 0xE7, 0xEB))
add_multiline_box(slide, Cm(21.5), Cm(3.8), Cm(10.5), Cm(9), [
    ("🔬 技术实现", Pt(15), DARK_BLUE, True),
    ("", Pt(6), GRAY, False),
    ("检索：TF-IDF 字符级 n-gram", Pt(12), BLUE, True),
    ("scikit-learn · char ngram_range=(2,4)", Pt(10.5), GRAY, False),
    ("cosine_similarity 匹配政策条文", Pt(10.5), GRAY, False),
    ("冷启动 <1s · 延迟 <10ms · 零GPU依赖", Pt(10.5), GREEN, False),
    ("", Pt(4), GRAY, False),
    ("分析：本地 Qwen3-14B", Pt(12), BLUE, True),
    ("数据不出服务器 · 隐私可控", Pt(10.5), GRAY, False),
    ("llama.cpp 推理 · OpenAI 兼容 API", Pt(10.5), GRAY, False),
    ("响应时间 2-5 秒", Pt(10.5), GREEN, False),
    ("", Pt(4), GRAY, False),
    ("关键设计：不创建审批记录", Pt(12), BLUE, True),
    ("/api/ai/manual-compliance", Pt(10.5), GRAY, False),
    ("纯提交者自查 · 不消耗审批人时间", Pt(10.5), GRAY, False),
    ("前移质量检查 → 减少驳回循环", Pt(10.5), GREEN, False),
])

add_evidence_tag(slide, "📁 代码：rag_service.py(TF-IDF索引+LLM分析) · rule_engine.py(预审规则) · policy_kb.json(2025版知识库)")
add_scoring_tag(slide, '技术深度')


# ============================================================
# SLIDE 13: Demo-3 人机协同审批
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide)
add_title_bar(slide, "Demo-3：人机协同审批 — AI 辅助 + 人工决策",
              "审批详情自动合规分析 → AI 推荐按钮高亮 → 审批人核实依据 → 人工执行通过/驳回/需修改")

# Screenshot placeholder
placeholder = add_rect(slide, Cm(1.5), Cm(3.5), Cm(18), Cm(9.5), fill_color=RGBColor(0xF0, 0xF4, 0xFF), border_color=DARK_BLUE)
add_multiline_box(slide, Cm(3), Cm(5.5), Cm(15), Cm(5.5), [
    ("【截图占位】", Pt(18), DARK_BLUE, True, PP_ALIGN.CENTER),
    ("", Pt(8), GRAY, False),
    ("文件：04_dept_ai_review.png", Pt(11), GRAY, False, PP_ALIGN.CENTER),
    ("", Pt(6), GRAY, False),
    ("标注内容（用放大框标注）：", Pt(11), DARK_BLUE, False),
    ("① AI 合规分析面板：风险等级 + 逐项检查 + 政策引用", Pt(10.5), GRAY, False),
    ("② 推荐动作按钮：高风险→红色驳回 低风险→绿色通过", Pt(10.5), GRAY, False),
    ("③ AI 意见草稿：审批人可一键填入或修改", Pt(10.5), GRAY, False),
    ("④ 人工审批按钮：通过/驳回/需修改（最终决策权）", Pt(10.5), RED, True),
])

# Right: HITL evidence
add_rect(slide, Cm(20.5), Cm(3.5), Cm(12), Cm(9.5), fill_color=WHITE, border_color=RGBColor(0xE5, 0xE7, 0xEB))
add_multiline_box(slide, Cm(21.5), Cm(3.8), Cm(10.5), Cm(9), [
    ("⚖️ HITL 证据链", Pt(15), DARK_BLUE, True),
    ("", Pt(6), GRAY, False),
    ("AI 做了什么：", Pt(12), PURPLE, True),
    ("• 检索 4 条相关政策条文", Pt(10.5), GRAY, False),
    ("• 逐项合规检查（通过/警告）", Pt(10.5), GRAY, False),
    ("• 生成风险等级（低风险）", Pt(10.5), GRAY, False),
    ("• 推荐审批动作 + 意见草稿", Pt(10.5), GRAY, False),
    ("", Pt(4), GRAY, False),
    ("AI 不能做什么：", Pt(12), RED, True),
    ("• ❌ 自动通过/驳回申请", Pt(10.5), RED, False),
    ("• ❌ 替代审批人的判断", Pt(10.5), RED, False),
    ("• ❌ 承担行政决策责任", Pt(10.5), RED, False),
    ("", Pt(4), GRAY, False),
    ("人做了什么：", Pt(12), DARK_BLUE, True),
    ("• 查看 AI 分析结果与政策原文", Pt(10.5), GRAY, False),
    ("• 核实证据 → 做出行政决策", Pt(10.5), GRAY, False),
    ("• 点击通过/驳回/需修改", Pt(10.5), GRAY, False),
    ("• 承担最终审批责任", Pt(10.5), DARK_BLUE, True),
])

add_evidence_tag(slide, "📸 截图：04_dept_ai_review.png · 组件：AIDecisionPanel.tsx(362行) · 后端：approval_service.py")
add_scoring_tag(slide, '创新性')


# ============================================================
# SLIDE 14: 创新点与应用价值
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide)
add_title_bar(slide, "创新点与应用价值",
              "项目的创新不只在模型调用，而在于把 AI 能力、政策依据、审批责任和产品体验统一到完整流程中")

# Innovation matrix (3x3)
innovations = [
    ("流程创新", "AI 从问答工具转为\n审批流程协同代理", PURPLE),
    ("架构创新", "云端语义+本地合规\n+规则兜底分层协作", BLUE),
    ("交互创新", "玻璃拟态+角色导航\n+AI状态可感知", GREEN),
    ("治理价值", "提升填表效率\n降低政策查找成本", ORANGE),
    ("扩展价值", "可迁移至其他高校\n或校园事务类型", DARK_BLUE),
    ("工程价值", "17,000行代码+99API\n+16表+完整监控", BLUE),
]
for i, (title, desc, accent) in enumerate(innovations):
    x = Cm(1.5 + (i % 3) * 10.7)
    y = Cm(3.5 + (i // 3) * 4.5)
    card = add_rect(slide, x, y, Cm(10), Cm(3.8), fill_color=WHITE, border_color=RGBColor(0xE5, 0xE7, 0xEB))
    add_rect(slide, x, y, Cm(10), Cm(0.08), fill_color=accent)
    add_text_box(slide, x + Cm(0.8), y + Cm(0.5), Cm(8.5), Cm(0.7), title,
                 font_size=Pt(15), color=accent, bold=True)
    add_text_box(slide, x + Cm(0.8), y + Cm(1.5), Cm(8.5), Cm(1.8), desc,
                 font_size=Pt(12), color=GRAY)

# Bottom one-liner
add_rect(slide, Cm(1.5), Cm(12.5), Cm(31), Cm(2.2), fill_color=RGBColor(0xF0, 0xF4, 0xFF), corner_radius=Cm(0.4))
add_multiline_box(slide, Cm(2.5), Cm(12.8), Cm(29), Cm(1.6), [
    ("💡 核心竞争力总结", Pt(14), DARK_BLUE, True),
    ("不是「有 AI 功能」— 而是 AI 深度嵌入审批全流程（填表→检索→合规→决策辅助→归档），每个环节有代码、有截图、可现场演示", Pt(11), GRAY, False),
])

add_evidence_tag(slide, "📸 7张真实运行截图 · 5张SVG架构图 · 22个评委问答准备 · 完整项目分析报告")
add_scoring_tag(slide, '创新性')


# ============================================================
# SLIDE 15: 总结与 Q&A
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide)
# Summary block
add_rect(slide, Cm(0), Cm(0), Cm(33.87), Cm(8), fill_color=DARK_BLUE)
add_text_box(slide, Cm(3), Cm(1.5), Cm(28), Cm(1.5), "总结",
             font_size=Pt(36), color=WHITE, bold=True)
add_text_box(slide, Cm(3), Cm(3.5), Cm(28), Cm(3), "智审通的目标不是炫技，而是解决高校事务办理中\n不会填、找不到依据、审批效率低和责任不清晰的问题。",
             font_size=Pt(18), color=RGBColor(0xBB, 0xCC, 0xFF))

# Four summary points
summaries = [
    ("🎯", "面向真实高校事务场景", "19 类审批模板 · 5 角色 · 2 校种子数据"),
    ("🤖", "AI 辅助但不替代人工决策", "云端语义 + 本地合规 + 规则兜底"),
    ("📚", "RAG 提供政策依据与可解释性", "TF-IDF 检索 · 2025 版知识库 · 逐项检查"),
    ("🔧", "完整工程闭环", "17,000 行代码 · 99 API · 16 表 · 监控 + 安全"),
]
for i, (icon, title, desc) in enumerate(summaries):
    x = Cm(1.5 + i * 8)
    add_rect(slide, x, Cm(9.0), Cm(7.2), Cm(5.5), fill_color=WHITE, border_color=RGBColor(0xE5, 0xE7, 0xEB))
    add_text_box(slide, x + Cm(2), Cm(9.3), Cm(5), Cm(1.2), icon, font_size=Pt(28), color=DARK_BLUE, bold=True, align=PP_ALIGN.CENTER)
    add_text_box(slide, x + Cm(0.5), Cm(11.0), Cm(6.2), Cm(1), title, font_size=Pt(13), color=DARK_BLUE, bold=True, align=PP_ALIGN.CENTER)
    add_text_box(slide, x + Cm(0.5), Cm(12.0), Cm(6.2), Cm(1.5), desc, font_size=Pt(10), color=GRAY, align=PP_ALIGN.CENTER)

# Key message
add_rect(slide, Cm(3), Cm(15.0), Cm(28), Cm(2), fill_color=RGBColor(0xF0, 0xF4, 0xFF), corner_radius=Cm(0.5))
add_text_box(slide, Cm(4), Cm(15.4), Cm(26), Cm(1.2),
             "「把 AI 放进流程，而不是替代流程」",
             font_size=Pt(22), color=DARK_BLUE, bold=True, align=PP_ALIGN.CENTER)

add_text_box(slide, Cm(8), Cm(17.5), Cm(18), Cm(0.8),
             "Q&A · 感谢各位评委老师",
             font_size=Pt(16), color=GRAY, align=PP_ALIGN.CENTER)


# ============================================================
# SAVE
# ============================================================
output_path = 'f:/VScodeProject/zhishitong/out/智审通_学术答辩_15页.pptx'
os.makedirs(os.path.dirname(output_path), exist_ok=True)
prs.save(output_path)
print(f"PPT saved: {output_path}")
print(f"Slides: {len(prs.slides)}")
