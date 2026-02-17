import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable strict mode for better development experience
  reactStrictMode: true,

  // Experimental features for better performance
  experimental: {
    // Use optimized package imports
    optimizePackageImports: ['react', 'react-dom'],
  },
}

export default nextConfig
