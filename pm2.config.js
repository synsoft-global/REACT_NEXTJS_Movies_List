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
        PORT: 5051,
        NEXT_PUBLIC_APP_ENV: 'dev'
      },
      env_staging: {
        PORT: 5051,
        NEXT_PUBLIC_APP_ENV: 'staging'
      },
      env_production: {
        PORT: 5051,
        NEXT_PUBLIC_APP_ENV: 'prod'
      }
    }
  ]
}