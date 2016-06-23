/* clock code https://www.sitepoint.com/create-jquery-digital-clock-jquery4u/ */
function updateClock ( )
{
	var currentTime = new Date ( );
	var currentHours = currentTime.getHours ( );
	var currentMinutes = currentTime.getMinutes ( );
	var currentSeconds = currentTime.getSeconds ( );

	// Pad the minutes and seconds with leading zeros, if required
	currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
	currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;

	// Compose the string for display
	var currentTimeString = currentTime.toDateString() + ", " + currentHours + ":" + currentMinutes + ":" + currentSeconds;

	$("#clock").html(currentTimeString);
 }

$(document).ready(function()
{
   setInterval('updateClock()', 1000);
});