module.exports = {
  apps: [
    {
      name: 'crown-funding-portal-frontend',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      instances: 1,
      autorestart: true,
      watch: false,
      exec_mode: 'cluster',
      env_development: {
        PORT: 3000,
        NEXT_PUBLIC_APP_ENV: 'dev',
        NEXT_APP_ENV: 'development'
      },
      env_staging: {
        PORT: 3000,
        NEXT_PUBLIC_APP_ENV: 'staging',
        NEXT_APP_ENV: 'staging'
      },
      env_production: {
        PORT: 3000,
        NEXT_PUBLIC_APP_ENV: 'prod',
        NEXT_APP_ENV: 'production'
      }
    }
  ]
}