import { useEffect } from "react";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { AppProvider } from "@shopify/polaris";
import { Provider } from "@shopify/app-bridge-react";
import "@shopify/polaris/build/esm/styles.css";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  
  return json({
    apiKey: process.env.SHOPIFY_API_KEY || "",
    host: url.searchParams.get("host") || "",
    shop: url.searchParams.get("shop") || "",
  });
};

export default function App() {
  const { apiKey, host, shop } = useLoaderData();

  const config = {
    apiKey,
    host,
    forceRedirect: true,
  };

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://cdn.shopify.com/" />
        <link
          rel="stylesheet"
          href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <Provider config={config}>
          <AppProvider
            i18n={{
              Polaris: {
                Avatar: {
                  label: 'Avatar',
                  labelWithInitials: 'Avatar with initials {initials}',
                },
                ContextualSaveBar: {
                  save: 'Save',
                  discard: 'Discard',
                },
                TextField: {
                  characterCount: '{count} characters',
                },
                TopBar: {
                  toggleMenuLabel: 'Toggle menu',
                  SearchField: {
                    clearButtonLabel: 'Clear',
                    search: 'Search',
                  },
                },
                Modal: {
                  iFrameTitle: 'body markup',
                },
                Frame: {
                  skipToContent: 'Skip to content',
                  navigationLabel: 'Navigation',
                  Navigation: {
                    closeMobileNavigationLabel: 'Close navigation',
                  },
                },
              },
            }}
          >
            <Outlet />
          </AppProvider>
        </Provider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}