import os

from dotenv import load_dotenv


load_dotenv()


SECRET_KEY = os.getenv(
    "SECRET_KEY"
)


ALGORITHM = os.getenv(
    "ALGORITHM"
)


ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.getenv(
        "ACCESS_TOKEN_EXPIRE_MINUTES"
    )
)


DATABASE_URL = os.getenv(
    "DATABASE_URL"
)


EMAIL_ADDRESS = os.getenv(
    "EMAIL_ADDRESS"
)


EMAIL_PASSWORD = os.getenv(
    "EMAIL_PASSWORD"
)


REFRESH_TOKEN_EXPIRE_DAYS = int(
    os.getenv(
        "REFRESH_TOKEN_EXPIRE_DAYS"
    )
)


GROQ_API_KEY = os.getenv(
    "GROQ_API_KEY"
)


GEMINI_API_KEY = os.getenv(
    "GEMINI_API_KEY"
)


OPENAI_API_KEY = os.getenv(
    "OPENAI_API_KEY"
)


DEFAULT_LLM = os.getenv(
    "DEFAULT_LLM",
    "groq"
)


SARVAM_API_KEY = os.getenv(
    "SARVAM_API_KEY"
)