import { createRequestHandler } from "@remix-run/node";
import { installGlobals } from "@remix-run/node";
import { createServer } from "http";

installGlobals();

const viteDevServer =
  process.env.NODE_ENV === "production"
    ? undefined
    : await import("vite").then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        })
      );

const remixHandler = createRequestHandler({
  build: viteDevServer
    ? () => viteDevServer.ssrLoadModule("virtual:remix/server-build")
    : await import("./build/server/index.js"),
});

const server = createServer(async (req, res) => {
  try {
    if (viteDevServer) {
      await new Promise((resolve, reject) => {
        viteDevServer.middlewares(req, res, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }
    
    await remixHandler(req, res);
  } catch (error) {
    console.error("Server error:", error);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
});

const port = process.env.PORT || 54594;
server.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Server ready at http://localhost:${port}`);
});