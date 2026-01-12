'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Calendar, 
  MapPin, 
  Users, 
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, Button, Input } from '@/components/ui';

const events = [
  {
    id: 1,
    title: 'Sunrise Gunung Prau',
    slug: 'gunung-prau-sunrise',
    location: 'Dieng, Jawa Tengah',
    date: '15 Feb 2026',
    price: 250000,
    registered: 28,
    capacity: 30,
    status: 'active',
  },
  {
    id: 2,
    title: 'Rinjani Summit Attack',
    slug: 'rinjani-summit',
    location: 'Lombok, NTB',
    date: '22 Mar 2026',
    price: 1500000,
    registered: 12,
    capacity: 20,
    status: 'active',
  },
  {
    id: 3,
    title: 'Blue Fire Kawah Ijen',
    slug: 'kawah-ijen-blue-fire',
    location: 'Banyuwangi, Jawa Timur',
    date: '5 Apr 2026',
    price: 350000,
    registered: 15,
    capacity: 40,
    status: 'active',
  },
  {
    id: 4,
    title: 'Bromo Milky Way Tour',
    slug: 'bromo-milky-way',
    location: 'Probolinggo, Jawa Timur',
    date: '12 Apr 2026',
    price: 450000,
    registered: 18,
    capacity: 25,
    status: 'draft',
  },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
}

export default function AdminEventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              Event Manager
            </h1>
            <p className="text-[var(--text-secondary)] mt-1">
              Kelola semua event hiking
            </p>
          </div>
          <Link href="/admin/events/new">
            <Button>
              <Plus className="w-5 h-5" />
              Tambah Event
            </Button>
          </Link>
        </div>

        {/* Search */}
        <Card variant="bordered" padding="md">
          <Input
            placeholder="Cari event..."
            leftIcon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Card>

        {/* Events Table */}
        <Card variant="elevated" padding="none" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-[var(--text-secondary)]">Event</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-[var(--text-secondary)]">Tanggal</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-[var(--text-secondary)]">Harga</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-[var(--text-secondary)]">Pendaftar</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-[var(--text-secondary)]">Status</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-[var(--text-secondary)]">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredEvents.map((event) => (
                  <motion.tr 
                    key={event.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-[var(--text-primary)]">{event.title}</p>
                        <div className="flex items-center gap-1 text-sm text-[var(--text-muted)] mt-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {event.location}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-[var(--primary)]">
                        {formatPrice(event.price)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[var(--text-muted)]" />
                        <span className="text-sm">
                          <span className="font-medium">{event.registered}</span>
                          <span className="text-[var(--text-muted)]">/{event.capacity}</span>
                        </span>
                        <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[var(--accent)] rounded-full"
                            style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        event.status === 'active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {event.status === 'active' ? 'Active' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/events/${event.id}/participants`}>
                          <button className="p-2 hover:bg-gray-100 rounded-lg" title="Lihat Peserta">
                            <Users className="w-4 h-4 text-[var(--text-secondary)]" />
                          </button>
                        </Link>
                        <button className="p-2 hover:bg-gray-100 rounded-lg" title="Edit">
                          <Edit className="w-4 h-4 text-[var(--text-secondary)]" />
                        </button>
                        <div className="relative">
                          <button 
                            className="p-2 hover:bg-gray-100 rounded-lg"
                            onClick={() => setOpenMenu(openMenu === event.id ? null : event.id)}
                          >
                            <MoreVertical className="w-4 h-4 text-[var(--text-secondary)]" />
                          </button>
                          {openMenu === event.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border z-10">
                              <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[var(--text-secondary)] hover:bg-gray-50">
                                <Eye className="w-4 h-4" />
                                Preview
                              </button>
                              <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[var(--text-secondary)] hover:bg-gray-50">
                                {event.status === 'active' ? <ToggleLeft className="w-4 h-4" /> : <ToggleRight className="w-4 h-4" />}
                                {event.status === 'active' ? 'Set Draft' : 'Publish'}
                              </button>
                              <hr />
                              <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50">
                                <Trash2 className="w-4 h-4" />
                                Hapus
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
