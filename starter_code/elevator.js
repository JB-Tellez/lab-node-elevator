class Elevator {
  constructor() {
    this.floor = 0;
    this.MAXFLOOR = 10;
    this.UP = 'up';
    this.DOWN = 'down';
    this.IDLE = 'idle';
    this.requests = [];
    this.waitingList = [];
    this.passengers = [];
    this.direction = this.IDLE;
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

    this.log(`Direction: ${this.direction} | Floor: ${this.floor} | ${this.requests}`);

    this._passengersLeave();

    if (this.passengers.length === 0) {
      this.direction = this.IDLE;
    }

    this._passengersEnter();

    if (this.requests.length) {

      let headRequest = this.requests[0];

      let headRequestIsAbove = headRequest > this.floor;

      let headRequestIsBelow = headRequest < this.floor;

      let elevatorCanGoUp = this.direction !== this.DOWN;

      let elevatorCanGoDown = this.direction !== this.UP;

      if (headRequestIsAbove && elevatorCanGoUp) {

        this.direction = this.UP;

      } else if (headRequestIsBelow && elevatorCanGoDown) {

        this.direction = this.DOWN;
      }

      this.direction === this.UP ? this.floorUp() : this.floorDown();

    }
  }

  _sameDirection(person) {

    return this.direction === this.IDLE ||
      (this.direction === this.UP && person.upwardBound) ||
      (this.direction === this.DOWN && !person.upwardBound)
  }

  _passengersEnter() {

    for (let i = this.waitingList.length - 1; i >= 0; i--) {

      let person = this.waitingList[i];

      if (person.originFloor === this.floor && this._sameDirection(person)) {

        this.passengers.push(person);

        this.waitingList.splice(i, 1);

        this.requests.push(person.destinationFloor);

        this.requests.splice(this.requests.indexOf(person.originFloor), 1);

        this.log(`${person.name} has entered the elevator`);
      }
    }
  }
  _passengersLeave() {

    for (let i = this.passengers.length - 1; i >= 0; i--) {

      let passenger = this.passengers[i];

      if (passenger.destinationFloor === this.floor) {

        this.passengers.splice(i, 1);

        this.requests.splice(this.requests.indexOf(passenger.destinationFloor), 1);

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
