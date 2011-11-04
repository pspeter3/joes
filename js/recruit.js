function Recruit(id, name, interviewerId, numInterviewers) {
  // Create instance variables
  this.id = id;
  this.name = name;
  this.conflicts = [];
  this.fellows = [id];
  // Instantiate conflicts
  for(var i = 0; i < numInterviewers; i++) {
    if (i === interviewerId) {
      this.conflicts.push(true);
    } else {
      this.conflicts.push(false);
    }
  }
  this.temp = _(this.conflicts).clone();
}

Recruit.prototype.reset = function() {
  this.temp = _(this.conflicts).clone();
}

Recruit.prototype.numConflicts = function() {
  return _(this.temp).reduce(
    function(memo, conflict) {
      if (conflict) {
        memo++;
      }
      return memo;
    }, 0
  );
}

Recruit.prototype.addConflict = function(id) {
  this.temp[id] = true;
}

Recruit.prototype.assign = function(ids) {
  for (var i = 0; i < ids.length; i++) {
    var iid = ids[i];
    if (this.temp[iid] === false) {
      this.conflicts[iid] = true;
      return iid;
    }
  }
}

Recruit.prototype.addFellows = function(fellows) {
  this.fellows = _(this.fellows.concat(fellows)).uniq();
}
