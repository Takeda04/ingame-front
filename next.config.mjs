import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "api.ingame.uz"
            },
            {
                protocol: "http",
                hostname: "api.ingame.uz"
            }
        ]
    }
};


export default withNextIntl(nextConfig);