'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  ArrowRight,
  Mountain,
  SlidersHorizontal,
  X
} from 'lucide-react';
import PublicLayout from '@/components/layouts/PublicLayout';
import { Button, Card, Input } from '@/components/ui';

// Mock data for events
const allEvents = [
  {
    id: 1,
    slug: 'gunung-prau-sunrise',
    title: 'Sunrise Gunung Prau',
    location: 'Dieng, Jawa Tengah',
    date: '15 Feb 2026',
    price: 250000,
    difficulty: 'Mudah',
    duration: '2 Hari 1 Malam',
    spotsLeft: 12,
    totalSpots: 30,
    rating: 4.9,
    category: 'sunrise',
  },
  {
    id: 2,
    slug: 'rinjani-summit',
    title: 'Rinjani Summit Attack',
    location: 'Lombok, NTB',
    date: '22 Mar 2026',
    price: 1500000,
    difficulty: 'Extreme',
    duration: '4 Hari 3 Malam',
    spotsLeft: 8,
    totalSpots: 20,
    rating: 4.8,
    category: 'summit',
  },
  {
    id: 3,
    slug: 'kawah-ijen-blue-fire',
    title: 'Blue Fire Kawah Ijen',
    location: 'Banyuwangi, Jawa Timur',
    date: '5 Apr 2026',
    price: 350000,
    difficulty: 'Sedang',
    duration: '1 Hari',
    spotsLeft: 25,
    totalSpots: 40,
    rating: 4.7,
    category: 'adventure',
  },
  {
    id: 4,
    slug: 'bromo-milky-way',
    title: 'Bromo Milky Way Tour',
    location: 'Probolinggo, Jawa Timur',
    date: '12 Apr 2026',
    price: 450000,
    difficulty: 'Mudah',
    duration: '1 Hari',
    spotsLeft: 18,
    totalSpots: 25,
    rating: 4.9,
    category: 'sunrise',
  },
  {
    id: 5,
    slug: 'semeru-mahameru',
    title: 'Pendakian Semeru',
    location: 'Lumajang, Jawa Timur',
    date: '20 Apr 2026',
    price: 750000,
    difficulty: 'Sulit',
    duration: '3 Hari 2 Malam',
    spotsLeft: 5,
    totalSpots: 15,
    rating: 4.8,
    category: 'summit',
  },
  {
    id: 6,
    slug: 'papandayan-camping',
    title: 'Camping Gunung Papandayan',
    location: 'Garut, Jawa Barat',
    date: '1 Mei 2026',
    price: 300000,
    difficulty: 'Mudah',
    duration: '2 Hari 1 Malam',
    spotsLeft: 30,
    totalSpots: 50,
    rating: 4.6,
    category: 'camping',
  },
];

const categories = [
  { value: 'all', label: 'Semua' },
  { value: 'sunrise', label: 'Sunrise' },
  { value: 'summit', label: 'Summit' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'camping', label: 'Camping' },
];

const difficulties = [
  { value: 'all', label: 'Semua Level' },
  { value: 'Mudah', label: 'Mudah' },
  { value: 'Sedang', label: 'Sedang' },
  { value: 'Sulit', label: 'Sulit' },
  { value: 'Extreme', label: 'Extreme' },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
}

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case 'Mudah': return 'bg-green-100 text-green-700';
    case 'Sedang': return 'bg-yellow-100 text-yellow-700';
    case 'Sulit': return 'bg-orange-100 text-orange-700';
    case 'Extreme': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
}

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredEvents = allEvents.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || event.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative py-16 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-[var(--accent)]/20 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Temukan Event <span className="text-[var(--accent)]">Hiking</span> Impianmu
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Jelajahi berbagai pilihan event hiking dari seluruh Indonesia
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari event atau lokasi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-[var(--text-primary)] placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-[var(--accent)]/30"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter & Results */}
      <section className="py-12 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-[var(--text-secondary)]">
                Menampilkan <strong className="text-[var(--text-primary)]">{filteredEvents.length}</strong> event
              </span>
            </div>
            
            {/* Desktop Filters */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white rounded-xl p-1 border">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === cat.value
                        ? 'bg-[var(--primary)] text-white'
                        : 'text-[var(--text-secondary)] hover:bg-gray-100'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-2.5 rounded-xl border bg-white text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                {difficulties.map((diff) => (
                  <option key={diff.value} value={diff.value}>{diff.label}</option>
                ))}
              </select>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="md:hidden flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filter
            </button>
          </div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card variant="elevated" padding="none" hover className="group h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-48 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)]">
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(event.difficulty)}`}>
                          {event.difficulty}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-white/90 rounded-full text-sm font-medium text-[var(--primary)]">
                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                        {event.rating}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-lg font-bold text-white mb-1">{event.title}</h3>
                        <div className="flex items-center gap-1 text-white/80 text-sm">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-sm text-[var(--text-secondary)]">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Mountain className="w-4 h-4" />
                          {event.duration}
                        </div>
                      </div>
                      
                      {/* Slots Progress */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-[var(--text-muted)]">Slot tersedia</span>
                          <span className="font-medium text-[var(--primary)]">
                            {event.spotsLeft}/{event.totalSpots}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] rounded-full"
                            style={{ width: `${((event.totalSpots - event.spotsLeft) / event.totalSpots) * 100}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="mt-auto flex items-center justify-between">
                        <div>
                          <span className="text-xs text-[var(--text-muted)]">Mulai dari</span>
                          <div className="text-lg font-bold text-[var(--primary)]">
                            {formatPrice(event.price)}
                          </div>
                        </div>
                        <Link href={`/events/${event.slug}`}>
                          <Button size="sm">
                            Detail
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Mountain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                Event tidak ditemukan
              </h3>
              <p className="text-[var(--text-secondary)]">
                Coba ubah filter atau kata kunci pencarian
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Mobile Filter Modal */}
      {isFilterOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/50"
          onClick={() => setIsFilterOpen(false)}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Filter</h3>
              <button onClick={() => setIsFilterOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Kategori</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        selectedCategory === cat.value
                          ? 'bg-[var(--primary)] text-white'
                          : 'bg-gray-100 text-[var(--text-secondary)]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Tingkat Kesulitan</label>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map((diff) => (
                    <button
                      key={diff.value}
                      onClick={() => setSelectedDifficulty(diff.value)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        selectedDifficulty === diff.value
                          ? 'bg-[var(--primary)] text-white'
                          : 'bg-gray-100 text-[var(--text-secondary)]'
                      }`}
                    >
                      {diff.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <Button
              fullWidth
              className="mt-8"
              onClick={() => setIsFilterOpen(false)}
            >
              Terapkan Filter
            </Button>
          </motion.div>
        </motion.div>
      )}
    </PublicLayout>
  );
}
