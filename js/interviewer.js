// Create a default backbone model
window.Interviewer = Backbone.Model.extend({});

// Create the Interviewer Collection
window.InterviewerCollection = Backbone.Collection.extend({
  model: window.Interviewer,
  cache: {},
  insert: function(name) {
    if (_(this.cache[name]).isUndefined()) {
      var cid = this.add({name: name});
      this.cache[name] = cid;
    }
    return this.cache[name];
  }
});

window.InterviewerCollection.bind("add", function(interviewer) {
  return interviewer.cid;
});
