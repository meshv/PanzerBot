$(document).ready(function onDocumentReady() {

  $(document).on('keyup', function onTokenKeypress() {
    if ($("#tokenInput").val().length > 5 && $("#userInput").val().length > 3 && $("#passInput").val().length > 3) {
      $("#continueBtn").prop("disabled", false);
    } else {
      $("#continueBtn").prop("disabled", true);
    }
  });

  $("#submitInstall").on('click', function submitInstallForm() {
    $("#installForm").submit();
  });

});