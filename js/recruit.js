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
  this.conflicts = {};
  this.conflicts[interviewerId] = true;
  this.temp = {};
  this.fellows = {};
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
  console.log(_(this.conflicts).size());
  this.temp = _(this.conflicts).clone();
}

window.Recruit.prototype.addConflict = function(interviewerId) {
  this.temp[interviewerId] = true;
}

window.Recruit.prototype.addFellows = function(fellows) {
  var fellowMap = this.fellows;
  _(fellows).each(function(fellow) {
    if (_(fellowMap[fellow.id]).isUndefined()) {
      fellowMap[fellow.id] = fellow;
    }
  });
}

window.Recruit.prototype.assign = function(interviewers) {
  console.log("assign");
  var temp = this.temp;
  var conflicts = this.conflicts;
  console.log(this);
  _(interviewers).each(function(id) {
    console.log(id);
    if (_(temp[id]).isUndefined()) {
      temp[id] = true;
      conflicts[id] = true;
      return id;
    }
  });
}
