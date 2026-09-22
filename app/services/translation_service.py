from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.models import Translation
from app.models import DynamicTranslation

from app.services.sarvam_service import SarvamService


class TranslationService:

    # -------------------------------------------------
    # STATIC TRANSLATION
    #
    # ONLY READ FROM DATABASE.
    #
    # THIS DOES NOT CALL SARVAM API.
    # -------------------------------------------------

    @staticmethod
    def get_translation(
        db: Session,
        message_key: str,
        language: str = "en"
    ) -> str:

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

        # ---------------------------------------------
        # FALLBACK TO ENGLISH
        # ---------------------------------------------

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

        # ---------------------------------------------
        # FINAL FALLBACK
        # ---------------------------------------------

        return message_key

    # -------------------------------------------------
    # DYNAMIC TRANSLATION
    #
    # DATABASE CACHE
    #        ↓
    # SARVAM API ONLY IF NOT CACHED
    #        ↓
    # SAVE RESULT
    #
    # IF SARVAM FAILS:
    #        ↓
    # RETURN ORIGINAL TEXT
    #
    # THIS PREVENTS A TRANSLATION FAILURE FROM
    # BREAKING THE FRONTEND.
    # -------------------------------------------------

    @staticmethod
    def translate_dynamic_message(
        db: Session,
        message: str,
        language: str = "en",
        source_language: str = "en"
    ) -> str:

        # ---------------------------------------------
        # EMPTY TEXT
        # ---------------------------------------------

        if not message:
            return message

        # ---------------------------------------------
        # SAME LANGUAGE
        # ---------------------------------------------

        if language == source_language:
            return message

        # ---------------------------------------------
        # CHECK CACHE FIRST
        # ---------------------------------------------

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

        # ---------------------------------------------
        # CALL SARVAM
        # ---------------------------------------------

        try:

            translated = SarvamService.translate(
                text=message,
                target_language=language,
                source_language=source_language
            )

        except Exception as error:

            print(
                f"Dynamic translation failed for "
                f"language '{language}': {error}"
            )

            # -----------------------------------------
            # IMPORTANT:
            # DO NOT BREAK THE APPLICATION IF SARVAM
            # IS UNAVAILABLE / OUT OF CREDITS.
            # -----------------------------------------

            return message

        # ---------------------------------------------
        # SAVE TO DATABASE CACHE
        # ---------------------------------------------

        try:

            new_translation = DynamicTranslation(
                original_text=message,
                language=language,
                translated_text=translated
            )

            db.add(new_translation)
            db.commit()

            return translated

        except IntegrityError:

            # Another request may have saved
            # the same translation first.

            db.rollback()

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

            # If the cache save failed for some other
            # reason, still don't break the application.

            return translated