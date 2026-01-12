'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  CameraOff, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  RefreshCw,
  Flashlight,
  FlashlightOff,
  User,
  Calendar,
  Clock
} from 'lucide-react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, Button } from '@/components/ui';

type ScanResult = {
  status: 'valid' | 'invalid' | 'already_scanned';
  message: string;
  participant?: {
    name: string;
    event: string;
    ticketId: string;
    checkedInAt?: string;
  };
};

// Mock scan results for demo
const mockScanResults: Record<string, ScanResult> = {
  'UHS-20260215-001234-VERIFIED': {
    status: 'valid',
    message: 'Check-in berhasil!',
    participant: {
      name: 'John Doe',
      event: 'Sunrise Gunung Prau',
      ticketId: 'UHS-20260215-001234',
    },
  },
  'UHS-20260215-001234-SCANNED': {
    status: 'already_scanned',
    message: 'Tiket sudah di-scan sebelumnya',
    participant: {
      name: 'John Doe',
      event: 'Sunrise Gunung Prau',
      ticketId: 'UHS-20260215-001234',
      checkedInAt: '05:32 WIB',
    },
  },
};

export default function AdminCheckInPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [todayStats, setTodayStats] = useState({ checked: 156, total: 180 });

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
        setHasPermission(true);
      }
    } catch (err) {
      console.error('Camera access denied:', err);
      setHasPermission(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  // Simulate QR code scan (in production, use a QR scanner library)
  const simulateScan = (code: string) => {
    setIsProcessing(true);
    setScanResult(null);
    
    setTimeout(() => {
      const result = mockScanResults[code] || {
        status: 'invalid' as const,
        message: 'QR Code tidak valid atau tidak ditemukan',
      };
      setScanResult(result);
      setIsProcessing(false);
      
      // Auto-clear result after 4 seconds
      setTimeout(() => setScanResult(null), 4000);
    }, 1000);
  };

  const getResultStyles = (status: ScanResult['status']) => {
    switch (status) {
      case 'valid':
        return {
          bg: 'bg-green-500',
          icon: CheckCircle,
          borderColor: 'border-green-500',
        };
      case 'already_scanned':
        return {
          bg: 'bg-yellow-500',
          icon: AlertTriangle,
          borderColor: 'border-yellow-500',
        };
      case 'invalid':
        return {
          bg: 'bg-red-500',
          icon: XCircle,
          borderColor: 'border-red-500',
        };
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            QR Check-in Scanner
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Scan QR code peserta untuk check-in
          </p>
        </div>

        {/* Today's Stats */}
        <Card variant="bordered" padding="md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)]">Check-in Hari Ini</p>
                <p className="text-lg font-bold text-[var(--text-primary)]">
                  {todayStats.checked} <span className="text-[var(--text-muted)] font-normal">/ {todayStats.total}</span>
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">
                {Math.round((todayStats.checked / todayStats.total) * 100)}%
              </p>
            </div>
          </div>
        </Card>

        {/* Camera View */}
        <Card variant="elevated" padding="none" className="overflow-hidden">
          <div className="relative aspect-[4/3] bg-gray-900">
            {isCameraActive ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                {/* Scanning Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 border-2 border-white/50 rounded-2xl relative">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[var(--accent)] rounded-tl-lg" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[var(--accent)] rounded-tr-lg" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[var(--accent)] rounded-bl-lg" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[var(--accent)] rounded-br-lg" />
                    {/* Scanning line animation */}
                    <motion.div
                      className="absolute left-2 right-2 h-0.5 bg-[var(--accent)]"
                      animate={{ top: ['10%', '90%', '10%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </div>
                </div>
                {isProcessing && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <RefreshCw className="w-12 h-12 text-white animate-spin" />
                  </div>
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <CameraOff className="w-16 h-16 text-gray-500 mb-4" />
                <p className="text-gray-400">Kamera tidak aktif</p>
              </div>
            )}

            {/* Scan Result Overlay */}
            <AnimatePresence>
              {scanResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`absolute inset-0 ${getResultStyles(scanResult.status).bg} bg-opacity-95 flex flex-col items-center justify-center text-white p-6`}
                >
                  {(() => {
                    const Icon = getResultStyles(scanResult.status).icon;
                    return <Icon className="w-20 h-20 mb-4" />;
                  })()}
                  <h3 className="text-2xl font-bold mb-2">{scanResult.message}</h3>
                  {scanResult.participant && (
                    <div className="text-center mt-4 space-y-2">
                      <p className="text-xl font-medium">{scanResult.participant.name}</p>
                      <p className="text-white/80">{scanResult.participant.event}</p>
                      <p className="text-sm font-mono text-white/60">{scanResult.participant.ticketId}</p>
                      {scanResult.participant.checkedInAt && (
                        <p className="text-sm text-white/80">
                          Sudah check-in pada {scanResult.participant.checkedInAt}
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Camera Controls */}
          <div className="p-4 border-t flex items-center justify-center gap-4">
            {isCameraActive ? (
              <>
                <Button variant="danger" onClick={stopCamera}>
                  <CameraOff className="w-5 h-5" />
                  Stop Kamera
                </Button>
              </>
            ) : (
              <Button onClick={startCamera}>
                <Camera className="w-5 h-5" />
                Mulai Scan
              </Button>
            )}
          </div>
        </Card>

        {/* Demo Buttons (for testing without actual QR scanner) */}
        <Card variant="bordered" padding="md">
          <p className="text-sm text-[var(--text-muted)] text-center mb-4">
            Demo: Klik untuk simulasi hasil scan
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => simulateScan('UHS-20260215-001234-VERIFIED')}
              className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200"
            >
              ✅ Valid Scan
            </button>
            <button
              onClick={() => simulateScan('UHS-20260215-001234-SCANNED')}
              className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-200"
            >
              ⚠️ Already Scanned
            </button>
            <button
              onClick={() => simulateScan('INVALID-CODE')}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200"
            >
              ❌ Invalid
            </button>
          </div>
        </Card>

        {/* Recent Check-ins */}
        <Card variant="elevated" padding="none">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-[var(--text-primary)]">Check-in Terakhir</h3>
          </div>
          <div className="divide-y">
            {[
              { name: 'John Doe', event: 'Sunrise Gunung Prau', time: '05:32 WIB' },
              { name: 'Jane Smith', event: 'Sunrise Gunung Prau', time: '05:28 WIB' },
              { name: 'Bob Wilson', event: 'Sunrise Gunung Prau', time: '05:25 WIB' },
            ].map((item, index) => (
              <div key={index} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white font-medium">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">{item.name}</p>
                    <p className="text-sm text-[var(--text-muted)]">{item.event}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-[var(--text-muted)]">
                  <Clock className="w-4 h-4" />
                  {item.time}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
