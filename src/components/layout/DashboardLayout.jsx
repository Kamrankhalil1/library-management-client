import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

function DashboardLayout() {
  return (
    <div className="flex min-h-dvh bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Container - min-w-0 prevents layout breakage from wide child content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top Navbar */}
        <Navbar />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default DashboardLayout;