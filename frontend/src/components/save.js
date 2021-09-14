//change for multiple type tage filter
const filtreTag = (e) => {
  if (e.target.value !== "null") {
    if (filtredEventsActive == false) {
      const arrayTempo = [];
      events.forEach((event) => {
        if (event.fields.tags) {
          arrayTempo.push(event);
        }
      });
      //   console.log(arrayTempo)
      const result = arrayTempo.filter((event, i) =>
        event.fields.tags.includes(e.target.value)
      );
      console.log(result);
      setEventsFiltred(result);
      setFiltredEventsActive(true);
    } else {
      const arrayTempo = [];
      eventsFiltred.forEach((event) => {
        if (event.fields.tags) {
          arrayTempo.push(event);
        }
      });
      const result = arrayTempo.filter((event) =>
        event.fields.tags.includes(e.target.value)
      );
      console.log(result);
      setEventsFiltred(result);
      setFiltredEventsActive(true);
    }
  } else {
    // retirer le liftre tag
    // sans changer les autres filtre actif
    // setFiltredEventsActive(false)
  }
};
