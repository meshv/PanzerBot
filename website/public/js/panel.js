$(document).ready(function loadDocument() {
  setTimer();
  setDate();
});

function setTimer() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = sanitizeTime(m);
  s = sanitizeTime(s);
  document.getElementById('timer').innerHTML = h + ":" + m + ":" + s;
  var t = setTimeout(setTimer, 500);
}

function sanitizeTime(i) {
  if (i < 10) {
    i = "0" + i
  }; // add zero in front of numbers < 10
  return i;
}

function setDate() {
  var days = ['SUN', 'MON', 'TUES', 'WED', 'THUR', 'FRI', 'SAT'];
  var day = new Date().getDay();
  var dayName = days[day];
  var monthsArray = ['JAN', 'FEB', 'MAR', 'APRL', 'MAY', 'JUN', 'JULY', 'AUG', 'OCT', 'NOV', 'DEC'];
  var month = new Date().getMonth();
  var monthName = monthsArray[month];
  var monthDate = new Date().getDate();
  document.getElementById('date').innerHTML = dayName + ', ' + monthName + ' ' + monthDate;
}