'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { use } from 'react';
import { 
  MapPin, 
  Calendar, 
  Users,
  Clock, 
  Star, 
  ArrowLeft,
  Mountain,
  CheckCircle,
  AlertTriangle,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  Minus,
  Plus
} from 'lucide-react';
import PublicLayout from '@/components/layouts/PublicLayout';
import { Button, Card } from '@/components/ui';

// Mock event data - in production this would come from API
const eventData: Record<string, {
  id: number;
  slug: string;
  title: string;
  location: string;
  date: string;
  endDate: string;
  price: number;
  difficulty: string;
  duration: string;
  spotsLeft: number;
  totalSpots: number;
  rating: number;
  reviewCount: number;
  description: string;
  highlights: string[];
  itinerary: { day: string; title: string; activities: string[] }[];
  includes: string[];
  excludes: string[];
  requirements: string[];
  packages: { id: string; name: string; price: number; description: string }[];
}> = {
  'gunung-prau-sunrise': {
    id: 1,
    slug: 'gunung-prau-sunrise',
    title: 'Sunrise Gunung Prau',
    location: 'Dieng, Jawa Tengah',
    date: '15 Feb 2026',
    endDate: '16 Feb 2026',
    price: 250000,
    difficulty: 'Mudah',
    duration: '2 Hari 1 Malam',
    spotsLeft: 12,
    totalSpots: 30,
    rating: 4.9,
    reviewCount: 128,
    description: 'Nikmati keindahan matahari terbit dari puncak Gunung Prau dengan pemandangan laut awan yang spektakuler. Trek yang relatif mudah cocok untuk pemula.',
    highlights: [
      'Golden sunrise view dari puncak',
      'Panorama 360° laut awan',
      'Camping di basecamp',
      'Pemandu berpengalaman',
      'Dokumentasi profesional',
    ],
    itinerary: [
      {
        day: 'Hari 1',
        title: 'Jakarta - Dieng - Basecamp',
        activities: [
          '05:00 - Berangkat dari Jakarta',
          '12:00 - Tiba di Dieng, makan siang',
          '14:00 - Briefing & persiapan',
          '15:00 - Trek ke basecamp (2-3 jam)',
          '18:00 - Tiba di basecamp, makan malam',
          '20:00 - Istirahat',
        ],
      },
      {
        day: 'Hari 2',
        title: 'Summit - Pulang',
        activities: [
          '03:00 - Summit attack',
          '04:30 - Tiba di puncak',
          '05:30 - Sunrise & foto-foto',
          '07:00 - Turun ke basecamp',
          '09:00 - Sarapan & packing',
          '11:00 - Perjalanan pulang',
          '18:00 - Tiba di Jakarta',
        ],
      },
    ],
    includes: [
      'Transportasi PP Jakarta-Dieng',
      'Tiket masuk kawasan',
      'Pemandu lokal',
      'Makan 3x',
      'Tenda & sleeping bag',
      'P3K standar',
      'Dokumentasi',
    ],
    excludes: [
      'Perlengkapan pribadi',
      'Asuransi perjalanan',
      'Porter (bisa request)',
      'Tips guide',
    ],
    requirements: [
      'Usia minimal 17 tahun',
      'Kondisi fisik prima',
      'Tidak ada riwayat penyakit jantung',
      'Membawa KTP asli',
    ],
    packages: [
      { id: 'regular', name: 'Regular', price: 250000, description: 'Fasilitas standar dengan tenda sharing' },
      { id: 'premium', name: 'Premium', price: 350000, description: 'Tenda private + snack tambahan' },
      { id: 'vip', name: 'VIP', price: 500000, description: 'Tenda private + porter + makan premium' },
    ],
  },
};

// Fallback for other slugs
const getEventData = (slug: string) => {
  return eventData[slug] || eventData['gunung-prau-sunrise'];
};

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

