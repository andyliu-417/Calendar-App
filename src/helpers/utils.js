import moment from "moment";

export function compare() {
  let m1, m2;
  return function(e1, e2) {
    if (e1.completed && e2.completed) {
      m1 = moment(e1.datetime);
      m2 = moment(e2.datetime);
      return m1.isAfter(m2);
    }
    if (e1.completed) return true;
    if (e2.completed) return false;
    m1 = moment(e1.datetime);
    m2 = moment(e2.datetime);
    return m1.isAfter(m2);
  };
}

export function filterEvents(pickDate, eventList, view) {
  const events = [];
  const end = pickDate.endOf("month").format("YYYY-MM-DD");
  const start = pickDate.startOf("month").format("YYYY-MM-DD");
console.log(pickDate, eventList);

  for (let i = 0; i < eventList.length; i++) {
    const event = eventList[i];
    const eventMoment = moment(
      `${event.datetime.years}-${event.datetime.months + 2}-${
        event.datetime.date
      } ${event.datetime.hours}:${event.datetime.minutes}`,
      "YYYY-MM-DD HH:mm"
    );
    if (view === "day") {
      console.log("day", eventMoment);
      
      if (eventMoment.isSame(pickDate, "day")) {
        events.push(event);
      }
    } else if (view === "month") {
      if (eventMoment.isBetween(start, end)) {
        events.push(event);
      }
    }
  }
  return events;
}
