const fs = require('fs');
const crypto = require('crypto');

// Generate a random hexidecimal string
function generateId(bytes=8) {
  return crypto.randomBytes(8).toString('hex');
}

function readPeople() {
  const fileContents = fs.readFileSync('people.json', 'utf8');
  const parsedData = JSON.parse(fileContents);
  return parsedData;
}

function writePeople(data) {
  const fileContents = JSON.stringify(data, null, 2);
  fs.writeFileSync('people.json', fileContents);
}

function createPerson(name, age) {
  const person = { id: generateId(), name, age };
  writePeople([...readPeople(), person]);
  return person;
}

function updatePerson(id, newFields) {
  writePeople(readPeople().map(person => {
    if (person.id == id) return { ...person, ...newFields, id, };
    else return person;
  }));
}

function deletePerson(id) {
  writePeople(readPeople().filter(person => {
    return person.id !== id;
  }));
}

module.exports = {
  readPeople,
  writePeople,
  createPerson,
  updatePerson,
  deletePerson,
}
