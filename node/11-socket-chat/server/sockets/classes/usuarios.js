class Usuarios {
  constructor() {
    this.persons = [];
  }

  addPerson(id, name) {
    let person = {
      id,
      name,
    };

    this.persons.push(person);
    return this.persons;
  }

  getPerson(id) {
    let person = this.persons.find((p) => p.id === id)[0];
    return person;
  }

  getPersons() {
    return this.persons;
  }

  getPersonForRoom(room) {}

  removePerson(id) {
    let personRemoved = this.getPerson(id);
    this.persons = this.persons.filter((p) => p.id !== id);
    return personRemoved;
  }
}

module.exports = Usuarios;
