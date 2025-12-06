/** @type {import('next').NextConfig} */
const nextConfig = {
    reactCompiler: true,
    // Configure Turbopack (default in Next.js 16) - empty config acknowledges we're using Turbopack
    turbopack: {},
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn.shopify.com',
            },
        ],
    },
    // Suppress hydration warnings from browser extensions
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
            };
        }
        return config;
    },
    // Ignore browser extension-related hydration warnings
    onDemandEntries: {
        maxInactiveAge: 25 * 1000,
        pagesBufferLength: 2,
    },
};

export default nextConfig;
