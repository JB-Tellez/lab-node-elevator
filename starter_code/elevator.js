class Elevator {
  constructor() {
    this.floor = 0;
    this.MAXFLOOR = 10;
    this.UP = 'up';
    this.DOWN = 'down';
    this.requests = [];
    this.waitingList = [];
    this.passengers = [];
    this.direction = this.UP;
  }

  start() {
    this.intervalID = setInterval(() => this.update(), 1000);
  }
  stop() {
    if (this.intervalID) {
      clearInterval(this.intervalID);
      this.intervalID = undefined;
    }
  }
  update() {

    this.log(`Direction: ${this.direction} | Floor: ${this.floor}`);

    if (this.floor === 0) {

      this.direction = this.UP;

    } else {

      var maxRequest = Math.max(...this.requests);

      this.direction = this.floor >= maxRequest ? this.DOWN : this.UP;
    }

    this._passengersLeave();

    this._passengersEnter();

    let floorIndex = this.requests.indexOf(this.floor);

    if (floorIndex > -1) {
      this.requests.splice(floorIndex, 1);
    }

    if (this.direction === this.UP && this.requests.length > 0) {
      this.floorUp();
    } else if (this.direction === this.DOWN) {
      this.floorDown();
    }
  }



  _sameDirection(person) {

    return (this.direction === this.UP && person.upwardBound) ||
      (this.direction === this.DOWN && !person.upwardBound)
  }

  _passengersEnter() {

    for (let i = this.waitingList.length - 1; i >= 0; i--) {

      let person = this.waitingList[i];

      if (person.originFloor === this.floor && this._sameDirection(person)) {

        this.passengers.push(person);

        this.waitingList.splice(i, 1);
        
        this.requests.push(person.destinationFloor);
        
        this.log(`${person.name} has entered the elevator`);
      }
    }
  }
  _passengersLeave() {
    for (let i = this.passengers.length - 1; i >= 0; i--) {
      let passenger = this.passengers[i];
      if (passenger.destinationFloor === this.floor) {
        this.passengers.splice(i, 1);
        this.log(`${passenger.name} has exited the elevator`);
      }
    }
  }
  floorUp() {
    if (this.floor < this.MAXFLOOR) {
      this.floor++;
    }
  }
  floorDown() {
    if (this.floor > 0) {
      this.floor--;
    }
  }
  call(person) {

    this.requests.push(person.originFloor);
    this.waitingList.push(person);
  }
  log(msg) {
    console.log(msg);
  }
}

module.exports = Elevator;
