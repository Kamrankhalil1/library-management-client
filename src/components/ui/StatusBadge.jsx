function StatusBadge({ status, className = "" }) {
  const styles = {
    borrowed: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    returned: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
    overdue: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    available: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
    out: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    admin: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
    member: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  };

  const labelMap = {
    borrowed: "Borrowed",
    returned: "Returned",
    overdue: "Overdue",
    available: "Available",
    out: "Out of Stock",
    admin: "Admin",
    member: "Member",
  };

  const key = status?.toLowerCase?.() || "";
  const label = labelMap[key] || status;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${styles[key] || styles.borrowed} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {label}
    </span>
  );
}

export default StatusBadge;

