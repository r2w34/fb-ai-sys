#!/bin/bash

# Server Setup Script for Facebook AI Advertising App
# Run this on the VPS after uploading the deployment package

set -e

APP_NAME="fb-ai-ads"
APP_DIR="/var/www/$APP_NAME"
NODE_VERSION="18"

echo "🚀 Setting up Facebook AI Advertising App on VPS..."

# Update system
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# Install Node.js and npm
echo "📦 Installing Node.js $NODE_VERSION..."
curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
apt-get install -y nodejs

# Install PM2 for process management
echo "📦 Installing PM2..."
npm install -g pm2

# Install Nginx
echo "📦 Installing Nginx..."
apt install -y nginx

# Create application directory
echo "📁 Creating application directory..."
mkdir -p $APP_DIR
cd $APP_DIR

# Extract deployment package
echo "📦 Extracting application..."
if [ -f /tmp/deploy.tar.gz ]; then
    tar -xzf /tmp/deploy.tar.gz -C $APP_DIR
    rm /tmp/deploy.tar.gz
else
    echo "❌ Deployment package not found at /tmp/deploy.tar.gz"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# Create environment file
echo "⚙️  Creating environment configuration..."
cat > .env << 'EOF'
# Shopify App Configuration
SHOPIFY_API_KEY=your_shopify_api_key
SHOPIFY_API_SECRET=your_shopify_api_secret
SCOPES=read_products,write_products,read_orders,write_orders,read_customers,write_customers

# Database
DATABASE_URL="file:./dev.sqlite"

# Session Secret
SESSION_SECRET=your_super_secret_session_key_here

# Facebook/Meta Configuration
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
FACEBOOK_ACCESS_TOKEN=your_facebook_access_token

# AI Services
GEMINI_API_KEY=AIzaSyCOLsr0_ADY0Lsgs1Vl9TZattNpLBwyGlQ

# App Configuration
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
EOF

echo "⚠️  Please update the .env file with your actual credentials!"

# Setup database
echo "🗄️  Setting up database..."
npx prisma generate
npx prisma db push

# Create PM2 ecosystem file
echo "⚙️  Creating PM2 configuration..."
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'fb-ai-ads',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/fb-ai-ads',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
EOF

# Configure Nginx
echo "🌐 Configuring Nginx..."
cat > /etc/nginx/sites-available/$APP_NAME << 'EOF'
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Enable the site
ln -sf /etc/nginx/sites-available/$APP_NAME /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
nginx -t

# Start services
echo "🚀 Starting services..."
systemctl restart nginx
systemctl enable nginx

# Start the application with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup

echo ""
echo "✅ Deployment completed successfully!"
echo ""
echo "🌐 Your app should be running on:"
echo "   http://$(curl -s ifconfig.me)"
echo "   http://localhost:3000 (local)"
echo ""
echo "📋 Next steps:"
echo "1. Update .env file with your actual credentials"
echo "2. Update Nginx config with your domain name"
echo "3. Configure SSL certificate (recommended)"
echo "4. Test the application"
echo ""
echo "🔧 Useful commands:"
echo "   pm2 status          - Check app status"
echo "   pm2 logs fb-ai-ads  - View app logs"
echo "   pm2 restart fb-ai-ads - Restart app"
echo "   systemctl status nginx - Check Nginx status"
echo ""