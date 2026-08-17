import {
  UserRound,
  UsersRound,
  Building2,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { Link } from "react-router-dom";

const solutions = [
  {
    icon: UserRound,
    badge: "For Employees",
    title: "Work with more focus",
    description:
      "Understand your digital work habits, plan focused sessions, reduce distractions, and receive personalized AI recommendations.",
    features: [
      "Personal productivity analytics",
      "Smart focus planner",
      "Website and activity tracking",
      "AI-powered recommendations",
      "Focus reminders and notifications",
    ],
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
    hoverBorder: "hover:border-cyan-300",
    hoverBg: "hover:bg-cyan-50/50",
  },
  {
    icon: UsersRound,
    badge: "For Sub Admins",
    title: "Manage your team effectively",
    description:
      "Get organization-level visibility into user activity, productivity trends, focus scores, and team performance.",
    features: [
      "Organization user management",
      "User activity monitoring",
      "Team productivity analytics",
      "Individual user activity details",
      "AI-powered organization insights",
    ],
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    hoverBorder: "hover:border-indigo-300",
    hoverBg: "hover:bg-indigo-50/50",
  },
  {
    icon: Building2,
    badge: "For Super Admins",
    title: "Manage the entire platform",
    description:
      "Manage organizations, administrators, users, requests, and platform-wide productivity insights from one centralized dashboard.",
    features: [
      "Organization management",
      "Sub Admin assignment",
      "Platform-wide user management",
      "Organization deactivation workflow",
      "Organization productivity insights",
    ],
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    hoverBorder: "hover:border-violet-300",
    hoverBg: "hover:bg-violet-50/50",
  },
];

const Solutions = () => {
  return (
    <section
      id="solutions"
      className="bg-slate-50 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
            Solutions
          </span>

          <h2 className="mt-6 text-5xl font-bold tracking-tight text-slate-900">
            Built For Every Level Of Your Organization
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            FocusGuard AI provides role-specific tools that help employees,
            team managers, and platform administrators work with better
            visibility and focus.
          </p>

        </div>

        {/* Solution Cards */}

        <div className="mt-20 grid gap-8 lg:grid-cols-3">

          {solutions.map((solution) => {
            const Icon = solution.icon;

            return (
              <div
                key={solution.badge}
                className={`
                  group
                  flex
                  h-full
                  flex-col
                  rounded-3xl
                  border
                  border-slate-200
                  bg-white
                  p-8
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_12px_35px_rgba(15,23,42,0.08)]
                  ${solution.hoverBorder}
                  ${solution.hoverBg}
                `}
              >

                {/* Icon */}

                <div
                  className={`
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    ${solution.iconBg}
                    ${solution.iconColor}
                    transition-all
                    duration-300
                    group-hover:scale-105
                  `}
                >
                  <Icon size={30} />
                </div>

                {/* Badge */}

                <span
                  className={`
                    mt-7
                    w-fit
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    ${solution.iconBg}
                    ${solution.iconColor}
                  `}
                >
                  {solution.badge}
                </span>

                {/* Title */}

                <h3 className="mt-5 text-2xl font-bold text-slate-900">
                  {solution.title}
                </h3>

                {/* Description */}

                <p className="mt-4 leading-7 text-slate-600">
                  {solution.description}
                </p>

                {/* Features */}

                <div className="mt-7 flex-1 space-y-3">

                  {solution.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2
                        size={19}
                        className={`mt-0.5 shrink-0 ${solution.iconColor}`}
                      />

                      <span className="text-sm leading-6 text-slate-600">
                        {feature}
                      </span>
                    </div>
                  ))}

                </div>

                {/* CTA */}

                <Link
                  to="/login"
                  className={`
                    mt-8
                    inline-flex
                    items-center
                    gap-2
                    font-semibold
                    ${solution.iconColor}
                    transition-all
                    duration-300
                    group-hover:gap-3
                  `}
                >
                  Get Started

                  <ArrowRight size={18} />
                </Link>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default Solutions;