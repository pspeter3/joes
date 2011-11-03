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
