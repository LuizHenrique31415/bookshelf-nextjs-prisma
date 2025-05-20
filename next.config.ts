// next.config.ts
import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "images-na.ssl-images-amazon.com",
      },
    ],
  },
  // Configurações de segurança para produção
  headers: async () => {
    return [
      {
        // Aplicar a todas as rotas
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Content-Security-Policy",
            value: `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' https://m.media-amazon.com https://images-na.ssl-images-amazon.com data:; font-src 'self' data:;`,
          },
        ],
      },
    ];
  },
  // Sempre forçar HTTPS
  async redirects() {
    return [
      {
        source: "/(.*)",
        has: [{ type: "host", value: "(?!localhost).*" }],
        missing: [{ type: "header", key: "x-forwarded-proto", value: "https" }],
        permanent: true,
        destination: "https://:host/:path*",
      },
    ];
  },
};

export default config;
