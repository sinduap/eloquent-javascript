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
  const graph = new Map();

  function addEdges(from, to) {
    if (!graph.has(from)) {
      graph.set(from, new Set([to]));
      return;
    }
    graph.get(from).add(to);
  }

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
    let route = memory;
    let destination;

    switch (this.type) {
      case 'random': {
        const locations = Array.from(roadGraph.get(this.location));
        destination = randomPick(locations);
        return { destination, memory };
      }

      case 'route-oriented': {
        route = route.length ? route : mailRoute;
        [destination, ...route] = route;
        return { destination, memory: route };
      }

      case 'goal-oriented': {
        if (!route.length) {
          const parcel = this.parcels.at(0);
          const from = this.location;
          const to =
            parcel.location === this.location
              ? parcel.address
              : parcel.location;
          route = findShortestRoute(roadGraph, from, to);
        }
        [destination, ...route] = route;
        return { destination, memory: route };
      }

      case 'efficient': {
        if (!route.length) {
          const parcel = findNearestParcel(
            roadGraph,
            this.parcels,
            this.location
          );
          const from = this.location;
          const to =
            parcel.location === this.location
              ? parcel.address
              : parcel.location;
          route = findShortestRoute(roadGraph, from, to);
        }
        [destination, ...route] = route;
        return { destination, memory: route };
      }

      default:
        throw new Error(`Type: ${this.type} is invalid robot type!`);
    }
  }

  static run(robot, memory = []) {
    let turns = 0;
    /*
    console.log(
      `Robot ${robot.type} start delivering ${robot.parcels.length} parcel`
    );
    */
    while (robot.parcels.length) {
      const action = robot.act(memory);
      memory = action.memory;
      robot = robot.move(action.destination);
      // console.log(`Moved to ${action.destination}`);
      turns++;
    }
    /*
    console.log(
      `Robot ${robot.type} done delivering all parcels in ${turns} turns`
    );
    */
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

function findNearestParcel(graph, parcels, currLocation) {
  const parcelsRoutes = [];

  for (const parcel of parcels) {
    const route = findShortestRoute(graph, currLocation, parcel.location);
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

//prettier-ignore
const randomRobotResult = `Takes ${Robot.run(randomRobot)} turns to deliver ${parcels.length} parcels.`
//prettier-ignore
const routeRobotResult = `Takes ${Robot.run(routeRobot)} turns to deliver ${parcels.length} parcels.`;
//prettier-ignore
const goalRobotResult = `Takes ${Robot.run(goalRobot)} turns to deliver ${parcels.length} parcels.`;
//prettier-ignore
const effientRobotResult = `Takes ${Robot.run(effientRobot)} turns to deliver ${parcels.length} parcels.`;

console.log({
  randomRobotResult,
  routeRobotResult,
  goalRobotResult,
  effientRobotResult,
});

export { Robot, createParcels };
