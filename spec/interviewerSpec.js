describe('Interviewer', function() {
  it('should be defined', function() {
    expect(window.Interviewer).toBeDefined();
  });
  
  it('should have a name', function() {
    var interviewer = new window.Interviewer({name: 'A+B'});
    expect(interviewer.get('name')).toEqual('A+B');
  });
  
  it('should have a cid', function() {
    var interviewer = new window.Interviewer({name: 'A+B'});
    expect(interviewer.cid).toBeDefined();
  })
});

describe('InterviewerCollection', function() {
  it('should be defined', function() {
    expect(window.InterviewerCollection).toBeDefined();
  });
  
  it('should have a cache object', function() {
    var interviewers = new window.InterviewerCollection();
    expect(interviewers.cache).toBeDefined();
    expect(interviewers.cache).toEqual({});
  });
  
  it('should return a cid on add', function() {
    var interviewers = new window.InterviewerCollection();
    expect(interviewers.add({name: 'A+B'})).toBeDefined();
  });
  
  it('should store values in a cache', function() {
    var interviewers = new window.InterviewerCollection();
    interviewers.insert('A+B');
    expect(interviewers.cache['A+B']).toBeDefined();
  });
});
