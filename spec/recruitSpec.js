describe('Recruit', function() {
  it('should be defined', function() {
    expect(Recruit).toBeDefined();
  });
  
  it('should be able to add a conflict', function() {
    var r = new Recruit(0, 'a', 0, 8);
    r.reset();
    r.addConflict(1);
    expect(r.temp[0]).toBeTruthy();
    expect(r.temp[1]).toBeTruthy();
  });
  
  it('should be able to return the size', function() {
    var r = new Recruit(0, 'a', 0, 8);
    r.reset();
    expect(r.numConflicts()).toEqual(1);
  });
  
  it('should add fellows', function() {
    var r = new Recruit(0, 'a', 0, 8);
    r.addFellows([0, 1]);
    expect(r.fellows).toEqual([0, 1]);
  });
  
  it('should be able to assign', function() {
    var r = new Recruit(0, 'a', 0, 4);
    r.reset();
    expect(r.assign([0,1,2,3])).toEqual(1);
    r.addConflict(1);
    expect(r.assign([0,1,2,3])).toEqual(2);
  });
});
