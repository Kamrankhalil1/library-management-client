import { Link } from "react-router-dom";
import { FaBookOpen, FaHome, FaArrowLeft, FaSearch } from "react-icons/fa";

function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-slate-950 px-4 text-center">
      {/* Ambient Glows */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[400px] w-[400px] animate-pulse rounded-full bg-blue-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[400px] w-[400px] animate-pulse rounded-full bg-indigo-500/15 blur-[100px]" />

      {/* Book Icon */}
      <div className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-2xl shadow-blue-500/30">
        <FaBookOpen className="text-5xl" />
        <div className="absolute -inset-px -z-10 animate-pulse rounded-3xl bg-blue-500/30 blur-xl" />
      </div>

      {/* 404 */}
      <p className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-7xl font-black tracking-tight text-transparent sm:text-9xl">
        404
      </p>

      <h1 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-4xl">
        Page Not Found
      </h1>

      <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400 sm:text-base">
        The page you are looking for doesn't exist or has been moved. Let's get
        you back on track.
      </p>

      {/* CTA Buttons */}
      <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
        <Link
          to="/"
          className="group flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 active:scale-95"
        >
          <FaHome className="transition-transform group-hover:scale-110" />
          Back to Home
        </Link>

        <Link
          to="/books"
          className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 active:scale-95"
        >
          <FaSearch /> Browse Books
        </Link>
      </div>

      {/* Back link variant */}
      <Link
        to="/login"
        className="mt-6 inline-flex items-center gap-1.5 text-xs text-slate-400 transition hover:text-blue-400"
      >
        <FaArrowLeft className="text-[10px]" />
        Go to Login
      </Link>
    </div>
  );
}

export default NotFound;
