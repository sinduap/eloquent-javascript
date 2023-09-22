const scriptEL = document.createElement('script');
scriptEL.setAttribute('src', 'https://eloquentjavascript.net/code/journal.js');
document.head.append(scriptEL);

scriptEL.addEventListener('load', function (_e) {
  function tableFor(event, journal) {
    const table = Array(4).fill(0);

    journal.forEach(({ events, squirrel }) => {
      let index = 0;
      if (events.includes(event)) index += 1;
      if (squirrel) index += 2;
      table[index] += 1;
    });

    return table;
  }

  function phi([n00, n01, n10, n11]) {
    return (
      (n11 * n00 - n10 * n01) /
      Math.sqrt((n11 + n10) * (n01 + n00) * (n11 + n01) * (n10 + n00))
    );
  }

  function eventsFrom(journal) {
    return journal.reduce((acc, curr) => {
      curr.events.forEach(evt => {
        !acc.includes(evt) && acc.push(evt);
      });

      return acc;
    }, []);
  }

  for (const event of eventsFrom(JOURNAL)) {
    const corr = phi(tableFor(event, JOURNAL));
    if (corr > 0.1 || corr < -0.1) console.log(`${event}: ${corr}`);
  }

  for (const entry of JOURNAL) {
    if (
      entry.events.includes('peanuts') &&
      !entry.events.includes('brushed teeth')
    )
      entry.events.push('peanuts brushed');
  }

  console.log(
    `Eating peanuts and forgeting to brush teeth correlation: ${phi(
      tableFor('peanuts brushed', JOURNAL)
    )}`
  );
});
