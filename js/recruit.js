// Constructor
window.Recruit = function(name, date, interviewerId) {
  this.id = window.Recruit.idCount++;
  this.name = name;
  if (date.match(/saturday/i)) {
    this._saturday();
  } else if (date.match(/sunday/i)) {
    this._sunday();
  } else {
    if (window.Recruit.saturdayCount < window.Recruit.sundayCount) {
      this._saturday();
    } else {
      this._sunday();
    }
  }
  this.conflicts = {interviewerId: true};
  this.temp = {};
  this.fellows = [];
}

// Create an id count
window.Recruit.idCount = 0;

// Create day Counts
window.Recruit.saturdayCount = 0;
window.Recruit.sundayCount = 0;

// Set the date to saturday
window.Recruit.prototype._saturday = function() {
  this.date = 0;
  window.Recruit.saturdayCount++;
}

// Set the date to sunday
window.Recruit.prototype._sunday = function() {
  this.date = 1;
  window.Recruit.sundayCount++;
}

window.Recruit.prototype.reset = function() {
  this.temp = _(this.conflicts).clone();
}

window.Recruit.prototype.addConflict = function(interviewerId) {
  this.temp[interviewerId] = true;
}
