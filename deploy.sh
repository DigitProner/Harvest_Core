#!/bin/bash

# Build the frontend
npm run build

# Install PM2 globally if not installed
npm install -g pm2

# Start/Restart the application using PM2
pm2 start ecosystem.config.js

# Save PM2 process list and configure to start on system boot
pm2 save
pm2 startup