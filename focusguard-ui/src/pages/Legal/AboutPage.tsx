import {
  ArrowLeft,
  BrainCircuit,
  Globe,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* Header */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white">
              F
            </div>

            <span className="text-xl font-bold">
              FocusGuard AI
            </span>
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600"
          >
            <ArrowLeft size={17} />
            Back to Home
          </Link>

        </div>

      </header>

      {/* Hero */}

      <section className="relative overflow-hidden bg-white">

        <div className="pointer-events-none absolute -left-30 top-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="pointer-events-none absolute -right-30 top-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center">

          <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
            About FocusGuard AI
          </span>

          <h1 className="mt-7 text-5xl font-extrabold tracking-tight md:text-6xl">
            Protect Your Attention.
            <br />

            <span className="text-indigo-600">
              Work Smarter.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-600">
            FocusGuard AI is an AI-powered attention intelligence platform
            designed to help individuals and organizations understand digital
            activity, identify distractions, improve focus, and build healthier
            productivity habits.
          </p>

        </div>

      </section>

      {/* What is FocusGuard */}

      <section className="py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            <div>

              <span className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
                Our Platform
              </span>

              <h2 className="mt-5 text-4xl font-bold tracking-tight">
                Turning digital activity into meaningful insights
              </h2>

              <p className="mt-6 leading-8 text-slate-600">
                Modern work involves constant switching between websites,
                applications, tabs, and tasks. This can make it difficult to
                understand where time is actually being spent.
              </p>

              <p className="mt-5 leading-8 text-slate-600">
                FocusGuard AI brings these signals together and transforms
                them into understandable productivity metrics, focus scores,
                analytics, planner progress, notifications, and AI-powered
                recommendations.
              </p>

            </div>

            <div className="grid gap-5 sm:grid-cols-2">

              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

                <BrainCircuit
                  size={32}
                  className="text-indigo-600"
                />

                <h3 className="mt-5 text-xl font-bold">
                  AI Intelligence
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Understand productivity patterns and receive personalized
                  recommendations.
                </p>

              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

                <Target
                  size={32}
                  className="text-cyan-600"
                />

                <h3 className="mt-5 text-xl font-bold">
                  Focus Planning
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Create structured focus sessions and compare planned work
                  with actual activity.
                </p>

              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

                <Globe
                  size={32}
                  className="text-violet-600"
                />

                <h3 className="mt-5 text-xl font-bold">
                  Activity Tracking
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Track browser activity, websites, categories, and tab
                  switching through the Chrome extension.
                </p>

              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

                <Users
                  size={32}
                  className="text-emerald-600"
                />

                <h3 className="mt-5 text-xl font-bold">
                  Team Insights
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Organizations can understand productivity trends across
                  their teams.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Mission */}

      <section className="bg-slate-900 py-24 text-white">

        <div className="mx-auto max-w-5xl px-6 text-center">

          <span className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Our Mission
          </span>

          <h2 className="mt-6 text-4xl font-bold md:text-5xl">
            Make focused work easier.
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-300">
            Our goal is to help people become more aware of how they spend
            their digital time and give them practical tools to improve it.
            FocusGuard AI is designed to turn activity data into actionable
            insights rather than simply collecting numbers.
          </p>

        </div>

      </section>

      {/* How We Help */}

      <section className="py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mx-auto max-w-3xl text-center">

            <span className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
              Why FocusGuard
            </span>

            <h2 className="mt-5 text-4xl font-bold">
              Built around attention, not just activity
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              FocusGuard combines tracking, analytics, planning,
              notifications, and artificial intelligence into a single
              productivity ecosystem.
            </p>

          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

              <Target
                size={30}
                className="text-indigo-600"
              />

              <h3 className="mt-6 text-xl font-bold">
                Understand
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                See where your time goes through activity analytics,
                productivity categories, focus scores, and reports.
              </p>

            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

              <BrainCircuit
                size={30}
                className="text-cyan-600"
              />

              <h3 className="mt-6 text-xl font-bold">
                Improve
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Use AI-powered recommendations and personalized insights to
                identify opportunities for better productivity.
              </p>

            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

              <ShieldCheck
                size={30}
                className="text-emerald-600"
              />

              <h3 className="mt-6 text-xl font-bold">
                Stay Consistent
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Focus reminders, planner guidance, and notifications help
                users stay aligned with their goals.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="bg-indigo-600 py-20">

        <div className="mx-auto max-w-4xl px-6 text-center text-white">

          <h2 className="text-4xl font-bold">
            Ready to take control of your attention?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-indigo-100">
            Start using FocusGuard AI to understand your digital habits and
            build a more focused workflow.
          </p>

          <Link
            to="/login"
            className="mt-8 inline-flex rounded-2xl bg-white px-8 py-4 font-semibold text-indigo-600 shadow-lg transition hover:bg-indigo-50"
          >
            Get Started
          </Link>

        </div>

      </section>

      {/* Footer */}

      <footer className="border-t border-slate-200 bg-white py-8">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © {new Date().getFullYear()} FocusGuard AI. All rights reserved.
          </p>

          <div className="flex gap-5">

            <Link
              to="/privacy"
              className="transition hover:text-indigo-600"
            >
              Privacy
            </Link>

            <Link
              to="/terms"
              className="transition hover:text-indigo-600"
            >
              Terms
            </Link>

            <Link
              to="/contact"
              className="transition hover:text-indigo-600"
            >
              Contact
            </Link>

          </div>

        </div>

      </footer>

    </div>
  );
};

export default AboutPage;