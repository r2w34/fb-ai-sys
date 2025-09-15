import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const url = new URL(request.url);
    
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const error = url.searchParams.get("error");
    
    console.log('=== FACEBOOK CALLBACK DEBUG ===');
    console.log('URL:', url.toString());
    console.log('Code:', code ? 'Present' : 'Missing');
    console.log('State:', state);
    console.log('Error:', error);
    
    // Handle Facebook auth error
    if (error) {
      return new Response(`
        <html>
          <head><title>Facebook Authentication</title></head>
          <body>
            <div style="text-align: center; padding: 20px; font-family: Arial, sans-serif;">
              <h2>❌ Facebook Authentication Error</h2>
              <p>Error: ${error}</p>
              <p>Please try connecting again.</p>
              <script>
                if (window.opener) {
                  window.opener.postMessage({
                    type: 'FACEBOOK_AUTH_ERROR',
                    error: '${error}'
                  }, '*');
                  window.close();
                } else {
                  setTimeout(() => {
                    window.location.href = '/app/facebook-settings';
                  }, 3000);
                }
              </script>
            </div>
          </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html' }
      });
    }

    // Handle successful auth
    if (code) {
      // For now, just show success message
      // In a real implementation, you would exchange the code for an access token
      return new Response(`
        <html>
          <head><title>Facebook Authentication</title></head>
          <body>
            <div style="text-align: center; padding: 20px; font-family: Arial, sans-serif;">
              <h2>✅ Facebook Authentication Successful</h2>
              <p>Your Facebook account has been connected!</p>
              <p>Redirecting back to settings...</p>
              <script>
                if (window.opener) {
                  window.opener.postMessage({
                    type: 'FACEBOOK_AUTH_SUCCESS',
                    code: '${code}'
                  }, '*');
                  window.close();
                } else {
                  setTimeout(() => {
                    window.location.href = '/app/facebook-settings';
                  }, 2000);
                }
              </script>
            </div>
          </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html' }
      });
    }

    // No code or error - invalid callback
    return new Response(`
      <html>
        <head><title>Facebook Authentication</title></head>
        <body>
          <div style="text-align: center; padding: 20px; font-family: Arial, sans-serif;">
            <h2>⚠️ Invalid Facebook Callback</h2>
            <p>No authorization code received.</p>
            <p>Please try connecting again.</p>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'FACEBOOK_AUTH_ERROR',
                  error: 'No authorization code'
                }, '*');
                window.close();
              } else {
                setTimeout(() => {
                  window.location.href = '/app/facebook-settings';
                }, 3000);
              }
            </script>
          </div>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    });

  } catch (error) {
    console.error('Facebook callback error:', error);
    return new Response(`
      <html>
        <head><title>Facebook Authentication Error</title></head>
        <body>
          <div style="text-align: center; padding: 20px; font-family: Arial, sans-serif;">
            <h2>❌ Authentication Error</h2>
            <p>An error occurred during Facebook authentication.</p>
            <p>Please try again.</p>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'FACEBOOK_AUTH_ERROR',
                  error: 'Authentication failed'
                }, '*');
                window.close();
              } else {
                setTimeout(() => {
                  window.location.href = '/app/facebook-settings';
                }, 3000);
              }
            </script>
          </div>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    });
  }
};