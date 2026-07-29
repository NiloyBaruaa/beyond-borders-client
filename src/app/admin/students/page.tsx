"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StudentRoster() {
  const router = useRouter();
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/admin/students`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("bootcamp_token")}`,
          },
        },
      );
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleResetDevice = async (id: string) => {
    if (
      !confirm(
        "Reset this student's device lock? They will be able to log in from a new device.",
      )
    )
      return;
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/admin/reset-device/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("bootcamp_token")}`,
          },
        },
      );
      fetchStudents(); // Refresh list
    } catch (err) {
      alert("Error resetting device.");
    }
  };

  const handleTerminate = async (id: string) => {
    if (
      !confirm(
        "CRITICAL: Are you sure you want to completely delete this student? This cannot be undone.",
      )
    )
      return;
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/admin/students/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("bootcamp_token")}`,
          },
        },
      );
      fetchStudents(); // Refresh list
    } catch (err) {
      alert("Error terminating student.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        Loading Roster...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-6">
          <h1 className="text-3xl font-bold text-white">
            Student <span className="text-primaryAccent">Roster</span>
          </h1>
          <button
            onClick={() => router.push("/admin/system")}
            className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded transition"
          >
            Back to System Core
          </button>
        </div>

        <div className="bg-cardBg rounded-xl border border-gray-800 overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead className="bg-[#111] border-b border-gray-800 text-xs uppercase text-gray-400">
              <tr>
                <th className="p-4">Recruit Name</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Progress (Gems)</th>
                <th className="p-4">Security Status</th>
                <th className="p-4 text-right">Commander Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {Array.isArray(students) &&
                students.map((student: any) => (
                  <tr
                    key={student._id}
                    className="hover:bg-gray-900/50 transition"
                  >
                    <td className="p-4">
                      <div
                        onClick={() =>
                          router.push(`/admin/students/${student._id}`)
                        }
                        className="font-bold text-white cursor-pointer hover:text-primaryAccent transition"
                      >
                        {student.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        ID: BB-{student._id.substring(0, 6)}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-gray-300">
                        {student.email}
                      </div>
                      <div className="text-xs text-gray-500">
                        {student.phone}
                      </div>
                    </td>
                    <td className="p-4 text-sm font-bold text-primaryAccent">
                      💎 {student.gems}
                    </td>
                    <td className="p-4">
                      {student.deviceFlagged ? (
                        <span className="bg-warningRed/20 text-warningRed text-xs font-bold px-3 py-1 rounded border border-warningRed/50 animate-pulse">
                          🚨 SHARED ACCOUNT
                        </span>
                      ) : student.deviceId ? (
                        <span className="bg-successGreen/20 text-successGreen text-xs font-bold px-3 py-1 rounded">
                          🔒 Device Locked
                        </span>
                      ) : (
                        <span className="bg-gray-800 text-gray-400 text-xs font-bold px-3 py-1 rounded">
                          Pending Login
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleResetDevice(student._id)}
                        className="bg-darkBg border border-gray-700 hover:border-neonBlue text-neonBlue px-3 py-1.5 rounded text-xs font-bold transition"
                        title="Allow login from a new device"
                      >
                        Reset Device
                      </button>
                      <button
                        onClick={() => handleTerminate(student._id)}
                        className="bg-warningRed hover:bg-red-600 text-white px-3 py-1.5 rounded text-xs font-bold transition shadow-lg"
                      >
                        Terminate
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {students.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No students enrolled yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
