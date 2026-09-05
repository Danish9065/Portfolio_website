from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "frontend" / "public" / "Danish-MD-Resume.pdf"
PORTFOLIO_URL = "https://danish-portfolio9065.vercel.app"

INK = colors.HexColor("#172033")
MUTED = colors.HexColor("#4B5565")
ACCENT = colors.HexColor("#5946B2")
LINE = colors.HexColor("#D7DCE5")


def register_fonts() -> tuple[str, str]:
    regular = Path("/System/Library/Fonts/Supplemental/Arial.ttf")
    bold = Path("/System/Library/Fonts/Supplemental/Arial Bold.ttf")
    if regular.exists() and bold.exists():
        pdfmetrics.registerFont(TTFont("ResumeRegular", str(regular)))
        pdfmetrics.registerFont(TTFont("ResumeBold", str(bold)))
        return "ResumeRegular", "ResumeBold"
    return "Helvetica", "Helvetica-Bold"


REGULAR, BOLD = register_fonts()

styles = getSampleStyleSheet()
name_style = ParagraphStyle(
    "Name",
    parent=styles["Normal"],
    fontName=BOLD,
    fontSize=22.5,
    leading=25,
    textColor=INK,
    alignment=TA_CENTER,
    spaceAfter=2,
)
title_style = ParagraphStyle(
    "Title",
    parent=styles["Normal"],
    fontName=REGULAR,
    fontSize=10.8,
    leading=13,
    textColor=ACCENT,
    alignment=TA_CENTER,
    spaceAfter=3,
)
contact_style = ParagraphStyle(
    "Contact",
    parent=styles["Normal"],
    fontName=REGULAR,
    fontSize=8.8,
    leading=11,
    textColor=MUTED,
    alignment=TA_CENTER,
    spaceAfter=7,
)
section_style = ParagraphStyle(
    "Section",
    parent=styles["Normal"],
    fontName=BOLD,
    fontSize=12,
    leading=14,
    textColor=INK,
    borderColor=LINE,
    borderWidth=0,
    borderPadding=(0, 0, 2, 0),
    spaceBefore=6,
    spaceAfter=4,
)
body_style = ParagraphStyle(
    "Body",
    parent=styles["Normal"],
    fontName=REGULAR,
    fontSize=9.3,
    leading=12.2,
    textColor=INK,
    alignment=TA_LEFT,
    spaceAfter=2,
)
role_style = ParagraphStyle(
    "Role",
    parent=body_style,
    fontName=BOLD,
    fontSize=9.8,
    leading=12.2,
    spaceAfter=1,
)
meta_style = ParagraphStyle(
    "Meta",
    parent=body_style,
    fontSize=8.6,
    leading=10.5,
    textColor=MUTED,
)
bullet_style = ParagraphStyle(
    "Bullet",
    parent=body_style,
    leftIndent=10,
    firstLineIndent=-7,
    bulletIndent=1,
    spaceAfter=2,
)


def section(title: str):
    return [
        Paragraph(title.upper(), section_style),
        Table([[""]], colWidths=[100 * mm], rowHeights=[0.45], style=TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), ACCENT),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ])),
        Spacer(1, 2.5),
    ]


def bullet(text: str):
    return Paragraph(f"<bullet>&bull;</bullet>{text}", bullet_style)


story = [
    Paragraph("Md Danish Iftekhar", name_style),
    Paragraph("AI Full-Stack Developer | Generative AI | NLP | Applied Machine Learning", title_style),
    Paragraph(
        '<link href="mailto:danish90654@gmail.com">danish90654@gmail.com</link>  |  +91-9065440786  |  '
        '<link href="https://github.com/Danish9065">github.com/Danish9065</link><br/>'
        '<link href="https://www.linkedin.com/in/danish90654/">linkedin.com/in/danish90654</link>  |  '
        f'<link href="{PORTFOLIO_URL}">danish-portfolio9065.vercel.app</link>',
        contact_style,
    ),
]

story += section("Professional Summary")
story.append(Paragraph(
    "AI full-stack developer and data science student building production-oriented conversational AI and web products. "
    "Experienced with multilingual NLP, generative AI, speech-to-text, human-in-the-loop workflows, secure APIs, "
    "Supabase/PostgreSQL, and responsive React/Next.js interfaces.",
    body_style,
))

