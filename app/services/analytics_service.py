from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta

from app.models import (
    ActivityLog,
    UserStatusLog,
    TabSwitchLog,
    User
)


# ---------------------------------------------
# Format Seconds
# ---------------------------------------------

def format_duration(seconds: int) -> str:

    seconds = int(seconds)

    hours = seconds // 3600

    minutes = (seconds % 3600) // 60

    if hours == 0:

        return f"{minutes}m"

    return f"{hours}h {minutes}m"


def get_dashboard_metrics(
    db: Session,
    user_id: int,
    period: str = "today"
):

    # -----------------------------
    # Date Range
    # -----------------------------

    now = datetime.now()

    if period == "today":

        start_date = datetime(
            now.year,
            now.month,
            now.day
        )

    elif period == "week":

        start_date = now - timedelta(days=7)

    elif period == "month":

        start_date = now - timedelta(days=30)

    else:

        start_date = datetime.min

    # -----------------------------
    # Browser Time
    # -----------------------------

    browser_time = db.query(
        func.sum(ActivityLog.duration)
    ).filter(
        ActivityLog.user_id == user_id,
        ActivityLog.start_time >= start_date
    ).scalar() or 0

    # -----------------------------
    # Active Time
    # -----------------------------

    active_time = db.query(
        func.sum(UserStatusLog.duration)
    ).filter(
        UserStatusLog.user_id == user_id,
        UserStatusLog.status == "ACTIVE",
        UserStatusLog.start_time >= start_date
    ).scalar() or 0

    # -----------------------------
    # Idle Time
    # -----------------------------

    idle_time = db.query(
        func.sum(UserStatusLog.duration)
    ).filter(
        UserStatusLog.user_id == user_id,
        UserStatusLog.status == "IDLE",
        UserStatusLog.start_time >= start_date
    ).scalar() or 0

    # -----------------------------
    # Productive Time
    # -----------------------------

    productive_time = db.query(
        func.sum(ActivityLog.duration)
    ).filter(
        ActivityLog.user_id == user_id,
        ActivityLog.productivity == "Productive",
        ActivityLog.start_time >= start_date
    ).scalar() or 0

    # -----------------------------
    # Non Productive Time
    # -----------------------------

    non_productive_time = db.query(
        func.sum(ActivityLog.duration)
    ).filter(
        ActivityLog.user_id == user_id,
        ActivityLog.productivity == "Non Productive",
        ActivityLog.start_time >= start_date
    ).scalar() or 0

    # -----------------------------
    # Focus Score
    # -----------------------------

    focus_score = 0

    if browser_time > 0:

        focus_score = round(
            (active_time / browser_time) * 100,
            2
        )

    # -----------------------------
    # Top Websites
    # -----------------------------

    websites = (
        db.query(
            ActivityLog.website_name,
            func.sum(ActivityLog.duration)
        )
        .filter(
            ActivityLog.user_id == user_id,
            ActivityLog.start_time >= start_date
        )
        .group_by(
            ActivityLog.website_name
        )
        .order_by(
            func.sum(ActivityLog.duration).desc()
        )
        .limit(5)
        .all()
    )

    top_websites = [
        website
        for website, _ in websites
        if website
    ]

    # -----------------------------
    # Categories
    # -----------------------------

    categories = (
        db.query(
            ActivityLog.category,
            func.sum(ActivityLog.duration)
        )
        .filter(
            ActivityLog.user_id == user_id,
            ActivityLog.start_time >= start_date
        )
        .group_by(
            ActivityLog.category
        )
        .order_by(
            func.sum(ActivityLog.duration).desc()
        )
        .limit(5)
        .all()
    )

    top_categories = [
        category
        for category, _ in categories
        if category
    ]

    # -----------------------------
    # Total Tab Switches
    # -----------------------------

    total_tab_switches = db.query(
        TabSwitchLog
    ).filter(
        TabSwitchLog.user_id == user_id,
        TabSwitchLog.switch_time >= start_date
    ).count()

    # -----------------------------
    # Productive Websites
    # -----------------------------

    productive_websites = (
        db.query(
            ActivityLog.website_name,
            func.sum(ActivityLog.duration)
        )
        .filter(
            ActivityLog.user_id == user_id,
            ActivityLog.productivity == "Productive",
            ActivityLog.start_time >= start_date
        )
        .group_by(
            ActivityLog.website_name
        )
        .order_by(
            func.sum(ActivityLog.duration).desc()
        )
        .limit(3)
        .all()
    )

    productive_websites = [
        site
        for site, _ in productive_websites
        if site
    ]

    # -----------------------------
    # Distracting Websites
    # -----------------------------

    distracting_websites = (
        db.query(
            ActivityLog.website_name,
            func.sum(ActivityLog.duration)
        )
        .filter(
            ActivityLog.user_id == user_id,
            ActivityLog.productivity == "Non Productive",
            ActivityLog.start_time >= start_date
        )
        .group_by(
            ActivityLog.website_name
        )
        .order_by(
            func.sum(ActivityLog.duration).desc()
        )
        .limit(3)
        .all()
    )

    distracting_websites = [
        site
        for site, _ in distracting_websites
        if site
    ]

    return {

        # Raw values

        "browser_time": browser_time,

        "active_time": active_time,

        "idle_time": idle_time,

        "productive_time": productive_time,

        "non_productive_time": non_productive_time,

        "focus_score": focus_score,

        "tab_switches": total_tab_switches,

        # Formatted values

        "browser_time_text": format_duration(browser_time),

        "active_time_text": format_duration(active_time),

        "idle_time_text": format_duration(idle_time),

        "productive_time_text": format_duration(productive_time),

        "non_productive_time_text": format_duration(non_productive_time),

        # Lists

        "top_websites": top_websites,

        "top_categories": top_categories,

        "productive_websites": productive_websites,

        "distracting_websites": distracting_websites

    }




