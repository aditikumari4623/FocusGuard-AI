from app.database import SessionLocal
from app.models import Translation

db = SessionLocal()

translations = [
    # ON_TRACK
    {"message_key": "ON_TRACK", "language": "en", "translated_text": "You are on track."},
    {"message_key": "ON_TRACK", "language": "hi", "translated_text": "आप सही दिशा में हैं।"},
    {"message_key": "ON_TRACK", "language": "ta", "translated_text": "நீங்கள் சரியான பாதையில் உள்ளீர்கள்."},
    {"message_key": "ON_TRACK", "language": "ml", "translated_text": "നിങ്ങൾ ശരിയായ പാതയിലാണ്."},

    # OFF_TRACK
    {"message_key": "OFF_TRACK", "language": "en", "translated_text": "You are off track."},
    {"message_key": "OFF_TRACK", "language": "hi", "translated_text": "आपका ध्यान भटक गया है।"},
    {"message_key": "OFF_TRACK", "language": "ta", "translated_text": "நீங்கள் கவனம் சிதறியுள்ளீர்கள்."},
    {"message_key": "OFF_TRACK", "language": "ml", "translated_text": "നിങ്ങളുടെ ശ്രദ്ധ തിരിഞ്ഞിരിക്കുന്നു."},

    # BREAK_REMINDER
    {"message_key": "BREAK_REMINDER", "language": "en", "translated_text": "Take a short break."},
    {"message_key": "BREAK_REMINDER", "language": "hi", "translated_text": "थोड़ा ब्रेक लें।"},
    {"message_key": "BREAK_REMINDER", "language": "ta", "translated_text": "சிறிய ஓய்வு எடுத்துக்கொள்ளுங்கள்."},
    {"message_key": "BREAK_REMINDER", "language": "ml", "translated_text": "ചെറിയൊരു ഇടവേള എടുക്കുക."},

    # NO_ACTIVE_SESSION
    {"message_key": "NO_ACTIVE_SESSION", "language": "en", "translated_text": "No active session."},
    {"message_key": "NO_ACTIVE_SESSION", "language": "hi", "translated_text": "कोई सक्रिय सत्र नहीं है।"},
    {"message_key": "NO_ACTIVE_SESSION", "language": "ta", "translated_text": "செயலில் உள்ள அமர்வு இல்லை."},
    {"message_key": "NO_ACTIVE_SESSION", "language": "ml", "translated_text": "സജീവ സെഷൻ ഇല്ല."},

    # NO_ACTIVITY
    {
    "message_key": "NO_ACTIVITY",
    "language": "en",
    "translated_text": "No activity found."
    },
    {
    "message_key": "NO_ACTIVITY",
    "language": "hi",
    "translated_text": "कोई गतिविधि नहीं मिली।"
    },
    {
    "message_key": "NO_ACTIVITY",
    "language": "ta",
    "translated_text": "செயல்பாடு எதுவும் இல்லை."
    },
    {
    "message_key": "NO_ACTIVITY",
    "language": "ml",
    "translated_text": "പ്രവർത്തനം കണ്ടെത്തിയില്ല."
    },
    
    # NO_NOTIFICATION
    {
        "message_key": "NO_NOTIFICATION",
        "language": "en",
        "translated_text": "No new notifications."
    },
    {
        "message_key": "NO_NOTIFICATION",
        "language": "hi",
        "translated_text": "कोई नई सूचना नहीं है।"
    },
    {
        "message_key": "NO_NOTIFICATION",
        "language": "ta",
        "translated_text": "புதிய அறிவிப்புகள் இல்லை."
    },
    {
        "message_key": "NO_NOTIFICATION",
        "language": "ml",
        "translated_text": "പുതിയ അറിയിപ്പുകളൊന്നുമില്ല."
    },

    # NOTIFICATION_NOT_FOUND
    {
        "message_key": "NOTIFICATION_NOT_FOUND",
        "language": "en",
        "translated_text": "Notification not found."
    },
    {
        "message_key": "NOTIFICATION_NOT_FOUND",
        "language": "hi",
        "translated_text": "सूचना नहीं मिली।"
    },
    {
        "message_key": "NOTIFICATION_NOT_FOUND",
        "language": "ta",
        "translated_text": "அறிவிப்பு கிடைக்கவில்லை."
    },
    {
        "message_key": "NOTIFICATION_NOT_FOUND",
        "language": "ml",
        "translated_text": "അറിയിപ്പ് കണ്ടെത്താനായില്ല."
    },

    # NOTIFICATION_MARKED_READ
    {
        "message_key": "NOTIFICATION_MARKED_READ",
        "language": "en",
        "translated_text": "Notification marked as read."
    },
    {
        "message_key": "NOTIFICATION_MARKED_READ",
        "language": "hi",
        "translated_text": "सूचना पढ़ी गई के रूप में चिह्नित की गई।"
    },
    {
        "message_key": "NOTIFICATION_MARKED_READ",
        "language": "ta",
        "translated_text": "அறிவிப்பு படித்ததாக குறிக்கப்பட்டது."
    },
    {
        "message_key": "NOTIFICATION_MARKED_READ",
        "language": "ml",
        "translated_text": "അറിയിപ്പ് വായിച്ചതായി അടയാളപ്പെടുത്തി."
    },

    # ALL_NOTIFICATIONS_MARKED_READ
    {
        "message_key": "ALL_NOTIFICATIONS_MARKED_READ",
        "language": "en",
        "translated_text": "All notifications marked as read."
    },
    {
        "message_key": "ALL_NOTIFICATIONS_MARKED_READ",
        "language": "hi",
        "translated_text": "सभी सूचनाओं को पढ़ा हुआ चिह्नित कर दिया गया।"
    },
    {
        "message_key": "ALL_NOTIFICATIONS_MARKED_READ",
        "language": "ta",
        "translated_text": "அனைத்து அறிவிப்புகளும் படித்ததாக குறிக்கப்பட்டன."
    },
    {
        "message_key": "ALL_NOTIFICATIONS_MARKED_READ",
        "language": "ml",
        "translated_text": "എല്ലാ അറിയിപ്പുകളും വായിച്ചതായി അടയാളപ്പെടുത്തി."
    }
]

for item in translations:
    exists = (
        db.query(Translation)
        .filter(
            Translation.message_key == item["message_key"],
            Translation.language == item["language"],
        )
        .first()
    )

    if not exists:
        db.add(Translation(**item))

db.commit()

print("Translations inserted successfully.")