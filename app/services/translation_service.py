from sqlalchemy.orm import Session

from app.models import Translation
from app.models import DynamicTranslation

from app.services.sarvam_service import SarvamService


class TranslationService:

    @staticmethod
    def get_translation(
        db: Session,
        message_key: str,
        language: str = "en"
    ):

        translation = (
            db.query(Translation)
            .filter(
                Translation.message_key == message_key,
                Translation.language == language
            )
            .first()
        )

        if translation:
            return translation.translated_text

        english = (
            db.query(Translation)
            .filter(
                Translation.message_key == message_key,
                Translation.language == "en"
            )
            .first()
        )

        if english:
            return english.translated_text

        return message_key

    @staticmethod
    def translate_dynamic_message(
        db: Session,
        message: str,
        language: str = "en"
    ):

        if language == "en":
            return message

        # Check cache first
        cached = (
            db.query(DynamicTranslation)
            .filter(
                DynamicTranslation.original_text == message,
                DynamicTranslation.language == language
            )
            .first()
        )

        if cached:
            return cached.translated_text

        # Translate using Sarvam
        translated = SarvamService.translate(
            text=message,
            target_language=language
        )

        # Save in PostgreSQL
        db.add(
            DynamicTranslation(
                original_text=message,
                language=language,
                translated_text=translated
            )
        )

        db.commit()

        return translated