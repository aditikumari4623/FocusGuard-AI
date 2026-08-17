from groq import Groq

from app.config import (
    GROQ_API_KEY,
    GEMINI_API_KEY,
    OPENAI_API_KEY,
    DEFAULT_LLM,
)


class LLMService:
    def __init__(self):
        self.groq_client = (
            Groq(api_key=GROQ_API_KEY)
            if GROQ_API_KEY
            else None
        )

    def _ask_groq(self, prompt: str) -> str:
        if not self.groq_client:
            raise Exception("Groq API key is not configured.")

        response = self.groq_client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are FocusGuard AI, an intelligent productivity assistant. "
                        "Provide concise, practical, and actionable recommendations "
                        "based on the user's productivity data."
                    ),
                },
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
            temperature=0.4,
            max_tokens=500,
        )

        return response.choices[0].message.content.strip()

    def _ask_gemini(self, prompt: str) -> str:
        raise NotImplementedError("Gemini integration is not implemented yet.")

    def _ask_openai(self, prompt: str) -> str:
        raise NotImplementedError("OpenAI integration is not implemented yet.")

    def ask_llm(self, prompt: str) -> str:

        providers = []

        if DEFAULT_LLM.lower() == "groq":
            providers = [
                self._ask_groq,
                self._ask_gemini,
                self._ask_openai,
        ]

        elif DEFAULT_LLM.lower() == "gemini":
            providers = [
                self._ask_gemini,
                self._ask_groq,
                self._ask_openai,
        ]

        else:
            providers = [
                self._ask_openai,
                self._ask_groq,
                self._ask_gemini,
        ]

        for provider in providers:

            try:
                return provider(prompt)
            except Exception as e:
                print(f"\nLLM Provider Failed: {provider.__name__}")
                print(e)

        raise Exception("All LLM providers failed.")


llm_service = LLMService()