from sarvamai import SarvamAI

from app.config import SARVAM_API_KEY


client = SarvamAI(
    api_subscription_key=SARVAM_API_KEY
)


class SarvamService:

    language_map = {
        "hi": "hi-IN",
        "ta": "ta-IN",
        "ml": "ml-IN",
        "en": "en-IN",
    }

    @staticmethod
    def translate(
        text: str,
        target_language: str,
    ):

        if target_language == "en":
            return text

        response = client.text.translate(
            input=text,
            source_language_code="en-IN",
            target_language_code=SarvamService.language_map[target_language],
            speaker_gender="Female"
        )

        return response.translated_text