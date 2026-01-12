'use client';

import { motion } from 'framer-motion';
import { 
  Users, 
  Ticket, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal
} from 'lucide-react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card } from '@/components/ui';

const stats = [
  { 
    label: 'Total Penjualan', 
    value: 'Rp 45.2M', 
    change: '+12%',
    isPositive: true,
    icon: DollarSign, 
    color: 'bg-green-500' 
  },
  { 
    label: 'Total Booking', 
    value: '1,234', 
    change: '+8%',
    isPositive: true,
    icon: Ticket, 
    color: 'bg-blue-500' 
  },
  { 
    label: 'Peserta Terdaftar', 
    value: '3,567', 
    change: '+15%',
    isPositive: true,
    icon: Users, 
    color: 'bg-purple-500' 
  },
  { 
    label: 'Check-in Rate', 
    value: '94.2%', 
    change: '-2%',
    isPositive: false,
    icon: CheckCircle, 
    color: 'bg-orange-500' 
  },
];

const recentBookings = [
  { id: 'UHS-001234', name: 'John Doe', event: 'Sunrise Gunung Prau', amount: 1055000, time: '2 menit lalu' },
  { id: 'UHS-001235', name: 'Jane Smith', event: 'Rinjani Summit', amount: 3010000, time: '15 menit lalu' },
  { id: 'UHS-001236', name: 'Bob Wilson', event: 'Kawah Ijen', amount: 710000, time: '1 jam lalu' },
  { id: 'UHS-001237', name: 'Alice Brown', event: 'Bromo Tour', amount: 920000, time: '2 jam lalu' },
];

const upcomingEvents = [
  { name: 'Sunrise Gunung Prau', date: '15 Feb 2026', registered: 28, capacity: 30, status: 'filling' },
  { name: 'Rinjani Summit Attack', date: '22 Mar 2026', registered: 12, capacity: 20, status: 'open' },
  { name: 'Blue Fire Kawah Ijen', date: '5 Apr 2026', registered: 15, capacity: 40, status: 'open' },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
}

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            Dashboard
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Overview performa dan aktivitas terbaru
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="elevated" padding="lg">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`flex items-center gap-1 text-sm font-medium ${
                    stat.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    {stat.change}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold text-[var(--text-primary)]">{stat.value}</p>
                  <p className="text-sm text-[var(--text-muted)] mt-1">{stat.label}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Bookings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card variant="elevated" padding="none">
              <div className="p-5 border-b flex items-center justify-between">
                <h2 className="text-lg font-bold text-[var(--text-primary)]">Booking Terbaru</h2>
                <button className="text-sm text-[var(--accent)] hover:underline">Lihat semua</button>
              </div>
              <div className="divide-y">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white font-medium">
                        {booking.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-[var(--text-primary)]">{booking.name}</p>
                        <p className="text-sm text-[var(--text-muted)]">{booking.event}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-[var(--primary)]">{formatPrice(booking.amount)}</p>
                      <p className="text-xs text-[var(--text-muted)]">{booking.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card variant="elevated" padding="none">
              <div className="p-5 border-b flex items-center justify-between">
                <h2 className="text-lg font-bold text-[var(--text-primary)]">Event Mendatang</h2>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreHorizontal className="w-5 h-5 text-[var(--text-muted)]" />
                </button>
              </div>
              <div className="p-4 space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-[var(--text-primary)] text-sm">{event.name}</h3>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        event.status === 'filling' 
                          ? 'bg-orange-100 text-orange-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {event.status === 'filling' ? 'Hampir Penuh' : 'Open'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      {event.date}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[var(--text-secondary)]">
                        {event.registered}/{event.capacity} terdaftar
                      </span>
                      <span className="font-medium text-[var(--primary)]">
                        {Math.round((event.registered / event.capacity) * 100)}%
                      </span>
                    </div>
                    <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full"
                        style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card variant="bordered" padding="lg">
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Tambah Event', icon: Calendar, href: '/admin/events/new' },
                { label: 'Scan Check-in', icon: CheckCircle, href: '/admin/check-in' },
                { label: 'Export Data', icon: TrendingUp, href: '#' },
                { label: 'Lihat Laporan', icon: DollarSign, href: '/admin/payments' },
              ].map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className="flex flex-col items-center justify-center p-4 rounded-xl border hover:bg-gray-50 hover:border-[var(--primary)] transition-all group"
                >
                  <action.icon className="w-6 h-6 text-[var(--text-muted)] group-hover:text-[var(--primary)] mb-2" />
                  <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--primary)]">
                    {action.label}
                  </span>
                </a>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
