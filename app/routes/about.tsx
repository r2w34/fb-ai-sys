import PublicLayout from "../components/PublicLayout";

export default function About() {
  const stats = {
    campaigns: "10,000+",
    revenue: "$50M+",
    merchants: "2,500+",
    roas: "300%"
  };

  return (
    <PublicLayout title="About Facebook Ads Pro">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: '#1c1e21', fontSize: '1.5rem', marginBottom: '1rem' }}>Our Mission</h2>
          <p style={{ color: '#65676b', lineHeight: '1.6', marginBottom: '1rem' }}>
            At Facebook Ads Pro, we're on a mission to democratize high-performance Facebook advertising 
            for Shopify merchants of all sizes. Our AI-powered platform eliminates the complexity and 
            guesswork from Facebook advertising, enabling businesses to achieve professional-grade results 
            without requiring extensive marketing expertise.
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: '#1c1e21', fontSize: '1.5rem', marginBottom: '1rem' }}>Our Story</h2>
          <p style={{ color: '#65676b', lineHeight: '1.6', marginBottom: '1rem' }}>
            Founded in 2023 by a team of e-commerce veterans and AI specialists, Facebook Ads Pro was 
            born from the frustration of watching talented entrepreneurs struggle with Facebook advertising. 
            We witnessed countless businesses with amazing products fail to reach their potential customers 
            due to the complexity of modern digital advertising.
          </p>
          <p style={{ color: '#65676b', lineHeight: '1.6', marginBottom: '1rem' }}>
            Our founders, having managed over $100M in Facebook ad spend across thousands of campaigns, 
            recognized that the key to success wasn't just having the right tools—it was having intelligent 
            automation that could make split-second optimization decisions at scale.
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: '#1c1e21', fontSize: '1.5rem', marginBottom: '1rem' }}>Our Technology</h2>
          <p style={{ color: '#65676b', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            Facebook Ads Pro leverages cutting-edge artificial intelligence and machine learning 
            technologies to deliver superior advertising performance:
          </p>
          <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ background: '#1877f2', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.875rem', marginRight: '0.5rem' }}>Gemini AI</span>
              <span style={{ color: '#65676b' }}>Advanced content generation and optimization</span>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ background: '#1877f2', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.875rem', marginRight: '0.5rem' }}>TensorFlow</span>
              <span style={{ color: '#65676b' }}>Predictive analytics and performance forecasting</span>
            </div>
            <div>
              <span style={{ background: '#1877f2', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.875rem', marginRight: '0.5rem' }}>Facebook Marketing API</span>
              <span style={{ color: '#65676b' }}>Real-time campaign management and optimization</span>
            </div>
          </div>
        </section>

        <section>
          <h2 style={{ color: '#1c1e21', fontSize: '1.5rem', marginBottom: '1rem' }}>Our Impact</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1877f2', marginBottom: '0.5rem' }}>
                {stats.campaigns}
              </div>
              <div style={{ color: '#65676b', fontSize: '0.875rem' }}>
                Campaigns Optimized
              </div>
            </div>
            <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1877f2', marginBottom: '0.5rem' }}>
                {stats.revenue}
              </div>
              <div style={{ color: '#65676b', fontSize: '0.875rem' }}>
                Revenue Generated
              </div>
            </div>
            <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1877f2', marginBottom: '0.5rem' }}>
                {stats.merchants}
              </div>
              <div style={{ color: '#65676b', fontSize: '0.875rem' }}>
                Happy Merchants
              </div>
            </div>
            <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1877f2', marginBottom: '0.5rem' }}>
                {stats.roas}
              </div>
              <div style={{ color: '#65676b', fontSize: '0.875rem' }}>
                Average ROAS Improvement
              </div>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}