$(document).ready(function loadDocument() {
  setTimer();
  setDate();

  $("#claim-form").hide();

  $("#login-tab").on('click', function loginClick() {
    $("#login-form").show();
    $("#claim-form").hide();
    $(this).addClass('active');
    $("#claim-tab").removeClass('active');
  });

  $("#claim-tab").on('click', function loginClick() {
    $("#claim-form").show();
    $("#login-form").hide();
    $(this).addClass('active');
    $("#login-tab").removeClass('active');
  });

  $("#claim-form").on('keyup', function claimKeyUp() {
    if ($("#acctUser").val().length > 3 && $("#acctPass").val().length > 3 && $("#acctKey").val().length > 3) {
      $("#claim").prop("disabled", false);
    } else {
      $("#claim").prop("disabled", true);
    }
  });

  $("#login-form").on('keyup', function loginKeyUp() {
    if ($("#userInput").val().length > 3 && $("#passInput").val().length > 3) {
      $("#login").prop("disabled", false);
    } else {
      $("#login").prop("disabled", true);
    }
  });

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
    i = "0" + i;
  } // add zero in front of numbers < 10
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