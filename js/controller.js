$(function() {
  $("form").submit(function() {
    console.log("hey");
    var data = window.parseCSV($('#recruits').val());
    var recruits = [];
    _(data).each(function(row) {
      if (row.length === 3) {
        var interviewer = window.Interviewer.create(row[2]);
        recruits.push(new window.Recruit(row[0], row[1], interviewer.id));
      }
    });
    alert("hey");
    return false;
  });
});
