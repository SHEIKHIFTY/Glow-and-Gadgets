"use client";
import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { createPortal } from "react-dom";

export default function FeedbackPopup() {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feedback.trim()) {
      setError("Feedback cannot be empty");
      return;
    }

    const formData = new FormData();
    formData.append("feedback", feedback);
    if (file) formData.append("file", file);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setSubmitted(true);
        setFeedback("");
        setFile(null);
        setError("");

        // Automatically close modal after 1.5s
        setTimeout(() => {
          setSubmitted(false);
          setOpen(false);
        }, 1500);
      } else {
        setError("Failed to submit feedback. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Try again.");
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-[#FF00FF] hover:text-[#1E90FF] transition drop-shadow-[0_0_6px_#FF00FF]"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {open &&
        createPortal(
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm">
            <form
              onSubmit={handleSubmit}
              className="bg-[#070429] border border-[#7B2FF7]/50 rounded-2xl shadow-xl p-6 w-80 space-y-4 text-white
                transform transition-all duration-300 ease-out opacity-100 scale-100"
            >
              <h2 className="text-xl font-semibold text-center text-[#FF00FF] drop-shadow-[0_0_6px_#FF00FF]">
                Send Feedback
              </h2>
              <textarea
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Type your feedback..."
                className="w-full bg-[#0E063A] border border-[#7B2FF7]/50 px-3 py-2 rounded-lg text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-[#FF00FF] outline-none"
                required
              />
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full text-sm text-gray-300"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-[#FF00FF] hover:bg-[#1E90FF] text-white py-2 rounded-lg font-semibold transition"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-full mt-2 text-sm text-gray-400 hover:text-gray-200"
              >
                Cancel
              </button>
            </form>

            {submitted && (
              <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md animate-fadeIn">
                Feedback submitted successfully!
              </div>
            )}
          </div>,
          document.body
        )}
    </>
  );
}
