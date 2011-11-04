// Constructor
window.Recruit = function(name, date, interviewerId) {
  this.id = window.Recruit.idCount++;
  this.name = name;
  this.date = date;
  this.interviewerId = interviewerId;
  this.conflicts = {interviewerId: true};
  this.temp = {};
  this.fellows = [];
}

// Create an id count
window.Recruit.idCount = 0;

