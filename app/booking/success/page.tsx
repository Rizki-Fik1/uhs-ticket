'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle, Download, Mail, ArrowRight, Calendar, MapPin, Users, Mountain } from 'lucide-react';
import { Button, Card } from '@/components/ui';

export default function BookingSuccessPage() {
  const bookingDetails = {
    bookingId: 'UHS-20260517-001234',
    eventTitle: 'Grand Hiking Adventure 2026',
    date: '17 Mei 2026',
    location: 'Jalur Gaza, UNNES',
    participants: 2,
    total: 1005000,
    email: 'hikarian@email.com',
  };

  return (
    <div className="min-h-screen bg-[var(--background)] py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-6"
          >
            <CheckCircle className="w-12 h-12 text-green-500" />
          </motion.div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
            Pembayaran Berhasil!
          </h1>
          <p className="text-[var(--text-secondary)]">
            Terima kasih telah melakukan pemesanan
          </p>
        </motion.div>

        <Card variant="elevated" padding="lg" className="mb-6">
          <div className="flex items-center justify-between pb-4 border-b mb-4">
            <div>
              <p className="text-sm text-[var(--text-muted)]">Booking ID</p>
              <p className="text-lg font-mono font-bold text-[var(--primary)]">
                {bookingDetails.bookingId}
              </p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
              Confirmed
            </span>
          </div>

          <div className="flex items-start gap-4 pb-4 border-b mb-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] flex items-center justify-center">
              <Mountain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] text-lg">
                {bookingDetails.eventTitle}
              </h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-[var(--text-secondary)]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {bookingDetails.date}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {bookingDetails.location}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pb-4 border-b mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-[var(--text-secondary)]">Jumlah Peserta</span>
              <span className="font-medium">{bookingDetails.participants} orang</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Total Pembayaran</span>
              <span className="text-lg font-bold text-[var(--primary)]">
                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(bookingDetails.total)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
            <Mail className="w-5 h-5 text-blue-500" />
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-700">E-Ticket dikirim ke</p>
              <p className="text-sm text-blue-600">{bookingDetails.email}</p>
            </div>
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" fullWidth>
            <Download className="w-5 h-5" />
            Download E-Ticket
          </Button>
          <Link href="/dashboard/tickets" className="flex-1">
            <Button fullWidth>
              Lihat Tiket Saya
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-100">
          <h3 className="font-semibold text-[var(--text-primary)] mb-4">
            Langkah Selanjutnya
          </h3>
          <div className="space-y-4">
            {[
              { step: 1, text: 'Cek email untuk menerima e-ticket dengan QR code' },
              { step: 2, text: 'Download dan simpan e-ticket di smartphone Anda' },
              { step: 3, text: 'Tunjukkan QR code saat check-in di lokasi event' },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-sm font-medium shrink-0">
                  {item.step}
                </span>
                <p className="text-[var(--text-secondary)] pt-0.5">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center mt-8 text-[var(--text-muted)] text-sm">
          Ada pertanyaan?{' '}
          <a href="#" className="text-[var(--accent)] hover:underline">Hubungi kami</a>
        </p>
      </div>
    </div>
  );
}
