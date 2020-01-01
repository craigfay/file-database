const http = require('http');
const { readPeople } = require('./people');

function requestHandler(request, response) {
  if (request.method == 'GET' && request.url.startsWith('/people')) {
    return handleReadPeopleRequest(request, response);
  }
  else {
    return handleRequestNotFound(request, response);
  }
}

function handleReadPeopleRequest(request, response) {
  const people = readPeople();
  const [,,id] = request.url.split('/');
  if (id) {
    // Try to respond with a single person object
    const person = people.find(p => p.id == id);
    if (!person) return handleRequestNotFound(request, response);
    response.writeHead(200, { 'content-type': 'application/json' });
    return response.end(JSON.stringify(person, null, 2));
  }
  // Respond with all people
  response.writeHead(200, { 'content-type': 'application/json' });
  response.end(JSON.stringify(people, null, 2));
}

function handleRequestNotFound(request, response) {
  response.writeHead(404);
  response.end('Not Found');
}

const server = http.createServer(requestHandler);
server.listen(5000);
