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
          cell.innerHTML = '<input type="number" step="0.01" class="ccInputCell" placeholder="i.e. 0.5" oninput="updateTables(this)">';
          cell.title = "Enter a value for CC (e.g. 0.5)";
          cell.style = "background-color: #f2f2f2;"
          cell.className = "numberInputColumn";
          break;
        case 2:
          cell.innerHTML = '<input type="number" step="0.01" class="planningInputCell" placeholder="i.e. 0.5" oninput="updateTables(this)">';
          cell.title = "Enter a value for planning (e.g. 0.5)";
          cell.style = "background-color: #f2f2f2;"
          cell.className = "numberInputColumn";
          break;
        case 3:
          cell.innerHTML = '<input type="number" step="0.01" class="riskAnalysisInputCell" placeholder="i.e. 0.5" oninput="updateTables(this)">';
          cell.title = "Enter a value for Risk Analysis (e.g. 0.5)";
          cell.style = "background-color: #f2f2f2;"
          cell.className = "numberInputColumn";
          break;
        case 4:
          // Display inputs for Analysis columns
          cell.innerHTML = '<input type="number" step="0.01" class="analysisInputCell" placeholder="i.e. 0.5" oninput="updateTables(this)">';
          cell.title = "Enter a value for Analysis (e.g. 0.5)";
          cell.style = "background-color: #f2f2f2;"
          cell.className = "numberInputColumn";
          break;
        case 5:
          // Display inputs for Design columns
          cell.innerHTML = '<input type="number" step="0.01" class="designInputCell" placeholder="i.e. 0.5" oninput="updateTables(this)">';
          cell.title = "Enter a value for Design (e.g. 0.5)";
          cell.style = "background-color: #f2f2f2;"
          cell.className = "numberInputColumn";
          break;
        case 6:
          // Display inputs Code columns
          cell.innerHTML = '<input type="number" step="0.01" class="codeInputCell" placeholder="i.e. 0.5" oninput="updateTables(this)">';
          cell.title = "Enter a value for Code (e.g. 0.5)";
          cell.style = "background-color: #f2f2f2;"
          cell.className = "numberInputColumn";
          break;
        case 7:
          // Display inputs for Test columns
          cell.innerHTML = '<input type="number" step="0.01" class="testInputCell" placeholder="i.e. 0.5" oninput="updateTables(this)">';
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
      var inputCell1 = parseFloat(row.getElementsByClassName("ccInputCell")[0].value) || 0;
      var inputCell2 = parseFloat(row.getElementsByClassName("planningInputCell")[0].value) || 0;
      var inputCell3 = parseFloat(row.getElementsByClassName("riskAnalysisInputCell")[0].value) || 0;
      var inputCell4 = parseFloat(row.getElementsByClassName("analysisInputCell")[0].value) || 0;
      var inputCell5 = parseFloat(row.getElementsByClassName("designInputCell")[0].value) || 0;
      var inputCell6 = parseFloat(row.getElementsByClassName("codeInputCell")[0].value) || 0;
      var inputCell7 = parseFloat(row.getElementsByClassName("testInputCell")[0].value) || 0;
      var total = 0;

      // Summing up values from different columns
      total = inputCell1 + inputCell2 + inputCell3 + inputCell4 + inputCell5 + inputCell6 + inputCell7;

      // Displaying the total in the respective cell of the current row
    var totalCell = row.getElementsByClassName("totalCell")[0];
    totalCell.innerHTML = total.toFixed(2);
    }
  }

  function calculateColumnTotal() {
    var inputTable = document.getElementById("inputTable");
    var ccCol = inputTable.getElementsByClassName("ccInputCell");
    var planningCol = inputTable.getElementsByClassName("planningInputCell");
    var riskAnalysisCol = inputTable.getElementsByClassName("riskAnalysisInputCell");
    var analysisCol = inputTable.getElementsByClassName("analysisInputCell");
    var designCol = inputTable.getElementsByClassName("designInputCell");
    var codeCol = inputTable.getElementsByClassName("codeInputCell");
    var testCol = inputTable.getElementsByClassName("testInputCell");
    
    var ccTotal = 0, planningTotal = 0, riskAnalysisTotal = 0, analysisTotal = 0, designTotal = 0, codeTotal = 0, testTotal = 0;

    // Summing up values from all rows in the current column
    for (var i = 0; i < ccCol.length; i++) {
      ccTotal += parseFloat(ccCol[i].value) || 0;
    }

    for (var i = 0; i < planningCol.length; i++) {
      planningTotal += parseFloat(planningCol[i].value) || 0;
    }

    for (var i = 0; i < riskAnalysisCol.length; i++) {
      riskAnalysisTotal += parseFloat(riskAnalysisCol[i].value) || 0;
    }

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
    var ccCell = document.getElementById("ccTotalCell");
    ccCell.innerHTML = ccTotal.toFixed(2);

    var planningCell = document.getElementById("planningTotalCell");
    planningCell.innerHTML = planningTotal.toFixed(2);

    var riskAnalysisCell = document.getElementById("riskAnalysisTotalCell");
    riskAnalysisCell.innerHTML = riskAnalysisTotal.toFixed(2);

    var analysisCell = document.getElementById("analysisTotalCell");
    analysisCell.innerHTML = analysisTotal.toFixed(2);

    var designCell = document.getElementById("designTotalCell");
    designCell.innerHTML = designTotal.toFixed(2);

    var codeCell = document.getElementById("codeTotalCell");
    codeCell.innerHTML = codeTotal.toFixed(2);

    var testCell = document.getElementById("testTotalCell");
    testCell.innerHTML = testTotal.toFixed(2);
  }

  function updateTotalsRow(){
    // Use the totals from the calculateColumnTotal function
    var ccTotal = parseFloat(document.getElementById("ccTotalCell").innerHTML) || 0;
    var planningTotal = parseFloat(document.getElementById("planningTotalCell").innerHTML) || 0;
    var riskAnalysisTotal = parseFloat(document.getElementById("riskAnalysisTotalCell").innerHTML) || 0;
    var analysisTotal = parseFloat(document.getElementById("analysisTotalCell").innerHTML) || 0;
    var designTotal = parseFloat(document.getElementById("designTotalCell").innerHTML) || 0;
    var codeTotal = parseFloat(document.getElementById("codeTotalCell").innerHTML) || 0;
    var testTotal = parseFloat(document.getElementById("testTotalCell").innerHTML) || 0;

    // Summing up values from all columns
    var total = ccTotal + planningTotal + riskAnalysisTotal + analysisTotal + designTotal + codeTotal + testTotal;
    
    // Displaying the total in the last cell of the current row
    var totalCell = document.getElementById("totalsTotalCell");
    totalCell.innerHTML = total.toFixed(2);
    calculateCost(); // auto calc
}


