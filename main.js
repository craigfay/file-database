const http = require('http');
const fs = require('fs');
const generateId = require('./id');

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
  const id = generateId();
  const people = readPeople();
  const person = { id, name, age };
  people.push(person);
  writePeople(people);
  return person;
}

function updatePerson(id, newFields) {
  const updatedPeople = readPeople().map(person => {
    if (person.id == id) {
      return { ...person, ...newFields, id, };
    }
    return person;
  });
  writePeople(updatedPeople);
}

function deletePerson(id) {
  writePeople(readPeople().filter(person => {
    return person.id !== id;
  }));
}

function main() {
  const jenny = createPerson("jenny", 28);
  updatePerson(jenny.id, { age: 45 });
  console.log(readPeople());
  deletePerson(jenny.id);
}

main();