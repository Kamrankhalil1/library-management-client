import Spinner from "./Spinner";

function Loader({ label = "Loading...", fullScreen = false }) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className="absolute inset-0 animate-ping rounded-full bg-blue-500/20" />
        <Spinner size="lg" className="relative" />
      </div>
      <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
        {label}
      </p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        {content}
      </div>
    );
  }

  return (
    <div className="flex h-64 w-full items-center justify-center">
      {content}
    </div>
  );
}

export default Loader;

