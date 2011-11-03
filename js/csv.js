// This code is based off the blog post at 
// http://www.bennadel.com/blog/1504-Ask-Ben-Parsing-CSV-Strings-With-Javascript-Exec-Regular-Expression-Command.htm

function parseCSV(data, delimiter) {
  // Set default value for delimiter
  delimiter = (delimiter || ",");
  // Create a regex pattern
  var pattern = new RegExp(
    (
      // Delimiters
      "(\\" + delimiter + "|\\r?\\n|\\r|^)" +
      // Quoted fields
      "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
      // Standard fields.
      "([^\"\\" + delimiter + "\\r\\n]*))"
    ),
    "gi"
  );
  // Create an resultay with an empty row to hold the data
  var result = [[]];
  // Create an resultay matcher
  var matcher = null;
  // Loop through the matches
  while (matcher = pattern.exec(data)) {
    var matched = matcher[1];
    // Check for row delimiter
    if (matched.length && matched != delimiter) {
      // Add new row
      result.push([]);
    }
    var value;
    if (matcher[2]) {
      value = matcher[2].replace(new RegExp("\"\"", "g"), "\"");
    } else {
      value = matcher[3];
    }
    // Push the value
    result[result.length - 1].push(value);
  }
  
  return result;
}
