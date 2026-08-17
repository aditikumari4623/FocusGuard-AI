import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import DashboardPreview from "./DashboardPreview";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">

      {/* Background Glow */}

      <div className="absolute right-[-120px] bottom-10 h-[320px] w-[320px] rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="mx-auto flex min-h-[92vh] max-w-7xl flex-col items-center justify-between gap-16 px-6 py-20 lg:flex-row">

        {/* Left */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >

          <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
            AI Powered Attention Intelligence
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
            Protect Your
            <br />

            <span className="text-indigo-600">
              Attention.
            </span>

            <br />

            Work Smarter.
          </h1>

          <p className="mt-8 text-lg leading-8 text-slate-600">
            FocusGuard AI intelligently tracks your digital activity,
            analyzes focus patterns, detects distractions, and delivers
            personalized AI recommendations for individuals and teams.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            {/* Get Started → Login */}

            <Link
              to="/login"
              className="rounded-2xl bg-indigo-600 px-8 py-4 font-semibold text-white transition hover:bg-indigo-700"
            >
              Get Started
            </Link>

            {/* Watch Demo */}

            <button
              type="button"
              className="rounded-2xl border border-slate-300 px-8 py-4 font-semibold transition hover:bg-slate-100"
            >
              Watch Demo
            </button>

          </div>

          <div className="mt-12 flex items-center gap-8">

            <div>
              <h2 className="text-3xl font-bold">
                25K+
              </h2>

              <p className="text-slate-500">
                Hours Analysed
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                91%
              </h2>

              <p className="text-slate-500">
                Average Focus
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                100+
              </h2>

              <p className="text-slate-500">
                Teams
              </p>
            </div>

          </div>

        </motion.div>

        {/* Right */}

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
          }}
        >
          <DashboardPreview />
        </motion.div>

      </div>

    </section>
  );
};

export default Hero;