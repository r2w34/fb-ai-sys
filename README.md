# 🚀 AI Facebook Ads Pro - Shopify App v4.0

A comprehensive AI-powered Facebook advertising management app for Shopify stores. This app provides intelligent campaign creation, optimization, and management with a modern Shopify-style dashboard.

## ✨ Features

### 🎯 Core Features
- **AI Campaign Generation**: Automatically create compelling ad campaigns using Google Gemini AI
- **Smart Targeting**: AI-powered audience suggestions based on product data and customer behavior
- **Auto Optimization**: Continuous campaign optimization with budget adjustments and bid management
- **Complete Campaign Management**: Create, edit, pause, resume, duplicate, and delete campaigns
- **Real-time Analytics**: Comprehensive performance tracking and insights
- **Shopify Integration**: Seamless product sync and order attribution

### 🤖 AI-Powered Features
- **Content Generation**: Create compelling ad copy, headlines, and descriptions
- **Audience Builder**: Generate targeted audience suggestions
- **Budget Optimization**: AI-recommended budget adjustments for maximum ROAS
- **Performance Analysis**: Intelligent insights and optimization recommendations
- **Creative Testing**: Automatic A/B testing of ad creatives

### 📱 Dashboard Features
- **Modern Shopify-style UI**: Clean, intuitive interface optimized for Shopify iframe
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Real-time Updates**: Live performance data and notifications
- **Comprehensive Analytics**: Charts, metrics, and exportable reports
- **Campaign Management**: Full CRUD operations for campaigns and creatives

## 🛠 Technology Stack

- **Backend**: Node.js, Koa.js
- **Database**: Sequelize ORM (supports PostgreSQL, MySQL, SQLite)
- **AI**: Google Gemini AI for content generation and optimization
- **Frontend**: Modern vanilla JavaScript with Shopify Polaris design system
- **APIs**: Shopify Admin API, Facebook Marketing API
- **Deployment**: Vercel-ready with optimized configuration

## 📦 Quick Start

### Prerequisites
- Node.js 18.0.0 or higher
- npm or yarn
- Shopify Partner account
- Facebook Developer account
- Google AI API key

### Installation

1. **Clone and install**
   ```bash
   git clone https://github.com/yashraj0077/FacebookAI-Ads-Shopify.git
   cd FacebookAI-Ads-Shopify
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## 🌐 Live Demo

**🔗 Production App**: https://facebook-ai-ads-shopify.vercel.app  
**📊 Demo Dashboard**: https://facebook-ai-ads-shopify.vercel.app/demo

> **Quick Deploy**: See [VERCEL_SETUP.md](./VERCEL_SETUP.md) for complete deployment instructions with environment variables.

### ✅ Demo Features Available:
- Modern Shopify-style dashboard with sidebar navigation
- AI campaign generation interface with step-by-step wizard
- Campaign management with full CRUD operations
- Real-time analytics dashboard with charts and metrics
- Responsive mobile design optimized for Shopify iframe
- AI-powered content generation and optimization tools
- Performance tracking and insights

### 🎨 UI/UX Highlights:
- **Shopify-optimized design**: Matches Shopify admin interface perfectly
- **Sidebar navigation**: Clean, organized menu structure with icons
- **Modern components**: Cards, modals, forms with Shopify Polaris styling
- **Mobile-first**: Fully responsive design for all devices
- **Interactive elements**: Hover effects, animations, and smooth transitions

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Deploy to Vercel**
   ```bash
   npm install -g vercel
   vercel --prod
   ```

2. **Configure environment variables in Vercel dashboard**
   - Add all environment variables from your `.env` file
   - Ensure `HOST` points to your Vercel domain

## 🔧 Configuration

### Shopify App Setup
1. Create a Shopify Partner account at https://partners.shopify.com
2. Create a new app in your Partner dashboard
3. Configure app settings:
   - App URL: `https://your-domain.com`
   - Allowed redirection URLs: `https://your-domain.com/auth/shopify/callback`
4. Set required scopes: `read_products,write_products,read_orders,write_orders`

