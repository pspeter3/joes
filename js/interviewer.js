function Interviewer(id, name, numEvents) {
  // Instance variables
  this.id = id;
  this.name = name;
  this.sat = [];
  this.sun = [];
  for (var i = 0; i < numEvents; i++) {
    this.sat.push([]);
    this.sun.push([]);
  }
}

Interviewer.prototype.isFull = function(day, event, maxRecruits) {
  return this.size(day, event) === maxRecruits;
}

Interviewer.prototype.add = function(day, event, recruit) {
  this[day][event].push(recruit);
}

Interviewer.prototype.size = function(day, event) {
  return this[day][event].length;
}
