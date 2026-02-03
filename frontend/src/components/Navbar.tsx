"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // To redirect after logout

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  // Check login status when the component mounts
  useEffect(() => {
    const loggedIn = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(loggedIn);
  }, []);

  const handleLogout = () => {
    // 1. Remove the flag
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
    
    // 2. Redirect to Login
    router.push("/admin/login");

   
  };

  return (
    <nav className="bg-[oklch(54.6%_0.245_262.881)] text-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="font-bold text-xl tracking-wide flex items-center gap-2">
              <span className="text-[#8dce27]">Placecom</span>
              <span>Attendance</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link href="/" className="hover:text-[#8dce27] transition-colors">Students</Link>
            
            {/* Show these links only if Admin */}
            {isAdmin && (
              <>
                <Link href="/admin/attendance" className="hover:text-[#8dce27] transition-colors">Attendance</Link>
                <Link href="/admin/add-student" className="hover:text-[#8dce27] transition-colors">Add Student</Link>
              </>
            )}

            {/* Conditional Button: Login vs Logout */}
            {isAdmin ? (
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500/20 text-red-100 rounded-lg hover:bg-red-500/30 transition-all font-bold"
              >
                Logout
              </button>
            ) : (
              <Link href="/admin/login" className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all">
                Admin Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-[#8dce27] focus:outline-none p-2"
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#3a1c71] border-t border-white/10"> 
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[oklch(54.6%_0.245_262.881)]">
            <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md hover:bg-white/10 hover:text-[#8dce27]">
              Students
            </Link>
            
            {isAdmin && (
              <>
                <Link href="/admin/attendance" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md hover:bg-white/10 hover:text-[#8dce27]">
                  Attendance
                </Link>
                <Link href="/admin/add-student" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md hover:bg-white/10 hover:text-[#8dce27]">
                  Add Student
                </Link>
              </>
            )}

            {isAdmin ? (
               <button 
                 onClick={() => { handleLogout(); setIsOpen(false); }}
                 className="block w-full text-left px-3 py-2 rounded-md text-red-300 font-bold hover:bg-white/10"
               >
                 Logout
               </button>
            ) : (
               <Link href="/admin/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md hover:bg-white/10 font-bold text-[#8dce27]">
                 Admin Login
               </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}