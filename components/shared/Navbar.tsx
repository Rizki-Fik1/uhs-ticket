'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mountain, User, Ticket, LogOut } from 'lucide-react';

interface NavbarProps {
  isLoggedIn?: boolean;
  userName?: string;
}

export default function Navbar({ isLoggedIn = true, userName = 'Hikarian' }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/about', label: 'Tentang Kami' },
    { href: '/payment', label: 'Cara Pembayaran' },
  ];

  return (
    <nav className="fixed h-24 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <Mountain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-[var(--primary)]">
              UHS<span className="text-[var(--accent)]">-Ticket</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-16">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[var(--text-secondary)] hover:text-[var(--primary)] font-medium transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent)] transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Desktop Auth/Profile */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--primary)]/5 hover:bg-[var(--primary)]/10 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-[var(--text-primary)]">{userName}</span>
                </button>
                
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-xl shadow-lg border border-gray-100"
                    >
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-2 text-[var(--text-secondary)] hover:bg-gray-50 hover:text-[var(--primary)]"
                      >
                        <User className="w-4 h-4" />
                        Dashboard
                      </Link>
                      <Link
                        href="/dashboard/tickets"
                        className="flex items-center gap-3 px-4 py-2 text-[var(--text-secondary)] hover:bg-gray-50 hover:text-[var(--primary)]"
                      >
                        <Ticket className="w-4 h-4" />
                        Tiket Saya
                      </Link>
                      <hr className="my-2" />
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50">
                        <LogOut className="w-4 h-4" />
                        Keluar
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-[var(--primary)] font-medium hover:bg-[var(--primary)]/5 rounded-xl transition-colors"
                >
                  Masuk
                </Link>
                <Link
                  href="/auth/register"
                  className="px-5 py-2.5 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[var(--primary)]/25 transition-all"
                >
                  Daftar
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 rounded-xl text-[var(--text-secondary)] hover:bg-gray-50 hover:text-[var(--primary)] font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <hr className="my-4" />
              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-3 rounded-xl text-[var(--text-secondary)] hover:bg-gray-50"
                  >
                    Dashboard
                  </Link>
                  <button className="w-full text-left px-4 py-3 rounded-xl text-red-500 hover:bg-red-50">
                    Keluar
                  </button>
                </>
              ) : (
                <div className="flex gap-3">
                  <Link
                    href="/auth/login"
                    className="flex-1 text-center py-3 border border-[var(--primary)] text-[var(--primary)] rounded-xl font-medium"
                  >
                    Masuk
                  </Link>
                  <Link
                    href="/auth/register"
                    className="flex-1 text-center py-3 bg-[var(--primary)] text-white rounded-xl font-medium"
                  >
                    Daftar
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
