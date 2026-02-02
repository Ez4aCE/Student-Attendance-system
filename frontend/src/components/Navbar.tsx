"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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

          {/* Desktop Menu (Hidden on Mobile) */}
          {/* FIXED: Added 'items-center' here to align links with the button */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link href="/" className="hover:text-[#8dce27] transition-colors">Students</Link>
            <Link href="/admin/attendance" className="hover:text-[#8dce27] transition-colors">Attendance</Link>
            <Link href="/admin/add-student" className="hover:text-[#8dce27] transition-colors">Add Student</Link>
            <Link href="/admin/login" className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all">Admin</Link>
          </div>

          {/* Mobile Menu Button (Hamburger) */}
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
            <Link 
              href="/" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 hover:text-[#8dce27]"
              onClick={() => setIsOpen(false)}
            >
              Students
            </Link>
            <Link 
              href="/admin/attendance" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 hover:text-[#8dce27]"
              onClick={() => setIsOpen(false)}
            >
              Attendance
            </Link>
            <Link 
              href="/admin/add-student" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 hover:text-[#8dce27]"
              onClick={() => setIsOpen(false)}
            >
              Add Student
            </Link>
            <Link 
              href="/admin/login" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 hover:text-[#8dce27]"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}