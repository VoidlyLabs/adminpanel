import type { NextConfig } from 'next';

const backendImagePattern = (() => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!backendUrl) {
    return null;
  }

  try {
    const url = new URL(backendUrl);

    return {
      protocol: url.protocol.replace(':', '') as 'http' | 'https',
      hostname: url.hostname,
      port: url.port,
      pathname: '/uploads/**',
    };
  } catch {
    return null;
  }
})();

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },

  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  images: {
    dangerouslyAllowLocalIP: true,

    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/uploads/**',
      },
      ...(backendImagePattern ? [backendImagePattern] : []),
    ],
  },
};

export default nextConfig;
