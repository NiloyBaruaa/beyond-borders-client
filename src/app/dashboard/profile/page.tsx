"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StudentProfile() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    dob: "",
    address: "",
    currentUniversity: "",
    targetCountry: "",
    passportNo: "",
  });
  const [passForm, setPassForm] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [passStatus, setPassStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("bootcamp_token")}`,
          },
        },
      );
      const data = await res.json();
      setStudentName(data.name);
      if (data.personalDetails) setFormData(data.personalDetails);
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/auth/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("bootcamp_token")}`,
          },
          body: JSON.stringify(formData),
        },
      );
      alert("Profile updated successfully!");
    } catch (e) {
      alert("Error saving profile");
    }
    setSaving(false);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassStatus("Verifying encryption...");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/auth/change-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("bootcamp_token")}`,
          },
          body: JSON.stringify(passForm),
        },
      );
      const data = await res.json();
      if (res.ok) {
        setPassStatus("✅ " + data.message);
        setPassForm({ currentPassword: "", newPassword: "" });
      } else {
        setPassStatus("❌ " + data.message);
      }
    } catch (e) {
      setPassStatus("❌ Error updating password");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#050505] text-white flex justify-center items-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col">
      <header className="px-8 py-4 bg-[#0a0a0a] border-b border-gray-800 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wider text-primaryAccent">
          Recruit Profile
        </h1>
        <button
          onClick={() => router.push("/dashboard")}
          className="text-sm bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded"
        >
          Back to Dashboard
        </button>
      </header>

      <main className="flex-1 p-8">
        <div className="max-w-3xl mx-auto bg-cardBg border border-gray-800 rounded-xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold mb-2">
            Personal Intelligence File
          </h2>
          <p className="text-gray-400 mb-8">
            Commander requires these details for visa and university
            applications. Keep them accurate.
          </p>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) =>
                    setFormData({ ...formData, dob: e.target.value })
                  }
                  className="w-full bg-darkBg border border-gray-700 p-3 rounded"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Passport Number
                </label>
                <input
                  type="text"
                  value={formData.passportNo}
                  onChange={(e) =>
                    setFormData({ ...formData, passportNo: e.target.value })
                  }
                  className="w-full bg-darkBg border border-gray-700 p-3 rounded"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Current University / College
                </label>
                <input
                  type="text"
                  value={formData.currentUniversity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentUniversity: e.target.value,
                    })
                  }
                  className="w-full bg-darkBg border border-gray-700 p-3 rounded"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Target European Country
                </label>
                <input
                  type="text"
                  value={formData.targetCountry}
                  onChange={(e) =>
                    setFormData({ ...formData, targetCountry: e.target.value })
                  }
                  className="w-full bg-darkBg border border-gray-700 p-3 rounded"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Full Home Address
              </label>
              <textarea
                rows={3}
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full bg-darkBg border border-gray-700 p-3 rounded"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="bg-primaryAccent hover:bg-purple-500 text-white font-bold py-3 px-8 rounded shadow-lg transition"
            >
              {saving ? "Encrypting Data..." : "Save Profile Intelligence"}
            </button>
          </form>
        </div>

        <div className="max-w-3xl mx-auto bg-[#0d0d0d] border border-gray-800 rounded-xl p-8 shadow-xl mt-8">
          <h2 className="text-xl font-bold mb-2 text-warningRed">
            Security Core
          </h2>
          <p className="text-gray-400 mb-6 text-sm">
            Update your access credentials. Do not share your password; system
            fingerprinting will lock your account.
          </p>

          {passStatus && (
            <div className="mb-4 text-sm font-bold text-white bg-gray-800 p-3 rounded">
              {passStatus}
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={passForm.currentPassword}
                  onChange={(e) =>
                    setPassForm({
                      ...passForm,
                      currentPassword: e.target.value,
                    })
                  }
                  className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white outline-none focus:border-warningRed"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  value={passForm.newPassword}
                  onChange={(e) =>
                    setPassForm({ ...passForm, newPassword: e.target.value })
                  }
                  className="w-full bg-darkBg border border-gray-700 p-3 rounded text-white outline-none focus:border-warningRed"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-darkBg border border-warningRed text-warningRed hover:bg-warningRed hover:text-white font-bold py-3 px-8 rounded transition"
            >
              Update Password
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
