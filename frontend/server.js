import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "dist");
const PORT = process.env.PORT || 3000;
const mimeTypes = { ".css": "text/css", ".html": "text/html", ".js": "text/javascript", ".json": "application/json", ".mp4": "video/mp4", ".jpeg": "image/jpeg", ".jpg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml", ".ico": "image/x-icon" };

createServer((request, response) => {
  const requestPath = decodeURIComponent((request.url || "/").split("?")[0]);
  const requestedFile = normalize(join(root, requestPath === "/" ? "index.html" : requestPath));
  const safePath = relative(root, requestedFile);
  const isSafe = safePath && !safePath.startsWith("..") && !safePath.includes(`..${process.platform === "win32" ? "\\" : "/"}`);
  const filePath = isSafe && existsSync(requestedFile) && statSync(requestedFile).isFile() ? requestedFile : join(root, "index.html");
  const extension = extname(filePath).toLowerCase();
  response.writeHead(200, { "Content-Type": mimeTypes[extension] || "application/octet-stream" });
  createReadStream(filePath).on("error", () => response.writeHead(404).end()).pipe(response);
}).listen(PORT, "0.0.0.0", () => console.log(`Study Point frontend listening on port ${PORT}`));
