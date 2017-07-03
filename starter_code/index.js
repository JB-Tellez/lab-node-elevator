const Elevator = require('./elevator.js');
const Person = require('./person.js');

const elevator = new Elevator();

let people = [
    new Person('Jane Doe', 0, 5),
    new Person('Joan Duex', 1, 3),
    new Person('Daffy Duck', 4, 2)
];


setInterval(() => {
    if (people.length) {
        elevator.call(people.shift());
    }
}, 500);

elevator.start();