### Facebook App Setup
1. Create a Facebook Developer account at https://developers.facebook.com
2. Create a new app with Marketing API access
3. Configure OAuth redirect URI: `https://your-domain.com/auth/facebook/callback`
4. Request permissions: `ads_management`, `ads_read`, `business_management`

### Google AI Setup
1. Get a Gemini API key from https://makersuite.google.com/app/apikey
2. Add the API key to your environment variables

## 🤖 AI Features

### Campaign Generation
- Analyzes product data to create targeted campaigns
- Generates multiple ad creative variations
- Suggests optimal targeting and budget allocation
- Provides performance predictions

### Auto Optimization
- Monitors campaign performance in real-time
- Automatically adjusts budgets based on ROAS
- Optimizes targeting and bidding strategies
- Pauses underperforming creatives
- Scales successful campaigns

## 📊 Key Improvements in v4.0

### UI/UX Redesign
- **Shopify-optimized design**: Matches Shopify admin interface perfectly
- **Sidebar navigation**: Clean, organized menu structure
- **Modern components**: Cards, modals, forms with Shopify Polaris styling
- **Mobile-first**: Fully responsive design for all devices

### AI Enhancements
- **Advanced campaign generation**: Multi-step AI-powered campaign creation
- **Smart optimization**: Automatic budget and targeting adjustments
- **Creative testing**: A/B testing with AI-generated variations
- **Performance prediction**: AI-powered ROAS and conversion estimates

### Campaign Management
- **Full CRUD operations**: Create, read, update, delete campaigns
- **Bulk actions**: Manage multiple campaigns simultaneously
- **Campaign duplication**: Clone successful campaigns with one click
- **Status management**: Pause, resume, and archive campaigns

## 📱 Mobile Optimization

The app is fully optimized for mobile devices and Shopify's mobile admin:
- Responsive design that works on all screen sizes
- Touch-friendly interface elements
- Optimized loading times
- Mobile-specific navigation patterns

## 🔒 Security

- CSRF protection on all forms
- Secure session management
- Shopify webhook verification
- Facebook webhook verification
- Input validation and sanitization
- SQL injection prevention through ORM

## 📈 Performance

- Optimized for Shopify iframe embedding
- Lazy loading of components
- Efficient database queries
- CDN-ready static assets
- Gzip compression
- Browser caching strategies

## 📝 API Documentation

### Campaign Management
- `GET /api/campaigns` - List all campaigns
- `POST /api/campaigns` - Create new campaign
- `GET /api/campaigns/:id` - Get campaign details
- `PUT /api/campaigns/:id` - Update campaign
- `DELETE /api/campaigns/:id` - Delete campaign
- `POST /api/campaigns/:id/pause` - Pause campaign
- `POST /api/campaigns/:id/resume` - Resume campaign

### AI Features
- `POST /api/ai/generate-campaign` - Generate AI campaign
- `POST /api/ai/optimize-campaign` - Get optimization suggestions
- `POST /api/ai/generate-creatives` - Generate ad creatives
- `POST /api/ai/audience-suggestions` - Get audience suggestions

### Analytics
- `GET /api/analytics/overview` - Dashboard overview
- `GET /api/analytics/campaigns/:id` - Campaign analytics
- `GET /api/analytics/performance` - Performance insights

## 🔄 Changelog

### v4.0.0 (Current)
- ✅ Complete UI/UX redesign with Shopify-style dashboard
- ✅ Advanced AI campaign generation and optimization
- ✅ Full campaign management (CRUD operations)
- ✅ Real-time analytics and insights
- ✅ Mobile-optimized responsive design
- ✅ Enhanced security and performance
- ✅ Comprehensive API documentation

### v3.0.0
- Basic AI content generation
- Simple campaign creation
- Basic analytics

## 🎯 Roadmap

- [ ] Advanced audience lookalike modeling
- [ ] Multi-language support
- [ ] Instagram and WhatsApp ad support
- [ ] Advanced A/B testing framework
- [ ] Custom AI model training
- [ ] Team collaboration features

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

- **Issues**: Report bugs and request features on GitHub Issues
- **Documentation**: Check this README and inline code comments

---

**Made with ❤️ for Shopify merchants who want to scale their business with AI-powered advertising.**