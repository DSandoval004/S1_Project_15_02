"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Case Problem 2

   Author: 
   Date:   
   
   Filename: dl_expenses.js
   
   Function List
   =============
   
   validateSummary()
      Validates the data entry in the summary field.
   
   calcClass(sumClass)
      Sums up all of the data values for elements of the sumClass class.
      
   calcExp()
      Calculates the travel expenses from all categories and dates.
      
   formatNumber(val, decimals)
      Formats the value, "val" to the number of decimals indicated 
      by "decimals", adding thousands separators.
      
   formatUSCurrency(val)
      Formats the value, "val", as U.S. currency.
      
*/
// DDOES:
window.addEventListener('load', function () {
      // DVARO:
      var changingCells = document.querySelectorAll('table#travelExp input.sum');
      // DLOOP:
      for (var i = 0; i < changingCells.length; i++) {
            changingCells[i].addEventListener('change', calcExp);
      }
      // DDOES:
      document.getElementById('submitButton').addEventListener('click', validateSummary);
});
// DFUNC:
function validateSummary() {
      // DVARO:
      var summary = document.getElementById('summary');
      // DIFDO:
      if (summary.validity.valueMissing) {
            summary.setCustomValidity("You must include a summary of the trip in your report.");
      } else {
            summary.setCustomValidity("");
      }
};
// DFUNC:
function calcClass(sumClass) {
      // DVARL:
      var sumFields = document.getElementsByClassName(sumClass),
            sumTotal = 0;
      // DLOOP:
      for (var i = 0; i < sumFields.length; i++) {
            var itemValue = parseFloat(sumFields[i].value)
            if (isNaN(itemValue) == false) {
                  sumTotal = sumTotal + itemValue
            }
      }
      return sumTotal;
};
// DFUNC:
function calcExp() {
      var expTable = document.querySelectorAll('table#travelExp tbody tr');
      // DLOOP:
      for (var i = 0; i < expTable.length; i++) {
            document.getElementById(`subtotal${i}`).value = formatNumber(calcClass(`date${i}`), 2);
      }
      // DDOES:
      document.getElementById('transTotal').value = formatNumber(calcClass('trans'), 2);
      document.getElementById('lodgeTotal').value = formatNumber(calcClass('lodge'), 2);
      document.getElementById('mealTotal').value = formatNumber(calcClass('meal'), 2);
      document.getElementById('otherTotal').value = formatNumber(calcClass('other'), 2);
      document.getElementById('expTotal').value = formatUSCurrency(calcClass('sum'), 2);
}




function formatNumber(val, decimals) {
      return val.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
      });
}

function formatUSCurrency(val) {
      return val.toLocaleString('en-US', {
            style: "currency",
            currency: "USD"
      });
}