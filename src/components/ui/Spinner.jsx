function Spinner({ size = "md", className = "" }) {
  const sizes = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-[3px]",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div
      className={`${sizes[size]} animate-spin rounded-full border-blue-600 border-t-transparent dark:border-blue-400 dark:border-t-transparent ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}

export default Spinner;

