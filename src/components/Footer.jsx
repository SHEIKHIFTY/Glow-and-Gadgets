"use client";
import { useState } from "react";
import CategorySidebar from "./CategorySidebar";
import AccountPopup from "./Navbar/AccountPopup";

export default function Footer() {
  const [accountOpen, setAccountOpen] = useState(false);

  return (
    <>
      <footer className="w-full bg-[#1A0F2C] text-white py-12 md:py-16 px-4 sm:px-8">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar Placeholder (only visible on md and above) */}
          <aside className="hidden md:block w-80">
            {/* Optional: Sidebar spacing for desktop */}
          </aside>

          {/* Footer Content */}
          <div className="flex-1 px-2 sm:px-6 md:px-16 mt-6 md:mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
              {/* COLUMN 1: Logo & Contact */}
              <div className="flex flex-col space-y-4">
                <h1 className="text-3xl font-bold">
                  <span className="text-[#1E90FF] drop-shadow-[0_0_12px_#1E90FF]">Glow &</span>
                  <span className="text-[#FF0080] drop-shadow-[0_0_8px_#FF0080]"> Gadgets</span>
                </h1>
                
                
                <a
                 href="https://www.google.com/maps?q=Gawair+house+no-485,+Dhakhsinkhan,+Dhaka-1230"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-sm text-gray-300 hover:text-[#1E90FF] transition cursor-pointer hover:underline cursor-pointer"
               >
                  Gawair house no-485, Dhakhsinkhan, Dhaka-1230
                </a>

                
                <a
                  href="https://mail.google.com/mail/?view=cm&to=info@glowandgadgets.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[#1E90FF] transition hover:underline cursor-pointer"
                >
                  info@glowandgadgets.com
                </a>

                <a href="tel:+8801910796619" className="text-sm text-gray-300 hover:text-[#1E90FF] transition hover:underline cursor-pointer">
                 01910796619
                </a>

              </div>

              {/* COLUMN 2: Customer Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#1E90FF]">CUSTOMER</h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setAccountOpen(true)}
                      className="text-sm text-gray-300 hover:text-[#FF0080] transition"
                    >
                      Account
                    </button>
                  </li>
                  <li>
                    <a
                      href="/checkout"
                      className="text-sm text-gray-300 hover:text-[#FF0080] transition"
                    >
                      Cart
                    </a>
                  </li>
                </ul>
              </div>

              {/* COLUMN 3: Information Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#1E90FF]">INFORMATION</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="tel:+8801910796619" className="text-sm text-gray-300 hover:text-[#FF0080]"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="/"
                      className="text-sm text-gray-300 hover:text-[#FF0080]"
                    >
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>

              {/* COLUMN 4: Apps & Social */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#FF0080]">
                  SOCIAL LINKS
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="https://www.facebook.com/share/1BLuUU3CAf/?mibextid=wwXIfr"
                    className="text-4xl text-[#1E90FF] hover:scale-110 transition duration-150"
                  >
                    ⓕ
                  </a>
                </div>
              </div>
            </div>

            {/* COPYRIGHT */}
            <div className="text-center pt-8 border-t border-gray-700 mt-8">
              <p className="text-xs text-gray-500">
                &copy; {new Date().getFullYear()} Glow & Gadgets. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

    {/* Account Popup Modal */}
<AccountPopup externalOpen={accountOpen} setExternalOpen={setAccountOpen} />

    </>
  );
}
