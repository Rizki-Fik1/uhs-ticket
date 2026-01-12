import Link from 'next/link';
import { Mountain, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--primary)] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Mountain className="w-6 h-6 text-[var(--accent)]" />
              </div>
              <span className="text-xl font-bold">
                UHS<span className="text-[var(--accent)]">Ticket</span>
              </span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              Platform tiket hiking terpercaya. Nikmati petualangan alam dengan sistem booking yang mudah dan aman.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[var(--accent)] flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[var(--accent)] flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[var(--accent)] flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Tautan Cepat</h4>
            <ul className="space-y-3">
              {[
                { href: '/events', label: 'Semua Event' },
                { href: '/about', label: 'Tentang Kami' },
                { href: '/faq', label: 'FAQ' },
                { href: '/contact', label: 'Hubungi Kami' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-[var(--accent)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {[
                { href: '/terms', label: 'Syarat & Ketentuan' },
                { href: '/privacy', label: 'Kebijakan Privasi' },
                { href: '/refund', label: 'Kebijakan Refund' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-[var(--accent)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">
                  Jl. Petualangan No. 123<br />
                  Jakarta Selatan, 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[var(--accent)] shrink-0" />
                <a href="tel:+6281234567890" className="text-white/70 hover:text-[var(--accent)] transition-colors text-sm">
                  +62 812-3456-7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[var(--accent)] shrink-0" />
                <a href="mailto:info@uhsticket.id" className="text-white/70 hover:text-[var(--accent)] transition-colors text-sm">
                  info@uhsticket.id
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm">
              © {currentYear} UHSTicket. All rights reserved.
            </p>
            <p className="text-white/60 text-sm">
              Made with ❤️ for adventurers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
