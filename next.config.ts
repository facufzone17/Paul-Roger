import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    // El CSS del sitio es chico: incrustarlo evita un pedido que bloquea el primer pintado
    // (la mayoría llega desde Instagram, por primera vez y en 4G).
    inlineCss: true,
  },
  images: {
    // AVIF primero (más liviano en 4G), WebP de respaldo.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920, 2560],
    imageSizes: [96, 160, 256, 384, 480],
    qualities: [60, 70, 75, 80],
  },
}

export default nextConfig
