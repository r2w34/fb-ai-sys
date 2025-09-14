#!/bin/bash

# Facebook AI Advertising App Deployment Script
# Deploy to VPS: 77.37.45.67

set -e

echo "🚀 Starting deployment of Facebook AI Advertising App..."

# Configuration
VPS_IP="77.37.45.67"
VPS_USER="root"
APP_NAME="fb-ai-ads"
APP_DIR="/var/www/$APP_NAME"
DOMAIN="your-domain.com"  # Update this with your actual domain

echo "📦 Preparing application for deployment..."

# Build the application
echo "🔨 Building application..."
npm run build

# Create deployment package
echo "📦 Creating deployment package..."
tar -czf deploy.tar.gz \
  --exclude=node_modules \
  --exclude=.git \
  --exclude=dev-server.log \
  --exclude=test-gemini-integration.cjs \
  --exclude=deploy.sh \
  .

echo "✅ Deployment package created: deploy.tar.gz"
echo "📁 Package size: $(du -h deploy.tar.gz | cut -f1)"

echo ""
echo "🌐 Ready to deploy to VPS: $VPS_IP"
echo "📂 Target directory: $APP_DIR"
echo ""
echo "Next steps:"
echo "1. Copy deploy.tar.gz to your VPS"
echo "2. Run the server setup commands"
echo "3. Configure environment variables"
echo "4. Start the application"
echo ""
echo "Manual deployment commands:"
echo "scp deploy.tar.gz root@$VPS_IP:/tmp/"
echo "ssh root@$VPS_IP"
echo ""