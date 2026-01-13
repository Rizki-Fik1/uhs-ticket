"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Calendar,
  Users,
  Mountain,
  Star,
  Clock,
  Shield,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import PublicLayout from "@/components/layouts/PublicLayout";
import { Button, Card } from "@/components/ui";

// Single Event Configuration - UPDATE THIS WITH ACTUAL EVENT DATA
const mainEvent = {
  slug: "hiking-adventure-mei-2026",
  title: "Grand Hiking Adventure 2026",
  subtitle: "Petualangan Pendakian Terbesar Tahun Ini",
  location: "Jalur Gaza, UNNES",
  date: "17 Mei 2026",
  time: "05:00 WIB",
  price: 500000,
  spotsLeft: 150,
  totalSpots: 200,
  rating: 4.9,
  duration: "08.30 - 15.00",
  difficulty: "Umum",
  description:
    "Bergabunglah dalam petualangan pendakian eksklusif bersama ratusan pendaki dari seluruh Indonesia. Nikmati keindahan alam yang memukau, sunrise spektakuler, dan pengalaman tak terlupakan.",
  highlights: [
    "Grand Hiking Adventure",
    "Trees for Trees Campaign",
    "Watersplash",

  ],
};

const stats = [
  { icon: Mountain, value: "5 KM", label: "Panjang Track" },
  { icon: Users, value: "200", label: "Kuota Peserta" },
  { icon: Star, value: "4.9", label: "Rating" },
  { icon: Shield, value: "100%", label: "Aman & Terpercaya" },
];

const features = [
  {
    icon: Calendar,
    title: "Booking Mudah",
    description: "Proses pemesanan cepat dan simple dengan konfirmasi instan.",
  },
  {
    icon: Users,
    title: "Group Booking",
    description:
      "Booking untuk grup dengan satu transaksi. Kelola peserta dengan mudah.",
  },
  {
    icon: Shield,
    title: "E-Ticket QR",
    description:
      "Tiket digital dengan QR code untuk check-in yang cepat dan paperless.",
  },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function HomePage() {
  const spotsPercentage =
    ((mainEvent.totalSpots - mainEvent.spotsLeft) / mainEvent.totalSpots) * 100;

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 mt-8 bg-gradient-to-br from-[var(--primary)] via-[var(--primary-light)] to-[var(--primary)]">
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--accent)]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          {/* Mountain silhouette */}
          <svg
            className="absolute bottom-0 left-0 right-0 w-full h-48 fill-[var(--primary-dark)]"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path d="M0,160L60,170.7C120,181,240,203,360,186.7C480,171,600,117,720,117.3C840,117,960,171,1080,197.3C1200,224,1320,224,1380,224L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 text-[var(--accent)]" />
                Event Eksklusif Mei 2026
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
                {mainEvent.title.split(" ").slice(0, 2).join(" ")}{" "}
                <span className="text-[var(--accent)]">
                  {mainEvent.title.split(" ").slice(2).join(" ")}
                </span>
              </h1>
              <p className="text-xl text-white/90 mb-2">{mainEvent.subtitle}</p>
              <p className="text-lg text-white/70 mb-8 max-w-lg">
                {mainEvent.description}
              </p>

              {/* Event Quick Info */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl">
                  <Calendar className="w-5 h-5 text-[var(--accent)]" />
                  <span>{mainEvent.date}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl">
                  <MapPin className="w-5 h-5 text-[var(--accent)]" />
                  <span>{mainEvent.location}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href={`/booking/${mainEvent.slug}`}>
                  <Button size="lg" variant="secondary">
                    Daftar Sekarang
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:!bg-white hover:!text-[var(--primary)] transition-all duration-100"
                  >
                    Tentang Kami
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right - Stats Cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="glass-dark rounded-2xl p-6 text-white"
                >
                  <stat.icon className="w-8 h-8 text-[var(--accent)] mb-3" />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Single Event Highlight */}
      <section className="py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Detail <span className="text-[var(--accent)]">Event</span>
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Semua yang perlu Anda ketahui tentang petualangan ini
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Event Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card
                variant="elevated"
                padding="none"
                className="overflow-hidden"
              >
                {/* Image Header */}
                <div className="relative h-64 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)]">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 bg-white/90 rounded-full text-sm font-medium text-[var(--primary)]">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    {mainEvent.rating}
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="inline-block px-3 py-1 bg-[var(--accent)] text-white text-sm font-medium rounded-full mb-3">
                      {mainEvent.difficulty}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {mainEvent.title}
                    </h3>
                    <div className="flex items-center gap-2 text-white/80">
                      <MapPin className="w-4 h-4" />
                      {mainEvent.location}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <Calendar className="w-5 h-5 mx-auto text-[var(--primary)] mb-1" />
                      <div className="text-sm font-medium text-[var(--text-primary)]">
                        {mainEvent.date}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <Clock className="w-5 h-5 mx-auto text-[var(--primary)] mb-1" />
                      <div className="text-sm font-medium text-[var(--text-primary)]">
                        {mainEvent.duration}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <Users className="w-5 h-5 mx-auto text-[var(--primary)] mb-1" />
                      <div className="text-sm font-medium text-[var(--text-primary)]">
                        {mainEvent.spotsLeft} slot
                      </div>
                    </div>
                  </div>

                  {/* Slots Progress */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-[var(--text-muted)]">
                        Slot tersedia
                      </span>
                      <span className="font-semibold text-[var(--primary)]">
                        {mainEvent.spotsLeft} dari {mainEvent.totalSpots}
                      </span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] rounded-full transition-all"
                        style={{ width: `${spotsPercentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-[var(--text-muted)]">
                        Harga
                      </span>
                      <div className="text-2xl font-bold text-[var(--primary)]">
                        {formatPrice(mainEvent.price)}
                        <span className="text-sm font-normal text-[var(--text-muted)]">
                          /orang
                        </span>
                      </div>
                    </div>
                    <Link href={`/booking/${mainEvent.slug}`}>
                      <Button>
                        Daftar
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card variant="elevated" padding="lg" className="h-full">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">
                  Rangkaian Acara
                </h3>
                <div className="space-y-4">
                  {mainEvent.highlights.map((highlight, index) => (
                    <motion.div
                      key={highlight}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-green-50 rounded-xl"
                    >
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-[var(--text-primary)] font-medium">
                        {highlight}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] rounded-xl text-white">
                  <p className="text-sm opacity-90 mb-2">Slot terbatas!</p>
                  <p className="font-semibold">
                    Daftar sekarang sebelum kehabisan!!
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Kenapa <span className="text-[var(--accent)]">UHS.Ticket</span>?
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Nikmati pengalaman booking yang modern dan hassle-free
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] text-white mb-6">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[var(--text-secondary)]">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Siap untuk Petualangan Terbesar Tahun Ini?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Jangan lewatkan kesempatan untuk bergabung dalam event eksklusif
              ini. Slot terbatas!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/booking/${mainEvent.slug}`}>
                <Button size="lg" variant="secondary">
                  Daftar Sekarang - {formatPrice(mainEvent.price)}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[var(--primary)]"
                >
                  Pelajari Lebih Lanjut
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}
