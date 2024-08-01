const roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  'Marketplace-Farm',
  'Marketplace-Post Office',
  'Marketplace-Shop',
  'Marketplace-Town Hall',
  'Shop-Town Hall',
];

function buildGraph(edges) {
  function addEdges(from, to) {
    if (!graph.has(from)) {
      graph.set(from, new Set([to]));
    } else {
      graph.get(from).add(to);
    }
  }

  const graph = new Map();

  for (const [from, to] of edges.map(road => road.split('-'))) {
    addEdges(from, to);
    addEdges(to, from);
  }

  return graph;
}

const mailRoute = [
  "Alice's House",
  'Cabin',
  "Alice's House",
  "Bob's House",
  'Town Hall',
  "Daria's House",
  "Ernie's House",
  "Grete's House",
  'Shop',
  "Grete's House",
  'Farm',
  'Marketplace',
  'Post Office',
];

class Robot {
  constructor(type, location, parcels) {
    this.type = type;
    this.location = location;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph.get(this.location).has(destination)) {
      return this;
    }

    const newParcels = this.parcels
      .map(p =>
        p.location === this.location
          ? { location: destination, address: p.address }
          : p
      )
      .filter(p => p.address !== p.location);

    return new Robot(this.type, destination, newParcels);
  }

  act(memory) {
    const action = Object.create(null);
    let destination;

    switch (this.type) {
      case 'random': {
        destination = randomPick(Array.from(roadGraph.get(this.location)));
        break;
      }

      case 'route': {
        if (!memory.length) memory = mailRoute;
        destination = memory.at(0);
        memory = memory.slice(1);
        break;
      }

      case 'smart': {
        if (memory.length === 0) {
          let parcel = this.parcels[0];
          if (parcel.location !== this.location) {
            memory = findRoute(roadGraph, this.location, parcel.location);
          } else {
            memory = findRoute(roadGraph, this.location, parcel.address);
          }
        }
        destination = memory.at(0);
        memory = memory.slice(1);
        break;
      }

      default:
        throw new Error('Invalid robot type!');
    }

    action.destination = destination;
    action.memory = memory;

    return action;
  }

  static run(robot, memory = []) {
    let turns = 0;

    console.log(
      `Robot ${robot.type} start delivering ${robot.parcels.length} parcel`
    );

    while (robot.parcels.length) {
      const action = robot.act(memory);
      memory = action.memory;
      robot = robot.move(action.destination);
      console.log(`Moved to ${action.destination}`);
      turns++;
    }

    console.log(
      `Robot ${robot.type} done delivering all parcels in ${turns} turns`
    );
  }

  static create({
    type = 'random',
    startingLocation = 'Post Office',
    parcelCount = 5,
  } = {}) {
    const parcels = createParcels(parcelCount);
    return new this(type, startingLocation, parcels);
  }
}

function createParcels(parcelCount) {
  const parcels = [];

  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Array.from(roadGraph.keys()));
    let location;

    do {
      location = randomPick(Array.from(roadGraph.keys()));
    } while (location === address);

    parcels.push({ location, address });
  }

  return parcels;
}

function randomPick(array) {
  const choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function findRoute(graph, from, to) {
  let work = [{ at: from, route: [] }];
  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];
    for (let location of graph.get(at).values()) {
      if (location === to) return route.concat(location);
      if (!work.some(w => w.at === location)) {
        work.push({ at: location, route: route.concat(location) });
      }
    }
  }
}

const roadGraph = buildGraph(roads);
const randomRobot = Robot.create({ type: 'random' });
const routeRobot = Robot.create({ type: 'route' });
const smartRobot = Robot.create({ type: 'smart' });

Robot.run(smartRobot);
