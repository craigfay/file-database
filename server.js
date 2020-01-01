const http = require('http');

function requestHandler(request, response) {
  if (request.method == 'GET' && request.url == '/people') {
    return handleReadPeopleRequest(request, response);
  }
  else {
    return handleRequestNotFound(request, response);
  }
}

function handleReadPeopleRequest(request, response) {
  response.writeHead(200);
  response.end('OK');
}

function handleRequestNotFound(request, response) {
  response.writeHead(404);
  response.end('Not Found');
}

const server = http.createServer(requestHandler);
server.listen(5000);