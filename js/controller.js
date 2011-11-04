$(function() {
  $("form").submit(function() {
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
    return false;
  });
});
