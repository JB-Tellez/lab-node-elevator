class Person {
  constructor(name, originFloor, destinationFloor){
    this.name = name;
    this.originFloor = originFloor;
    this.destinationFloor = destinationFloor;
  }

  get upwardBound() {
    return this.destinationFloor > this.originFloor;
  } 
}

module.exports = Person;
