import JOURNAL from './journal.js';

function createTableFor(eventName, data = JOURNAL) {
  let table = Array(4).fill(0);

  for (const { events, squirrel } of data) {
    let index = 0;
    if (events.includes(eventName)) index += 1;
    if (squirrel) index += 2;
    table[index] += 1;
  }

  return table;
}

function getAllEvents(data) {
  const result = new Set();

  for (const { events } of data) {
    events.forEach(event => {
      result.add(event);
    });
  }

  return Array.from(result);
}

function getPhiFromTable([n00, n01, n10, n11]) {
  return (
    (n11 * n00 - n10 * n01) /
    Math.sqrt((n11 + n10) * (n01 + n00) * (n11 + n01) * (n10 + n00))
  );
}

function generateStats() {
  const stats = [];

  for (const event of getAllEvents(JOURNAL)) {
    stats.push({
      name: event,
      phi: getPhiFromTable(createTableFor(event, JOURNAL)),
    });
  }

  return stats;
}

console.log(
  JSON.stringify(
    generateStats().filter(event => Math.abs(event.phi) > 0.3),
    null,
    2
  )
);

for (const { events } of JOURNAL) {
  if (events.includes('peanuts') && !events.includes('brushed teeth')) {
    events.push('eat peanuts, no brushed teeth');
  }
}

console.log(
  JSON.stringify(
    generateStats().find(e => e.name === 'eat peanuts, no brushed teeth'),
    null,
    2
  )
);
