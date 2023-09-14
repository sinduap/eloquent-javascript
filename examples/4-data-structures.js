const scriptEL = document.createElement('script');
scriptEL.setAttribute('src', 'https://eloquentjavascript.net/code/journal.js');
document.head.append(scriptEL);

scriptEL.addEventListener('load', function (_e) {
  function tableFor(eventName, journal) {
    const table = Array(4).fill(0);

    journal.forEach(({ events, squirrel }) => {
      let index = 0;
      if (events.includes(eventName)) index += 1;
      if (squirrel) index += 2;
      table[index] += 1;
    });

    return table;
  }

  function phi(table) {
    return (
      (table[3] * table[0] - table[2] * table[1]) /
      Math.sqrt(
        (table[3] + table[2]) *
          (table[1] + table[0]) *
          (table[3] + table[1]) *
          (table[2] + table[0])
      )
    );
  }

  function eventsFrom(journal) {
    return journal.reduce((acc, curr) => {
      const events = acc;

      curr.events.forEach(evt => {
        !acc.includes(evt) && events.push(evt);
      });

      return events;
    }, []);
  }

  for (const event of eventsFrom(JOURNAL)) {
    console.log(`${event}: ${phi(tableFor(event, JOURNAL))}`);
  }
});
