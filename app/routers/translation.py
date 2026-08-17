from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.services.translation_service import TranslationService

router = APIRouter(
    prefix="/translation",
    tags=["Translation"],
)


def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()


@router.get("/")

def get_translation(
    message_key: str,
    language: str,
    db: Session = Depends(get_db),
):

    translation = TranslationService.get_translation(
        db,
        message_key,
        language,
    )

    if translation:

        return {
            "translated_text": translation
        }

    return {
        "message": "Translation not found."
    }