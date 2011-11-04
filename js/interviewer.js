// Create the constructor
window.Interviewer = function(id, name) {
  this.id = id;
  this.name = name;
}

// Create a static hashmap to hold id values based on name
window.Interviewer.hash = {};

// Create a static id count
window.Interviewer.idCount = 0;

// Create a static creation function that prevents multiple entries
window.Interviewer.create = function(name) {
  if (_(window.Interviewer.hash[name]).isUndefined()) {
    var interviewer = new window.Interviewer(
      window.Interviewer.idCount++,
      name
    );
    window.Interviewer.hash[name] = interviewer;
    interviewer.render();
  }
  return window.Interviewer.hash[name];
}

// Create a render method
window.Interviewer.prototype.render = function() {
  try {
    $('.interviewers-table').append(_.template(
      "<tr><td><%= id %></td><td><%= name %></td></tr>",
      {id: this.id, name: this.name}
    ));
  } catch(err) {
    console.error(err);
  }
}
