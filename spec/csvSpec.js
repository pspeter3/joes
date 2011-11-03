describe("CSV Parser", function() {
  it("should be defined", function() {
    expect(window.parseCSV).toBeDefined();
  });
  
  it("should be able to handle simple CSV data", function() {
    var data = window.parseCSV("a,b,c");
    expect(data[0]).toEqual(['a', 'b', 'c']);
  });
  
  it("should be able to handle quotes", function() {
    var data = window.parseCSV('a,"this is a, test",c');
    expect(data[0]).toEqual(['a','this is a, test', 'c']);
  });
});
