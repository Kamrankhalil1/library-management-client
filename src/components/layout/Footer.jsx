import {
  FaGithub,
  FaLinkedin,
  FaReact,
  FaNodeJs,
  FaBookOpen,
  FaHeart,
} from "react-icons/fa";
import { SiExpress, SiMongodb, SiTailwindcss } from "react-icons/si";

function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/Kamrankhalil1/",
      icon: <FaGithub />,
      color:
        "hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/kamran-khalil-950963266/",
      icon: <FaLinkedin />,
      color: "hover:bg-[#0A66C2] hover:text-white",
    },
  ];

  const techStack = [
    { name: "React", icon: <FaReact className="text-cyan-400" /> },
    { name: "Node.js", icon: <FaNodeJs className="text-emerald-500" /> },
    { name: "Express", icon: <SiExpress className="text-slate-700 dark:text-slate-200" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-emerald-500" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-sky-400" /> },
  ];

  return (
    <footer className="relative border-t border-slate-200/80 bg-white/80 backdrop-blur-md transition-colors duration-300 dark:border-slate-800/80 dark:bg-slate-950/80">
      {/* Top Accent Line */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 text-center sm:text-left md:grid-cols-3 md:items-center">
          
          {/* Section 1: Branding & Description */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2.5 sm:justify-start">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20 dark:bg-blue-500">
                <FaBookOpen className="text-lg" />
              </span>
              <h2 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
                Library System
              </h2>
            </div>
            <p className="mx-auto max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:mx-0">
              A responsive full-stack platform designed to manage books,
              members, and borrowing workflows efficiently.
            </p>
          </div>

          {/* Section 2: Tech Stack */}
          <div className="flex flex-col items-center justify-center">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Built With MERN Stack
            </h3>
            <div className="flex items-center justify-center gap-4 rounded-full bg-slate-100/80 px-5 py-2.5 dark:bg-slate-900/60 dark:ring-1 dark:ring-slate-800">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="group relative flex items-center justify-center text-2xl transition-transform duration-200 hover:-translate-y-1 hover:scale-110 cursor-pointer"
                >
                  {tech.icon}

                  {/* Enhanced Tooltip */}
                  <div className="pointer-events-none absolute -top-9 flex flex-col items-center opacity-0 transition-all duration-200 group-hover:-translate-y-1 group-hover:opacity-100 z-20">
                    <span className="whitespace-nowrap rounded-md bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-white shadow-lg dark:bg-slate-700">
                      {tech.name}
                    </span>
                    <div className="-mt-1 border-4 border-transparent border-t-slate-800 dark:border-t-slate-700" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Social & Connect */}
          <div className="flex flex-col items-center space-y-3 sm:items-center md:items-end">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Connect With Developer
            </h3>
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-lg text-slate-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-900 dark:text-slate-300 dark:hover:text-white ${link.color}`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-100 bg-slate-50/50 px-4 py-4 dark:border-slate-900/80 dark:bg-slate-950/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 sm:flex-row">
          
          <p className="text-center sm:text-left">
            © {currentYear} <span className="font-medium text-slate-700 dark:text-slate-300">Kamran Khalil</span>. All Rights Reserved.
          </p>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-950/60 dark:text-blue-300 dark:ring-blue-400/20">
              v1.0.0
            </span>
            <span className="flex items-center gap-1.5">
              Made with <FaHeart className="text-xs text-red-500 animate-pulse" /> by Kamran
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;