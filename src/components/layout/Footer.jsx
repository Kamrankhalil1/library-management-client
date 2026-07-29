import {
  FaGithub,
  FaLinkedin,
  FaReact,
  FaNodeJs,
} from "react-icons/fa";

import { SiExpress, SiMongodb } from "react-icons/si";

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-8 py-8 md:flex-row">

        {/* Left */}

        <div>

          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            📚 Library Management System
          </h2>

          <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
            A modern full-stack library management platform built with
            React, Node.js, Express, and MongoDB.
          </p>

        </div>

        {/* Center */}

        <div className="text-center">

          <h3 className="mb-3 font-semibold text-slate-700 dark:text-slate-200">
            Built With
          </h3>

          <div className="flex justify-center gap-5 text-3xl">

            <FaReact className="text-cyan-500" />

            <FaNodeJs className="text-green-600" />

            <SiExpress className="text-slate-700 dark:text-white" />

            <SiMongodb className="text-green-500" />

          </div>

        </div>

        {/* Right */}

        <div className="text-center md:text-right">

          <h3 className="mb-3 font-semibold text-slate-700 dark:text-slate-200">
            Connect
          </h3>

          <div className="flex justify-center gap-4 md:justify-end">

            <a
              href="https://github.com/YOUR_GITHUB_USERNAME"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-slate-100 p-3 text-xl transition hover:scale-110 hover:bg-black hover:text-white dark:bg-slate-800"
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedin.com/in/YOUR_LINKEDIN_USERNAME"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-slate-100 p-3 text-xl text-blue-600 transition hover:scale-110 hover:bg-blue-600 hover:text-white dark:bg-slate-800"
            >
              <FaLinkedin />
            </a>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-slate-200 px-8 py-4 dark:border-slate-800">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-sm text-slate-500 dark:text-slate-400 md:flex-row">

          <p>
            © {new Date().getFullYear()} Library Management System.
            All Rights Reserved.
          </p>

          <div className="flex items-center gap-5">

            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
              Version 1.0.0
            </span>

            <span>
              Made with ❤️ using React & Node.js
            </span>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;