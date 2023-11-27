function addRow() {
    var inputTable = document.getElementById("inputTable");
    var newRow = inputTable.insertRow(inputTable.rows.length);
    newRow.className = "userCreatedRow";

    // Adding cells to the new row
    for (var i = 0; i < 10; i++) {
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
        default:
          // Display placeholders for other columns
          cell.innerHTML = '';
      }
      
    }
  }

  function removeLastRow() {
    var inputTable = document.getElementById("inputTable");
    
    // Check if there are user-created rows to remove
    if (inputTable.rows.length > 0) {
      inputTable.deleteRow(inputTable.rows.length - 1);
    }
  }

  function clearRows() {
    var inputTable = document.getElementById("inputTable");

    // Remove all user-created rows
    while (inputTable.rows.length > 0) {
      inputTable.deleteRow(0);
    }
  }

  function calculateRowTotal() {
    var table = document.getElementById("inputTable");

    for(var i = 0; i < table.rows.length; i++){
    var row = table.rows[i];
    var inputCell1 = parseFloat(row.getElementsByClassName("analysisInputCell")[0].value) || 0;
    var inputCell2 = parseFloat(row.getElementsByClassName("designInputCell")[0].value) || 0;
    var inputCell3 = parseFloat(row.getElementsByClassName("codeInputCell")[0].value) || 0;
    var inputCell4 = parseFloat(row.getElementsByClassName("testInputCell")[0].value) || 0;
    var total = 0;

    // Summing up values from Analysis, Design, Code, and Test columns
    total = inputCell1 + inputCell2 + inputCell3 + inputCell4;

    // Displaying the total in the last cell of the current row
    var totalCell = row.getElementsByClassName("totalCell")[0];
    totalCell.innerHTML = total.toFixed(2);
    }

  }

  function calculateColumnTotal(){
    var inputTable = document.getElementById("inputTable");
    var analysisCol = inputTable.getElementsByClassName("analysisInputCell");
    var designCol = inputTable.getElementsByClassName("designInputCell");
    var codeCol = inputTable.getElementsByClassName("codeInputCell");
    var testCol = inputTable.getElementsByClassName("testInputCell");
    var analysisTotal = 0;
    var designTotal = 0;
    var codeTotal = 0;
    var testTotal = 0;
    

    // Summing up values from all rows in the current column
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
    
    var ccCell = parseFloat(document.getElementById("ccInputCell").value) || 0;
    var planningCell = parseFloat(document.getElementById("planningInputCell").value) || 0;
    var riskAnalysisCell = parseFloat(document.getElementById("riskAnalysisInputCell").value) || 0;
    var analysisCell = parseFloat(document.getElementById("analysisTotalCell").innerHTML) || 0;
    var designCell = parseFloat(document.getElementById("designTotalCell").innerHTML) || 0;
    var codeCell = parseFloat(document.getElementById("codeTotalCell").innerHTML) || 0;
    var testCell = parseFloat(document.getElementById("testTotalCell").innerHTML) || 0;
    var total = 0;

    // Summing up values from all columns
    total = ccCell + planningCell + riskAnalysisCell + analysisCell + designCell + codeCell + testCell;
    

    // Displaying the total in the last cell of the current row
    var totalCell = document.getElementById("totalsTotalCell");
    totalCell.innerHTML = total.toFixed(2);
    calculateCost(); // auto calc
  }

  function calculatePercentEffort(){
    var ccValue = parseFloat(document.getElementById("ccInputCell").value) || 0;
    var planningValue = parseFloat(document.getElementById("planningInputCell").value) || 0;
    var riskAnalysisValue = parseFloat(document.getElementById("riskAnalysisInputCell").value) || 0;
    var analysisValue = parseFloat(document.getElementById("analysisTotalCell").innerHTML) || 0;
    var designValue = parseFloat(document.getElementById("designTotalCell").innerHTML) || 0; 
    var codeValue = parseFloat(document.getElementById("codeTotalCell").innerHTML) || 0;
    var testValue = parseFloat(document.getElementById("testTotalCell").innerHTML) || 0;
    var totalValue = parseFloat(document.getElementById("totalsTotalCell").innerHTML) || 0;
    var ccPercent = 0;
    var planningPercent = 0;
    var riskAnalysisPercent = 0;
    var analysisPercent = 0;
    var designPercent = 0;
    var codePercent = 0;
    var testPercent = 0;

    // Calculate percent effort for each column
    ccPercent = ccValue / totalValue * 100;
    planningPercent = planningValue / totalValue * 100;
    riskAnalysisPercent = riskAnalysisValue / totalValue * 100;
    analysisPercent = analysisValue / totalValue * 100;
    designPercent = designValue / totalValue * 100;
    codePercent = codeValue / totalValue * 100;
    testPercent = testValue / totalValue * 100;


    // Display percent effort for each column
    var ccPercentCell = document.getElementById("ccPercentCell");
    ccPercentCell.innerHTML = ccPercent.toFixed(2) + "%";

    var planningPercentCell = document.getElementById("planningPercentCell");
    planningPercentCell.innerHTML = planningPercent.toFixed(2) + "%";

    var riskAnalysisPercentCell = document.getElementById("riskAnalysisPercentCell");
    riskAnalysisPercentCell.innerHTML = riskAnalysisPercent.toFixed(2) + "%";

    var analysisPercentCell = document.getElementById("analysisPercentCell");
    analysisPercentCell.innerHTML = analysisPercent.toFixed(2) + "%";
    
    var designPercentCell = document.getElementById("designPercentCell"); 
    designPercentCell.innerHTML = designPercent.toFixed(2) + "%";

    var codePercentCell = document.getElementById("codePercentCell");
    codePercentCell.innerHTML = codePercent.toFixed(2) + "%";

    var testPercentCell = document.getElementById("testPercentCell");
    testPercentCell.innerHTML = testPercent.toFixed(2) + "%";
  }

  function calculateCost(){
    var ccValue = parseFloat(document.getElementById("ccInputCell").value) || 0;
    var planningValue = parseFloat(document.getElementById("planningInputCell").value) || 0;
    var riskAnalysisValue = parseFloat(document.getElementById("riskAnalysisInputCell").value) || 0;
    var analysisValue = parseFloat(document.getElementById("analysisTotalCell").innerHTML) || 0;
    var designValue = parseFloat(document.getElementById("designTotalCell").innerHTML) || 0; 
    var codeValue = parseFloat(document.getElementById("codeTotalCell").innerHTML) || 0;
    var testValue = parseFloat(document.getElementById("testTotalCell").innerHTML) || 0;
    var totalValue = parseFloat(document.getElementById("totalsTotalCell").innerHTML) || 0;

    var cost = parseFloat(document.getElementById("costInputCell").value) || 0;


    // Calculate cost for each column
    var ccCost = ccValue * cost;
    var planningCost = planningValue * cost;
    var riskAnalysisCost = riskAnalysisValue * cost;
    var analysisCost = analysisValue * cost;
    var designCost = designValue * cost;
    var codeCost = codeValue * cost;
    var testCost = testValue * cost;
    var totalCost = totalValue * cost;

    // Display cost for each column
    var ccCostCell = document.getElementById("ccCostCell");
    ccCostCell.innerHTML = ccCost.toFixed(2);

    var planningCostCell = document.getElementById("planningCostCell");
    planningCostCell.innerHTML = "$" + planningCost.toFixed(2);

    var riskAnalysisCostCell = document.getElementById("riskAnalysisCostCell");
    riskAnalysisCostCell.innerHTML = "$" + riskAnalysisCost.toFixed(2);

    var analysisCostCell = document.getElementById("analysisCostCell");
    analysisCostCell.innerHTML = "$" + analysisCost.toFixed(2);

    var designCostCell = document.getElementById("designCostCell");
    designCostCell.innerHTML = "$" + designCost.toFixed(2);

    var codeCostCell = document.getElementById("codeCostCell");
    codeCostCell.innerHTML = "$" + codeCost.toFixed(2);

    var testCostCell = document.getElementById("testCostCell");
    testCostCell.innerHTML = "$" + testCost.toFixed(2);

    var totalCostCell = document.getElementById("totalCostCell");
    totalCostCell.innerHTML = "$" + totalCost.toFixed(2);

      
  }

  function updateTables(){
    calculateRowTotal();
    calculateColumnTotal();
    updateTotalsRow();
    calculatePercentEffort();
  }

  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("ccInputCell").value = "";
    document.getElementById("planningInputCell").value = "";
    document.getElementById("riskAnalysisInputCell").value = "";
    document.getElementById("costInputCell").value = "";
  });

