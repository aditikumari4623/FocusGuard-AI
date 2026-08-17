import {
  Globe,
  BarChart3,
  BrainCircuit,
  Target,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Track Activity",
    description:
      "The Chrome Extension securely tracks websites, tab switches, and active work sessions.",
    icon: Globe,
  },
  {
    number: "02",
    title: "Analyze Behaviour",
    description:
      "FocusGuard AI processes productivity metrics, focus score, and activity patterns.",
    icon: BarChart3,
  },
  {
    number: "03",
    title: "Generate AI Insights",
    description:
      "Our AI analyzes your work habits and generates personalized recommendations.",
    icon: BrainCircuit,
  },
  {
    number: "04",
    title: "Stay Focused",
    description:
      "Receive reminders, planner guidance, and productivity insights throughout the day.",
    icon: Target,
  },
];

const HowItWorks = () => {
  return (
    <section className="relative bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}

        <div className="text-center">

          <span className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
            Workflow
          </span>

          <h2 className="mt-6 text-5xl font-bold tracking-tight text-slate-900">
            How FocusGuard AI Works
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600">
            A seamless workflow that transforms browsing activity into
            actionable productivity insights.
          </p>

        </div>

        {/* Steps */}

        <div className="mt-20 grid gap-8 lg:grid-cols-4">

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="
                  group
                  relative
                  rounded-3xl
                  border
                  border-slate-200
                  bg-white
                  p-8
                  shadow-sm
                  transition-all
                  duration-300
                  hover:border-indigo-300
                  hover:bg-indigo-50/60
                  hover:shadow-[0_12px_35px_rgba(79,70,229,0.12)]
                "
              >

                {/* Number */}

                <span
                  className="
                    absolute
                    right-6
                    top-6
                    text-5xl
                    font-bold
                    tracking-tight
                    text-indigo-100
                    transition-colors
                    duration-300
                    group-hover:text-indigo-200
                  "
                >
                  {step.number}
                </span>

                {/* Icon */}

                <div
                  className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-indigo-100
                    text-indigo-600
                    transition-all
                    duration-300
                    group-hover:bg-indigo-600
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
                    group-hover:text-indigo-700
                  "
                >
                  {step.title}
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
                  {step.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default HowItWorks;