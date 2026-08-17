from fastapi import (
    APIRouter,
    Depends,
    Query,
    HTTPException
)
from sqlalchemy.orm import Session
from datetime import datetime

from app.database import SessionLocal
from app.dependencies import get_current_user

from app.services.analytics_service import (
    get_dashboard_metrics,
    get_organization_dashboard_metrics
)

from app.services.prompts import (
    build_daily_recommendation_prompt,
    build_weekly_recommendation_prompt,
    build_monthly_recommendation_prompt,
    build_chat_prompt,
)

from app.services.llm import (
    llm_service,
)

from app.schemas import (
    ChatRequest,
    ChatResponse,
)

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


# -----------------------------------------------------
# Database Dependency
# -----------------------------------------------------

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# -----------------------------------------------------
# Allowed Chat Topics
# -----------------------------------------------------

FOCUSGUARD_KEYWORDS = {
    "focusguard",
    "focus",
    "productivity",
    "analytics",
    "dashboard",
    "activity",
    "active",
    "idle",
    "browser",
    "website",
    "websites",
    "category",
    "categories",
    "report",
    "reports",
    "recommendation",
    "recommendations",
    "notification",
    "notifications",
    "tab",
    "tabs",
    "switch",
    "switches",
    "time",
    "score",
    "goal",
    "goals",
    "session",
    "sessions",
}


# -----------------------------------------------------
# AI Recommendation
# -----------------------------------------------------

@router.get("/recommendation")
def get_recommendation(

    period: str = Query(
        default="today",
        pattern="^(today|week|month)$"
    ),

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user)

):

    metrics = get_dashboard_metrics(

        db=db,

        user_id=current_user.id,

        period=period

    )

    if period == "today":

        prompt = build_daily_recommendation_prompt(

            active_time=metrics["active_time_text"],

            idle_time=metrics["idle_time_text"],

            browser_time=metrics["browser_time_text"],

            focus_score=metrics["focus_score"],

            top_websites=metrics["top_websites"],

            top_categories=metrics["top_categories"],

            tab_switches=metrics["tab_switches"],

            productive_websites=metrics["productive_websites"],

            distracting_websites=metrics["distracting_websites"]

        )

    elif period == "week":

        prompt = build_weekly_recommendation_prompt(

            active_time=metrics["active_time_text"],

            idle_time=metrics["idle_time_text"],

            browser_time=metrics["browser_time_text"],

            focus_score=metrics["focus_score"],

            top_websites=metrics["top_websites"],

            top_categories=metrics["top_categories"],

            tab_switches=metrics["tab_switches"],

            productive_websites=metrics["productive_websites"],

            distracting_websites=metrics["distracting_websites"]

        )

    else:

        prompt = build_monthly_recommendation_prompt(

            active_time=metrics["active_time_text"],

            idle_time=metrics["idle_time_text"],

            browser_time=metrics["browser_time_text"],

            focus_score=metrics["focus_score"],

            top_websites=metrics["top_websites"],

            top_categories=metrics["top_categories"],

            tab_switches=metrics["tab_switches"],

            productive_websites=metrics["productive_websites"],

            distracting_websites=metrics["distracting_websites"]

        )

    recommendation = llm_service.ask_llm(prompt)

    return {

    "period": period,

    "generated_at": datetime.now().isoformat(),

    # Active Time
    "active_time_seconds": metrics["active_time"],
    "active_time": metrics["active_time_text"],

    # Idle Time
    "idle_time_seconds": metrics["idle_time"],
    "idle_time": metrics["idle_time_text"],

    # Browser Time
    "browser_time_seconds": metrics["browser_time"],
    "browser_time": metrics["browser_time_text"],

    # Productive Time
    "productive_time_seconds": metrics["productive_time"],
    "productive_time": metrics["productive_time_text"],

    # Non Productive Time
    "non_productive_time_seconds": metrics["non_productive_time"],
    "non_productive_time": metrics["non_productive_time_text"],

    "focus_score": metrics["focus_score"],

    "tab_switches": metrics["tab_switches"],

    "top_websites": metrics["top_websites"],

    "top_categories": metrics["top_categories"],

    "productive_websites": metrics["productive_websites"],

    "distracting_websites": metrics["distracting_websites"],

    "recommendation": recommendation

}


