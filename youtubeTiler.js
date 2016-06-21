$(function() {
	$(window).resize(function(){
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();
		
		var areaHeight = Math.min(windowWidth * (1080/1920),windowHeight);
		
		$("#main").height(areaHeight);
	});

	$("#addButton").click(function () {
		var directValue = $("#urlBox").val();
		var youtubeId = YouTubeGetID(directValue);
		if(youtubeId.length == 0)
		{
			return;
		}
		var codeString = '';
		codeString = codeString.concat('<div class="youtubePane" style="width:800px;height:450px;left:200px;top:200px;"><div class="hoverDiv context-menu-one btn btn-neutral"><button type="button" class="closeButton">X</button></div><div class="mask"></div><iframe style="width:100%; height:100%;" src="https://www.youtube.com/embed/');
		codeString = codeString.concat(youtubeId);
		codeString = codeString.concat('" frameborder="0"></iframe></div>');
		$("#main").append(codeString);
	});

	<!-- dynamically generated elemnts work now http://stackoverflow.com/questions/6658752/click-event-doesnt-work-on-dynamically-generated-elements -->
	$( "#addButton" ).on("click", function() {
		$( "div.youtubePane" )
		<!-- mousedown and up code from http://jsfiddle.net/JLTVS/2/ -->
		.mousedown(function() {
			$('div.mask').show();
		})
		.mouseup(function() {
			$('div.mask').hide();
		}).draggable({containment: "parent"}).resizable({containment: "parent"});

		$( "button.closeButton" )
		.mousedown(function() {
			this.parentNode.parentNode.remove();
		});
		
        $.contextMenu({
            selector: '.context-menu-one', 
            callback: function(key, options) {
                if(key == "bl")
				{
					this.parent().css({'width': '50%', 'height': '50%', 'top': 'auto', 'right': 'auto', 'bottom': '0px', 'left': '0px'});
				}
                if(key == "br")
				{
					this.parent().css({'width': '50%', 'height': '50%', 'top': 'auto', 'right': '0px', 'bottom': '0px', 'left': 'auto'});
				}
                if(key == "tl")
				{
					this.parent().css({'width': '50%', 'height': '50%', 'top': '0px', 'right': 'auto', 'bottom': 'auto', 'left': '0px'});
				}
                if(key == "tr")
				{
					this.parent().css({'width': '50%', 'height': '50%', 'top': '0px', 'right': '0px', 'bottom': 'auto', 'left': 'auto'});
				}
                if(key == "fs")
				{
					this.parent().css({'width': '100%', 'height': '100%', 'top': 'auto', 'right': 'auto', 'bottom': '0px', 'left': '0px'});
				}
            },
            items: {
                "bl": {name: "Bottom Left"},
                "br": {name: "Bottom Right"},
                "tl": {name: "Top Left"},
                "tr": {name: "Top Right"},
                "sep1": "---------",
                "fs": {name: "Full Screen"}
            }
        });
	});
});

<!-- clock code https://www.sitepoint.com/create-jquery-digital-clock-jquery4u/ -->
function updateClock ( )
{
	var currentTime = new Date ( );
	var currentHours = currentTime.getHours ( );
	var currentMinutes = currentTime.getMinutes ( );
	var currentSeconds = currentTime.getSeconds ( );

	// Pad the minutes and seconds with leading zeros, if required
	currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
	currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;

	// Choose either "AM" or "PM" as appropriate
	var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";

	// Convert the hours component to 12-hour format if needed
	currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;

	// Convert an hours component of "0" to "12"
	currentHours = ( currentHours == 0 ) ? 12 : currentHours;

	// Compose the string for display
	var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;

	$("#clock").html(currentTimeString);
 }

$(document).ready(function()
{
   setInterval('updateClock()', 1000);
});