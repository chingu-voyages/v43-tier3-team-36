/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'i.annihil.us',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placekeanu.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placebear.com',
        port: '',
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true,
  },
  async redirects() {
    return [
      {
        source: '/explore',
        destination: '/explore/comics',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
