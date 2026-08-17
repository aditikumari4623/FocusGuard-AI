import { Languages } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative">
      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <Languages
          size={18}
          className="text-indigo-600 dark:text-indigo-400"
        />

        <select
          value={language}
          onChange={(e) =>
            setLanguage(
              e.target.value as "en" | "hi" | "ta" | "ml"
            )
          }
          className="
            bg-transparent
            text-sm
            font-medium
            outline-none
            cursor-pointer
            dark:text-white
          "
        >
          <option value="en">🇬🇧 English</option>
          <option value="hi">🇮🇳 हिन्दी</option>
          <option value="ta">தமிழ்</option>
          <option value="ml">മലയാളം</option>
        </select>
      </div>
    </div>
  );
}