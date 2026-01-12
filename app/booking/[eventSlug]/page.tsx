'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { use } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Clock, 
  User, 
  Phone, 
  Mail,
  CreditCard,
  AlertTriangle,
  Mountain,
  Users,
  Droplet
} from 'lucide-react';
import PublicLayout from '@/components/layouts/PublicLayout';
import { Button, Card, Input } from '@/components/ui';

const participantSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter'),
  idNumber: z.string().min(16, 'NIK harus 16 digit').max(16, 'NIK harus 16 digit'),
  phone: z.string().min(10, 'Nomor HP minimal 10 digit'),
  bloodType: z.string().min(1, 'Pilih golongan darah'),
  emergencyContact: z.string().min(10, 'Nomor darurat minimal 10 digit'),
});

const bookingSchema = z.object({
  // Buyer info
  buyerName: z.string().min(3, 'Nama minimal 3 karakter'),
  buyerEmail: z.string().email('Email tidak valid'),
  buyerPhone: z.string().min(10, 'Nomor HP minimal 10 digit'),
  // Participants
  participants: z.array(participantSchema),
  // Payment
  paymentMethod: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

// Simplified to 3 steps (no package selection)
const steps = [
  { id: 1, title: 'Data Pemesan', icon: User },
  { id: 2, title: 'Data Peserta', icon: Users },
  { id: 3, title: 'Pembayaran', icon: CreditCard },
];

const bloodTypes = ['A', 'B', 'AB', 'O'];

const paymentMethods = [
  { id: 'bca', name: 'BCA Virtual Account', icon: '🏦' },
  { id: 'mandiri', name: 'Mandiri Virtual Account', icon: '🏦' },
  { id: 'bni', name: 'BNI Virtual Account', icon: '🏦' },
  { id: 'gopay', name: 'GoPay', icon: '💚' },
  { id: 'ovo', name: 'OVO', icon: '💜' },
  { id: 'dana', name: 'DANA', icon: '💙' },
];

// Single event configuration - UPDATE THIS WITH ACTUAL EVENT DATA
const eventData = {
  title: 'Grand Hiking Adventure 2026',
  date: '17 Mei 2026',
  location: 'Gunung Rinjani, Lombok',
  price: 500000, // Single flat price
};

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
}

export default function BookingPage({ params }: { params: Promise<{ eventSlug: string }> }) {
  const resolvedParams = use(params);

  const [currentStep, setCurrentStep] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [countdown, setCountdown] = useState(15 * 60); // 15 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, control, formState: { errors } } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      participants: Array(quantity).fill({
        name: '',
        idNumber: '',
        phone: '',
        bloodType: '',
        emergencyContact: '',
      }),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'participants',
  });

  // Update participants when quantity changes
  useEffect(() => {
    const currentLength = fields.length;
    if (quantity > currentLength) {
      for (let i = currentLength; i < quantity; i++) {
        append({ name: '', idNumber: '', phone: '', bloodType: '', emergencyContact: '' });
      }
    } else if (quantity < currentLength) {
      for (let i = currentLength - 1; i >= quantity; i--) {
        remove(i);
      }
    }
  }, [quantity, fields.length, append, remove]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const totalPrice = eventData.price * quantity;
  const adminFee = 5000;
  const grandTotal = totalPrice + adminFee;

  const formatCountdown = () => {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(data);
    // Redirect to success page
    window.location.href = '/booking/success';
  };

  return (
    <PublicLayout>
      <div className="min-h-screen bg-[var(--background)] py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Kembali ke beranda
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              Pendaftaran: {eventData.title}
            </h1>
          </div>

          {/* Timer Banner */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-xl flex items-center justify-between ${
              countdown < 300 ? 'bg-red-50 border border-red-200' : 'bg-amber-50 border border-amber-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <Clock className={`w-5 h-5 ${countdown < 300 ? 'text-red-500' : 'text-amber-500'}`} />
              <span className={`font-medium ${countdown < 300 ? 'text-red-700' : 'text-amber-700'}`}>
                Slot Anda direservasi selama
              </span>
            </div>
            <span className={`text-2xl font-bold font-mono ${countdown < 300 ? 'text-red-600' : 'text-amber-600'}`}>
              {formatCountdown()}
            </span>
          </motion.div>

          {/* Quantity Selector */}
          <Card variant="elevated" padding="md" className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-[var(--text-primary)]">Jumlah Peserta</h3>
                <p className="text-sm text-[var(--text-muted)]">Harga: {formatPrice(eventData.price)}/orang</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-xl border text-xl font-medium hover:bg-gray-100"
                >
                  -
                </button>
                <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="w-10 h-10 rounded-xl border text-xl font-medium hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          </Card>

          {/* Steps Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <motion.div
                      animate={{
                        backgroundColor: currentStep >= step.id ? 'var(--primary)' : 'white',
                        borderColor: currentStep >= step.id ? 'var(--primary)' : '#e5e7eb',
                      }}
                      className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all ${
                        currentStep >= step.id ? 'text-white' : 'text-[var(--text-muted)]'
                      }`}
                    >
                      {currentStep > step.id ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <step.icon className="w-5 h-5" />
                      )}
                    </motion.div>
                    <span className={`mt-2 text-xs sm:text-sm font-medium text-center hidden sm:block ${
                      currentStep >= step.id ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-full h-1 mx-2 sm:mx-4 rounded-full ${
                      currentStep > step.id ? 'bg-[var(--primary)]' : 'bg-gray-200'
                    }`} style={{ minWidth: '60px', maxWidth: '150px' }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit(onSubmit)}>
                <AnimatePresence mode="wait">
                  {/* Step 1: Buyer Info */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <Card variant="elevated" padding="lg">
                        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">
                          Data Pemesan
                        </h2>
                        <p className="text-sm text-[var(--text-muted)] mb-6">
                          Informasi ini akan digunakan untuk konfirmasi pemesanan dan pengiriman e-ticket
                        </p>
                        <div className="space-y-5">
                          <Input
                            label="Nama Lengkap"
                            placeholder="Sesuai KTP"
                            leftIcon={User}
                            error={errors.buyerName?.message}
                            {...register('buyerName')}
                          />
                          <Input
                            label="Email"
                            type="email"
                            placeholder="untuk pengiriman e-ticket"
                            leftIcon={Mail}
                            error={errors.buyerEmail?.message}
                            {...register('buyerEmail')}
                          />
                          <Input
                            label="Nomor HP"
                            type="tel"
                            placeholder="08xxxxxxxxxx"
                            leftIcon={Phone}
                            error={errors.buyerPhone?.message}
                            {...register('buyerPhone')}
                          />
                        </div>

                        <Button type="button" fullWidth size="lg" className="mt-8" onClick={nextStep}>
                          Lanjutkan ke Data Peserta
                          <ArrowRight className="w-5 h-5" />
                        </Button>
                      </Card>
                    </motion.div>
                  )}

                  {/* Step 2: Participants */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-4">
                        <p className="text-sm text-[var(--text-muted)]">
                          Lengkapi data untuk {quantity} peserta. Data ini diperlukan untuk keamanan dan administrasi event.
                        </p>
                      </div>

                      {fields.map((field, index) => (
                        <Card key={field.id} variant="elevated" padding="lg">
                          <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                              Peserta {index + 1}
                            </h3>
                            <span className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium rounded-full">
                              {formatPrice(eventData.price)}
                            </span>
                          </div>
                          <div className="space-y-4">
                            <Input
                              label="Nama Lengkap"
                              placeholder="Sesuai KTP"
                              error={errors.participants?.[index]?.name?.message}
                              {...register(`participants.${index}.name`)}
                            />
                            <Input
                              label="NIK (Nomor KTP)"
                              placeholder="16 digit"
                              error={errors.participants?.[index]?.idNumber?.message}
                              {...register(`participants.${index}.idNumber`)}
                            />
                            <div className="grid grid-cols-2 gap-4">
                              <Input
                                label="Nomor HP"
                                type="tel"
                                placeholder="08xxxxxxxxxx"
                                error={errors.participants?.[index]?.phone?.message}
                                {...register(`participants.${index}.phone`)}
                              />
                              <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                                  Golongan Darah
                                </label>
                                <select
                                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
                                  {...register(`participants.${index}.bloodType`)}
                                >
                                  <option value="">Pilih</option>
                                  {bloodTypes.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <Input
                              label="Kontak Darurat"
                              type="tel"
                              placeholder="Nomor keluarga/kerabat"
                              hint="Akan dihubungi jika terjadi keadaan darurat"
                              error={errors.participants?.[index]?.emergencyContact?.message}
                              {...register(`participants.${index}.emergencyContact`)}
                            />
                          </div>
                        </Card>
                      ))}

                      <div className="flex gap-4">
                        <Button type="button" variant="outline" fullWidth onClick={prevStep}>
                          <ArrowLeft className="w-5 h-5" />
                          Kembali
                        </Button>
                        <Button type="button" fullWidth onClick={nextStep}>
                          Lanjutkan ke Pembayaran
                          <ArrowRight className="w-5 h-5" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Payment */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <Card variant="elevated" padding="lg">
                        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">
                          Metode Pembayaran
                        </h2>
                        <div className="space-y-3">
                          {paymentMethods.map((method) => (
                            <label
                              key={method.id}
                              className="flex items-center gap-4 p-4 rounded-xl border cursor-pointer hover:bg-gray-50 transition-colors"
                            >
                              <input
                                type="radio"
                                value={method.id}
                                className="w-5 h-5 text-[var(--primary)]"
                                {...register('paymentMethod')}
                              />
                              <span className="text-2xl">{method.icon}</span>
                              <span className="font-medium text-[var(--text-primary)]">{method.name}</span>
                            </label>
                          ))}
                        </div>

                        <div className="mt-8 p-4 bg-amber-50 rounded-xl flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                          <p className="text-sm text-amber-700">
                            Setelah melakukan pembayaran, e-ticket akan dikirim ke email Anda dalam waktu maksimal 1x24 jam.
                          </p>
                        </div>

                        <div className="flex gap-4 mt-8">
                          <Button type="button" variant="outline" fullWidth onClick={prevStep}>
                            <ArrowLeft className="w-5 h-5" />
                            Kembali
                          </Button>
                          <Button type="submit" fullWidth isLoading={isSubmitting}>
                            Bayar {formatPrice(grandTotal)}
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card variant="elevated" padding="lg">
                  <h3 className="font-semibold text-[var(--text-primary)] mb-4">
                    Ringkasan Pesanan
                  </h3>
                  
                  <div className="flex items-start gap-4 pb-4 border-b">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] flex items-center justify-center">
                      <Mountain className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[var(--text-primary)]">{eventData.title}</h4>
                      <p className="text-sm text-[var(--text-muted)]">{eventData.date}</p>
                      <p className="text-sm text-[var(--text-muted)]">{eventData.location}</p>
                    </div>
                  </div>

                  <div className="py-4 border-b space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--text-secondary)]">Jumlah Peserta</span>
                      <span className="font-medium">{quantity} orang</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--text-secondary)]">Harga per orang</span>
                      <span className="font-medium">{formatPrice(eventData.price)}</span>
                    </div>
                  </div>

                  <div className="py-4 border-b space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--text-secondary)]">Subtotal</span>
                      <span className="font-medium">{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--text-secondary)]">Biaya Admin</span>
                      <span className="font-medium">{formatPrice(adminFee)}</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="flex justify-between">
                      <span className="font-semibold text-[var(--text-primary)]">Total</span>
                      <span className="text-xl font-bold text-[var(--primary)]">{formatPrice(grandTotal)}</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
