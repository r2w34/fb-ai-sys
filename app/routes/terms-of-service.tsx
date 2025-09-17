import PublicLayout from "../components/PublicLayout";

export default function TermsOfService() {
  return (
    <PublicLayout title="Terms of Service">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem', padding: '1rem', background: '#e3f2fd', borderRadius: '8px' }}>
          <p style={{ margin: 0, color: '#1565c0' }}>
            <strong>Last updated:</strong> December 2024
          </p>
        </div>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#1c1e21', fontSize: '1.5rem', marginBottom: '1rem' }}>Agreement to Terms</h2>
          <p style={{ color: '#65676b', lineHeight: '1.6' }}>
            By accessing and using Facebook Ads Pro ("Service"), you accept and agree to be bound by the terms and 
            provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#1c1e21', fontSize: '1.5rem', marginBottom: '1rem' }}>Description of Service</h2>
          <p style={{ color: '#65676b', lineHeight: '1.6' }}>
            Facebook Ads Pro is an AI-powered advertising optimization platform that helps Shopify merchants create, 
            manage, and optimize Facebook advertising campaigns. Our service includes:
          </p>
          <ul style={{ color: '#65676b', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
            <li>AI-generated ad copy and creative suggestions</li>
            <li>Automated audience targeting and optimization</li>
            <li>Campaign performance analytics and reporting</li>
            <li>Integration with Facebook Marketing API and Shopify</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#1c1e21', fontSize: '1.5rem', marginBottom: '1rem' }}>User Accounts and Responsibilities</h2>
          
          <h3 style={{ color: '#1c1e21', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Account Creation</h3>
          <ul style={{ color: '#65676b', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
            <li>You must provide accurate and complete information</li>
            <li>You are responsible for maintaining account security</li>
            <li>You must be at least 18 years old to use our service</li>
            <li>One account per user/business entity</li>
          </ul>

          <h3 style={{ color: '#1c1e21', fontSize: '1.25rem', marginBottom: '0.5rem', marginTop: '1rem' }}>User Obligations</h3>
          <ul style={{ color: '#65676b', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
            <li>Comply with Facebook's advertising policies and terms</li>
            <li>Ensure your products and ads comply with applicable laws</li>
            <li>Not use the service for illegal or unauthorized purposes</li>
            <li>Not attempt to reverse engineer or hack our platform</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#1c1e21', fontSize: '1.5rem', marginBottom: '1rem' }}>Payment Terms</h2>
          
          <h3 style={{ color: '#1c1e21', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Subscription Plans</h3>
          <ul style={{ color: '#65676b', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
            <li>Monthly and annual subscription options available</li>
            <li>Payments are processed securely through Stripe</li>
            <li>All fees are non-refundable unless otherwise stated</li>
            <li>Prices may change with 30 days notice</li>
          </ul>

          <h3 style={{ color: '#1c1e21', fontSize: '1.25rem', marginBottom: '0.5rem', marginTop: '1rem' }}>Ad Spend</h3>
          <ul style={{ color: '#65676b', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
            <li>Ad spend is billed directly by Facebook to your ad account</li>
            <li>We do not handle or process your advertising budget</li>
            <li>You are responsible for managing your Facebook ad account billing</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#1c1e21', fontSize: '1.5rem', marginBottom: '1rem' }}>Intellectual Property</h2>
          <p style={{ color: '#65676b', lineHeight: '1.6', marginBottom: '1rem' }}>
            The Service and its original content, features, and functionality are and will remain the exclusive property 
            of Facebook Ads Pro and its licensors. The Service is protected by copyright, trademark, and other laws.
          </p>
          <ul style={{ color: '#65676b', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
            <li>You retain ownership of your product data and creative content</li>
            <li>We may use aggregated, anonymized data to improve our service</li>
            <li>AI-generated content suggestions become your property upon creation</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#1c1e21', fontSize: '1.5rem', marginBottom: '1rem' }}>Service Availability and Performance</h2>
          <p style={{ color: '#65676b', lineHeight: '1.6' }}>
            While we strive for 99.9% uptime, we cannot guarantee uninterrupted service. We are not liable for:
          </p>
          <ul style={{ color: '#65676b', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
            <li>Temporary service interruptions for maintenance</li>
            <li>Third-party service outages (Facebook, Shopify, etc.)</li>
            <li>Campaign performance results or advertising ROI</li>
            <li>Facebook policy changes affecting your ads</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#1c1e21', fontSize: '1.5rem', marginBottom: '1rem' }}>Limitation of Liability</h2>
          <p style={{ color: '#65676b', lineHeight: '1.6' }}>
            In no event shall Facebook Ads Pro, nor its directors, employees, partners, agents, suppliers, or affiliates, 
            be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, 
            loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#1c1e21', fontSize: '1.5rem', marginBottom: '1rem' }}>Termination</h2>
          
          <h3 style={{ color: '#1c1e21', fontSize: '1.25rem', marginBottom: '0.5rem' }}>By You</h3>
          <ul style={{ color: '#65676b', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
            <li>You may cancel your subscription at any time</li>
            <li>Cancellation takes effect at the end of your current billing period</li>
            <li>You can export your data before termination</li>
          </ul>

          <h3 style={{ color: '#1c1e21', fontSize: '1.25rem', marginBottom: '0.5rem', marginTop: '1rem' }}>By Us</h3>
          <ul style={{ color: '#65676b', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
            <li>We may terminate accounts for violation of these terms</li>
            <li>We may discontinue the service with 30 days notice</li>
            <li>Immediate termination for illegal activities or security threats</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#1c1e21', fontSize: '1.5rem', marginBottom: '1rem' }}>Privacy and Data Protection</h2>
          <p style={{ color: '#65676b', lineHeight: '1.6' }}>
            Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, 
            to understand our practices regarding the collection and use of your information.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#1c1e21', fontSize: '1.5rem', marginBottom: '1rem' }}>Changes to Terms</h2>
          <p style={{ color: '#65676b', lineHeight: '1.6' }}>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is 
            material, we will try to provide at least 30 days notice prior to any new terms taking effect.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#1c1e21', fontSize: '1.5rem', marginBottom: '1rem' }}>Governing Law</h2>
          <p style={{ color: '#65676b', lineHeight: '1.6' }}>
            These Terms shall be interpreted and governed by the laws of the State of New York, without regard to its 
            conflict of law provisions. Any disputes shall be resolved in the courts of New York.
          </p>
        </section>

        <section>
          <h2 style={{ color: '#1c1e21', fontSize: '1.5rem', marginBottom: '1rem' }}>Contact Information</h2>
          <p style={{ color: '#65676b', lineHeight: '1.6' }}>
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
            <p style={{ margin: 0, color: '#65676b' }}>
              <strong>Email:</strong> legal@fbai-app.com<br />
              <strong>Address:</strong> Facebook Ads Pro, Legal Department<br />
              123 Business Ave, Suite 100<br />
              New York, NY 10001
            </p>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}