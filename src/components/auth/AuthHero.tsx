import { motion } from "framer-motion";
import {
 
  CalendarDays,
  Trophy,
  FolderKanban,
  Users,
} from "lucide-react";

import { APP_NAME, APP_TAGLINE } from "../../utils/constants";
import { AuroraBackground } from "../layout/AuroraBackground";

export default function AuthHero() {
  return (
    <div className="relative hidden overflow-hidden bg-gradient-to-br from-navy-800 via-navy to-navy-400 lg:flex lg:flex-col lg:justify-between lg:p-12">

      <AuroraBackground />

      <div className="absolute inset-0 bg-navy-radial opacity-60" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative flex items-center gap-3 text-white"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
  <img
    src="/favicon.png"
    alt="CampusOS"
    className="h-8 w-8 object-contain"
  />
</div>

        <div>
          <h2 className="text-xl font-bold">
            {APP_NAME}
          </h2>

          <p className="text-sm text-white/60">
            {APP_TAGLINE}
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: .2 }}
        className="relative max-w-md text-white"
      >

        <h1 className="text-5xl font-bold leading-tight">
          Manage Every Club
          <br />
          From One Place.
        </h1>

        <p className="mt-5 text-lg text-white/70">
          CampusOS helps students, club leads and faculty
          collaborate through events, projects, polls,
          announcements and much more.
        </p>

        <div className="mt-10 space-y-5">

          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-yellow-300" />
            <span>Plan & manage club events</span>
          </div>

          <div className="flex items-center gap-3">
            <FolderKanban className="h-5 w-5 text-green-300" />
            <span>Track projects collaboratively</span>
          </div>

          <div className="flex items-center gap-3">
            <Trophy className="h-5 w-5 text-orange-300" />
            <span>Leaderboard & achievements</span>
          </div>

          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-blue-300" />
            <span>Role-based club management</span>
          </div>

        </div>

      </motion.div>

      <p className="relative text-sm text-white/40">
        © 2026 CampusOS
      </p>

    </div>
  );
}
