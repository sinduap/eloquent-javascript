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

    const updatedParcels = this.parcels
      .map(p =>
        p.location === this.location
          ? { location: destination, address: p.address }
          : p
      )
      .filter(p => p.address !== p.location);

    return new Robot(this.type, destination, updatedParcels);
  }

  act(memory) {
    let destination;

    switch (this.type) {
      case 'random': {
        const locations = Array.from(roadGraph.get(this.location));
        destination = randomPick(locations);
        break;
      }

      case 'route-oriented': {
        memory = memory.length ? memory : mailRoute;
        destination = memory.at(0);
        memory = memory.slice(1);
        break;
      }

      case 'goal-oriented': {
        if (!memory.length) {
          const parcel = this.parcels.at(0);

          const from = this.location;
          const to =
            parcel.location === this.location
              ? parcel.address
              : parcel.location;
          memory = findShortestRoute(roadGraph, from, to);
        }

        destination = memory.at(0);
        memory = memory.slice(1);
        break;
      }

      case 'efficient': {
        if (!memory.length) {
          const parcel = findNearestParcel(this.parcels, this.location);

          const from = this.location;
          const to =
            parcel.location === this.location
              ? parcel.address
              : parcel.location;
          memory = findShortestRoute(roadGraph, from, to);
        }

        destination = memory.at(0);
        memory = memory.slice(1);
        break;
      }

      default:
        throw new Error(`Type: ${this.type} is invalid robot type!`);
    }

    return { destination, memory };
  }

  static run(robot, memory = []) {
    let turns = 0;

    // console.log(
    //   `Robot ${robot.type} start delivering ${robot.parcels.length} parcel`
    // );

    while (robot.parcels.length) {
      const action = robot.act(memory);
      memory = action.memory;
      robot = robot.move(action.destination);
      // console.log(`Moved to ${action.destination}`);
      turns++;
    }

    // console.log(
    //   `Robot ${robot.type} done delivering all parcels in ${turns} turns`
    // );

    return turns;
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
    const locations = Array.from(roadGraph.keys());
    let address = randomPick(locations);
    let location;
    do {
      location = randomPick(locations);
    } while (location === address);
    parcels.push({ location, address });
  }

  return parcels;
}

function randomPick(array) {
  const choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function findShortestRoute(graph, from, to) {
  let work = [{ at: from, route: [] }];

  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];

    for (let location of graph.get(at).values()) {
      if (location === to) {
        return [...route, location];
      }
      if (!work.some(w => w.at === location)) {
        work.push({ at: location, route: [...route, location] });
      }
    }
  }
}

function findNearestParcel(parcels, currLocation) {
  const parcelsRoutes = [];

  for (const parcel of parcels) {
    const route = findShortestRoute(roadGraph, currLocation, parcel.location);
    parcelsRoutes.push({ parcel, route });
  }

  parcelsRoutes.sort((a, b) => a.route.length - b.route.length);
  return parcelsRoutes.at(0).parcel;
}

const roadGraph = buildGraph(roads);
const parcels = createParcels(5);
const startingLocation = 'Post Office';

const randomRobot = new Robot('random', startingLocation, parcels);
const routeRobot = new Robot('route-oriented', startingLocation, parcels);
const goalRobot = new Robot('goal-oriented', startingLocation, parcels);
const effientRobot = new Robot('efficient', startingLocation, parcels);

Robot.run(randomRobot);
Robot.run(routeRobot);
Robot.run(goalRobot);
Robot.run(effientRobot);

export { Robot, createParcels };
