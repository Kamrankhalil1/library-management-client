import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";

import memberService from "../../services/memberService";

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
          name: response.data.name,
          email: response.data.email,
          role: response.data.role,
        });
      } catch (error) {
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

      await memberService.updateProfile({
        name: formData.name,
      });

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10 text-slate-800 dark:text-slate-100">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-slate-800">
        <div className="mb-8 flex items-center gap-4">
          <FaUserCircle
            className="text-slate-500 dark:text-slate-400"
            size={70}
          />

          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
              My Profile
            </h1>

            <p className="text-gray-500 dark:text-slate-400">
              Manage your account information
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label className="mb-2 block font-medium text-slate-700 dark:text-slate-200">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-3 text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-slate-700 dark:text-slate-200">
              Email
            </label>

            <input
              type="email"
              value={formData.email}
              disabled
              className="w-full rounded-lg border border-gray-300 bg-gray-100 p-3 text-gray-600 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-slate-700 dark:text-slate-200">
              Role
            </label>

            <input
              type="text"
              value={formData.role}
              disabled
              className="w-full rounded-lg border border-gray-300 bg-gray-100 p-3 capitalize text-gray-600 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            {saving ? "Saving..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;