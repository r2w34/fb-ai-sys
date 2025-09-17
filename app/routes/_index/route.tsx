import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

import { login } from "../../shopify.server";

import styles from "./styles.module.css";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  return { showForm: Boolean(login) };
};

export default function App() {
  const { showForm } = useLoaderData<typeof loader>();

  return (
    <div className={styles.index}>
      <div className={styles.content}>
        <div className={styles.hero}>
          <h1 className={styles.heading}>🚀 FB AI Ads Pro</h1>
          <p className={styles.tagline}>
            AI-Powered Facebook Advertising Optimization for Shopify Stores
          </p>
          <p className={styles.description}>
            Maximize your Facebook ad performance with advanced machine learning, 
            competitive intelligence, and automated campaign optimization.
          </p>
        </div>

        {showForm && (
          <Form className={styles.form} method="post" action="/auth/login">
            <label className={styles.label}>
              <span>Shop domain</span>
              <input 
                id="shop-input"
                className={styles.input} 
                type="text" 
                name="shop" 
                placeholder="your-store.myshopify.com" 
              />
              <span>e.g: my-shop-domain.myshopify.com</span>
            </label>
            <button className={styles.button} type="submit">
              🚀 Install FB AI Ads Pro
            </button>
          </Form>
        )}
        
        <script dangerouslySetInnerHTML={{
          __html: `
            // Auto-detect shop from URL parameters or referrer
            (function() {
              const urlParams = new URLSearchParams(window.location.search);
              const shopParam = urlParams.get('shop');
              
              if (shopParam) {
                const shopInput = document.getElementById('shop-input');
                if (shopInput) {
                  shopInput.value = shopParam;
                }
                return;
              }
              
              // Try to detect from referrer
              if (document.referrer) {
                const referrerUrl = new URL(document.referrer);
                if (referrerUrl.hostname.includes('myshopify.com')) {
                  const shopInput = document.getElementById('shop-input');
                  if (shopInput) {
                    shopInput.value = referrerUrl.hostname;
                  }
                }
              }
              
              // Try to detect from embedded context
              if (window.parent !== window) {
                try {
                  const parentUrl = window.parent.location.hostname;
                  if (parentUrl.includes('myshopify.com')) {
                    const shopInput = document.getElementById('shop-input');
                    if (shopInput) {
                      shopInput.value = parentUrl;
                    }
                  }
                } catch (e) {
                  // Cross-origin restriction, ignore
                }
              }
            })();
          `
        }} />

        <div className={styles.features}>
          <h2 className={styles.featuresTitle}>🎯 Powerful AI Features</h2>
          <ul className={styles.list}>
            <li>
              <strong>🤖 AI Campaign Optimization</strong>. Advanced machine learning algorithms 
              automatically optimize your Facebook ad campaigns for maximum ROI and performance.
            </li>
            <li>
              <strong>🔍 Competitive Intelligence</strong>. Real-time competitor analysis and 
              market insights to stay ahead of your competition with data-driven strategies.
            </li>
            <li>
              <strong>📊 Predictive Analytics</strong>. TensorFlow-powered performance predictions 
              help you make informed decisions before launching campaigns.
            </li>
            <li>
              <strong>🎨 AI Content Generation</strong>. OpenAI-powered ad copy and creative 
              suggestions that convert better and engage your target audience.
            </li>
            <li>
              <strong>⚡ Real-time Optimization</strong>. Reinforcement learning agent continuously 
              improves your campaigns based on performance data and market conditions.
            </li>
            <li>
              <strong>📈 Advanced Analytics</strong>. Comprehensive performance insights with 
              actionable recommendations to scale your advertising success.
            </li>
          </ul>
        </div>

        <div className={styles.benefits}>
          <h2 className={styles.benefitsTitle}>💰 Why Choose FB AI Ads Pro?</h2>
          <div className={styles.benefitGrid}>
            <div className={styles.benefit}>
              <h3>🎯 Higher ROAS</h3>
              <p>Increase your return on ad spend by up to 300% with AI-driven optimization</p>
            </div>
            <div className={styles.benefit}>
              <h3>⏰ Save Time</h3>
              <p>Automate campaign management and focus on growing your business</p>
            </div>
            <div className={styles.benefit}>
              <h3>📊 Data-Driven</h3>
              <p>Make informed decisions with comprehensive analytics and insights</p>
            </div>
            <div className={styles.benefit}>
              <h3>🚀 Scale Faster</h3>
              <p>Identify winning strategies and scale successful campaigns automatically</p>
            </div>
          </div>
        </div>

        <div className={styles.cta}>
          <h2>Ready to Transform Your Facebook Advertising?</h2>
          <p>Join thousands of Shopify merchants who trust FB AI Ads Pro to grow their business.</p>
          {showForm && (
            <button className={styles.ctaButton} onClick={() => document.querySelector('input[name="shop"]')?.focus()}>
              🚀 Get Started Now - Free Trial
            </button>
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.footerSection}>
              <h3>Company</h3>
              <ul className={styles.footerLinks}>
                <li><a href="/public/about">About Us</a></li>
                <li><a href="/public/contact">Contact</a></li>
                <li><a href="/public/help">Help & Support</a></li>
              </ul>
            </div>
            <div className={styles.footerSection}>
              <h3>Legal</h3>
              <ul className={styles.footerLinks}>
                <li><a href="/public/privacy-policy">Privacy Policy</a></li>
                <li><a href="/public/terms-of-service">Terms of Service</a></li>
              </ul>
            </div>
            <div className={styles.footerSection}>
              <h3>Resources</h3>
              <ul className={styles.footerLinks}>
                <li><a href="/public/help">Documentation</a></li>
                <li><a href="/public/contact">Support</a></li>
                <li><a href="/public/about">Case Studies</a></li>
              </ul>
            </div>
            <div className={styles.footerSection}>
              <h3>Connect</h3>
              <ul className={styles.footerLinks}>
                <li><a href="mailto:support@fbai-app.com">Email</a></li>
                <li><a href="tel:+15551234567">Phone</a></li>
                <li><a href="/contact">Live Chat</a></li>
              </ul>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>&copy; 2024 Facebook Ads Pro. All rights reserved.</p>
            <p>Powered by AI • Built for Shopify • Trusted by 2,500+ merchants</p>
          </div>
        </div>
      </div>
    </div>
  );
}