# ---------------------------------------------
# Organization Dashboard Metrics
# Used by Super Admin AI
# ---------------------------------------------

def get_organization_dashboard_metrics(
    db: Session,
    period: str = "today"
):
    # -----------------------------
    # Date Range
    # -----------------------------

    now = datetime.now()

    if period == "today":

        start_date = datetime(
            now.year,
            now.month,
            now.day
        )

    elif period == "week":

        start_date = now - timedelta(days=7)

    elif period == "month":

        start_date = now - timedelta(days=30)

    else:

        start_date = datetime.min


    # -----------------------------
    # Organization Users
    # -----------------------------

    user_ids = (
        db.query(User.id)
        .filter(
            User.role == "USER"
        )
        .all()
    )

    user_ids = [
        user_id
        for user_id, in user_ids
    ]


    # No users
    if not user_ids:

        return {
            "browser_time": 0,
            "active_time": 0,
            "idle_time": 0,
            "productive_time": 0,
            "non_productive_time": 0,
            "focus_score": 0,
            "tab_switches": 0,

            "browser_time_text": "0m",
            "active_time_text": "0m",
            "idle_time_text": "0m",
            "productive_time_text": "0m",
            "non_productive_time_text": "0m",

            "top_websites": [],
            "top_categories": [],
            "productive_websites": [],
            "distracting_websites": []
        }


    # -----------------------------
    # Browser Time
    # -----------------------------

    browser_time = (
        db.query(
            func.sum(ActivityLog.duration)
        )
        .filter(
            ActivityLog.user_id.in_(user_ids),
            ActivityLog.start_time >= start_date
        )
        .scalar()
        or 0
    )


    # -----------------------------
    # Active Time
    # -----------------------------

    active_time = (
        db.query(
            func.sum(UserStatusLog.duration)
        )
        .filter(
            UserStatusLog.user_id.in_(user_ids),
            UserStatusLog.status == "ACTIVE",
            UserStatusLog.start_time >= start_date
        )
        .scalar()
        or 0
    )


    # -----------------------------
    # Idle Time
    # -----------------------------

    idle_time = (
        db.query(
            func.sum(UserStatusLog.duration)
        )
        .filter(
            UserStatusLog.user_id.in_(user_ids),
            UserStatusLog.status == "IDLE",
            UserStatusLog.start_time >= start_date
        )
        .scalar()
        or 0
    )


    # -----------------------------
    # Productive Time
    # -----------------------------

    productive_time = (
        db.query(
            func.sum(ActivityLog.duration)
        )
        .filter(
            ActivityLog.user_id.in_(user_ids),
            ActivityLog.productivity == "Productive",
            ActivityLog.start_time >= start_date
        )
        .scalar()
        or 0
    )


    # -----------------------------
    # Non Productive Time
    # -----------------------------

    non_productive_time = (
        db.query(
            func.sum(ActivityLog.duration)
        )
        .filter(
            ActivityLog.user_id.in_(user_ids),
            ActivityLog.productivity == "Non Productive",
            ActivityLog.start_time >= start_date
        )
        .scalar()
        or 0
    )


    # -----------------------------
    # Focus Score
    # -----------------------------

    focus_score = 0

    if browser_time > 0:

        focus_score = round(
            (active_time / browser_time) * 100,
            2
        )


    # -----------------------------
    # Top Websites
    # -----------------------------

    websites = (
        db.query(
            ActivityLog.website_name,
            func.sum(ActivityLog.duration)
        )
        .filter(
            ActivityLog.user_id.in_(user_ids),
            ActivityLog.start_time >= start_date
        )
        .group_by(
            ActivityLog.website_name
        )
        .order_by(
            func.sum(ActivityLog.duration).desc()
        )
        .limit(5)
        .all()
    )

    top_websites = [
        website
        for website, _ in websites
        if website
    ]


    # -----------------------------
    # Top Categories
    # -----------------------------

    categories = (
        db.query(
            ActivityLog.category,
            func.sum(ActivityLog.duration)
        )
        .filter(
            ActivityLog.user_id.in_(user_ids),
            ActivityLog.start_time >= start_date
        )
        .group_by(
            ActivityLog.category
        )
        .order_by(
            func.sum(ActivityLog.duration).desc()
        )
        .limit(5)
        .all()
    )

    top_categories = [
        category
        for category, _ in categories
        if category
    ]


    # -----------------------------
    # Tab Switches
    # -----------------------------

    total_tab_switches = (
        db.query(TabSwitchLog)
        .filter(
            TabSwitchLog.user_id.in_(user_ids),
            TabSwitchLog.switch_time >= start_date
        )
        .count()
    )


    # -----------------------------
    # Productive Websites
    # -----------------------------

    productive_websites = (
        db.query(
            ActivityLog.website_name,
            func.sum(ActivityLog.duration)
        )
        .filter(
            ActivityLog.user_id.in_(user_ids),
            ActivityLog.productivity == "Productive",
            ActivityLog.start_time >= start_date
        )
        .group_by(
            ActivityLog.website_name
        )
        .order_by(
            func.sum(ActivityLog.duration).desc()
        )
        .limit(3)
        .all()
    )

    productive_websites = [
        site
        for site, _ in productive_websites
        if site
    ]


    # -----------------------------
    # Distracting Websites
    # -----------------------------

    distracting_websites = (
        db.query(
            ActivityLog.website_name,
            func.sum(ActivityLog.duration)
        )
        .filter(
            ActivityLog.user_id.in_(user_ids),
            ActivityLog.productivity == "Non Productive",
            ActivityLog.start_time >= start_date
        )
        .group_by(
            ActivityLog.website_name
        )
        .order_by(
            func.sum(ActivityLog.duration).desc()
        )
        .limit(3)
        .all()
    )

    distracting_websites = [
        site
        for site, _ in distracting_websites
        if site
    ]


    # -----------------------------
    # Return
    # -----------------------------

    return {

        "browser_time": browser_time,

        "active_time": active_time,

        "idle_time": idle_time,

        "productive_time": productive_time,

        "non_productive_time": non_productive_time,

        "focus_score": focus_score,

        "tab_switches": total_tab_switches,


        "browser_time_text":
            format_duration(browser_time),

        "active_time_text":
            format_duration(active_time),

        "idle_time_text":
            format_duration(idle_time),

        "productive_time_text":
            format_duration(productive_time),

        "non_productive_time_text":
            format_duration(non_productive_time),


        "top_websites":
            top_websites,

        "top_categories":
            top_categories,

        "productive_websites":
            productive_websites,

        "distracting_websites":
            distracting_websites

    }

# ---------------------------------------------
# Category Time Summary
# ---------------------------------------------

def get_category_time_summary(
    db: Session,
    user_id: int,
    period: str = "today"
):

    now = datetime.now()

    if period == "today":

        start_date = datetime(
            now.year,
            now.month,
            now.day
        )

    elif period == "week":

        start_date = now - timedelta(days=7)

    elif period == "month":

        start_date = now - timedelta(days=30)

    else:

        start_date = datetime.min

    categories = (

        db.query(

            ActivityLog.category,

            func.sum(ActivityLog.duration)

        )

        .filter(

            ActivityLog.user_id == user_id,

            ActivityLog.start_time >= start_date,

            ActivityLog.category.isnot(None)

        )

        .group_by(

            ActivityLog.category

        )

        .order_by(

            func.sum(ActivityLog.duration).desc()

        )

        .all()

    )

    return [

        {

            "category": category,

            "minutes": round((duration or 0) / 60, 2),

            "seconds": duration or 0

        }

        for category, duration in categories

    ]