const http = require('http');
const fs = require('fs');
const path = require('path');

const port = Number(process.env.PORT) || 3000;
const publicDirectory = path.join(__dirname, 'public');
const indexPath = path.join(publicDirectory, 'index.html');

function sendResponse(response, statusCode, body, contentType = 'text/plain; charset=utf-8') {
  response.writeHead(statusCode, { 'Content-Type': contentType });
  response.end(body);
}

const server = http.createServer((request, response) => {
  if (request.method !== 'GET') {
    sendResponse(response, 405, 'Method Not Allowed');
    return;
  }

  if (request.url === '/' || request.url === '/index.html') {
    fs.readFile(indexPath, 'utf8', (error, html) => {
      if (error) {
        sendResponse(response, 500, 'Unable to load the application page.');
        return;
      }

      sendResponse(response, 200, html, 'text/html; charset=utf-8');
    });
    return;
  }

  if (request.url === '/health') {
    sendResponse(response, 200, 'OK');
    return;
  }

  sendResponse(response, 404, 'Not Found');
});

server.listen(port, () => {
  console.log(`Docker Concepts Intro app listening on port ${port}`);
});
