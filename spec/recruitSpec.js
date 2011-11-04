describe('Recruit', function() {
  it('should be defined', function() {
    expect(window.Recruit).toBeDefined();
  });
  
  it('should construct a simple object', function() {
    var r = new window.Recruit('A', 'Saturday', 0);
    expect(r.id).toEqual(0);
    expect(r.name).toEqual('A');
    expect(r.date).toEqual('Saturday');
  });
  
  it('should handle various date inputs', function() {
    var saturday = new window.Recruit('A', 'Saturday, Nov 18', 0);
    expect(saturday.date).toEqual('Saturday');
    var sunday = new window.Recruit('A', 'Nov 19, Sunday', 0);
    expect(sunday.date).toEqual('Sunday');
  });
  
  it('should have a render method', function() {
    var r = new window.Recruit('A', 'Saturday', 0);
    expect(r.render).toBeDefined();
  });
});
