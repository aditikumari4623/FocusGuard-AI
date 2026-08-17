import {
  Brain,
  CalendarCheck,
  BellRing,
  Building2,
  Globe,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: CalendarCheck,
    title: "Smart Focus Planner",
    description:
      "Plan your day with structured focus sessions and monitor progress in real time.",
  },
  {
    icon: Brain,
    title: "AI Recommendations",
    description:
      "Receive intelligent suggestions based on your productivity patterns and work habits.",
  },
  {
    icon: Globe,
    title: "Website Tracking",
    description:
      "Automatically classify websites and understand how your browsing impacts focus.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Visualize focus scores, productivity trends, and daily performance with interactive analytics.",
  },
  {
    icon: Building2,
    title: "Organization Dashboard",
    description:
      "Enable administrators to monitor team productivity and organizational insights.",
  },
  {
    icon: BellRing,
    title: "Smart Notifications",
    description:
      "Receive AI-powered reminders whenever your attention drifts from planned work.",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="text-sm font-semibold uppercase tracking-widest text-cyan-600">
            Features
          </span>

          <h2 className="mt-6 text-5xl font-bold tracking-tight text-slate-900">
            Everything You Need To Stay Focused
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            FocusGuard AI combines artificial intelligence,
            productivity analytics, browser tracking,
            and personalized recommendations into one platform.
          </p>

        </div>

        {/* Feature Cards */}

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="
                  group
                  rounded-3xl
                  border
                  border-slate-200
                  bg-white
                  p-8
                  shadow-sm
                  transition-all
                  duration-300
                  hover:border-cyan-300
                  hover:bg-cyan-50/50
                  hover:shadow-[0_12px_35px_rgba(6,182,212,0.12)]
                "
              >

                {/* Icon */}

                <div
                  className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-cyan-100
                    text-cyan-600
                    transition-all
                    duration-300
                    group-hover:bg-cyan-600
                    group-hover:text-white
                  "
                >
                  <Icon size={30} />
                </div>

                {/* Title */}

                <h3
                  className="
                    mt-8
                    text-2xl
                    font-semibold
                    text-slate-900
                    transition-colors
                    duration-300
                    group-hover:text-cyan-700
                  "
                >
                  {feature.title}
                </h3>

                {/* Description */}

                <p
                  className="
                    mt-4
                    leading-7
                    text-slate-600
                    transition-colors
                    duration-300
                    group-hover:text-slate-700
                  "
                >
                  {feature.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default Features;