import { Robot, createParcels } from '../projects/ch-7-a-robot.js';

//====================================//
//======= 1.MEASURING A ROBOT ========//
//====================================//

function compare(robot1, memory1, robot2, memory2) {
  const records = [];
  const task = 100;

  for (let i = 0; i < task; i++) {
    const parcels = createParcels(5);
    records.push([
      Robot.run(robot1(parcels), memory1),
      Robot.run(robot2(parcels), memory2),
    ]);
  }

  const [totalSteps1, totalSteps2] = records.reduce((totalSteps, record) => {
    const [total1, total2] = totalSteps ?? [0, 0];
    const [steps1, steps2] = record;
    return [total1 + steps1, total2 + steps2];
  });

  //prettier-ignore
  const result = `Of total ${task} task. ${robot1.name} takes ${totalSteps1 / task} steps per task on average, meanwhile ${robot2.name} takes ${totalSteps2 / task} steps per task on average.`;

  console.log(result);
}

const startingLocation = 'Post Office';

const routeRobot = parcels =>
  new Robot('route-oriented', startingLocation, parcels);
const goalRobot = parcels =>
  new Robot('goal-oriented', startingLocation, parcels);

compare(routeRobot, [], goalRobot, []);

//====================================//
//======== 2.ROBOT EFFICIENCY ========//
//====================================//

const efficientRobot = parcels =>
  new Robot('efficient', startingLocation, parcels);

compare(goalRobot, [], efficientRobot, []);

//====================================//
//======== 3.PERSISTENT GROUP ========//
//====================================//

class PersistentGroup {
  constructor() {
    this.group = new Set();
  }

  add(value) {
    const group = PersistentGroup.from(this.group);
    group.group.add(value);
    return group;
  }

  delete(value) {
    const group = PersistentGroup.from(this.group);
    group.group.delete(value);
    return group;
  }

  has(value) {
    return this.group.has(value);
  }

  static get empty() {
    return new PersistentGroup();
  }

  static from(group) {
    const persistentGroup = new PersistentGroup();
    for (const value of group) {
      persistentGroup.group.add(value);
    }
    return persistentGroup;
  }
}

const a = PersistentGroup.empty.add('a');
const ab = a.add('b');
const b = ab.delete('a');

console.log(b.has('b'));
// → true
console.log(a.has('b'));
// → false
console.log(b.has('a'));
// → false
