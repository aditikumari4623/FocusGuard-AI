from sarvamai import SarvamAI

from app.config import SARVAM_API_KEY


client = SarvamAI(
    api_subscription_key=SARVAM_API_KEY
)


class SarvamService:

    # -------------------------------------------------
    # CENTRALIZED LANGUAGE CONFIGURATION
    # -------------------------------------------------

    supported_languages = {
        "en": {
            "code": "en-IN",
            "name": "English",
            "native_name": "English"
        },

        "hi": {
            "code": "hi-IN",
            "name": "Hindi",
            "native_name": "हिन्दी"
        },

        "bn": {
            "code": "bn-IN",
            "name": "Bengali",
            "native_name": "বাংলা"
        },

        "gu": {
            "code": "gu-IN",
            "name": "Gujarati",
            "native_name": "ગુજરાતી"
        },

        "kn": {
            "code": "kn-IN",
            "name": "Kannada",
            "native_name": "ಕನ್ನಡ"
        },

        "ml": {
            "code": "ml-IN",
            "name": "Malayalam",
            "native_name": "മലയാളം"
        },

        "mr": {
            "code": "mr-IN",
            "name": "Marathi",
            "native_name": "मराठी"
        },

        "od": {
            "code": "od-IN",
            "name": "Odia",
            "native_name": "ଓଡ଼ିଆ"
        },

        "pa": {
            "code": "pa-IN",
            "name": "Punjabi",
            "native_name": "ਪੰਜਾਬੀ"
        },

        "ta": {
            "code": "ta-IN",
            "name": "Tamil",
            "native_name": "தமிழ்"
        },

        "te": {
            "code": "te-IN",
            "name": "Telugu",
            "native_name": "తెలుగు"
        },

        "as": {
            "code": "as-IN",
            "name": "Assamese",
            "native_name": "অসমীয়া"
        },

        "brx": {
            "code": "brx-IN",
            "name": "Bodo",
            "native_name": "बड़ो"
        },

        "doi": {
            "code": "doi-IN",
            "name": "Dogri",
            "native_name": "डोगरी"
        },

        "kok": {
            "code": "kok-IN",
            "name": "Konkani",
            "native_name": "कोंकणी"
        },

        "ks": {
            "code": "ks-IN",
            "name": "Kashmiri",
            "native_name": "कॉशुर"
        },

        "mai": {
            "code": "mai-IN",
            "name": "Maithili",
            "native_name": "मैथिली"
        },

        "mni": {
            "code": "mni-IN",
            "name": "Manipuri",
            "native_name": "মৈতৈলোন্"
        },

        "ne": {
            "code": "ne-IN",
            "name": "Nepali",
            "native_name": "नेपाली"
        },

        "sa": {
            "code": "sa-IN",
            "name": "Sanskrit",
            "native_name": "संस्कृतम्"
        },

        "sat": {
            "code": "sat-IN",
            "name": "Santali",
            "native_name": "ᱥᱟᱱᱛᱟᱲᱤ"
        },

        "sd": {
            "code": "sd-IN",
            "name": "Sindhi",
            "native_name": "سنڌي"
        },

        "ur": {
            "code": "ur-IN",
            "name": "Urdu",
            "native_name": "اردو"
        }
    }

    # -------------------------------------------------
    # GET SUPPORTED LANGUAGES
    # -------------------------------------------------

    @classmethod
    def get_supported_languages(cls):

        languages = []

        for language_id, data in (
            cls.supported_languages.items()
        ):

            languages.append(
                {
                    "id": language_id,
                    "name": data["name"],
                    "native_name": data["native_name"]
                }
            )

        return languages

    # -------------------------------------------------
    # VALIDATE LANGUAGE
    # -------------------------------------------------

    @classmethod
    def is_supported(
        cls,
        language: str
    ) -> bool:

        return (
            language
            in cls.supported_languages
        )

    # -------------------------------------------------
    # GET SARVAM LANGUAGE CODE
    # -------------------------------------------------

    @classmethod
    def get_language_code(
        cls,
        language: str
    ) -> str:

        if not cls.is_supported(language):

            raise ValueError(
                f"Unsupported language: {language}"
            )

        return (
            cls.supported_languages
            [language]["code"]
        )

    # -------------------------------------------------
    # TRANSLATE TEXT
    # -------------------------------------------------

    @classmethod
    def translate(

        cls,

        text: str,

        target_language: str,

        source_language: str = "en"

    ) -> str:

        # English to English
        if (
            target_language
            == source_language
        ):

            return text

        source_code = (
            cls.get_language_code(
                source_language
            )
        )

        target_code = (
            cls.get_language_code(
                target_language
            )
        )

        response = client.text.translate(

            input=text,

            source_language_code=source_code,

            target_language_code=target_code,

            model="sarvam-translate:v1"

        )

        return response.translated_text