import moment from "moment";

export function compare() {
  return function(e1, e2) {
    if (e1.completed && e2.completed) 
    {
      var m1 = moment(e1.datetime);
      var m2 = moment(e2.datetime);
      return m1.isAfter(m2);
    }
    if (e1.completed) return true;
    if (e2.completed) return false;
    var m1 = moment(e1.datetime);
    var m2 = moment(e2.datetime);
    return m1.isAfter(m2);
  };
}
