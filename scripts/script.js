function addRow() {
    var inputTable = document.getElementById("inputTable");
    var newRow = inputTable.insertRow(inputTable.rows.length);
    newRow.className = "userCreatedRow";

    // Adding cells to the new row
    for (var i = 0; i < 11; i++) {
      var cell = newRow.insertCell(i);
      switch (i) {
        case 0:
          // Allow the user to enter a function name
          cell.innerHTML = '<input type="text" class="nameInputCell" placeholder="function name" >';
          cell.title = "Enter a function name";
          cell.style = "background-color: #f2f2f2;"
          cell.className = "nameInputColumn";
          break;
        case 1:
          cell.className = "ccColumn";
            break;
            case 2:
              cell.className = "planningColumn";
              break;
          case 3:
              cell.className = "riskColumn";
              break;
        case 4:
          // Display inputs for Analysis columns
          cell.innerHTML = '<input type="number" step="0.01" min="0"  class="analysisInputCell" placeholder="i.e. 0.5" oninput="updateTables(this)">';
          cell.title = "Enter a value for Analysis (e.g. 0.5)";
          cell.style = "background-color: #f2f2f2;"
          cell.className = "numberInputColumn";
          break;
        case 5:
          // Display inputs for Design columns
          cell.innerHTML = '<input type="number" step="0.01" min="0"  class="designInputCell" placeholder="i.e. 0.5" oninput="updateTables(this)">';
          cell.title = "Enter a value for Design (e.g. 0.5)";
          cell.style = "background-color: #f2f2f2;"
          cell.className = "numberInputColumn";
          break;
        case 6:
          // Display inputs Code columns
          cell.innerHTML = '<input type="number" step="0.01" min="0"  class="codeInputCell" placeholder="i.e. 0.5" oninput="updateTables(this)">';
          cell.title = "Enter a value for Code (e.g. 0.5)";
          cell.style = "background-color: #f2f2f2;"
          cell.className = "numberInputColumn";
          break;
        case 7:
          // Display inputs for Test columns
          cell.innerHTML = '<input type="number" step="0.01" min="0"  class="testInputCell" placeholder="i.e. 0.5" oninput="updateTables(this)">';
          cell.title = "Enter a value for Test (e.g. 0.5)";
          cell.style = "background-color: #f2f2f2;"
          cell.className = "numberInputColumn";
          break;
        case 8:
            cell.className = "ceColumn";
            break;
        case 9:
          // Display a placeholder for the total column
          cell.innerHTML = '<span class="totalCell"></span>';
          cell.style = "background-color: #f2f2f2;"
          cell.className = "totalColumn";
          break;
        case 10:
          cell.innerHTML = '<button id="deleteBtn" onclick="deleteRow(this)">Delete</button>';
          break;
        default:
          // Display placeholders for other columns
          cell.innerHTML = '';
      }
      
  }
  updateTables();
}
  
  function deleteRow(btn) {
    // Find the row containing this button and delete it
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateTables(); // Recalculate totals after deletion
}
/* // don't need for now
  function removeLastRow() {
    var inputTable = document.getElementById("inputTable");
    
    // Check if there are user-created rows to remove
    if (inputTable.rows.length > 0) {
      inputTable.deleteRow(inputTable.rows.length - 1);
    }
  }
*/
  function clearRows() {
    var inputTable = document.getElementById("inputTable");

    // Remove all user-created rows
    while (inputTable.rows.length > 0) {
      inputTable.deleteRow(0);
    }
  }

  function calculateRowTotal() {
    var table = document.getElementById("inputTable");

    for (var i = 0; i < table.rows.length; i++) {
      var row = table.rows[i];
      var inputCell1 = parseFloat(row.getElementsByClassName("analysisInputCell")[0].value) || 0;
      var inputCell2 = parseFloat(row.getElementsByClassName("designInputCell")[0].value) || 0;
      var inputCell3 = parseFloat(row.getElementsByClassName("codeInputCell")[0].value) || 0;
      var inputCell4 = parseFloat(row.getElementsByClassName("testInputCell")[0].value) || 0;
      var total = 0;

      // Summing up values from different columns
      total = inputCell1 + inputCell2 + inputCell3 + inputCell4;

      // Displaying the total in the respective cell of the current row
    var totalCell = row.getElementsByClassName("totalCell")[0];
    totalCell.innerHTML = total.toFixed(2);
    }
  }

  function calculateColumnTotal() {
    var inputTable = document.getElementById("inputTable");
    var analysisCol = inputTable.getElementsByClassName("analysisInputCell");
    var designCol = inputTable.getElementsByClassName("designInputCell");
    var codeCol = inputTable.getElementsByClassName("codeInputCell");
    var testCol = inputTable.getElementsByClassName("testInputCell");
    
    var analysisTotal = 0, designTotal = 0, codeTotal = 0, testTotal = 0;

    // Summing up values from all rows in the current column for Engineering and Release phases
    for (var i = 0; i < analysisCol.length; i++) {
        analysisTotal += parseFloat(analysisCol[i].value) || 0;
    }
    for (var i = 0; i < designCol.length; i++) {
        designTotal += parseFloat(designCol[i].value) || 0;
    }
    for (var i = 0; i < codeCol.length; i++) {
        codeTotal += parseFloat(codeCol[i].value) || 0;
    }
    for (var i = 0; i < testCol.length; i++) {
        testTotal += parseFloat(testCol[i].value) || 0;
    }

    // Displaying the total in the last row of the current column
    document.getElementById("analysisTotalCell").innerHTML = analysisTotal.toFixed(2);
    document.getElementById("designTotalCell").innerHTML = designTotal.toFixed(2);
    document.getElementById("codeTotalCell").innerHTML = codeTotal.toFixed(2);
    document.getElementById("testTotalCell").innerHTML = testTotal.toFixed(2);
}

