function toggleDropdown() {
    var dropdown = document.querySelector('.dropdown');
    dropdown.classList.toggle('show-dropdown');
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName('dropdown');
      for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show-dropdown')) {
          openDropdown.classList.remove('show-dropdown');
        }
      }
    }
  }
  
  $(document).ready(function() {
    // Event listener for file input change
    $('#csvFileInput').on('change', function(event) {
      var file = event.target.files[0]; // Get the selected file
      var reader = new FileReader(); // Initialize file reader
  
      // Callback function to handle file reading
      reader.onload = function(e) {
        var csv = e.target.result; // Get CSV content
        processData(csv); // Process CSV data
      };
  
      // Read the selected file as text
      reader.readAsText(file);
    });
  
    // Function to process CSV data
    function processData(csv) {
      var allRows = csv.split(/\r?\n|\r/); // Split CSV into rows
      var html = '<table>'; // Initialize HTML table
      for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
        if (singleRow === 0) {
          html += '<thead>'; // Add table head for the first row
          html += '<tr>'; // Add table row
        } else {
          html += '<tr>'; // Add table row for other rows
        }
        var rowCells = allRows[singleRow].split(','); // Split row into cells
        for (var rowCell = 0; rowCell < rowCells.length; rowCell++) {
          if (singleRow === 0) {
            html += '<th>'; // Add table header for the first row
            html += rowCells[rowCell]; // Add cell content
            html += '</th>'; // Close table header
          } else {
            html += '<td>'; // Add table data cell for other rows
            html += rowCells[rowCell]; // Add cell content
            html += '</td>'; // Close table data cell
          }
        }
        if (singleRow === 0) {
          html += '</tr>'; // Close table row for the first row
          html += '</thead>'; // Close table head
          html += '<tbody>'; // Open table body
        } else {
          html += '</tr>'; // Close table row for other rows
        }
      }
      html += '</tbody>'; // Close table body
      html += '</table>'; // Close table
      $('#csvData').html(html); // Display HTML table in the specified div
    }
  });