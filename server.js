import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname manually for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the port number
const PORT = 8080;

// Base directory for your files
const BASE_DIR = path.join(__dirname, '/');

console.log('BASE DIR:', BASE_DIR);

// Create the server
const server = http.createServer((req, res) => {
    // Parse the URL to separate path and query
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname; // The requested path without query params

    // Construct the requested file path
    let filePath = path.join(BASE_DIR, pathname === '/' ? 'index.html' : pathname);

    // Determine the content type based on the file extension
    const extname = path.extname(filePath).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // Read and serve the requested file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found, respond with 404
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404: File Not Found</h1>', 'utf-8');
            } else {
                // Server error
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end(`<h1>500: Server Error</h1>\n${err.message}`, 'utf-8');
            }
        } else {
            // File found, serve it
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
