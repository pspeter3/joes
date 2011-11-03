describe("CSV Parser", function() {
  it("should be defined", function() {
    expect(parseCSV).toBeDefined();
  });
  
  it("should be able to handle simple CSV data", function() {
    var data = parseCSV("a,b,c");
    expect(data[0]).toEqual(['a', 'b', 'c']);
  });
  
  it("should be able to handle quotes", function() {
    var data = parseCSV('a,"this is a, test",c');
    expect(data[0]).toEqual(['a','this is a, test', 'c']);
  });
  
  it("should be able to handle multiple lines", function() {
    var data = parseCSV("a,b,c\nd,e,f");
    expect(data).toEqual([['a', 'b', 'c'], ['d', 'e', 'f']]);
  });
});
