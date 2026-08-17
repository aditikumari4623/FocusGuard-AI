import {
  ArrowUpRight,
  CheckCircle2,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-slate-950 text-slate-300">

      {/* Background Glow */}

      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-indigo-600/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Main Footer */}

        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">

          {/* Brand */}

          <div className="lg:col-span-2">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-lg font-bold text-white shadow-lg shadow-indigo-600/20">
                F
              </div>

              <span className="text-2xl font-bold tracking-tight text-white">
                FocusGuard AI
              </span>

            </div>

            <p className="mt-6 max-w-md text-sm leading-7 text-slate-400">
              AI-powered attention intelligence that helps individuals and
              organizations understand digital activity, reduce distractions,
              and build better productivity habits.
            </p>

            {/* Trust Badges */}

            <div className="mt-7 flex flex-wrap gap-3">

              <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-medium text-slate-300">
                <ShieldCheck
                  size={15}
                  className="text-cyan-400"
                />

                Privacy Focused
              </div>

              <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-medium text-slate-300">
                <CheckCircle2
                  size={15}
                  className="text-green-400"
                />

                Built for Productivity
              </div>

            </div>

            {/* Social / Contact */}

            <div className="mt-7 flex items-center gap-3">

              <a
                href="#"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-xs font-bold text-slate-300 transition hover:border-indigo-500 hover:bg-indigo-600 hover:text-white"
              >
                GH
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-xs font-bold text-slate-300 transition hover:border-indigo-500 hover:bg-indigo-600 hover:text-white"
              >
                in
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-xs font-bold text-slate-300 transition hover:border-indigo-500 hover:bg-indigo-600 hover:text-white"
              >
                X
              </a>

              <a
                href="mailto:support@focusguard.ai"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 transition hover:border-indigo-500 hover:bg-indigo-600 hover:text-white"
              >
                <Mail size={18} />
              </a>

            </div>

          </div>

          {/* Product */}

          <div>

            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Product
            </h3>

            <ul className="mt-6 space-y-4 text-sm">

              <li>
                <a
                  href="#"
                  className="transition hover:text-white"
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-white"
                >
                  AI Recommendations
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-white"
                >
                  Analytics
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-white"
                >
                  Focus Planner
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-white"
                >
                  Notifications
                </a>
              </li>

            </ul>

          </div>

          {/* Solutions */}

          <div>

            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Solutions
            </h3>

            <ul className="mt-6 space-y-4 text-sm">

              <li>
                <a
                  href="#"
                  className="transition hover:text-white"
                >
                  Individuals
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-white"
                >
                  Teams
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-white"
                >
                  Organizations
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-white"
                >
                  Administrators
                </a>
              </li>

            </ul>

          </div>

          {/* Company */}

          <div>

            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>

            <ul className="mt-6 space-y-4 text-sm">

              <li>
                <Link
  to="/about"
  className="flex items-center gap-1 transition hover:text-white"
>
  About Us
  <ArrowUpRight size={14} />
</Link>
              </li>

              <li>
                <Link
  to="/contact"
  className="transition hover:text-white"
>
  Contact
</Link>
              </li>

              <li>
                <Link
  to="/privacy"
  className="transition hover:text-white"
>
  Privacy Policy
</Link>
              </li>

               <li>
                <Link 
                to="/terms"
                className="transition hover:text-white"
>
  Terms of Service
</Link>
              </li>

            </ul>

          </div>

        </div>

        {/* System Status */}

        <div className="flex flex-col gap-4 border-y border-slate-800 py-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3 text-sm">

            <span className="relative flex h-2.5 w-2.5">

              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />

              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />

            </span>

            <span className="text-slate-400">
              All systems operational
            </span>

          </div>

          <p className="text-sm text-slate-500">
            Secure • Reliable • Privacy focused
          </p>

        </div>

        {/* Bottom */}

        <div className="flex flex-col gap-4 py-7 text-sm sm:flex-row sm:items-center sm:justify-between">

          <p className="text-slate-500">
            © {new Date().getFullYear()} FocusGuard AI. All rights reserved.
          </p>

          <div className="flex items-center gap-6">

            <a
              href="#"
              className="text-slate-500 transition hover:text-white"
            >
              Privacy
            </a>

            <a
              href="#"
              className="text-slate-500 transition hover:text-white"
            >
              Terms
            </a>

            <a
              href="#"
              className="text-slate-500 transition hover:text-white"
            >
              Security
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;