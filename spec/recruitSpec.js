describe('Recruit', function() {
  it('should be defined', function() {
    expect(window.Recruit).toBeDefined();
  });
  
  it('should construct a simple object', function() {
    var r = new window.Recruit('A', 'Saturday', 0);
    expect(r.id).toEqual(0);
    expect(r.name).toEqual('A');
    expect(r.date).toEqual(0);
  });
  
  it('should handle various date inputs', function() {
    var saturday = new window.Recruit('A', 'Saturday, Nov 18', 0);
    expect(saturday.date).toEqual(0);
    var sunday = new window.Recruit('A', 'Nov 19, Sunday', 0);
    expect(sunday.date).toEqual(1);
  });
  
  it('should have a reset method', function() {
    var r = new Recruit('A', '', 0);
    expect(r.reset).toBeDefined();
  });
  
  it('should have an addConflict method', function() {
    var r = new Recruit('A', '', 0);
    r.addConflict(1);
    expect(r.temp[1]).toBeTruthy();
  });
  
  it('should have an addFellows method', function() {
    var r = new Recruit('A', '', 0);
    r.addFellows([0, 1, 2]);
    expect(r.fellows[1]).toBeTruthy();
  });
  
  it('should have an assign method', function() {
    var r = new Recruit('A', '', 0);
    expect(r.assign).toBeDefined();
  });
});
