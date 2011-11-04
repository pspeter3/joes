// Create a default backbone model
window.Interviewer = Backbone.Model.extend({});

// Create the Interviewer Collection
window.InterviewCollection = Backbone.Collection.extend({
  model: window.Interviewer,
  cache: {}
});
