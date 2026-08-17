import {
  ArrowLeft,
  Mail,
  MessageCircle,
  Send,
  Clock,
  MapPin,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useState } from "react";

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* =========================
          Header
      ========================= */}

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

      {/* =========================
          Hero
      ========================= */}

      <section className="bg-white">

        <div className="mx-auto max-w-4xl px-6 py-20 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
            <MessageCircle size={32} />
          </div>

          <h1 className="mt-7 text-5xl font-extrabold tracking-tight">
            Contact Us
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Have a question about FocusGuard AI, your organization,
            or how the platform can help improve productivity?
            We'd love to hear from you.
          </p>

        </div>

      </section>

      {/* =========================
          Contact Section
      ========================= */}

      <main className="mx-auto max-w-6xl px-6 py-16">

        <div className="grid items-stretch gap-8 lg:grid-cols-2">

          {/* =========================
              Contact Information
          ========================= */}

          <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">

            <div>

              <span className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
                Get In Touch
              </span>

              <h2 className="mt-4 text-3xl font-bold">
                Let's talk about FocusGuard AI
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Whether you're an individual user, team manager,
                or organization administrator, our team can help
                you understand the platform and its capabilities.
              </p>

            </div>

            {/* Contact Details */}

            <div className="mt-10 space-y-5">

              {/* Email */}

              <div className="flex items-start gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-indigo-200 hover:bg-indigo-50/40">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                  <Mail size={21} />
                </div>

                <div>

                  <h3 className="font-semibold">
                    Email
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    support@focusguard.ai
                  </p>

                </div>

              </div>

              {/* Response Time */}

              <div className="flex items-start gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-cyan-200 hover:bg-cyan-50/40">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600">
                  <Clock size={21} />
                </div>

                <div>

                  <h3 className="font-semibold">
                    Response Time
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    We aim to respond within 1–2 business days.
                  </p>

                </div>

              </div>

              {/* Location */}

              <div className="flex items-start gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-violet-200 hover:bg-violet-50/40">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                  <MapPin size={21} />
                </div>

                <div>

                  <h3 className="font-semibold">
                    Location
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    FocusGuard AI — Digital Productivity Platform
                  </p>

                </div>

              </div>

            </div>

            {/* Bottom Message */}

            <div className="mt-auto pt-8">

              <div className="rounded-2xl bg-slate-50 p-5">

                <p className="text-sm leading-6 text-slate-600">
                  For organization-related questions, please include
                  your organization name and role so we can better
                  understand your request.
                </p>

              </div>

            </div>

          </div>

          {/* =========================
              Contact Form
          ========================= */}

          <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">

            <div>

              <span className="text-sm font-semibold uppercase tracking-widest text-cyan-600">
                Send A Message
              </span>

              <h2 className="mt-4 text-3xl font-bold">
                How can we help?
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Fill out the form below and tell us what you
                would like to know.
              </p>

            </div>

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-1 flex-col"
            >

              <div className="space-y-5">

                {/* Name */}

                <div>

                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    required
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-slate-300
                      bg-white
                      px-4
                      outline-none
                      transition
                      focus:border-indigo-500
                      focus:ring-4
                      focus:ring-indigo-100
                    "
                  />

                </div>

                {/* Email */}

                <div>

                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-slate-300
                      bg-white
                      px-4
                      outline-none
                      transition
                      focus:border-indigo-500
                      focus:ring-4
                      focus:ring-indigo-100
                    "
                  />

                </div>

                {/* Subject */}

                <div>

                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Subject
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="What would you like to discuss?"
                    required
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-slate-300
                      bg-white
                      px-4
                      outline-none
                      transition
                      focus:border-indigo-500
                      focus:ring-4
                      focus:ring-indigo-100
                    "
                  />

                </div>

                {/* Message */}

                <div>

                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="Write your message..."
                    required
                    className="
                      w-full
                      resize-none
                      rounded-xl
                      border
                      border-slate-300
                      bg-white
                      px-4
                      py-3
                      outline-none
                      transition
                      focus:border-indigo-500
                      focus:ring-4
                      focus:ring-indigo-100
                    "
                  />

                </div>

              </div>

              {/* Submit */}

              <div className="mt-auto pt-7">

                {submitted && (
                  <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
                    Thank you! Your message has been received.
                  </div>
                )}

                <button
                  type="submit"
                  className="
                    flex
                    h-12
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-indigo-600
                    font-semibold
                    text-white
                    transition
                    hover:bg-indigo-700
                  "
                >
                  <Send size={18} />
                  Send Message
                </button>

              </div>

            </form>

          </div>

        </div>

      </main>

      {/* =========================
          Footer
      ========================= */}

      <footer className="border-t border-slate-200 bg-white py-8">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © {new Date().getFullYear()} FocusGuard AI. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-5">

            <Link
              to="/about"
              className="transition hover:text-indigo-600"
            >
              About Us
            </Link>

            <Link
              to="/privacy"
              className="transition hover:text-indigo-600"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="transition hover:text-indigo-600"
            >
              Terms of Service
            </Link>

          </div>

        </div>

      </footer>

    </div>
  );
};

export default ContactPage;