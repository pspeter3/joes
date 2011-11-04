function assign(data, date, numEvents) {
  var interviewers = window.Interviewer.cache
  var maxGroupSize = Math.ceil(_(data).size() / _(interviewers).size());
  var ids = [];
  _(interviewers).each(function(interviewer, id) {
    interviewer[date] = [];
    for(var i = 0; i < numEvents; i++) {
      interviewer[date].push([]);
    }
    ids.push(id);
  });
  for (var i = 0; i < numEvents; i++) {
    // Reset all the recruits and push them into a temp array
    var temp = [];
    _(data).each(function(recruit, id) {
      recruit.reset();
      temp.push(recruit);
    });
    console.log('loop');
    console.log(temp[temp.length - 1]);
    // Iterate through the data
    while(temp.length > 0) {
      var recruit = temp.pop()
      console.log(recruit);
      // Get the interviewerId
      var interviewerId = recruit.assign(ids);
      // Add it to the list for the interviewer 
      interviewers[interviewerId][date][i].push(recruit);
      // Add conflicts
      _(recruit.fellows).each(function(r, id) {
        r.addConflict(interviewerId);
      });
      // Check for fullness
      if (interviewers[interviewerId][date][i].length >= maxGroupSize) {
        console.log("" + interviewerId + "is full");
        _(temp).each(function(recruit) {
          recruit.addConflict(interviewerId);
        });
      }
      // Sort the array again
      temp = temp.sort(function(a, b) {
        return _(b.temp).size() - _(a.temp).size();
      });
      // Sort the ids
      ids = ids.sort(function(a, b) {
        return interviewers[a][date][i].length - interviewers[b][date][i].length;
      });
    }
    // Make sure to add fellows
    _(interviewers).each(function(interviewer, id) {
      var fellows = interviewer[date][i];
      _(fellows).each(function(recruit) {
        recruit.addFellows(fellows);
      });
    });
  }
  console.log("render time!");
  // Render
  _(interviewers).each(function(interviewer, id) {
    var template = "<tr><td><%= interviewer.name %></td>" +
    "<% _(interviewer[date]).each(function(recruits) { %>" +
      "<td><ul><% _(recruits).each(function(recruit) { %>" +
        "<li><%= recruit.name %></li>" +
      "<% }); %></td></ul>" +
    "<% }); %></tr>";
    $('.' + date + ' tbody').append(_.template(template, 
      {interviewer: interviewer, date: date}
    ));
  });
}

function exec() {
  // Parse the CSV data
    var data = window.parseCSV($('#recruits').val());
    saturday = {};
    sunday = {}
    _(data).each(function(row) {
      if (row.length === 3) {
        var interviewer = window.Interviewer.create(row[2]);
        var recruit = new window.Recruit(row[0], row[1], interviewer.id);
        if (recruit.date === 0) {
          saturday[recruit.id] = recruit;
        } else {
          sunday[recruit.id] = recruit;
        }
      }
    });
    // Add events to the tables
    var numEvents = parseInt($('#events').val());
    for (var i = 0; i < numEvents; i++) {
      $('.events thead tr').append('<th>' + (i + 1) + '</th>');
    }
    // Assign the data
    assign(saturday, 'saturday', numEvents);
    assign(sunday, 'sunday', numEvents);
}

$(function() {
  $("form").submit(function() {
    exec();
    return false;
  });
});
