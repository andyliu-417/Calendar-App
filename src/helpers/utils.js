import moment from "moment";

export function compare() {
  return function(e1, e2) {
    var m1 = moment(e1.datetime);
    var m2 = moment(e2.datetime);
    return m1.isAfter(m2);
  };
}
