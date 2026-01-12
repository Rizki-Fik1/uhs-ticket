'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, MapPin, Users, Search, ChevronRight, Clock, CheckCircle, XCircle } from 'lucide-react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, Button, Input } from '@/components/ui';

// Updated tickets for Grand Hiking Adventure 2026
const tickets = [
  {
    id: 'UHS-20260517-001234',
    title: 'Grand Hiking Adventure 2026',
    date: '17 Mei 2026',
    location: 'Jalur Gaza, UNNES',
    package: 'Reguler',
    participants: 2,
    status: 'upcoming',
    total: 1005000,
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case 'upcoming':
      return (
        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          Mendatang
        </span>
      );
    case 'completed':
      return (
        <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full flex items-center gap-1">
          <CheckCircle className="w-3.5 h-3.5" />
          Selesai
        </span>
      );
    case 'cancelled':
      return (
        <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full flex items-center gap-1">
          <XCircle className="w-3.5 h-3.5" />
          Dibatalkan
        </span>
      );
    default:
      return null;
  }
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
}

export default function TicketsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || ticket.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            Tiket Saya
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Kelola semua tiket event hiking Anda
          </p>
        </div>

        {/* Search & Filter */}
        <Card variant="bordered" padding="md">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Cari berdasarkan nama event atau booking ID..."
                leftIcon={Search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {['all', 'upcoming', 'completed', 'cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    filterStatus === status
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-gray-100 text-[var(--text-secondary)] hover:bg-gray-200'
                  }`}
                >
                  {status === 'all' ? 'Semua' : status === 'upcoming' ? 'Mendatang' : status === 'completed' ? 'Selesai' : 'Dibatalkan'}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Tickets List */}
        {filteredTickets.length > 0 ? (
          <div className="space-y-4">
            {filteredTickets.map((ticket, index) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card variant="elevated" padding="none" hover className="overflow-hidden">
                  <div className="flex flex-col lg:flex-row">
                    {/* Date Badge */}
                    <div className="lg:w-28 p-4 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] text-white text-center flex flex-col justify-center">
                      <span className="text-3xl font-bold">{ticket.date.split(' ')[0]}</span>
                      <span className="text-sm opacity-80">{ticket.date.split(' ')[1]}</span>
                      <span className="text-xs opacity-60">{ticket.date.split(' ')[2]}</span>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 p-5">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-[var(--text-primary)] text-lg">
                              {ticket.title}
                            </h3>
                            {getStatusBadge(ticket.status)}
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--text-secondary)]">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {ticket.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {ticket.participants} peserta
                            </span>
                            <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-medium">
                              {ticket.package}
                            </span>
                          </div>

                          <p className="text-xs text-[var(--text-muted)] mt-2 font-mono">
                            ID: {ticket.id}
                          </p>
                        </div>

                        <div className="flex items-center gap-4 lg:border-l lg:pl-6">
                          <div className="text-right">
                            <p className="text-xs text-[var(--text-muted)]">Total</p>
                            <p className="text-lg font-bold text-[var(--primary)]">
                              {formatPrice(ticket.total)}
                            </p>
                          </div>
                          <Link href={`/dashboard/tickets/${ticket.id}`}>
                            <Button size="sm" variant={ticket.status === 'cancelled' ? 'ghost' : 'primary'}>
                              Detail
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card variant="bordered" padding="lg" className="text-center">
            <div className="py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                Tidak ada tiket ditemukan
              </h3>
              <p className="text-[var(--text-secondary)] mb-6">
                {searchQuery ? 'Coba ubah kata kunci pencarian' : 'Anda belum memiliki tiket'}
              </p>
              <Link href="/">
                <Button>Ke Beranda</Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
