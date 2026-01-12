'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Ticket, Users, ArrowRight, Clock, MapPin, ChevronRight } from 'lucide-react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, Button } from '@/components/ui';

const stats = [
  { label: 'Total Booking', value: '1', icon: Ticket, color: 'bg-blue-500' },
  { label: 'Event Mendatang', value: '1', icon: Calendar, color: 'bg-green-500' },
  { label: 'Total Peserta', value: '2', icon: Users, color: 'bg-purple-500' },
];

const upcomingEvents = [
  {
    id: 'UHS-20260517-001234',
    title: 'Grand Hiking Adventure 2026',
    date: '17 Mei 2026',
    location: 'Jalur Gaza, UNNES',
    participants: 2,
    status: 'confirmed',
    daysLeft: 125,
  },
];

const recentActivity = [
  { action: 'Booking berhasil', event: 'Grand Hiking Adventure 2026', time: '1 jam lalu' },
  { action: 'Pembayaran diterima', event: 'Grand Hiking Adventure 2026', time: '1 jam lalu' },
  { action: 'Akun dibuat', event: '', time: '1 hari lalu' },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            Selamat Datang, <span className="text-[var(--accent)]">Hikarian!</span>
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Berikut ringkasan aktivitas booking Anda
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="elevated" padding="lg">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-muted)]">{stat.label}</p>
                    <p className="text-2xl font-bold text-[var(--text-primary)]">{stat.value}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Event Mendatang</h2>
            <Link href="/dashboard/tickets" className="text-[var(--accent)] text-sm font-medium hover:underline flex items-center gap-1">
              Lihat Semua <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <Card key={event.id} variant="bordered" padding="none" className="overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-24 p-4 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] text-white text-center flex flex-col justify-center">
                    <span className="text-2xl font-bold">{event.date.split(' ')[0]}</span>
                    <span className="text-sm opacity-80">{event.date.split(' ')[1]} {event.date.split(' ')[2]}</span>
                  </div>
                  <div className="flex-1 p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-[var(--text-primary)] text-lg">{event.title}</h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-[var(--text-secondary)]">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {event.participants} peserta
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {event.daysLeft} hari lagi
                        </span>
                        <Link href={`/dashboard/tickets/${event.id}`}>
                          <Button size="sm">
                            Lihat Tiket
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Aktivitas Terakhir</h2>
          <Card variant="bordered" padding="none">
            <ul className="divide-y">
              {recentActivity.map((activity, index) => (
                <li key={index} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">{activity.action}</p>
                    {activity.event && (
                      <p className="text-sm text-[var(--text-muted)]">{activity.event}</p>
                    )}
                  </div>
                  <span className="text-sm text-[var(--text-muted)]">{activity.time}</span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>

        {/* CTA */}
        <Card variant="elevated" padding="lg" className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] text-white">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-1">Siap untuk Petualangan Baru?</h3>
              <p className="text-white/80">Jangan lupa untuk membawa perlengkapan yang diperlukan!</p>
            </div>
            <Link href="/">
              <Button variant="secondary" size="lg">
                Kembali ke Beranda
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
