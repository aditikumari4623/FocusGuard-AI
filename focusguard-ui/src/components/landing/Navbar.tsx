import { motion } from "framer-motion";
import { Moon } from "lucide-react";
import { Link } from "react-router-dom";

import Logo from "../common/Logo";
import LanguageSelector from "../common/LanguageSelector";

const Navbar = () => {
  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="
        sticky
        top-0
        z-50
        border-b
        border-slate-200/70
        bg-white/80
        backdrop-blur-xl
        dark:border-slate-800
        dark:bg-slate-900/80
      "
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}

        <Logo />

        {/* Navigation */}

        <nav className="hidden items-center gap-10 text-sm font-medium text-slate-600 dark:text-slate-300 lg:flex">

          {/* Features */}

          <a
            href="#features"
            className="transition hover:text-indigo-600"
          >
            Features
          </a>

          {/* Solutions */}

          <a
            href="#solutions"
            className="transition hover:text-indigo-600"
          >
            Solutions
          </a>

          {/* Pricing */}

          <a
            href="#pricing"
            className="transition hover:text-indigo-600"
          >
            Pricing
          </a>

          {/* About */}

          <Link
            to="/about"
            className="transition hover:text-indigo-600"
          >
            About
          </Link>

        </nav>

        {/* Right */}

        <div className="flex items-center gap-3">

          {/* Language */}

          <LanguageSelector />

          {/* Theme */}

          <button
            type="button"
            className="rounded-xl p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Moon size={18} />
          </button>

          {/* Login */}

          <Link
            to="/login"
            className="rounded-xl px-4 py-2 transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Login
          </Link>

          {/* Get Started */}

          <Link
            to="/login"
            className="rounded-xl bg-indigo-600 px-5 py-2 text-white transition hover:bg-indigo-700"
          >
            Get Started
          </Link>

        </div>

      </div>
    </motion.header>
  );
};

export default Navbar;