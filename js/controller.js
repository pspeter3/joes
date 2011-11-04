function assign(interviewers, recruits, day, events) {
  console.log(day);
  // Create an array of ids for the interviewers
  var ids = _(interviewers).map(function(i) { return i.id});
  // Create a variable for the max group size
  var maxRecruits = Math.ceil(recruits.length / interviewers.length);
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
      if (_(iid).isUndefined()) {
        console.log(recruit);
      }
      // Assign temp conflict to all fellows
      _(recruit.fellows).each(function(fellow) {
        recruits[fellow].addConflict(iid);
      });
      // Add the recruit to the Interviewer
      interviewers[iid].add(day, event, recruit);
      // Check if the interviewer is full
      if (interviewers[iid].isFull(day, event, maxRecruits)) {
        console.log('' + iid + ' is full');
        _(stack).each(function(r) {
          r.addConflict(iid);
        });
      }
      // Sort the interviewers
      ids = ids.sort(function(a, b) {
        return interviewers[a].size(day, event) - interviewers[b].size(day, event);
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
        recruits[fellow].addFellows(fellows);
      });
    });
  }
  // Render the information
  var partial = "<tr><td><%= interviewer.name %></td>" +
    "<% _(interviewer[day]).each(function(event) { %>" +
      "<td><ul><% _(event).each(function(recruit) { %>" +
        "<li><%= recruit.name %></li>" +
      "<% }); %></ul></td>" +
    "<% }); %></tr>";
  _(interviewers).each(function(interviewer) {
    $('.' + day + ' tbody').append(
      _.template(
        partial,
        {interviewer: interviewer, day: day}
      )
    );
  });
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
        console.log(row[2]);
        cache[row[2]] = interviewers.length - 1;
      }
    }
  });
  // Iterate to create the recruits
  var size = interviewers.length;
  console.log(size);
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
    if (sat.length < sun.length) {
      sat.push(new Recruit(sat.length, r.name, r.interviewerId, size));
    } else {
      sun.push(new Recruit(sun.length, r.name, r.interviewerId, size));
    }
  }
  console.log(sat.length);
  console.log(sun.length);
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
