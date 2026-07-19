import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { Footer } from '../components/layout/Footer';
import { pageTransition } from '../components/ui/motion';

export function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream">
      <div className="flex">
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((c) => !c)}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <Navbar onMenuClick={() => setMobileOpen(true)} />
          <motion.main
            {...pageTransition}
            className="flex-1 px-4 py-6 sm:px-6 lg:px-8"
          >
            <div className="mx-auto max-w-7xl">
              <Outlet />
            </div>
          </motion.main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
