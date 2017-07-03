var { expect } = require('chai');
const Elevator = require('../elevator.js');
const Person = require('../person.js');

describe('Elevator', function () {

  let elevator;

  beforeEach(() => elevator = new Elevator());

  describe('floorUp()', function () {

    it('should move up a floor', function () {
      elevator.floorUp();
      expect(elevator.floor).to.equal(1);
    });

    it('should not move past MAXFLOOR', () => {
      elevator.floor = elevator.MAXFLOOR
      elevator.floorUp();
      expect(elevator.floor).to.equal(elevator.MAXFLOOR);
    });


  });

  describe('call()', () => {

    let person;

    beforeEach(() => person = new Person('Joan', 0, 10));

    describe('waiting list', () => {

      it('should add person', () => {
        elevator.call(person);
        expect(elevator.waitingList.length).to.equal(1);
        expect(elevator.waitingList[0]).to.equal(person);
      });

    });

    describe('requests', () => {

      it('should add floor to request list', () => {
        elevator.call(person);
        expect(elevator.requests.length).to.equal(1);
        expect(elevator.requests[0]).to.equal(person.originFloor);
      });
    });

    describe('direction', () => {

      it('should start out UP', () => {
        expect(elevator.direction).to.equal(elevator.UP);
      });

      it('should be UP on bottom floor', () => {
        elevator.floor = 1;
        elevator.direction = elevator.DOWN;
        elevator.floorDown();
        elevator.update();
        expect(elevator.direction).to.equal(elevator.UP);
      });

      it('should move up to requested floor', () => {
        
        let person = new Person('Jane', 0 , 5);
        
        elevator.call(person);

        for (let floor = 0; floor <= person.floor; floor++) {
          expect(elevator.floor).to.equal(floor);
          elevator.update();
        }
        
      });

    });

    describe('picking up', () => {

      it('should pick up upward bound people', () => {

        for (let i = 0; i < 10; i++) {
          elevator.call(new Person('person ' + i, i, 10));
        }
        
        for (let i = 0; i < 10; i++) {
          elevator.update();
        }

        expect(elevator.passengers.length).to.equal(10);

        elevator.update();

        expect(elevator.passengers.length).to.equal(0);
        
      });

      it('should skip downward bound on way up', () => {

        elevator.call(new Person('upward bound', 0, 10));

        for (let i = 0; i < 10; i++) {
          elevator.call(new Person('person ' + i, 10 - i, 0));
        }
        
        for (let i = 0; i < 10; i++) {
          elevator.update();
        }

        expect(elevator.passengers.length).to.equal(1);
        
      })

      it('should pick up downward bound people', () => {

        elevator.floor = 10;

        for (let i = 0; i < 10; i++) {
          elevator.call(new Person('person ' + i, 10 - i, 0));
        }
        
        for (let i = 0; i < 10; i++) {
          elevator.update();
        }

        expect(elevator.passengers.length).to.equal(10);

        elevator.update();

        expect(elevator.passengers.length).to.equal(0);
        
      });

      it('should skip upward bound on way down', () => {

        elevator.floor = 10;

        elevator.call(new Person('downward bound', 10, 0));

        for (let i = 1; i < 10; i++) {
          elevator.call(new Person('person ' + i, i, 10));
        }
        
        for (let i = 0; i < 10; i++) {
          elevator.update();
        }

        expect(elevator.passengers.length).to.equal(1);
        
      })

    })


  });

});
