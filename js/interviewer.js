// Create the constructor
window.Interviewer = function(id, name) {
  this.id = window.Interviewer.idCount++;
  this.name = name;
}

// Create a static hashmap to hold id values based on name
window.Interviewer.hash = {};

// Create a static id count
window.Interviewer.idCount = 0;

// Create a static creation function that prevents multiple entries
window.Interviewer.create = function(name) {
  if (_(window.Interviewer.hash[name]).isUndefined()) {
    var interviewer = new window.Interviewer(name);
    window.Interviewer.hash[name] = interviewer;
  }
  return window.Interviewer.hash[name];
}
