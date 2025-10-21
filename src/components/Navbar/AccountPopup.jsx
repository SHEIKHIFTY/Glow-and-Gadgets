"use client";
import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { createPortal } from "react-dom";

export default function AccountPopup({ externalOpen, setExternalOpen }) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const [numberInput, setNumberInput] = useState("");
  const [showSignOut, setShowSignOut] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // sync external state
  useEffect(() => {
    if (externalOpen !== undefined) setOpen(externalOpen);
  }, [externalOpen]);

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!nameInput.trim() || !numberInput.trim()) return;
    const userData = { name: nameInput.trim(), number: numberInput.trim() };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setOpen(false);
    if (setExternalOpen) setExternalOpen(false);
    setNameInput("");
    setNumberInput("");
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowSignOut(false);
  };

  // Decide whether to show the desktop icon: only if externalOpen is undefined
  const showIcon = externalOpen === undefined;

  return (
    <>
      {/* Desktop/User icon (navbar) */}
      {showIcon && (
        <div className="relative">
          <button
             id="account-btn"  // ✅ this makes it targetable from Navbar
             onClick={() => {
          if (user) {
              setShowSignOut(!showSignOut);
              } else {
               setOpen(true);
             if (setExternalOpen) setExternalOpen(true);
            }
          }}
             className="relative text-[#FF00FF] hover:text-[#1E90FF] transition drop-shadow-[0_0_6px_#FF00FF] w-6 h-6 flex items-center justify-center rounded-full"
           >

            {user ? (
              <span className="font-bold text-white">{user.name?.charAt(0)?.toUpperCase()}</span>
            ) : (
              <User className="w-6 h-6" />
            )}
          </button>

          {/* Sign Out Dropdown */}
          {showSignOut && (
            <div className="absolute right-0 mt-2 bg-[#070429] border border-[#7B2FF7]/50 text-white rounded-xl shadow-lg py-2 w-32 text-center animate-fadeIn">
              <p className="text-sm text-gray-300 mb-1">{user.name}</p>
              <button
                onClick={handleSignOut}
                className="text-sm text-[#FF00FF] hover:text-[#1E90FF] font-medium transition"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}

      {/* Login Form Modal */}
      {open &&
        createPortal(
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm">
            <div className="bg-[#070429] border border-[#7B2FF7]/50 rounded-2xl shadow-2xl p-6 w-80 text-white
              transform transition-all duration-300 ease-out opacity-100 scale-100"
            >
              <form onSubmit={handleSignIn} className="space-y-4">
                <h2 className="text-xl font-semibold text-center text-[#FF00FF] drop-shadow-[0_0_6px_#FF00FF]">
                  Account Login
                </h2>

                <input
                  type="text"
                  placeholder="Your Name"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full bg-[#0E063A] border border-[#7B2FF7]/50 px-3 py-2 rounded-lg text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-[#FF00FF] outline-none"
                />
                <input
                  type="text"
                  placeholder="Your Phone Number"
                  value={numberInput}
                  onChange={(e) => setNumberInput(e.target.value)}
                  className="w-full bg-[#0E063A] border border-[#7B2FF7]/50 px-3 py-2 rounded-lg text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-[#FF00FF] outline-none"
                />

                <button
                  type="submit"
                  className="w-full bg-[#FF00FF] hover:bg-[#1E90FF] text-white py-2 rounded-lg font-semibold transition"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    if (setExternalOpen) setExternalOpen(false);
                  }}
                  className="w-full mt-2 text-sm text-gray-400 hover:text-gray-200"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
