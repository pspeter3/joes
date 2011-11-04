function assign(interviewers, recruits, day, events) {
  console.log(day);
  // Create an array of ids for the interviewers
  var ids = _(interviewers).map(function(i) { return i.id});
  // Create a variable for the max group size
  var maxSize = Math.ceil(recruits.length / interviewers.length);
  // Loop through the events
  for (var event = 0; event < events; event++) {
    console.log(event);
    // Reset the events and put them into a stack
    var stack = [];
    _(recruits).each(function(recruit) {
      recruit.reset();
      stack.push(recruit);
    });
    // Iterate through the stack
    while (stack.length > 0) {
      // Pop from the stack
      var recruit = stack.pop();
      // Assign the recruit
      var iid = recruit.assign(ids);
      // Assign temp conflict to all fellows
      _(recruit.fellows).each(function(fellow) {
        recruits[fellow].addConflict(iid);
      });
      // Add the recruit to the Interviewer
      console.log(interviewers);
      interviewers[iid].add(day, event, recruit);
      // Check if the interviewer is full
      if (interviewers[iid].isFull()) {
        _(stack).each(function(r) {
          r.addConflict(iid);
        });
      }
      // Sort the interviewers
      ids = ids.sort(function(a, b) {
        return a.size(day, event) - b.size(day, event);
      });
      // Sort the recruits
      stack = stack.sort(function(a, b) {
        return a.numConflicts() - b.numConflicts();
      });
    }
    // Add fellows
    _(interviewers).each(function(interviewer) {
      var fellows = _(interviewer[day][event]).map(function(f) {
        return f.id;
      });
      _(fellows).each(function(fellow) {
        recruits.addFellows(fellows);
      });
    });
  }
}

function exec() {
  // Add events to the tables
  var numEvents = parseInt($('#events').val());
  for (var i = 0; i < numEvents; i++) {
    $('.events thead tr').append('<th>' + (i + 1) + '</th>');
  }
  // Parse the CSV data
  var data = window.parseCSV($('#recruits').val());
  var interviewers = [];
  var cache = {};
  var sat = [];
  var sun = [];
  var either = [];
  // Iterate to create the interviewers
  _(data).each(function(row) {
    if (row.length === 3) {
      if (_(cache[row[2]]).isUndefined()) {
        interviewers.push(new Interviewer(interviewers.length, row[2], numEvents));
        cache[row[2]] = interviewers.length - 1;
      }
    }
  });
  // Iterate to create the recruits
  var size = interviewers.length;
  _(data).each(function(row) {
    if (row.length === 3) {
      if (row[1].match(/saturday/i)) {
        sat.push(new Recruit(sat.length, row[0], cache[row[2]], size));
      } else if (row[1].match(/sunday/i)) {
        sun.push(new Recruit(sun.length, row[0], cache[row[2]], size));
      } else {
        either.push({name: row[0], interviewerId: cache[row[2]]});
      }
    }
  });
  // Balance out the days
  while (either.length > 0) {
    var r = either.pop();
    if (sat.length > sun.length) {
      sat.push(sat.length, r.name, r.interviewerId, size);
    } else {
      sun.push(sun.length, r.name, r.interviewerId, size);
    }
  }
  // Assign the data
  assign(interviewers, sat, 'sat', numEvents);
  assign(interviewers, sun, 'sun', numEvents);
}

$(function() {
  $("form").submit(function() {
    exec();
    return false;
  });
});
