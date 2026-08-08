import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaUserCircle,
  FaUser,
  FaEnvelope,
  FaShieldAlt,
  FaSave,
} from "react-icons/fa";

import memberService from "../../services/memberService";
import PageHeader from "../../components/ui/PageHeader";
import StatusBadge from "../../components/ui/StatusBadge";
import Spinner from "../../components/ui/Spinner";

function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await memberService.getProfile();
        setFormData({
          name: response.data.name || "",
          email: response.data.email || "",
          role: response.data.role || "",
        });
} catch {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await memberService.updateProfile({ name: formData.name });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  const inputStyles =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500";
  const disabledInputStyles =
    "w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400";

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-9 w-40 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="h-40 animate-pulse bg-gradient-to-r from-blue-500 to-indigo-600" />
          <div className="flex flex-col items-center px-6 pb-8">
            <div className="-mt-12 h-24 w-24 animate-pulse rounded-full border-4 border-white bg-slate-200 dark:border-slate-900 dark:bg-slate-700" />
            <div className="mt-4 h-6 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            <div className="mt-2 h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 fade-in">
      <PageHeader
        title="My Profile"
        subtitle="Manage your account information"
        icon={<FaUserCircle className="text-2xl" />}
      />

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
        {/* Card Header / Banner */}
        <div className="relative h-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 sm:h-40">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 right-20 h-32 w-32 rounded-full bg-purple-500/20 blur-xl" />
        </div>

        <div className="px-6 pb-8 sm:px-10">
          {/* Avatar */}
          <div className="-mt-12 mb-6 flex flex-col items-center sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col items-center sm:flex-row sm:items-center sm:gap-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl dark:border-slate-900 sm:h-28 sm:w-28">
                <FaUserCircle className="text-5xl sm:text-6xl" />
              </div>
              <div className="mt-4 text-center sm:mt-0 sm:text-left">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
                    {formData.name}
                  </h2>
                </div>
                <div className="mt-1.5 flex items-center justify-center gap-2 sm:justify-start">
                  <StatusBadge status={formData.role} />
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    Account Member
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="space-y-6 border-t border-slate-100 pt-8 dark:border-slate-800">
            {/* Name */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`${inputStyles} pl-11`}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className={`${disabledInputStyles} pl-11`}
                />
              </div>
              <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
                Email cannot be changed.
              </p>
            </div>

            {/* Role */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Role
              </label>
              <div className="relative">
                <FaShieldAlt className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  disabled
                  className={`${disabledInputStyles} pl-11 capitalize`}
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end border-t border-slate-100 pt-6 dark:border-slate-800">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-500 hover:shadow-blue-500/40 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <Spinner size="sm" className="border-white" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave />
                    Update Profile
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
