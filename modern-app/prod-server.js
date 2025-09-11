import { createRequestHandler } from "@remix-run/node";
import { installGlobals } from "@remix-run/node";
import { createServer } from "http";
import express from "express";

installGlobals();

const app = express();

// Serve static files
app.use(express.static("build/client"));

// Handle Remix requests
const remixHandler = createRequestHandler({
  build: await import("./build/index.js"),
});

app.all("*", remixHandler);

const port = process.env.PORT || 56938;
app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Production server ready at http://localhost:${port}`);
  console.log(`📱 For Shopify app development, use: https://your-ngrok-url.ngrok.io`);
});