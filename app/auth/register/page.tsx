'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Mountain, Mail, Lock, User, Phone, ArrowRight, CheckCircle } from 'lucide-react';
import { Button, Input } from '@/components/ui';

const registerSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter'),
  email: z.string().email('Email tidak valid'),
  phone: z.string().min(10, 'Nomor HP minimal 10 digit'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Password tidak cocok',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const benefits = [
  'Booking event hiking dengan mudah',
  'E-ticket dengan QR code untuk check-in cepat',
  'Kelola group booking dalam satu transaksi',
  'Notifikasi update event terbaru',
];

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(data);
    setIsLoading(false);
    // In production: redirect to verify email or dashboard
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[var(--background)]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <Link href="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
              <Mountain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-[var(--primary)]">
              UHS<span className="text-[var(--accent)]">Ticket</span>
            </span>
          </Link>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
              Buat Akun Baru
            </h2>
            <p className="text-[var(--text-secondary)]">
              Daftar untuk mulai petualanganmu
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Nama Lengkap"
              type="text"
              placeholder="Masukkan nama lengkap"
              leftIcon={User}
              error={errors.name?.message}
              {...register('name')}
            />

            <Input
              label="Email"
              type="email"
              placeholder="nama@email.com"
              leftIcon={Mail}
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="Nomor HP"
              type="tel"
              placeholder="08xxxxxxxxxx"
              leftIcon={Phone}
              error={errors.phone?.message}
              {...register('phone')}
            />

            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Minimal 6 karakter"
              leftIcon={Lock}
              rightIcon={showPassword ? EyeOff : Eye}
              onRightIconClick={() => setShowPassword(!showPassword)}
              error={errors.password?.message}
              {...register('password')}
            />

            <Input
              label="Konfirmasi Password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Ulangi password"
              leftIcon={Lock}
              rightIcon={showConfirmPassword ? EyeOff : Eye}
              onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />

            <label className="flex items-start gap-3 cursor-pointer pt-2">
              <input
                type="checkbox"
                required
                className="w-4 h-4 mt-1 rounded border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)]"
              />
              <span className="text-sm text-[var(--text-secondary)]">
                Saya setuju dengan{' '}
                <Link href="/terms" className="text-[var(--accent)] hover:underline">
                  Syarat & Ketentuan
                </Link>{' '}
                dan{' '}
                <Link href="/privacy" className="text-[var(--accent)] hover:underline">
                  Kebijakan Privasi
                </Link>
              </span>
            </label>

            <Button type="submit" fullWidth size="lg" isLoading={isLoading} className="mt-6">
              Daftar Sekarang
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>

          <p className="mt-8 text-center text-[var(--text-secondary)]">
            Sudah punya akun?{' '}
            <Link href="/auth/login" className="text-[var(--accent)] font-medium hover:underline">
              Masuk di sini
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[var(--primary)] via-[var(--primary-light)] to-[var(--primary)] relative overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-[var(--accent)]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 flex flex-col justify-center px-12 lg:px-16 text-white">
          <Link href="/" className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <Mountain className="w-7 h-7 text-[var(--accent)]" />
            </div>
            <span className="text-2xl font-bold">
              UHS<span className="text-[var(--accent)]">Ticket</span>
            </span>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Bergabung<br />
              <span className="text-[var(--accent)]">Bersama Kami</span>
            </h1>
            <p className="text-lg text-white/70 max-w-md mb-8">
              Ribuan pendaki sudah mempercayai UHS.Ticket untuk petualangan mereka.
            </p>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-[var(--accent)] flex items-center justify-center">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span className="text-white/90">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-3">
              {['R', 'A', 'D', 'B'].map((initial, index) => (
                <div
                  key={index}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-light)] flex items-center justify-center text-sm font-bold border-2 border-[var(--primary)]"
                >
                  {initial}
                </div>
              ))}
            </div>
            <p className="text-white/70 text-sm">
              <span className="text-white font-medium">10,000+</span> pendaki bergabung
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
