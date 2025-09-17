import { json, type ActionFunctionArgs } from "@remix-run/node";
import { useActionData, useNavigation, Form } from "@remix-run/react";
import { useState } from "react";
import PublicLayout from "../components/PublicLayout";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return json({ 
      error: "All fields are required",
      success: false 
    }, { status: 400 });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return json({ 
      error: "Please enter a valid email address",
      success: false 
    }, { status: 400 });
  }

  // Here you would typically send the email or save to database
  // For now, we'll just simulate success
  console.log("Contact form submission:", { name, email, subject, message });

  return json({ 
    success: true,
    message: "Thank you for your message! We'll get back to you within 24 hours."
  });
};

export default function Contact() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [showFAQ, setShowFAQ] = useState(false);

  const faqs = [
    {
      question: "How quickly can I start running Facebook ads?",
      answer: "You can start running ads within minutes of connecting your Facebook account. Our AI will analyze your products and generate your first campaign automatically."
    },
    {
      question: "Do I need Facebook advertising experience?",
      answer: "Not at all! Our platform is designed for beginners and experts alike. The AI handles the complex optimization while you focus on your business."
    },
    {
      question: "What's the minimum budget required?",
      answer: "You can start with as little as $5/day per campaign. We recommend starting with $20-50/day for optimal results and faster learning."
    },
    {
      question: "How does the AI optimization work?",
      answer: "Our AI continuously monitors your campaigns, adjusting bids, audiences, and creative elements based on performance data to maximize your ROAS."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes, you can cancel your subscription at any time. Your campaigns will continue running until your current billing period ends."
    }
  ];

  return (
    <PublicLayout title="Contact Us">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {actionData?.success && (
          <div style={{ 
            background: '#d4edda', 
            color: '#155724', 
            padding: '1rem', 
            borderRadius: '8px', 
            marginBottom: '2rem',
            border: '1px solid #c3e6cb'
          }}>
            {actionData.message}
          </div>
        )}

        {actionData?.error && (
          <div style={{ 
            background: '#f8d7da', 
            color: '#721c24', 
            padding: '1rem', 
            borderRadius: '8px', 
            marginBottom: '2rem',
            border: '1px solid #f5c6cb'
          }}>
            {actionData.error}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
          <div>
            <h2 style={{ color: '#1c1e21', fontSize: '1.5rem', marginBottom: '1rem' }}>Get in Touch</h2>
            <p style={{ color: '#65676b', lineHeight: '1.6', marginBottom: '2rem' }}>
              Have questions about Facebook Ads Pro? Need help with your campaigns? 
              Our team of Facebook advertising experts is here to help you succeed.
            </p>

            <Form method="post" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#1c1e21' }}>
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#1c1e21' }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#1c1e21' }}>
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#1c1e21' }}>
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  background: '#1877f2',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </Form>
          </div>

          <div>
            <h2 style={{ color: '#1c1e21', fontSize: '1.5rem', marginBottom: '1rem' }}>Other Ways to Reach Us</h2>
            
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', marginBottom: '1rem' }}>
                <h3 style={{ color: '#1c1e21', fontSize: '1.125rem', marginBottom: '0.5rem' }}>📧 Email Support</h3>
                <p style={{ color: '#65676b', margin: 0 }}>support@fbai-app.com</p>
                <p style={{ color: '#65676b', fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>Response within 24 hours</p>
              </div>

              <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', marginBottom: '1rem' }}>
                <h3 style={{ color: '#1c1e21', fontSize: '1.125rem', marginBottom: '0.5rem' }}>💬 Live Chat</h3>
                <p style={{ color: '#65676b', margin: 0 }}>Available in your dashboard</p>
                <p style={{ color: '#65676b', fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>Mon-Fri, 9 AM - 6 PM EST</p>
              </div>

              <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px' }}>
                <h3 style={{ color: '#1c1e21', fontSize: '1.125rem', marginBottom: '0.5rem' }}>📞 Priority Support</h3>
                <p style={{ color: '#65676b', margin: 0 }}>Available for Pro+ plans</p>
                <p style={{ color: '#65676b', fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>Dedicated account manager</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ color: '#1c1e21', fontSize: '1.5rem', margin: 0 }}>Frequently Asked Questions</h2>
            <button
              onClick={() => setShowFAQ(!showFAQ)}
              style={{
                background: 'none',
                border: '1px solid #1877f2',
                color: '#1877f2',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              {showFAQ ? 'Hide FAQ' : 'Show FAQ'}
            </button>
          </div>

          {showFAQ && (
            <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px' }}>
              {faqs.map((faq, index) => (
                <div key={index} style={{ marginBottom: index < faqs.length - 1 ? '1.5rem' : 0 }}>
                  <h3 style={{ color: '#1c1e21', fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                    {faq.question}
                  </h3>
                  <p style={{ color: '#65676b', lineHeight: '1.6', margin: 0 }}>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}