story += section("Technical Skills")
skills = [
    ("AI / ML", "Machine Learning, Deep Learning, NLP, Generative AI, LLM integration, prompt engineering, speech-to-text, Gemini API"),
    ("Languages", "Python, TypeScript, JavaScript, SQL, HTML, CSS"),
    ("Frontend", "React, Next.js, Vite, Tailwind CSS, React Router, Framer Motion"),
    ("Backend", "FastAPI, Node.js, Express.js, REST APIs, Pydantic, validation and testing"),
    ("Data / Cloud", "Supabase, PostgreSQL, Row Level Security, Cloudinary, Vercel, Render"),
    ("Integrations", "Meta WhatsApp Cloud API, Telegram Bot API, Twilio, authentication, webhooks"),
]
for label, value in skills:
    story.append(Paragraph(f"<b>{label}:</b> {value}", body_style))

story += section("Experience and Leadership")
story.append(Paragraph("Team Lead and AI Full-Stack Developer - PhoneERP Internship Project", role_style))
story.append(Paragraph("June 2026 - August 2026 | Team project | <link href=\"https://phone-erp.vercel.app\">Live application</link>", meta_style))
story.append(bullet(
    "Led development and verification of a production prototype that converts Hindi, Hinglish, and English text or voice orders into editable action cards for owners, packers, and delivery teams."
))
story.append(bullet(
    "Built and hardened Gemini transcription/extraction, deterministic validation, catalog matching, role-based access, Supabase persistence, customer tracking, invoices, and WhatsApp/Telegram intake workflows."
))

story += section("Selected Projects")
projects = [
    (
        "PhoneERP - Conversational Order Operations",
        "Next.js, TypeScript, FastAPI, Python, Supabase, Gemini",
        "Created a human-reviewed conversational commerce workflow spanning order capture, AI understanding, fulfilment, tracking, billing, and multichannel integrations.",
    ),
    (
        "AuraPalette - AI Skin Tone Style Advisor",
        "React, TypeScript, MediaPipe, ONNX Runtime Web",
        "Developed privacy-first image analysis, palette recommendations, confidence scoring, quality checks, result history, and PNG exports.",
    ),
    (
        "HealthSaathi - AI Medical Report Explanation",
        "React, TypeScript, FastAPI, Gemini API, Supabase",
        "Built a safety-aware healthcare MVP for report uploads, educational explanations, report history, health guidance, and secure backend processing.",
    ),
    (
        "Portfolio Platform with AI Assistant",
        "React, TypeScript, FastAPI, Supabase, Cloudinary",
        "Built editable portfolio content, project case studies, secure admin APIs, media workflows, contact handling, and a grounded AI assistant.",
    ),
]
for project_name, stack, description in projects:
    story.append(Paragraph(f"{project_name} <font color='#4B5565' size='8'>| {stack}</font>", role_style))
    story.append(bullet(description))

story += section("Education")
education = Table(
    [[
        Paragraph("<b>B.Tech in Computer Science and Engineering</b><br/><font color='#4B5565'>Specialization in Data Science | Jamia Millia Islamia</font>", body_style),
        Paragraph("Expected 2028<br/><font color='#4B5565'>CGPA: 7.52/10</font>", meta_style),
    ]],
    colWidths=[142 * mm, 35 * mm],
)
education.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("ALIGN", (1, 0), (1, 0), "RIGHT"),
    ("LEFTPADDING", (0, 0), (-1, -1), 0),
    ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ("TOPPADDING", (0, 0), (-1, -1), 0),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
]))
story.append(education)

story += section("Focus")
story.append(Paragraph(
    "Applied AI, machine learning, NLP, generative AI, conversational systems, full-stack product engineering, backend APIs, and production deployment.",
    body_style,
))

document = SimpleDocTemplate(
    str(OUTPUT),
    pagesize=A4,
    rightMargin=16 * mm,
    leftMargin=16 * mm,
    topMargin=12 * mm,
    bottomMargin=11 * mm,
    title="Md Danish Iftekhar - AI Full-Stack Developer Resume",
    author="Md Danish Iftekhar",
    subject="Resume covering AI, ML, NLP, generative AI, full-stack development, and PhoneERP",
)
document.build(story)
print(OUTPUT)
