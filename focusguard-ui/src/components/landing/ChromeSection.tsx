import {
  Monitor,
  Globe,
  FolderOpen,
  Activity,
  BellRing,
  CheckCircle2,
} from "lucide-react";

const ChromeSection = () => {
  return (
    <section className="bg-slate-50 py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-20 px-6 lg:grid-cols-2">

        {/* Left */}

        <div>

          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Browser Extension
          </span>

          <h2 className="mt-6 text-5xl font-bold tracking-tight">
            Automatic Website
            <br />
            Tracking
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            The FocusGuard AI browser extension automatically
            detects websites, monitors active work sessions,
            classifies browsing behaviour, and synchronizes
            productivity data with your dashboard.
          </p>

          <div className="mt-10 space-y-5">

            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-600" />
              <span>Automatic Website Detection</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-600" />
              <span>Website Categorization</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-600" />
              <span>Tab Switching Detection</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-600" />
              <span>Idle / Active Monitoring</span>
            </div>

          </div>

        </div>

        {/* Right */}

        <div className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-2xl">

          <div className="flex items-center gap-3 border-b pb-5">

            <Monitor className="text-green-600" />

            <div>

              <h3 className="font-semibold">
                FocusGuard AI
              </h3>

              <p className="text-sm text-slate-500">
                Browser Extension
              </p>

            </div>

          </div>

          {/* Status */}

          <div className="mt-6 rounded-2xl bg-green-50 p-4">

            <div className="flex items-center gap-3">

              <Activity className="text-green-600" />

              <div>

                <h4 className="font-semibold">
                  Tracking Active
                </h4>

                <p className="text-sm text-slate-500">
                  Session running...
                </p>

              </div>

            </div>

          </div>

          {/* Website */}

          <div className="mt-5 rounded-2xl border p-5">

            <div className="flex items-center gap-3">

              <Globe className="text-indigo-600" />

              <div>

                <p className="text-sm text-slate-500">
                  Current Website
                </p>

                <h4 className="font-semibold">
                  github.com
                </h4>

              </div>

            </div>

          </div>

          {/* Category */}

          <div className="mt-5 rounded-2xl border p-5">

            <div className="flex items-center gap-3">

              <FolderOpen className="text-cyan-600" />

              <div>

                <p className="text-sm text-slate-500">
                  Category
                </p>

                <h4 className="font-semibold">
                  Development
                </h4>

              </div>

            </div>

          </div>

          {/* Notification */}

          <div className="mt-5 rounded-2xl bg-indigo-50 p-5">

            <div className="flex items-center gap-3">

              <BellRing className="text-indigo-600" />

              <div>

                <h4 className="font-semibold">
                  AI Reminder
                </h4>

                <p className="text-sm text-slate-600">
                  Stay focused on your planned task.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ChromeSection;