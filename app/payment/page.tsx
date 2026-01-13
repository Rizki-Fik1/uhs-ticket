'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Wallet, Building2, Smartphone, CheckCircle2, AlertCircle, Clock, Shield, Plus, Minus } from 'lucide-react';
import PublicLayout from '@/components/layouts/PublicLayout';
import { Card } from '@/components/ui';

// Payment Methods Data
const paymentMethods = [
  {
    category: 'Transfer Bank',
    icon: Building2,
    methods: [
      { name: 'BCA', number: '1234567890', holder: 'PT UHS Ticket Indonesia' },
      { name: 'Mandiri', number: '0987654321', holder: 'PT UHS Ticket Indonesia' },
      { name: 'BNI', number: '1122334455', holder: 'PT UHS Ticket Indonesia' },
      { name: 'BRI', number: '5566778899', holder: 'PT UHS Ticket Indonesia' },
    ],
  },
  {
    category: 'E-Wallet',
    icon: Wallet,
    methods: [
      { name: 'GoPay', number: '0812-3456-7890', holder: 'UHS Ticket' },
      { name: 'OVO', number: '0812-3456-7890', holder: 'UHS Ticket' },
      { name: 'DANA', number: '0812-3456-7890', holder: 'UHS Ticket' },
      { name: 'ShopeePay', number: '0812-3456-7890', holder: 'UHS Ticket' },
    ],
  },
  {
    category: 'Virtual Account',
    icon: CreditCard,
    methods: [
      { name: 'BCA Virtual Account', number: 'Auto-generated saat checkout', holder: '' },
      { name: 'Mandiri Virtual Account', number: 'Auto-generated saat checkout', holder: '' },
      { name: 'BNI Virtual Account', number: 'Auto-generated saat checkout', holder: '' },
    ],
  },
  {
    category: 'QRIS',
    icon: Smartphone,
    methods: [
      { name: 'QRIS', number: 'Scan QR Code saat checkout', holder: 'Mendukung semua aplikasi e-wallet' },
    ],
  },
];

const paymentSteps = [
  {
    step: 1,
    title: 'Pilih Event',
    description: 'Pilih event hiking yang ingin Anda ikuti dan tentukan jumlah tiket',
  },
  {
    step: 2,
    title: 'Isi Data Peserta',
    description: 'Lengkapi data diri peserta yang akan mengikuti event',
  },
  {
    step: 3,
    title: 'Pilih Pembayaran',
    description: 'Pilih metode pembayaran yang paling nyaman untuk Anda',
  },
  {
    step: 4,
    title: 'Lakukan Pembayaran',
    description: 'Transfer sesuai nominal atau scan QRIS dalam waktu yang ditentukan',
  },
  {
    step: 5,
    title: 'Konfirmasi',
    description: 'Pembayaran akan diverifikasi otomatis dan tiket dikirim via email/WhatsApp',
  },
];

const importantNotes = [
  {
    icon: Clock,
    title: 'Batas Waktu Pembayaran',
    description: 'Selesaikan pembayaran dalam 1x24 jam setelah booking. Pesanan akan otomatis dibatalkan jika melewati batas waktu.',
  },
  {
    icon: CheckCircle2,
    title: 'Konfirmasi Otomatis',
    description: 'Untuk Virtual Account dan QRIS, pembayaran akan dikonfirmasi secara otomatis dalam 5-10 menit.',
  },
  {
    icon: AlertCircle,
    title: 'Transfer Manual',
    description: 'Untuk transfer bank manual, mohon konfirmasi pembayaran melalui WhatsApp dengan menyertakan bukti transfer.',
  },
  {
    icon: Shield,
    title: 'Keamanan Transaksi',
    description: 'Semua transaksi dilindungi dengan enkripsi SSL. Data pembayaran Anda aman bersama kami.',
  },
];

export default function PaymentPage() {
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
              <CreditCard className="w-4 h-4 text-[var(--accent)]" />
              Panduan Pembayaran
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Cara Pembayaran
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Berbagai metode pembayaran untuk kemudahan transaksi Anda
            </p>
          </motion.div>
        </div>
      </section>

      {/* Payment Steps */}
      <section className="py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Langkah <span className="text-[var(--accent)]">Pembayaran</span>
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Ikuti langkah mudah berikut untuk menyelesaikan pembayaran tiket
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--primary)] transform -translate-y-1/2" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {paymentSteps.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <Card variant="elevated" padding="lg" className="text-center h-full">
                    <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center mb-4 text-white font-bold text-lg relative z-10">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-[var(--text-primary)] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {item.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Metode <span className="text-[var(--accent)]">Pembayaran</span>
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Pilih metode pembayaran yang paling nyaman untuk Anda
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {paymentMethods.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <Card variant="elevated" padding="lg" className="h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] flex items-center justify-center">
                      <category.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">
                      {category.category}
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    {category.methods.map((method, methodIndex) => (
                      <motion.div
                        key={method.name}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: methodIndex * 0.05 }}
                        className="p-4 bg-[var(--background)] rounded-xl"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-[var(--text-primary)]">
                              {method.name}
                            </p>
                            <p className="text-sm text-[var(--text-muted)] font-mono mt-1">
                              {method.number}
                            </p>
                            {method.holder && (
                              <p className="text-xs text-[var(--text-secondary)] mt-1">
                                a.n. {method.holder}
                              </p>
                            )}
                          </div>
                          <button 
                            onClick={() => navigator.clipboard.writeText(method.number)}
                            className="text-xs px-3 py-1.5 bg-[var(--primary)]/10 text-[var(--primary)] rounded-lg hover:bg-[var(--primary)]/20 transition-colors"
                          >
                            Salin
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-20 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Informasi Penting
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Hal-hal yang perlu diperhatikan saat melakukan pembayaran
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {importantNotes.map((note, index) => (
              <motion.div
                key={note.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-dark rounded-2xl p-6 text-white"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--accent)] flex items-center justify-center mb-4">
                  <note.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">{note.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  {note.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />
    </PublicLayout>
  );
}

// FAQ Data
const faqData = [
  {
    q: 'Bagaimana jika pembayaran sudah dilakukan tapi tiket belum masuk?',
    a: 'Untuk pembayaran Virtual Account dan QRIS, tunggu maksimal 15 menit. Untuk transfer manual, pastikan sudah konfirmasi via WhatsApp dengan menyertakan bukti transfer.',
  },
  {
    q: 'Apakah bisa refund jika tidak jadi mengikuti event?',
    a: 'Ya, refund dapat dilakukan maksimal 3 hari sebelum event dengan potongan biaya admin 10%. Hubungi customer service untuk proses refund.',
  },
  {
    q: 'Apakah bisa bayar di tempat (COD)?',
    a: 'Maaf, saat ini kami belum menyediakan opsi pembayaran di tempat. Semua pembayaran harus dilakukan secara online sebelum event.',
  },
  {
    q: 'Bagaimana cara mendapatkan invoice resmi?',
    a: 'Invoice otomatis dikirim ke email yang terdaftar setelah pembayaran berhasil dikonfirmasi. Anda juga bisa mengunduhnya di dashboard.',
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-[var(--background)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
            Pertanyaan <span className="text-[var(--accent)]">Umum</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold text-[var(--text-primary)] pr-4">
                    {faq.q}
                  </h3>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                    openIndex === index 
                      ? 'bg-[var(--accent)] text-white rotate-180' 
                      : 'bg-[var(--primary)]/10 text-[var(--primary)]'
                  }`}>
                    {openIndex === index ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0">
                        <div className="pt-2 border-t border-gray-100">
                          <p className="text-[var(--text-secondary)] pt-4 leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
