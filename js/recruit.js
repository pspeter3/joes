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
  this.interviewerId = interviewerId;
  this.conflicts = {interviewerId: true};
  this.temp = {};
  this.fellows = [];
  this.render();
}

// Create an id count
window.Recruit.idCount = 0;

// Create day Counts
window.Recruit.saturdayCount = 0;
window.Recruit.sundayCount = 0;

// Set the date to saturday
window.Recruit.prototype._saturday = function() {
  this.date = "Saturday";
  window.Recruit.saturdayCount++;
}

// Set the date to sunday
window.Recruit.prototype._sunday = function() {
  this.date = "Sunday";
  window.Recruit.sundayCount++;
}

// Render the object
window.Recruit.prototype.render = function() {
  try {
    $('.recruits-table').append(_.template(
      "<tr><td><%= id %></td><td><%= name %></td><td><%= date %></td><td><%= interviewerId %></td></tr>",
      {id: this.id, name: this.name, date: this.date, interviewerId: this.interviewerId}
    ));
  } catch(err) {
    console.error(err);
  }
}
