// Create the constructor
window.Interviewer = function(name) {
  this.id = window.Interviewer.idCount++;
  this.name = name;
}

// Create a static hashmap to hold id values based on name
window.Interviewer.hash = {};
window.Interviewer.cache = {}

// Create a static id count
window.Interviewer.idCount = 0;

// Create a static creation function that prevents multiple entries
window.Interviewer.create = function(name) {
  if (_(window.Interviewer.hash[name]).isUndefined()) {
    var interviewer = new window.Interviewer(name);
    window.Interviewer.hash[name] = interviewer;
    window.Interviewer.cache[interviewer.id] = interviewer;
  }
  return window.Interviewer.hash[name];
}