function updateTotalsRow(){
    var ccTotal = parseFloat(document.getElementById("ccInputCell").value) || 0;
    var planningTotal = parseFloat(document.getElementById("planningInputCell").value) || 0;
    var riskAnalysisTotal = parseFloat(document.getElementById("riskAnalysisInputCell").value) || 0;

    var analysisTotal = parseFloat(document.getElementById("analysisTotalCell").innerHTML) || 0;
    var designTotal = parseFloat(document.getElementById("designTotalCell").innerHTML) || 0;
    var codeTotal = parseFloat(document.getElementById("codeTotalCell").innerHTML) || 0;
    var testTotal = parseFloat(document.getElementById("testTotalCell").innerHTML) || 0;

    var total = ccTotal + planningTotal + riskAnalysisTotal + analysisTotal + designTotal + codeTotal + testTotal;
    
    document.getElementById("totalsTotalCell").innerHTML = total.toFixed(2);
    calculateCost();
    calculatePercentEffort();
}


function calculatePercentEffort() {
  // Retrieve the total value of all activities
  var totalValue = parseFloat(document.getElementById("totalsTotalCell").innerHTML) || 0;

  // Calculate and display percent effort for CC, Planning, Risk Analysis
  var ccTotal = parseFloat(document.getElementById("ccInputCell").value) || 0;
  displayPercentEffort("ccPercentCell", ccTotal, totalValue);

  var planningTotal = parseFloat(document.getElementById("planningInputCell").value) || 0;
  displayPercentEffort("planningPercentCell", planningTotal, totalValue);

  var riskAnalysisTotal = parseFloat(document.getElementById("riskAnalysisInputCell").value) || 0;
  displayPercentEffort("riskAnalysisPercentCell", riskAnalysisTotal, totalValue);

  // Calculate and display percent effort for Engineering and Release phases
  var analysisTotal = parseFloat(document.getElementById("analysisTotalCell").innerHTML) || 0;
  displayPercentEffort("analysisPercentCell", analysisTotal, totalValue);

  var designTotal = parseFloat(document.getElementById("designTotalCell").innerHTML) || 0;
  displayPercentEffort("designPercentCell", designTotal, totalValue);

  var codeTotal = parseFloat(document.getElementById("codeTotalCell").innerHTML) || 0;
  displayPercentEffort("codePercentCell", codeTotal, totalValue);

  var testTotal = parseFloat(document.getElementById("testTotalCell").innerHTML) || 0;
  displayPercentEffort("testPercentCell", testTotal, totalValue);
}


function displayPercentEffort(cellId, value, total) {
  var percent = (value / total * 100) || 0;
  document.getElementById(cellId).innerHTML = percent.toFixed(2) + "%";
}


function calculateCost() {
  var costRate = parseFloat(document.getElementById("costInputCell").value) || 0;

  var ccTotal = calculateAndDisplayCost('ccInputCell', 'ccCostCell', costRate);
  var planningTotal = calculateAndDisplayCost('planningInputCell', 'planningCostCell', costRate);
  var riskAnalysisTotal = calculateAndDisplayCost('riskAnalysisInputCell', 'riskAnalysisCostCell', costRate);
  var analysisTotal = calculateAndDisplayCost('analysisTotalCell', 'analysisCostCell', costRate);
  var designTotal = calculateAndDisplayCost('designTotalCell', 'designCostCell', costRate);
  var codeTotal = calculateAndDisplayCost('codeTotalCell', 'codeCostCell', costRate);
  var testTotal = calculateAndDisplayCost('testTotalCell', 'testCostCell', costRate);

  var totalCost = ccTotal + planningTotal + riskAnalysisTotal + analysisTotal + designTotal + codeTotal + testTotal;
  document.getElementById("totalCostCell").innerHTML = "$" + totalCost.toFixed(2);
}


function calculateAndDisplayCost(inputCellId, outputCellId, costRate) {
  // Get the value from the input cell, calculate the cost, and display it
  var value = parseFloat(document.getElementById(inputCellId).innerHTML) || parseFloat(document.getElementById(inputCellId).value) || 0;
  var cost = value * costRate;
  document.getElementById(outputCellId).innerHTML = "$" + cost.toFixed(2);
  return cost; // Return the cost for summing in calculateCost
}

function updateTables() {
  // labor rate limits
  var laborRateInput = document.getElementById('costInputCell');
  if (laborRateInput.value > 100000) {
    laborRateInput.value = 100000; 
  }

  
    // negative prevention
    var inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(function (input) {
      if (parseFloat(input.value) < 0) {
        input.value = '0'; // Reset negative values to 0
      }
    });

    calculateRowTotal();
    calculateColumnTotal();
    updateTotalsRow();
    calculatePercentEffort();

  }

  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("costInputCell").value = "";
    addRow();
    updateTables();
  });

