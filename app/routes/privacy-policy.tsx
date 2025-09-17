import PublicLayout from "../components/PublicLayout";

export default function PrivacyPolicy() {
  return (
    <PublicLayout title="Privacy Policy">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem', padding: '1rem', background: '#e3f2fd', borderRadius: '8px' }}>
          <p style={{ margin: 0, color: '#1565c0' }}>
            <strong>Last updated:</strong> December 2024
          </p>
        </div>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#1c1e21', fontSize: '1.5rem', marginBottom: '1rem' }}>Introduction</h2>
          <p style={{ color: '#65676b', lineHeight: '1.6' }}>
            Facebook Ads Pro ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
            explains how we collect, use, disclose, and safeguard your information when you use our service.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#1c1e21', fontSize: '1.5rem', marginBottom: '1rem' }}>Information We Collect</h2>
          
          <h3 style={{ color: '#1c1e21', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Personal Information</h3>
          <ul style={{ color: '#65676b', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
            <li>Name and email address</li>
            <li>Shopify store information</li>
            <li>Facebook Business Manager account details</li>
            <li>Payment and billing information</li>
          </ul>

          <h3 style={{ color: '#1c1e21', fontSize: '1.25rem', marginBottom: '0.5rem', marginTop: '1rem' }}>Usage Data</h3>
          <ul style={{ color: '#65676b', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
            <li>Campaign performance metrics</li>
            <li>Product catalog information</li>
            <li>User interactions with our platform</li>
            <li>Technical data (IP address, browser type, device information)</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#1c1e21', fontSize: '1.5rem', marginBottom: '1rem' }}>How We Use Your Information</h2>
          <ul style={{ color: '#65676b', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
            <li>Provide and maintain our advertising optimization service</li>
            <li>Generate AI-powered campaign recommendations</li>
            <li>Process payments and manage subscriptions</li>
            <li>Communicate with you about your account and campaigns</li>
            <li>Improve our service through analytics and machine learning</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#1c1e21', fontSize: '1.5rem', marginBottom: '1rem' }}>Data Sharing and Disclosure</h2>
          <p style={{ color: '#65676b', lineHeight: '1.6', marginBottom: '1rem' }}>
            We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
          </p>
          <ul style={{ color: '#65676b', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
            <li><strong>Service Providers:</strong> With trusted third-party services that help us operate our platform</li>
            <li><strong>Facebook/Meta:</strong> Campaign data necessary for ad delivery and optimization</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#1c1e21', fontSize: '1.5rem', marginBottom: '1rem' }}>Data Security</h2>
          <p style={{ color: '#65676b', lineHeight: '1.6' }}>
            We implement industry-standard security measures to protect your information, including:
          </p>
          <ul style={{ color: '#65676b', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
            <li>SSL/TLS encryption for data transmission</li>
            <li>Encrypted data storage</li>
            <li>Regular security audits and monitoring</li>
            <li>Access controls and authentication</li>
            <li>Secure API integrations with Facebook and Shopify</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#1c1e21', fontSize: '1.5rem', marginBottom: '1rem' }}>Your Rights (GDPR Compliance)</h2>
          <p style={{ color: '#65676b', lineHeight: '1.6', marginBottom: '1rem' }}>
            If you are a resident of the European Union, you have the following rights:
          </p>
          <ul style={{ color: '#65676b', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
            <li><strong>Access:</strong> Request copies of your personal data</li>
            <li><strong>Rectification:</strong> Request correction of inaccurate data</li>
            <li><strong>Erasure:</strong> Request deletion of your personal data</li>
            <li><strong>Portability:</strong> Request transfer of your data</li>
            <li><strong>Objection:</strong> Object to processing of your data</li>
            <li><strong>Restriction:</strong> Request restriction of processing</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#1c1e21', fontSize: '1.5rem', marginBottom: '1rem' }}>Data Retention</h2>
          <p style={{ color: '#65676b', lineHeight: '1.6' }}>
            We retain your personal information only as long as necessary to provide our services and comply with legal obligations. 
            Campaign data is typically retained for 2 years for optimization purposes. You may request deletion of your data at any time.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#1c1e21', fontSize: '1.5rem', marginBottom: '1rem' }}>Cookies and Tracking</h2>
          <p style={{ color: '#65676b', lineHeight: '1.6' }}>
            We use cookies and similar technologies to enhance your experience, analyze usage, and improve our service. 
            You can control cookie settings through your browser preferences.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#1c1e21', fontSize: '1.5rem', marginBottom: '1rem' }}>Changes to This Policy</h2>
          <p style={{ color: '#65676b', lineHeight: '1.6' }}>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
            Privacy Policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section>
          <h2 style={{ color: '#1c1e21', fontSize: '1.5rem', marginBottom: '1rem' }}>Contact Us</h2>
          <p style={{ color: '#65676b', lineHeight: '1.6' }}>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
            <p style={{ margin: 0, color: '#65676b' }}>
              <strong>Email:</strong> privacy@fbai-app.com<br />
              <strong>Address:</strong> Facebook Ads Pro, Privacy Department<br />
              123 Business Ave, Suite 100<br />
              New York, NY 10001
            </p>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}