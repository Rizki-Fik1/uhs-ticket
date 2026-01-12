'use client';

import { motion } from 'framer-motion';
import { Building2, Target, Eye, Mail, Phone, MapPin, Users, Award, Heart, Shield } from 'lucide-react';
import PublicLayout from '@/components/layouts/PublicLayout';
import { Card } from '@/components/ui';

// Company Information - UPDATE THIS WITH ACTUAL DATA
const companyInfo = {
  name: 'Urban Hiking Semarang',
  tagline: 'Komunitas Jalan Sehat Blusukan Cari Rute Tanjakan & Turunan',
  description: 'UHS (Urban Hiking Semarang) adalah perusahaan pengelola event outdoor dan hiking terkemuka di Indonesia. Kami berkomitmen untuk menghadirkan pengalaman petualangan yang aman, berkesan, dan tak terlupakan bagi para pecinta alam.',
  founded: '2020',
  vision: 'Menjadi platform penyelenggara event hiking dan outdoor terpercaya nomor satu di Indonesia, yang menginspirasi jutaan orang untuk mencintai alam dan menjalani gaya hidup sehat.',
  mission: [
    'Menyelenggarakan event hiking dengan standar keamanan tertinggi',
    'Memberikan pengalaman petualangan yang berkesan dan edukatif',
    'Membangun komunitas pecinta alam yang solid dan supportif',
    'Mendukung pelestarian lingkungan melalui kegiatan outdoor yang bertanggung jawab',
  ],
  values: [
    { icon: Shield, title: 'Keamanan', description: 'Standar keamanan tertinggi untuk setiap peserta' },
    { icon: Heart, title: 'Passion', description: 'Dicintai oleh pecinta alam dan petualang sejati' },
    { icon: Users, title: 'Komunitas', description: 'Membangun persahabatan melalui petualangan bersama' },
    { icon: Award, title: 'Kualitas', description: 'Pelayanan premium dengan perhatian pada detail' },
  ],
  contact: {
    email: 'info@uhsticket.com',
    phone: '+62 812 3456 7890',
    address: 'Jl. Petualangan No. 123, Jakarta Selatan, Indonesia',
  },
  stats: [
    { value: '50+', label: 'Event Sukses' },
    { value: '10.000+', label: 'Peserta Happy' },
    { value: '20+', label: 'Destinasi' },
    { value: '4.9', label: 'Rating' },
  ],
};

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-[var(--accent)]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-6">
              <Building2 className="w-4 h-4 text-[var(--accent)]" />
              Tentang Kami
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              {companyInfo.name}
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              {companyInfo.tagline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">
                Siapa <span className="text-[var(--accent)]">Kami?</span>
              </h2>
              <p className="text-lg text-[var(--text-secondary)] mb-6 leading-relaxed">
                {companyInfo.description}
              </p>
              <p className="text-[var(--text-secondary)] mb-8">
                Didirikan pada tahun {companyInfo.founded}, kami telah membantu ribuan pendaki mewujudkan impian mereka untuk menaklukkan puncak-puncak tertinggi Indonesia dengan aman dan menyenangkan.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {companyInfo.stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-4 bg-white rounded-xl shadow-sm"
                  >
                    <div className="text-2xl font-bold text-[var(--primary)]">{stat.value}</div>
                    <div className="text-sm text-[var(--text-muted)]">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] rounded-3xl overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Building2 className="w-32 h-32 text-white/30" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/50 to-transparent">
                  <p className="text-white text-lg font-medium">UHS Ticket</p>
                  <p className="text-white/80">Platform Tiket Hiking #1 Indonesia</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card variant="elevated" padding="lg" className="h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                    <Eye className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--text-primary)]">Visi</h3>
                </div>
                <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                  {companyInfo.vision}
                </p>
              </Card>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card variant="elevated" padding="lg" className="h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-light)] flex items-center justify-center">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--text-primary)]">Misi</h3>
                </div>
                <ul className="space-y-4">
                  {companyInfo.mission.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-[var(--accent)]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                      </div>
                      <span className="text-[var(--text-secondary)]">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Nilai-Nilai <span className="text-[var(--accent)]">Kami</span>
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Prinsip yang kami pegang teguh dalam setiap langkah
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyInfo.values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="elevated" padding="lg" className="text-center h-full">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] flex items-center justify-center mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Hubungi Kami
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Punya pertanyaan? Jangan ragu untuk menghubungi tim kami
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-dark rounded-2xl p-6 text-center text-white"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-[var(--accent)] flex items-center justify-center mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Email</h3>
              <a href={`mailto:${companyInfo.contact.email}`} className="text-white/80 hover:text-white transition-colors">
                {companyInfo.contact.email}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-dark rounded-2xl p-6 text-center text-white"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-[var(--accent)] flex items-center justify-center mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Telepon</h3>
              <a href={`tel:${companyInfo.contact.phone}`} className="text-white/80 hover:text-white transition-colors">
                {companyInfo.contact.phone}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-dark rounded-2xl p-6 text-center text-white"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-[var(--accent)] flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Alamat</h3>
              <p className="text-white/80 text-sm">
                {companyInfo.contact.address}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
