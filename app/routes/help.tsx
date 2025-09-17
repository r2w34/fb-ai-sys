import { useState } from "react";
import PublicLayout from "../components/PublicLayout";

export default function Help() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Topics" },
    { id: "getting-started", name: "Getting Started" },
    { id: "campaigns", name: "Campaign Management" },
    { id: "optimization", name: "Optimization" },
    { id: "billing", name: "Billing & Plans" },
    { id: "troubleshooting", name: "Troubleshooting" }
  ];

  const articles = [
    {
      id: 1,
      title: "Getting Started with Facebook Ads Pro",
      category: "getting-started",
      content: "Learn how to set up your account, connect Facebook, and launch your first campaign in under 10 minutes."
    },
    {
      id: 2,
      title: "Connecting Your Facebook Ad Account",
      category: "getting-started",
      content: "Step-by-step guide to securely connect your Facebook Business Manager and ad accounts."
    },
    {
      id: 3,
      title: "Understanding AI-Generated Audiences",
      category: "campaigns",
      content: "How our AI analyzes your products and creates high-converting audience segments automatically."
    },
    {
      id: 4,
      title: "Campaign Optimization Best Practices",
      category: "optimization",
      content: "Tips and strategies to maximize your ROAS using our automated optimization features."
    },
    {
      id: 5,
      title: "Billing and Subscription Management",
      category: "billing",
      content: "Everything you need to know about plans, billing cycles, and subscription changes."
    },
    {
      id: 6,
      title: "Troubleshooting Common Issues",
      category: "troubleshooting",
      content: "Solutions to the most common problems users encounter and how to resolve them quickly."
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <PublicLayout title="Help & Support">
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Search and Filter */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Search help articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid #ddd',
                  borderRadius: '20px',
                  background: selectedCategory === category.id ? '#1877f2' : 'white',
                  color: selectedCategory === category.id ? 'white' : '#65676b',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Start Guide */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: '#1c1e21', fontSize: '1.5rem', marginBottom: '1rem' }}>Quick Start Guide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>1️⃣</div>
              <h3 style={{ color: '#1c1e21', fontSize: '1.125rem', marginBottom: '0.5rem' }}>Connect Your Accounts</h3>
              <p style={{ color: '#65676b', lineHeight: '1.6', margin: 0 }}>
                Link your Shopify store and Facebook Business Manager to get started.
              </p>
            </div>
            
            <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>2️⃣</div>
              <h3 style={{ color: '#1c1e21', fontSize: '1.125rem', marginBottom: '0.5rem' }}>AI Analysis</h3>
              <p style={{ color: '#65676b', lineHeight: '1.6', margin: 0 }}>
                Our AI analyzes your products and generates optimized campaign suggestions.
              </p>
            </div>
            
            <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>3️⃣</div>
              <h3 style={{ color: '#1c1e21', fontSize: '1.125rem', marginBottom: '0.5rem' }}>Launch Campaigns</h3>
              <p style={{ color: '#65676b', lineHeight: '1.6', margin: 0 }}>
                Review and launch your AI-generated campaigns with one click.
              </p>
            </div>
          </div>
        </section>

        {/* Help Articles */}
        <section>
          <h2 style={{ color: '#1c1e21', fontSize: '1.5rem', marginBottom: '1rem' }}>
            Help Articles ({filteredArticles.length})
          </h2>
          
          {filteredArticles.length === 0 ? (
            <div style={{ background: '#f8f9fa', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
              <p style={{ color: '#65676b', margin: 0 }}>
                No articles found matching your search criteria.
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {filteredArticles.map(article => (
                <div key={article.id} style={{ 
                  background: 'white', 
                  border: '1px solid #e1e5e9', 
                  borderRadius: '8px', 
                  padding: '1.5rem',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                >
                  <h3 style={{ color: '#1c1e21', fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                    {article.title}
                  </h3>
                  <p style={{ color: '#65676b', lineHeight: '1.6', margin: 0 }}>
                    {article.content}
                  </p>
                  <div style={{ marginTop: '1rem' }}>
                    <span style={{ 
                      background: '#e3f2fd', 
                      color: '#1565c0', 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '4px', 
                      fontSize: '0.75rem',
                      textTransform: 'uppercase'
                    }}>
                      {categories.find(c => c.id === article.category)?.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Contact Support */}
        <section style={{ marginTop: '3rem', background: '#f8f9fa', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
          <h2 style={{ color: '#1c1e21', fontSize: '1.5rem', marginBottom: '1rem' }}>Still Need Help?</h2>
          <p style={{ color: '#65676b', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            Can't find what you're looking for? Our support team is here to help you succeed.
          </p>
          <a 
            href="/contact"
            style={{
              background: '#1877f2',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: '500',
              display: 'inline-block'
            }}
          >
            Contact Support
          </a>
        </section>
      </div>
    </PublicLayout>
  );
}