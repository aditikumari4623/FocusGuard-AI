import {
  Check,
  ArrowRight,
  UserRound,
  UsersRound,
  Building2,
} from "lucide-react";

import { Link } from "react-router-dom";

const plans = [
  {
    icon: UserRound,
    name: "Individual",
    label: "For Employees",
    description:
      "Everything you need to understand your productivity and build better focus habits.",
    features: [
      "Personal productivity dashboard",
      "Smart Focus Planner",
      "Website and activity tracking",
      "Focus score and analytics",
      "AI productivity recommendations",
      "Smart notifications",
    ],
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
    buttonClass:
      "border border-cyan-200 text-cyan-700 hover:border-cyan-300 hover:bg-cyan-50",
  },
  {
    icon: UsersRound,
    name: "Team",
    label: "For Organizations",
    description:
      "Give team managers the visibility they need to understand productivity across their organization.",
    features: [
      "Everything in Individual",
      "Organization user management",
      "Team productivity analytics",
      "Individual user activity",
      "Organization-level insights",
      "Sub Admin dashboard",
    ],
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    buttonClass:
      "border border-indigo-200 text-indigo-700 hover:border-indigo-300 hover:bg-indigo-50",
    popular: true,
  },
  {
    icon: Building2,
    name: "Enterprise",
    label: "For Larger Organizations",
    description:
      "Centralized platform management and organization-wide visibility for larger teams.",
    features: [
      "Everything in Team",
      "Multiple organizations",
      "Super Admin dashboard",
      "Organization management",
      "Advanced platform analytics",
      "Dedicated organization workflows",
    ],
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    buttonClass:
      "border border-violet-200 text-violet-700 hover:border-violet-300 hover:bg-violet-50",
  },
];

const Pricing = () => {
  return (
    <section
      id="pricing"
      className="bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
            Pricing
          </span>

          <h2 className="mt-6 text-5xl font-bold tracking-tight text-slate-900">
            Choose The Right Experience For Your Team
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            FocusGuard AI is designed to scale from individual productivity
            to organization-wide attention intelligence.
          </p>

        </div>

        {/* Pricing Cards */}

        <div className="mt-20 grid gap-8 lg:grid-cols-3">

          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <div
                key={plan.name}
                className="
                  group
                  relative
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
                  hover:border-slate-300
                "
              >

                {/* Recommended Badge */}

                {plan.popular && (
                  <div className="absolute right-6 top-6 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                    Recommended
                  </div>
                )}

                {/* Icon */}

                <div
                  className={`
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    ${plan.iconBg}
                    ${plan.iconColor}
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  `}
                >
                  <Icon size={30} />
                </div>

                {/* Plan */}

                <p
                  className={`
                    mt-7
                    text-sm
                    font-semibold
                    ${plan.iconColor}
                  `}
                >
                  {plan.label}
                </p>

                <h3 className="mt-2 text-3xl font-bold text-slate-900">
                  {plan.name}
                </h3>

                <p className="mt-4 min-h-[84px] leading-7 text-slate-600">
                  {plan.description}
                </p>

                {/* Divider */}

                <div className="my-7 border-t border-slate-200" />

                {/* Features */}

                <div className="flex-1 space-y-4">

                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3"
                    >
                      <div
                        className={`
                          mt-0.5
                          flex
                          h-5
                          w-5
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          ${plan.iconBg}
                          ${plan.iconColor}
                        `}
                      >
                        <Check
                          size={13}
                          strokeWidth={3}
                        />
                      </div>

                      <span className="text-sm leading-6 text-slate-600">
                        {feature}
                      </span>
                    </div>
                  ))}

                </div>

                {/* Contact Button */}

                <Link
                  to="/contact"
                  className={`
                    mt-8
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    px-5
                    py-3
                    font-semibold
                    transition-all
                    duration-300
                    ${plan.buttonClass}
                  `}
                >
                  Contact Us

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

              </div>
            );
          })}

        </div>

        {/* Bottom Note */}

        <div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">

          <p className="text-sm leading-7 text-slate-600">
            Pricing and deployment options can be customized according to
            organization size, requirements, and platform usage.
          </p>

          <Link
            to="/contact"
            className="mt-3 inline-flex items-center gap-2 font-semibold text-indigo-600 transition hover:text-indigo-700"
          >
            Talk to our team

            <ArrowRight size={17} />
          </Link>

        </div>

      </div>
    </section>
  );
};

export default Pricing;