$(function() {
	/* when window is resized also resize the main according to the aspect ratio of a 16:9 video */
	$(window).resize(function(){
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();
		
		var areaHeight = Math.min(windowWidth * (9/16),windowHeight);
		
		$("#main").height(areaHeight);
	});

	/* add pause code */
	$("#pauseButton").click(function() {
		$("iframe").each(function (){
			var video = $(this).attr("src");

			$(this).attr("src","");
			$(this).attr("src",video);
		});
	});
	
	/* move pause button on start of document */
	$("#pauseButton").css({"left": parseInt($("#addButton").css("left"),10) + $("#addButton").width() + 5});

	/* add video code */
	$("#addButton").click(function () {
		var directValue = $("#urlBox").val().split(";");

		for(dIdx in directValue)
		{
			var youtubeId = YouTubeGetID(directValue[dIdx]);
			if(youtubeId.length == 0 || directValue[dIdx].length == 0)
			{
				return;
			}
			var codeString = '';
			codeString = codeString.concat('<div class="youtubePane" style="width:800px;height:450px;left:200px;top:200px;"><div class="hoverDiv context-menu-one btn btn-neutral"><button type="button" class="closeButton">X</button></div><div class="mask"></div><iframe style="width:100%; height:100%;" src="https://www.youtube.com/embed/');
			codeString = codeString.concat(youtubeId);
			codeString = codeString.concat('" frameborder="0"></iframe></div>');
			$("#main").append(codeString);
		}
	});

	/* run this code AFTER every button press */
	$( "#addButton" ).on("click", function() {
		$( "div.youtubePane" )
		/* mousedown and up code from http://jsfiddle.net/JLTVS/2/ */
		.mousedown(function() {
			$(this).find("div.mask").show();
		})
		.mouseup(function() {
			$(this).find("div.mask").hide();
		})
		.draggable({containment: "parent"})
		.resizable({containment: "parent"});

		/* close button code */
		$( "button.closeButton" )
		.click(function() {
			this.parentNode.parentNode.remove();
		});

		/* context menu for moving videos around the screen */
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