function calculatePercentEffort() {
  // Retrieve totals from total cells
  var ccTotal = parseFloat(document.getElementById("ccTotalCell").innerHTML) || 0;
  var planningTotal = parseFloat(document.getElementById("planningTotalCell").innerHTML) || 0;
  var riskAnalysisTotal = parseFloat(document.getElementById("riskAnalysisTotalCell").innerHTML) || 0;
  var analysisTotal = parseFloat(document.getElementById("analysisTotalCell").innerHTML) || 0;
  var designTotal = parseFloat(document.getElementById("designTotalCell").innerHTML) || 0;
  var codeTotal = parseFloat(document.getElementById("codeTotalCell").innerHTML) || 0;
  var testTotal = parseFloat(document.getElementById("testTotalCell").innerHTML) || 0;
  var totalValue = ccTotal + planningTotal + riskAnalysisTotal + analysisTotal + designTotal + codeTotal + testTotal;

  // Calculate and display percent effort for each column
  displayPercentEffort("ccPercentCell", ccTotal, totalValue);
  displayPercentEffort("planningPercentCell", planningTotal, totalValue);
  displayPercentEffort("riskAnalysisPercentCell", riskAnalysisTotal, totalValue);
  displayPercentEffort("analysisPercentCell", analysisTotal, totalValue);
  displayPercentEffort("designPercentCell", designTotal, totalValue);
  displayPercentEffort("codePercentCell", codeTotal, totalValue);
  displayPercentEffort("testPercentCell", testTotal, totalValue);
}

function displayPercentEffort(cellId, value, total) {
  var percent = (value / total * 100) || 0;
  document.getElementById(cellId).innerHTML = percent.toFixed(2) + "%";
}


function calculateCost() {
  // Retrieve total values from total cells
  var ccTotal = parseFloat(document.getElementById("ccTotalCell").innerHTML) || 0;
  var planningTotal = parseFloat(document.getElementById("planningTotalCell").innerHTML) || 0;
  var riskAnalysisTotal = parseFloat(document.getElementById("riskAnalysisTotalCell").innerHTML) || 0;
  var analysisTotal = parseFloat(document.getElementById("analysisTotalCell").innerHTML) || 0;
  var designTotal = parseFloat(document.getElementById("designTotalCell").innerHTML) || 0;
  var codeTotal = parseFloat(document.getElementById("codeTotalCell").innerHTML) || 0;
  var testTotal = parseFloat(document.getElementById("testTotalCell").innerHTML) || 0;

  // Retrieve the cost rate
  var cost = parseFloat(document.getElementById("costInputCell").value) || 0;

  // Calculate and display cost for each column
  displayCost("ccCostCell", ccTotal, cost);
  displayCost("planningCostCell", planningTotal, cost);
  displayCost("riskAnalysisCostCell", riskAnalysisTotal, cost);
  displayCost("analysisCostCell", analysisTotal, cost);
  displayCost("designCostCell", designTotal, cost);
  displayCost("codeCostCell", codeTotal, cost);
  displayCost("testCostCell", testTotal, cost);

  // Calculate and display total cost
  var totalCost = (ccTotal + planningTotal + riskAnalysisTotal + analysisTotal + designTotal + codeTotal + testTotal) * cost;
  document.getElementById("totalCostCell").innerHTML = "$" + totalCost.toFixed(2);
}

function displayCost(cellId, value, costRate) {
  var cost = value * costRate;
  document.getElementById(cellId).innerHTML = "$" + cost.toFixed(2);
}

  function updateTables(){
    calculateRowTotal();
    calculateColumnTotal();
    updateTotalsRow();
    calculatePercentEffort();
  }

  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("costInputCell").value = "";

    addRow();
  });

