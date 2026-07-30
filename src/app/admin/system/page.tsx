"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SystemCore() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [studentForm, setStudentForm] = useState({
    name: "",
    email: "",
    phone: "",
    tempPassword: "",
    batchNumber: 1,
  });
  const [studentStatus, setStudentStatus] = useState("");

  const [moduleForm, setModuleForm] = useState({
    moduleId: "",
    title: "",
    description: "",
    batchNumber: 1,
  });
  const [videoForm, setVideoForm] = useState({
    videoId: "",
    title: "",
    videoUrl: "",
    duration: "",
  });
  const [moduleStatus, setModuleStatus] = useState("");

  const [quizForm, setQuizForm] = useState({
    moduleId: "",
    questionId: "",
    question: "",
    opt0: "",
    opt1: "",
    opt2: "",
    opt3: "",
    correctIndex: "0",
  });
  const [quizStatus, setQuizStatus] = useState("");

  const [liveContent, setLiveContent] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("bootcamp_token");
    if (!token) router.push("/");
    fetchLiveContent();
    setLoading(false);
  }, [router]);
  const fetchLiveContent = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://https://beyond-borders-server.onrender.com/api"}/api/auth/modules`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("bootcamp_token")}`,
          },
        },
      );
      const data = await res.json();

      // FIX: Point specifically to data.modules before sorting!
      if (data && data.modules) {
        setLiveContent(
          data.modules.sort((a: any, b: any) => a.moduleId - b.moduleId),
        );
      } else {
        setLiveContent([]);
      }
    } catch (e) {
      console.error("Error fetching content", e);
    }
  };

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setStudentStatus("Generating account...");
    try {
      // NOTE: Ensure your backend has a /api/auth/register route for admin to create students!
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://https://beyond-borders-server.onrender.com/api"}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(studentForm),
        },
      );
      if (res.ok) {
        setStudentStatus(
          `✅ Success! Account created for ${studentForm.name}.`,
        );
        setStudentForm({ name: "", email: "", phone: "", tempPassword: "" });
      } else {
        setStudentStatus("❌ Error creating account.");
      }
    } catch (err) {
      setStudentStatus("❌ Server offline.");
    }
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setModuleStatus("Deploying Video...");
    try {
      const payload = {
        moduleId: parseInt(moduleForm.moduleId),
        title: moduleForm.title,
        description: moduleForm.description,
        batchNumber: parseInt(moduleForm.batchNumber.toString()), // <-- ADDED BATCH TAG
        newVideos: [
          {
            videoId: parseInt(videoForm.videoId),
            title: videoForm.title,
            videoUrl: videoForm.videoUrl,
            duration: videoForm.duration,
          },
        ],
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://https://beyond-borders-server.onrender.com/api"}/api/admin/add-content`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("bootcamp_token")}`,
          },
          body: JSON.stringify(payload),
        },
      );
      setModuleStatus("✅ Video Deployed!");
      fetchLiveContent();
    } catch (err) {
      setModuleStatus("❌ Error deploying content.");
    }
  };

  const handleAddQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuizStatus("Injecting Quiz Question...");
    try {
      const payload = {
        moduleId: parseInt(quizForm.moduleId),
        newQuizzes: [
          {
            questionId: parseInt(quizForm.questionId),
            question: quizForm.question,
            // Sending options as a clean array of strings
            options: [
              quizForm.opt0,
              quizForm.opt1,
              quizForm.opt2,
              quizForm.opt3,
            ],
            correctAnswerIndex: parseInt(quizForm.correctIndex),
          },
        ],
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://https://beyond-borders-server.onrender.com/api"}/api/admin/add-content`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("bootcamp_token")}`,
          },
          body: JSON.stringify(payload),
        },
      );
      setQuizStatus("✅ Question added successfully!");
      fetchLiveContent();
      // Keep Module ID, increment Question ID automatically
      setQuizForm({
        ...quizForm,
        questionId: (parseInt(quizForm.questionId) + 1).toString(),
        question: "",
        opt0: "",
        opt1: "",
        opt2: "",
        opt3: "",
      });
    } catch (err) {
      setQuizStatus("❌ Error adding question.");
    }
  };

  const handleDeleteModule = async (moduleId: number) => {
    if (
      !confirm(
        `WARNING: Are you sure you want to delete Module ${moduleId} completely?`,
      )
    )
      return;
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://https://beyond-borders-server.onrender.com/api"}/api/admin/module/${moduleId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("bootcamp_token")}`,
          },
        },
      );
      fetchLiveContent();
    } catch (e) {
      alert("Error deleting module");
    }
  };

  const handleDeleteQuiz = async (moduleId: number, questionId: number) => {
    if (!confirm(`Delete Question ${questionId} from Module ${moduleId}?`))
      return;
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://https://beyond-borders-server.onrender.com/api"}/api/admin/module/${moduleId}/quiz/${questionId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("bootcamp_token")}`,
          },
        },
      );
      fetchLiveContent();
    } catch (e) {
      alert("Error deleting quiz");
    }
  };

  if (loading) return <div className="min-h-screen bg-[#050505]"></div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-6">
          <h1 className="text-3xl font-bold text-warningRed">
            Staff Control Core
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => router.push("/admin/announcements")}
              className="bg-darkBg border border-neonBlue text-neonBlue hover:bg-neonBlue hover:text-white px-4 py-2 rounded text-sm font-bold transition"
            >
              Manage Broadcasts
            </button>
            <button
              onClick={() => router.push("/admin/helpdesk")}
              className="bg-darkBg border border-primaryAccent text-primaryAccent hover:bg-primaryAccent hover:text-white px-4 py-2 rounded text-sm font-bold transition"
            >
              Moderate Helpdesk
            </button>
            <button
              onClick={() => router.push("/admin/students")}
              className="bg-primaryAccent hover:bg-purple-600 px-4 py-2 rounded text-sm font-bold transition"
            >
              View Student Roster →
            </button>
            <button
              onClick={() => router.push("/admin/cohorts")}
              className="bg-darkBg border border-warningRed text-warningRed hover:bg-warningRed hover:text-white px-4 py-2 rounded text-sm font-bold transition"
            >
              Cohort & Live Routing
            </button>
            <button
              onClick={() => router.push("/admin/cms")}
              className="bg-darkBg border border-warningRed text-warningRed hover:bg-warningRed hover:text-white px-4 py-2 rounded text-sm font-bold transition"
            >
              CMS Control
            </button>
            <button
              onClick={() => router.push("/admin/staff")}
              className="bg-darkBg border border-warningRed text-warningRed hover:bg-warningRed hover:text-white px-4 py-2 rounded text-sm font-bold transition"
            >
              Staff
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* PANEL 1: RECRUIT GENERATOR */}
          <div className="bg-cardBg p-6 rounded-xl border border-gray-800">
            <h2 className="text-xl font-bold mb-4">
              1. Generate Recruit Access
            </h2>
            {studentStatus && (
              <div className="mb-4 text-sm font-bold text-primaryAccent">
                {studentStatus}
              </div>
            )}
            <form onSubmit={handleCreateStudent} className="space-y-4 text-sm">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={studentForm.name}
                onChange={(e) =>
                  setStudentForm({ ...studentForm, name: e.target.value })
                }
                className="w-full bg-darkBg border border-gray-700 p-3 rounded"
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={studentForm.email}
                onChange={(e) =>
                  setStudentForm({ ...studentForm, email: e.target.value })
                }
                className="w-full bg-darkBg border border-gray-700 p-3 rounded"
              />
              <input
                type="text"
                placeholder="Phone Number"
                required
                value={studentForm.phone}
                onChange={(e) =>
                  setStudentForm({ ...studentForm, phone: e.target.value })
                }
                className="w-full bg-darkBg border border-gray-700 p-3 rounded"
              />
              <input
                type="password"
                placeholder="Set Initial Password"
                required
                value={studentForm.tempPassword}
                onChange={(e) =>
                  setStudentForm({
                    ...studentForm,
                    tempPassword: e.target.value,
                  })
                }
                className="w-full bg-darkBg border border-gray-700 p-3 rounded"
              />
              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-400 w-1/2">
                  Assign to Cohort Batch:
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={studentForm.batchNumber}
                  onChange={(e) =>
                    setStudentForm({
                      ...studentForm,
                      batchNumber: parseInt(e.target.value),
                    })
                  }
                  className="w-1/2 bg-primaryAccent/10 border border-primaryAccent p-2 rounded text-white font-bold text-center"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primaryAccent hover:bg-purple-500 text-white font-bold py-3 rounded"
              >
                Create Account
              </button>
            </form>
          </div>

          {/* PANEL 2: DEPLOY VIDEO */}
          <div className="bg-cardBg p-6 rounded-xl border border-gray-800">
            <h2 className="text-xl font-bold mb-4 text-neonBlue">
              2. Deploy Video Content
            </h2>
            {moduleStatus && (
              <div className="mb-4 text-sm font-bold text-neonBlue">
                {moduleStatus}
              </div>
            )}
            <form onSubmit={handleAddVideo} className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Module ID"
                  required
                  value={moduleForm.moduleId}
                  onChange={(e) =>
                    setModuleForm({ ...moduleForm, moduleId: e.target.value })
                  }
                  className="w-full bg-darkBg border border-gray-700 p-3 rounded"
                />
                <input
                  type="number"
                  placeholder="Video ID"
                  required
                  value={videoForm.videoId}
                  onChange={(e) =>
                    setVideoForm({ ...videoForm, videoId: e.target.value })
                  }
                  className="w-full bg-darkBg border border-gray-700 p-3 rounded"
                />
              </div>
              <input
                type="text"
                placeholder="Module Title"
                required
                value={moduleForm.title}
                onChange={(e) =>
                  setModuleForm({ ...moduleForm, title: e.target.value })
                }
                className="w-full bg-darkBg border border-gray-700 p-3 rounded"
              />
              <input
                type="text"
                placeholder="Video Title"
                required
                value={videoForm.title}
                onChange={(e) =>
                  setVideoForm({ ...videoForm, title: e.target.value })
                }
                className="w-full bg-darkBg border border-gray-700 p-3 rounded"
              />
              <input
                type="url"
                placeholder="YouTube URL"
                required
                value={videoForm.videoUrl}
                onChange={(e) =>
                  setVideoForm({ ...videoForm, videoUrl: e.target.value })
                }
                className="w-full bg-darkBg border border-gray-700 p-3 rounded"
              />
              <div className="flex items-center gap-2 border-t border-gray-800 pt-3 mt-2">
                <label className="text-xs text-neonBlue w-1/2 font-bold">
                  Target Cohort Batch:
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={moduleForm.batchNumber}
                  onChange={(e) =>
                    setModuleForm({
                      ...moduleForm,
                      batchNumber: parseInt(e.target.value),
                    })
                  }
                  className="w-1/2 bg-darkBg border border-neonBlue p-2 rounded text-white font-bold text-center"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-neonBlue hover:bg-blue-600 text-white font-bold py-3 rounded mt-2"
              >
                Deploy Video
              </button>
            </form>
          </div>

          {/* PANEL 3: QUIZ BUILDER */}
          <div className="bg-cardBg p-6 rounded-xl border border-successGreen shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <h2 className="text-xl font-bold mb-2 text-successGreen">
              3. Staff Quiz Builder
            </h2>
            {quizStatus && (
              <div className="mb-2 text-successGreen text-xs font-bold">
                {quizStatus}
              </div>
            )}
            <form onSubmit={handleAddQuiz} className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Target Module ID"
                  required
                  value={quizForm.moduleId}
                  onChange={(e) =>
                    setQuizForm({ ...quizForm, moduleId: e.target.value })
                  }
                  className="w-full bg-darkBg border border-gray-700 p-2 rounded"
                />
                <input
                  type="number"
                  placeholder="Question ID"
                  required
                  value={quizForm.questionId}
                  onChange={(e) =>
                    setQuizForm({ ...quizForm, questionId: e.target.value })
                  }
                  className="w-full bg-darkBg border border-gray-700 p-2 rounded"
                />
              </div>
              <textarea
                placeholder="Type the Question..."
                required
                rows={2}
                value={quizForm.question}
                onChange={(e) =>
                  setQuizForm({ ...quizForm, question: e.target.value })
                }
                className="w-full bg-darkBg border border-gray-700 p-2 rounded"
              ></textarea>
              <input
                type="text"
                placeholder="Option 0"
                required
                value={quizForm.opt0}
                onChange={(e) =>
                  setQuizForm({ ...quizForm, opt0: e.target.value })
                }
                className="w-full bg-darkBg border border-gray-700 p-2 rounded border-l-4 border-l-gray-500"
              />
              <input
                type="text"
                placeholder="Option 1"
                required
                value={quizForm.opt1}
                onChange={(e) =>
                  setQuizForm({ ...quizForm, opt1: e.target.value })
                }
                className="w-full bg-darkBg border border-gray-700 p-2 rounded border-l-4 border-l-gray-500"
              />
              <input
                type="text"
                placeholder="Option 2"
                required
                value={quizForm.opt2}
                onChange={(e) =>
                  setQuizForm({ ...quizForm, opt2: e.target.value })
                }
                className="w-full bg-darkBg border border-gray-700 p-2 rounded border-l-4 border-l-gray-500"
              />
              <input
                type="text"
                placeholder="Option 3"
                required
                value={quizForm.opt3}
                onChange={(e) =>
                  setQuizForm({ ...quizForm, opt3: e.target.value })
                }
                className="w-full bg-darkBg border border-gray-700 p-2 rounded border-l-4 border-l-gray-500"
              />
              <div>
                <label className="text-xs text-gray-400">
                  Which option is correct?
                </label>
                <select
                  value={quizForm.correctIndex}
                  onChange={(e) =>
                    setQuizForm({ ...quizForm, correctIndex: e.target.value })
                  }
                  className="w-full bg-darkBg border border-gray-700 p-2 rounded mt-1"
                >
                  <option value="0">Option 0</option>
                  <option value="1">Option 1</option>
                  <option value="2">Option 2</option>
                  <option value="3">Option 3</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-successGreen hover:bg-green-600 text-black font-bold py-3 rounded mt-2"
              >
                Inject Question
              </button>
            </form>
          </div>
        </div>

        {/* PANEL 4: CONTENT MANAGER (DELETION) */}
        <h2 className="text-2xl font-bold mb-6 border-b border-gray-800 pb-4">
          Content Manager
        </h2>
        <div className="space-y-4">
          {liveContent.length === 0 ? (
            <p className="text-gray-500">No content deployed.</p>
          ) : (
            liveContent.map((mod) => (
              <div
                key={mod.moduleId}
                className="bg-cardBg border border-gray-800 rounded-xl p-6"
              >
                <div className="flex justify-between items-start mb-4 border-b border-gray-800 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Module {mod.moduleId}: {mod.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {mod.videos?.length || 0} Videos •{" "}
                      {mod.quizzes?.length || 0} Questions
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteModule(mod.moduleId)}
                    className="bg-warningRed/10 hover:bg-warningRed/30 text-warningRed border border-warningRed/50 px-4 py-2 rounded text-sm font-bold transition"
                  >
                    Delete Entire Module
                  </button>
                </div>

                {/* List Quizzes inside this module */}
                {mod.quizzes && mod.quizzes.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-bold text-gray-400 mb-2 uppercase">
                      Quizzes Attached:
                    </h4>
                    <ul className="space-y-2">
                      {mod.quizzes.map((q: any) => (
                        <li
                          key={q.questionId}
                          className="flex justify-between items-center bg-darkBg p-3 rounded border border-gray-800 text-sm"
                        >
                          <span className="text-gray-300">
                            Q{q.questionId}: {q.question}
                          </span>
                          <button
                            onClick={() =>
                              handleDeleteQuiz(mod.moduleId, q.questionId)
                            }
                            className="text-warningRed hover:text-red-400 font-bold px-3"
                          >
                            ✕ Delete
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
