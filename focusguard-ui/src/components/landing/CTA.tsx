import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-[32px] bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 p-12 text-center text-white shadow-2xl lg:p-20">
          <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
            Ready to Get Started?
          </span>

          <h2 className="mt-8 text-4xl font-bold tracking-tight md:text-5xl">
            Take Control of Your Attention
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-indigo-100">
            Join individuals and organizations using FocusGuard AI to
            understand digital behavior, improve productivity, and build
            healthier work habits with AI-powered insights.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-semibold text-indigo-700 transition hover:scale-105"
            >
              Start Free
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/login"
              className="rounded-2xl border border-white/30 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;