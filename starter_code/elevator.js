class Elevator {
  constructor(){
    this.floor      = 0;
    this.MAXFLOOR   = 10;
    this.requests   = [];
  }

  start() {
    this.intervalID = setInterval( () => this.update(), 1000);
   }
  stop() { 
    if (this.intervalID) {
      clearInterval(this.intervalID);
      this.intervalID = undefined;
    }
  }
  update() {
    this.log();
   }
  _passengersEnter() { }
  _passengersLeave() { }
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
  call() { }
  log() { 
    console.log(`Direction: up | Floor: ${this.floor}`);
  }
}

module.exports = Elevator;
