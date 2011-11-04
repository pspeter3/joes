describe('Interviewer', function() {
  it('should be defined', function() {
    expect(window.Interviewer).toBeDefined();
  });
  
  it('should have be able to create an interviewer', function() {
    var i = window.Interviewer.create('A');
    expect(i.name).toEqual('A');
    expect(i.id).toEqual(0);
  });
  
  it('should prevent multiple interviewers from being created', function() {
    var a = window.Interviewer.create('A');
    var b = window.Interviewer.create('A');
    expect(a.id).toEqual(b.id);
  });
  
  it('should have a render method', function() {
    var i = window.Interviewer.create('A');
    expect(i.render).toBeDefined();
  });
});
