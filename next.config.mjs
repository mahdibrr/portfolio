/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  images: { unoptimized: true },
  typescript: { tsconfigPath: "tsconfig.site.json" },
  experimental: {
    globalNotFound: true,
    optimizePackageImports: ["lucide-react"],
  },
};
export default nextConfig;
