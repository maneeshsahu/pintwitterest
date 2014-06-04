$(document).ready(function() {
	$("#target").submit(function( event ) {
       event.preventDefault();

       window.location = '/favorites/' + $('#twitterid').val() ;
    });
});