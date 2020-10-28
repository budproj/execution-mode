const serverRuntimeConfig = {
  localeOverride: process.env.LOCALE_OVERRIDE,
}

const publicRuntimeConfig = {
  environments: {
    current: process.env.NODE_ENV,
    local: 'local',
    develop: 'develop',
    production: 'production',
  },

  domains: {
    root: 'getbud.co',
    s3: 's3-sa-east-1.amazonaws.com',
  },
}

const nextConfig = {
  serverRuntimeConfig,
  publicRuntimeConfig,
}

module.exports = nextConfig
