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
  people.push({ id, name, age });
  writePeople(people);
}

function updatePerson(name, age) {
  const people = readPeople();
  for (const person of people) {
    if (person.name == name) {
      person.age = age;
      writePeople(people);
      return true;
    }
  }
}

function main() {
  createPerson("jenny", 28);
  updatePerson("jenny", 45);
  console.log(readPeople());
}

main();