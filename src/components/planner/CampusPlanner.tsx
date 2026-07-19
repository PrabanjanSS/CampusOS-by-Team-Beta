import PlannerHeader from "../../components/planner/PlannerHeader";

import CalendarView from "../../components/planner/CalendarView";

export default function CampusPlanner() {
  return (
    <div className="min-h-screen bg-[#F8F6F2] p-8">

      <PlannerHeader />

      <div className="grid grid-cols-12 gap-8">

        <div className="col-span-9">
          <CalendarView />
        </div>

        <div className="col-span-3">

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-xl font-semibold mb-6">

              Upcoming Events

            </h2>

            <div className="space-y-4">

              <div className="border-l-4 border-green-500 pl-4">

                <p className="font-semibold">

                  AI Workshop

                </p>

                <p className="text-sm text-slate-500">

                  Jul 25 • 2 PM

                </p>

              </div>

              <div className="border-l-4 border-blue-500 pl-4">

                <p className="font-semibold">

                  CodeChef Contest

                </p>

                <p className="text-sm text-slate-500">

                  Jul 27 • 6 PM

                </p>

              </div>

              <div className="border-l-4 border-yellow-500 pl-4">

                <p className="font-semibold">

                  Faculty Meeting

                </p>

                <p className="text-sm text-slate-500">

                  Jul 29 • 10 AM

                </p>

              </div>

              <div className="border-l-4 border-red-500 pl-4">

                <p className="font-semibold">

                  Project Deadline

                </p>

                <p className="text-sm text-slate-500">

                  Jul 30

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}