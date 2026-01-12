'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { use } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  Calendar, 
  MapPin, 
  Users, 
  Clock,
  ChevronDown,
  ChevronUp,
  User,
  Phone,
  Droplet,
  AlertCircle,
  CheckCircle,
  Mountain
} from 'lucide-react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, Button } from '@/components/ui';

// Mock ticket data - Updated for Grand Hiking Adventure 2026
const ticketData = {
  id: 'UHS-20260517-001234',
  qrCode: 'UHS-20260517-001234-GRAND-HIKING-2026-VERIFIED',
  event: {
    title: 'Grand Hiking Adventure 2026',
    date: '17 Mei 2026',
    time: '08:30 - 15:00 WIB',
    location: 'Jalur Gaza, UNNES',
    meetingPoint: 'Gerbang UNNES Sekaran',
    duration: '08.30 - 15.00',
  },
  buyer: {
    name: 'Hikarian',
    email: 'hikarian@email.com',
    phone: '081234567890',
  },
  participants: [
    {
      id: 1,
      name: 'Hikarian',
      idNumber: '3374010101900001',
      phone: '081234567890',
      bloodType: 'O',
      emergencyContact: '081234567891',
      checkedIn: false,
      checkedInAt: null,
    },
    {
      id: 2,
      name: 'Hiking Buddy',
      idNumber: '3374010202900002',
      phone: '081234567892',
      bloodType: 'A',
      emergencyContact: '081234567893',
      checkedIn: false,
      checkedInAt: null,
    },
  ],
  status: 'confirmed',
  payment: {
    method: 'BCA Virtual Account',
    total: 1005000,
    paidAt: '12 Jan 2026, 14:32',
  },
};

export default function TicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [expandedParticipant, setExpandedParticipant] = useState<number | null>(null);

  const toggleParticipant = (id: number) => {
    setExpandedParticipant(expandedParticipant === id ? null : id);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Link
              href="/dashboard/tickets"
              className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors mb-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Kembali
            </Link>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
              Detail Tiket
            </h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4" />
              Bagikan
            </Button>
            <Button size="sm">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* QR Code Card */}
        <Card variant="elevated" padding="lg">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* QR Code */}
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-6 bg-white rounded-2xl border-2 border-dashed border-gray-200"
              >
                <QRCodeSVG
                  value={ticketData.qrCode}
                  size={200}
                  level="H"
                  includeMargin={true}
                  bgColor="#FFFFFF"
                  fgColor="#1A3C34"
                />
              </motion.div>
              <p className="mt-4 text-sm text-[var(--text-muted)] text-center">
                Tunjukkan QR code ini saat check-in
              </p>
              <p className="font-mono text-sm text-[var(--primary)] font-medium mt-1">
                {ticketData.id}
              </p>
            </div>

            {/* Event Details */}
            <div className="flex-1 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] flex items-center justify-center shrink-0">
                  <Mountain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[var(--text-primary)]">
                    {ticketData.event.title}
                  </h2>
                  <span className="inline-block mt-1 px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                    ✓ Confirmed
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm mb-1">
                    <Calendar className="w-4 h-4" />
                    Tanggal
                  </div>
                  <p className="font-semibold text-[var(--text-primary)]">
                    {ticketData.event.date}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm mb-1">
                    <Clock className="w-4 h-4" />
                    Waktu
                  </div>
                  <p className="font-semibold text-[var(--text-primary)]">
                    {ticketData.event.time}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl col-span-2">
                  <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm mb-1">
                    <MapPin className="w-4 h-4" />
                    Meeting Point
                  </div>
                  <p className="font-semibold text-[var(--text-primary)]">
                    {ticketData.event.meetingPoint}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {ticketData.event.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Participants */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[var(--text-primary)]">
              Daftar Peserta
            </h3>
            <span className="text-sm text-[var(--text-muted)]">
              {ticketData.participants.filter(p => p.checkedIn).length}/{ticketData.participants.length} check-in
            </span>
          </div>

          <div className="space-y-3">
            {ticketData.participants.map((participant) => (
              <div
                key={participant.id}
                className="border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleParticipant(participant.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                      participant.checkedIn ? 'bg-green-500' : 'bg-[var(--primary)]'
                    }`}>
                      {participant.checkedIn ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        participant.name.charAt(0)
                      )}
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-[var(--text-primary)]">{participant.name}</p>
                      <p className="text-sm text-[var(--text-muted)]">
                        {participant.checkedIn ? `Check-in: ${participant.checkedInAt}` : 'Siap untuk check-in'}
                      </p>
                    </div>
                  </div>
                  {expandedParticipant === participant.id ? (
                    <ChevronUp className="w-5 h-5 text-[var(--text-muted)]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[var(--text-muted)]" />
                  )}
                </button>

                <AnimatePresence>
                  {expandedParticipant === participant.id && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0 grid grid-cols-2 gap-4 bg-gray-50">
                        <div className="flex items-center gap-2 text-sm">
                          <User className="w-4 h-4 text-[var(--text-muted)]" />
                          <div>
                            <span className="text-[var(--text-muted)]">NIK: </span>
                            <span className="text-[var(--text-primary)]">{participant.idNumber}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-[var(--text-muted)]" />
                          <div>
                            <span className="text-[var(--text-muted)]">HP: </span>
                            <span className="text-[var(--text-primary)]">{participant.phone}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Droplet className="w-4 h-4 text-[var(--text-muted)]" />
                          <div>
                            <span className="text-[var(--text-muted)]">Gol. Darah: </span>
                            <span className="text-[var(--text-primary)]">{participant.bloodType}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <AlertCircle className="w-4 h-4 text-[var(--text-muted)]" />
                          <div>
                            <span className="text-[var(--text-muted)]">Darurat: </span>
                            <span className="text-[var(--text-primary)]">{participant.emergencyContact}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </Card>

        {/* Payment Info */}
        <Card variant="bordered" padding="lg">
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
            Informasi Pembayaran
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-[var(--text-secondary)]">Metode Pembayaran</span>
              <span className="font-medium">{ticketData.payment.method}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[var(--text-secondary)]">Tanggal Bayar</span>
              <span className="font-medium">{ticketData.payment.paidAt}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[var(--text-secondary)]">Jumlah Peserta</span>
              <span className="font-medium">{ticketData.participants.length} orang × Rp500.000</span>
            </div>
            <div className="flex justify-between pt-3 border-t">
              <span className="font-semibold text-[var(--text-primary)]">Total Pembayaran</span>
              <span className="text-xl font-bold text-[var(--primary)]">
                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(ticketData.payment.total)}
              </span>
            </div>
          </div>
        </Card>

        {/* Help */}
        <div className="text-center py-4">
          <p className="text-[var(--text-muted)] text-sm">
            Ada masalah dengan tiket?{' '}
            <a href="#" className="text-[var(--accent)] hover:underline">Hubungi Support</a>
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
