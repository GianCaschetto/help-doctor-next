/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    db_url:process.env.DATABASE_URL,
    db_pwd:process.env.DATABASE_PASSWORD,
  },
}

module.exports = nextConfig
