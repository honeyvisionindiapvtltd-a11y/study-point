import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const distDirectory = path.join(path.dirname(fileURLToPath(import.meta.url)), "dist");
const port = Number(process.env.PORT) || 3000;
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp"
};

async function serve(request, response) {
  const requestPath = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
  const relativePath = requestPath === "/" ? "index.html" : requestPath.slice(1);
  const filePath = path.resolve(distDirectory, relativePath);
  const isInsideDist = filePath === distDirectory || filePath.startsWith(`${distDirectory}${path.sep}`);

  if (!isInsideDist) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const file = await readFile(filePath);
    response.writeHead(200, { "Content-Type": contentTypes[path.extname(filePath)] || "application/octet-stream" });
    response.end(file);
  } catch {
    const index = await readFile(path.join(distDirectory, "index.html"));
    response.writeHead(200, { "Content-Type": contentTypes[".html"] });
    response.end(index);
  }
}

createServer((request, response) => {
  serve(request, response).catch(() => {
    response.writeHead(500);
    response.end("Internal Server Error");
  });
}).listen(port, "0.0.0.0", () => {
  console.log(`Study Point frontend running on port ${port}`);
});