# -----------------------------------------------------
# Organization AI Recommendation
# Super Admin Only
# -----------------------------------------------------

@router.get("/organization-recommendation")
def get_organization_recommendation(

    period: str = Query(
        default="today",
        pattern="^(today|week|month)$"
    ),

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user)

):

    # -------------------------------------------------
    # Super Admin Access Only
    # -------------------------------------------------

    if current_user.role != "SUPER_ADMIN":

        raise HTTPException(
            status_code=403,
            detail="Only Super Admin can access organization AI insights."
        )


    # -------------------------------------------------
    # Organization Metrics
    # -------------------------------------------------

    metrics = get_organization_dashboard_metrics(

        db=db,

        period=period

    )


    # -------------------------------------------------
    # AI Prompt
    # -------------------------------------------------

    prompt = f"""
You are FocusGuard AI.

You are analyzing productivity data for the organization
managed by a Super Admin.

This is aggregated activity from organization users.

Period:
{period}

Organization Metrics:

Active Time:
{metrics["active_time_text"]}

Idle Time:
{metrics["idle_time_text"]}

Browser Time:
{metrics["browser_time_text"]}

Productive Time:
{metrics["productive_time_text"]}

Non-Productive Time:
{metrics["non_productive_time_text"]}

Focus Score:
{metrics["focus_score"]}%

Tab Switches:
{metrics["tab_switches"]}

Top Websites:
{", ".join(metrics["top_websites"]) or "None"}

Top Categories:
{", ".join(metrics["top_categories"]) or "None"}

Productive Websites:
{", ".join(metrics["productive_websites"]) or "None"}

Distracting Websites:
{", ".join(metrics["distracting_websites"]) or "None"}


Generate a concise organization-level productivity insight.

Include:

1. Overall productivity observation.
2. Main positive behavior.
3. Main distraction or concern.
4. One practical recommendation for the organization.

Do not identify or expose individual users.

Keep the response professional and concise.
"""


    # -------------------------------------------------
    # Generate Recommendation
    # -------------------------------------------------

    recommendation = llm_service.ask_llm(prompt)


    # -------------------------------------------------
    # Response
    # -------------------------------------------------

    return {

        "period": period,

        "generated_at":
            datetime.now().isoformat(),

        "active_time_seconds":
            metrics["active_time"],

        "active_time":
            metrics["active_time_text"],

        "idle_time_seconds":
            metrics["idle_time"],

        "idle_time":
            metrics["idle_time_text"],

        "browser_time_seconds":
            metrics["browser_time"],

        "browser_time":
            metrics["browser_time_text"],

        "productive_time_seconds":
            metrics["productive_time"],

        "productive_time":
            metrics["productive_time_text"],

        "non_productive_time_seconds":
            metrics["non_productive_time"],

        "non_productive_time":
            metrics["non_productive_time_text"],

        "focus_score":
            metrics["focus_score"],

        "tab_switches":
            metrics["tab_switches"],

        "top_websites":
            metrics["top_websites"],

        "top_categories":
            metrics["top_categories"],

        "productive_websites":
            metrics["productive_websites"],

        "distracting_websites":
            metrics["distracting_websites"],

        "recommendation":
            recommendation

    }

# -----------------------------------------------------
# AI Chatbot
# -----------------------------------------------------

@router.post("/chat", response_model=ChatResponse)
def chat_with_ai(

    request: ChatRequest,

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user)

):

    question = request.message.lower()

    if not any(keyword in question for keyword in FOCUSGUARD_KEYWORDS):

        return ChatResponse(
            response=(
                "I'm the FocusGuard AI Assistant. "
                "I can only answer questions related to the FocusGuard platform, "
                "your productivity analytics, reports, focus score, browser activity, "
                "and recommendations."
            )
        )

    metrics = get_dashboard_metrics(

        db=db,

        user_id=current_user.id,

        period="today"

    )

    prompt = build_chat_prompt(

        user_question=request.message,

        metrics=metrics

    )

    response = llm_service.ask_llm(prompt)

    return ChatResponse(

        response=response

    )