export default function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const event = getEventData(resolvedParams.slug);
  const [selectedPackage, setSelectedPackage] = useState(event.packages[0].id);
  const [quantity, setQuantity] = useState(1);
  const [openItinerary, setOpenItinerary] = useState<number | null>(0);

  const currentPackage = event.packages.find(p => p.id === selectedPackage)!;
  const totalPrice = currentPackage.price * quantity;

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)]">
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent" />
        
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16">
          <Link
            href="/events"
            className="absolute top-6 left-4 sm:left-6 lg:left-8 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(event.difficulty)}`}>
                {event.difficulty}
              </span>
              <span className="flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full text-white text-sm">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                {event.rating} ({event.reviewCount} ulasan)
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80">
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {event.location}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {event.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {event.duration}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <Card variant="elevated" padding="lg">
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">
                  Tentang Event
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  {event.description}
                </p>
                
                <h3 className="font-semibold text-[var(--text-primary)] mb-3">Highlights</h3>
                <ul className="space-y-2">
                  {event.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                      <span className="text-[var(--text-secondary)]">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Itinerary */}
              <Card variant="elevated" padding="lg">
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">
                  Itinerary
                </h2>
                <div className="space-y-4">
                  {event.itinerary.map((day, index) => (
                    <div key={index} className="border rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenItinerary(openItinerary === index ? null : index)}
                        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-[var(--primary)] text-white text-sm font-medium rounded-lg">
                            {day.day}
                          </span>
                          <span className="font-medium text-[var(--text-primary)]">{day.title}</span>
                        </div>
                        {openItinerary === index ? (
                          <ChevronUp className="w-5 h-5 text-[var(--text-secondary)]" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-[var(--text-secondary)]" />
                        )}
                      </button>
                      {openItinerary === index && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          className="p-4 border-t"
                        >
                          <ul className="space-y-2">
                            {day.activities.map((activity, actIndex) => (
                              <li key={actIndex} className="text-[var(--text-secondary)] text-sm pl-4 border-l-2 border-[var(--accent)]">
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Includes/Excludes */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card variant="bordered" padding="lg">
                  <h3 className="font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Termasuk
                  </h3>
                  <ul className="space-y-2">
                    {event.includes.map((item, index) => (
                      <li key={index} className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
                <Card variant="bordered" padding="lg">
                  <h3 className="font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    Tidak Termasuk
                  </h3>
                  <ul className="space-y-2">
                    {event.excludes.map((item, index) => (
                      <li key={index} className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                        <span className="text-orange-500">✗</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              {/* Requirements */}
              <Card variant="elevated" padding="lg">
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-[var(--accent)]" />
                  Persyaratan
                </h2>
                <ul className="space-y-2">
                  {event.requirements.map((req, index) => (
                    <li key={index} className="text-[var(--text-secondary)] flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center text-sm font-medium shrink-0">
                        {index + 1}
                      </span>
                      {req}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Sidebar - Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card variant="elevated" padding="lg">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-sm text-[var(--text-muted)]">Mulai dari</span>
                      <div className="text-2xl font-bold text-[var(--primary)]">
                        {formatPrice(event.price)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-[var(--accent)]">
                        <Users className="w-4 h-4" />
                        <span className="font-medium">{event.spotsLeft}</span>
                      </div>
                      <span className="text-xs text-[var(--text-muted)]">slot tersisa</span>
                    </div>
                  </div>

                  {/* Package Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Pilih Paket
                    </label>
                    <div className="space-y-2">
                      {event.packages.map((pkg) => (
                        <button
                          key={pkg.id}
                          onClick={() => setSelectedPackage(pkg.id)}
                          className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                            selectedPackage === pkg.id
                              ? 'border-[var(--primary)] bg-[var(--primary)]/5'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-[var(--text-primary)]">{pkg.name}</span>
                            <span className="font-bold text-[var(--primary)]">{formatPrice(pkg.price)}</span>
                          </div>
                          <p className="text-xs text-[var(--text-muted)]">{pkg.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Jumlah Peserta
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-xl border flex items-center justify-center hover:bg-gray-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-xl font-bold w-12 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(event.spotsLeft, quantity + 1))}
                        className="w-10 h-10 rounded-xl border flex items-center justify-center hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="py-4 border-t border-b mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--text-secondary)]">Total</span>
                      <span className="text-2xl font-bold text-[var(--primary)]">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                  </div>

                  <Link href={`/booking/${event.slug}?package=${selectedPackage}&qty=${quantity}`}>
                    <Button fullWidth size="lg">
                      Pesan Sekarang
                    </Button>
                  </Link>

                  {/* Contact */}
                  <div className="mt-6 pt-6 border-t">
                    <p className="text-sm text-[var(--text-muted)] text-center mb-4">
                      Ada pertanyaan?
                    </p>
                    <div className="flex gap-3">
                      <Button variant="outline" fullWidth size="sm">
                        <Phone className="w-4 h-4" />
                        Telepon
                      </Button>
                      <Button variant="outline" fullWidth size="sm">
                        <Mail className="w-4 h-4" />
                        Email
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
