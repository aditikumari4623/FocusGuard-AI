import {
  Sparkles,
  CalendarDays,
} from "lucide-react";

import { useAuth } from "../../../context/AuthContext";
import { useLanguage } from "../../../context/LanguageContext";
import { useTranslation } from "../../../hooks/useTranslation";

const WelcomeCard = () => {
  const { user } = useAuth();
  const { language } = useLanguage();

  const welcomeBack = useTranslation(
    "Welcome Back"
  );

  const productivityText = useTranslation(
    "Let's make today productive."
  );

  const localeMap: Record<string, string> = {
    en: "en-IN",
    "en-IN": "en-IN",
    hi: "hi-IN",
    "hi-IN": "hi-IN",
    bn: "bn-IN",
    "bn-IN": "bn-IN",
    gu: "gu-IN",
    "gu-IN": "gu-IN",
    kn: "kn-IN",
    "kn-IN": "kn-IN",
    ml: "ml-IN",
    "ml-IN": "ml-IN",
    mr: "mr-IN",
    "mr-IN": "mr-IN",
    ne: "ne-IN",
    "ne-IN": "ne-IN",
    od: "od-IN",
    "od-IN": "od-IN",
    pa: "pa-IN",
    "pa-IN": "pa-IN",
    sa: "sa-IN",
    "sa-IN": "sa-IN",
    ta: "ta-IN",
    "ta-IN": "ta-IN",
    te: "te-IN",
    "te-IN": "te-IN",
    ur: "ur-IN",
    "ur-IN": "ur-IN",
    as: "as-IN",
    "as-IN": "as-IN",
    brx: "brx-IN",
    "brx-IN": "brx-IN",
    doi: "doi-IN",
    "doi-IN": "doi-IN",
    ks: "ks-IN",
    "ks-IN": "ks-IN",
    kok: "kok-IN",
    "kok-IN": "kok-IN",
    mai: "mai-IN",
    "mai-IN": "mai-IN",
    mni: "mni-IN",
    "mni-IN": "mni-IN",
    sat: "sat-IN",
    "sat-IN": "sat-IN",
    sd: "sd-IN",
    "sd-IN": "sd-IN",
  };

  const locale =
    localeMap[language] || "en-IN";

  const today = new Date().toLocaleDateString(
    locale,
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <div
      className="
        min-w-0
        rounded-3xl
        bg-indigo-600
        p-5
        text-white

        dark:bg-indigo-700

        sm:p-6
        lg:p-8
      "
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Sparkles
              size={22}
              className="shrink-0"
            />

            <span className="font-semibold">
              {welcomeBack}
            </span>
          </div>

          <h1 className="mt-3 break-words text-3xl font-bold sm:text-4xl">
            {user?.full_name}
          </h1>

          <p className="mt-3 text-sm text-indigo-100 sm:text-base">
            {productivityText}
          </p>
        </div>

        <div
          className="
            flex
            w-full
            items-center
            gap-4
            rounded-2xl
            bg-white/20
            p-4
            backdrop-blur

            sm:w-auto
            sm:min-w-[190px]
            sm:flex-col
            sm:items-start
            sm:p-5
          "
        >
          <CalendarDays
            size={30}
            className="shrink-0 sm:h-9 sm:w-9"
          />

          <p className="text-sm">
            {today}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;