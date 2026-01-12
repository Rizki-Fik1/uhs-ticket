'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { use } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Download, 
  CheckCircle, 
  Clock, 
  User,
  Phone,
  Droplet,
  AlertCircle,
  Filter
} from 'lucide-react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, Button, Input } from '@/components/ui';

// Mock participants data
const participants = [
  {
    id: 1,
    ticketId: 'UHS-20260215-001234',
    name: 'John Doe',
    email: 'john@email.com',
    phone: '081234567890',
    idNumber: '3374010101900001',
    bloodType: 'O',
    emergencyContact: '081234567891',
    package: 'Premium',
    checkedIn: true,
    checkedInAt: '05:32 WIB',
  },
  {
    id: 2,
    ticketId: 'UHS-20260215-001234',
    name: 'Jane Doe',
    email: 'jane@email.com',
    phone: '081234567892',
    idNumber: '3374010202900002',
    bloodType: 'A',
    emergencyContact: '081234567893',
    package: 'Premium',
    checkedIn: false,
    checkedInAt: null,
  },
  {
    id: 3,
    ticketId: 'UHS-20260215-001235',
    name: 'Bob Smith',
    email: 'bob@email.com',
    phone: '081234567894',
    idNumber: '3374010303900003',
    bloodType: 'B',
    emergencyContact: '081234567895',
    package: 'Regular',
    checkedIn: true,
    checkedInAt: '05:45 WIB',
  },
  {
    id: 4,
    ticketId: 'UHS-20260215-001236',
    name: 'Alice Brown',
    email: 'alice@email.com',
    phone: '081234567896',
    idNumber: '3374010404900004',
    bloodType: 'AB',
    emergencyContact: '081234567897',
    package: 'VIP',
    checkedIn: false,
    checkedInAt: null,
  },
];

const eventInfo = {
  title: 'Sunrise Gunung Prau',
  date: '15 Feb 2026',
  totalParticipants: 28,
  checkedIn: 18,
};

export default function ParticipantsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredParticipants = participants.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.ticketId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'checked' && p.checkedIn) ||
                         (filterStatus === 'pending' && !p.checkedIn);
    return matchesSearch && matchesFilter;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <Link
            href="/admin/events"
            className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors mb-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Events
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                {eventInfo.title}
              </h1>
              <p className="text-[var(--text-secondary)] mt-1">
                {eventInfo.date} • {eventInfo.totalParticipants} peserta terdaftar
              </p>
            </div>
            <Button variant="outline">
              <Download className="w-5 h-5" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card variant="bordered" padding="md">
            <p className="text-sm text-[var(--text-muted)]">Total Peserta</p>
            <p className="text-2xl font-bold text-[var(--text-primary)]">{eventInfo.totalParticipants}</p>
          </Card>
          <Card variant="bordered" padding="md">
            <p className="text-sm text-[var(--text-muted)]">Sudah Check-in</p>
            <p className="text-2xl font-bold text-green-600">{eventInfo.checkedIn}</p>
          </Card>
          <Card variant="bordered" padding="md">
            <p className="text-sm text-[var(--text-muted)]">Belum Check-in</p>
            <p className="text-2xl font-bold text-orange-600">{eventInfo.totalParticipants - eventInfo.checkedIn}</p>
          </Card>
          <Card variant="bordered" padding="md">
            <p className="text-sm text-[var(--text-muted)]">Check-in Rate</p>
            <p className="text-2xl font-bold text-[var(--primary)]">
              {Math.round((eventInfo.checkedIn / eventInfo.totalParticipants) * 100)}%
            </p>
          </Card>
        </div>

        {/* Search & Filter */}
        <Card variant="bordered" padding="md">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Cari nama, email, atau ticket ID..."
                leftIcon={Search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {[
                { value: 'all', label: 'Semua' },
                { value: 'checked', label: 'Checked-in' },
                { value: 'pending', label: 'Belum' },
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setFilterStatus(filter.value)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    filterStatus === filter.value
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-gray-100 text-[var(--text-secondary)] hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Participants Table */}
        <Card variant="elevated" padding="none" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-[var(--text-secondary)]">Peserta</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-[var(--text-secondary)]">Kontak</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-[var(--text-secondary)]">Paket</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-[var(--text-secondary)]">Gol. Darah</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-[var(--text-secondary)]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredParticipants.map((participant) => (
                  <motion.tr
                    key={participant.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                          participant.checkedIn ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                          {participant.checkedIn ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            participant.name.charAt(0)
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-[var(--text-primary)]">{participant.name}</p>
                          <p className="text-xs text-[var(--text-muted)] font-mono">{participant.ticketId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="text-[var(--text-secondary)]">{participant.email}</p>
                        <p className="text-[var(--text-muted)]">{participant.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        participant.package === 'VIP' 
                          ? 'bg-purple-100 text-purple-700'
                          : participant.package === 'Premium'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {participant.package}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Droplet className="w-4 h-4 text-red-500" />
                        <span className="font-medium">{participant.bloodType}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {participant.checkedIn ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">{participant.checkedInAt}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-[var(--text-muted)]">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">Belum check-in</span>
                        </div>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredParticipants.length === 0 && (
            <div className="p-8 text-center">
              <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-[var(--text-muted)]">Tidak ada peserta ditemukan</p>
            </div>
          )}
        </Card>
      </div>
    </AdminLayout>
  );
}
