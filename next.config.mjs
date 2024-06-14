/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  // Добавляем экспериментальную настройку
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },

  // Другие настройки Next.js можно добавлять здесь
};

export default nextConfig;
