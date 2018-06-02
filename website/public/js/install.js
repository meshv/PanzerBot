$(document).ready(function onDocumentReady(){

    $("#tokenInput").on('keyup', function onTokenKeypress(){
        console.log($("#tokenInput").val().length);
        if($("#tokenInput").val().length > 5){
            $("#continueBtn").prop( "disabled", false );
        }
        else{
            $("#continueBtn").prop( "disabled", true );
        }
    });

});