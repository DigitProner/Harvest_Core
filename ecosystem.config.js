module.exports = {
  apps: [{
    name: 'farm-management-api',
    script: 'server/index.js',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    instances: 'max',
    exec_mode: 'cluster',
    max_memory_restart: '1G'
  }]
}