import { createRequestHandler } from "@remix-run/node";
import { installGlobals } from "@remix-run/node";
import { createServer } from "http";
import { createServer as createViteServer } from "vite";

installGlobals();

const viteDevServer = await createViteServer({
  server: { middlewareMode: true },
  appType: "custom",
});

const remixHandler = createRequestHandler({
  build: () => viteDevServer.ssrLoadModule("virtual:remix/server-build"),
});

const server = createServer(async (req, res) => {
  try {
    // Let Vite handle HMR and static assets
    await new Promise((resolve, reject) => {
      viteDevServer.middlewares(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    
    // Handle Remix routes
    if (!res.headersSent) {
      await remixHandler(req, res);
    }
  } catch (error) {
    console.error("Server error:", error);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  }
});

const port = process.env.PORT || 54594;
server.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Development server ready at http://localhost:${port}`);
  console.log(`📱 For Shopify app development, use: https://your-ngrok-url.ngrok.io`);
});