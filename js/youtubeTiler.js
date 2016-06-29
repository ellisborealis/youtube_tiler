$(function() {
	/* when window is resized also resize the main according to the aspect ratio of a 16:9 video */
	$(window).resize(function(){
		resizeArea();
	});
	/* also do this at first as well */
	resizeArea();

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
	$( "#addButton" ).on("click", function(){
		updateAllVideos();
	});

	updateAllVideos();
});

function resizeArea()
{
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	
	var areaHeight = Math.min(Math.max(windowWidth * (9/16), windowHeight - parseInt($("#header").css("height"),10)), windowHeight);
	
	$("#main").height(areaHeight);
}

function updateAllVideos()
{
	$( "div.youtubePane" )
	/* mousedown and up code from http://jsfiddle.net/JLTVS/2/ */
	.mousedown(function() {
		$("div.mask").show();
		$("div.youtubePane").css({"z-index":1});
		$(this).css({"z-index":2});
	})
	.mouseup(function() {
		$("div.mask").hide();
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
			if(key == "bl") { this.parent().css({'width':  '50%', 'height':  '50%', 'top': 'auto', 'right': 'auto', 'bottom': '0px',  'left': '0px' }); }
			if(key == "br") { this.parent().css({'width':  '50%', 'height':  '50%', 'top': 'auto', 'right': '0px',  'bottom': '0px',  'left': 'auto'}); }
			if(key == "tl") { this.parent().css({'width':  '50%', 'height':  '50%', 'top': '0px',  'right': 'auto', 'bottom': 'auto', 'left': '0px' }); }
			if(key == "tr") { this.parent().css({'width':  '50%', 'height':  '50%', 'top': '0px',  'right': '0px',  'bottom': 'auto', 'left': 'auto'}); }

			if(key == "t11") { this.parent().css({'width':  '33.333%', 'height':  '33.333%', 'top': '0px', 'right': 'auto',    'bottom': '0px',  'left': '0px'    }); }
			if(key == "t12") { this.parent().css({'width':  '33.333%', 'height':  '33.333%', 'top': '0px', 'right': '33.333%', 'bottom': '0px',  'left': '33.333%'}); }
			if(key == "t13") { this.parent().css({'width':  '33.333%', 'height':  '33.333%', 'top': '0px', 'right': '0px',     'bottom': 'auto', 'left': 'auto'   }); }
			if(key == "t21") { this.parent().css({'width':  '33.333%', 'height':  '33.333%', 'top': '33.333%', 'right': 'auto',    'bottom': '33.333%', 'left': '0px'    }); }
			if(key == "t22") { this.parent().css({'width':  '33.333%', 'height':  '33.333%', 'top': '33.333%', 'right': '33.333%', 'bottom': '33.333%', 'left': '33.333%'}); }
			if(key == "t23") { this.parent().css({'width':  '33.333%', 'height':  '33.333%', 'top': '33.333%', 'right': '0px',     'bottom': '33.333%', 'left': 'auto'   }); }
			if(key == "t31") { this.parent().css({'width':  '33.333%', 'height':  '33.333%', 'top': 'auto', 'right': 'auto',    'bottom': '0px', 'left': '0px'    }); }
			if(key == "t32") { this.parent().css({'width':  '33.333%', 'height':  '33.333%', 'top': 'auto', 'right': '33.333%', 'bottom': '0px', 'left': '33.333%'}); }
			if(key == "t33") { this.parent().css({'width':  '33.333%', 'height':  '33.333%', 'top': 'auto', 'right': '0px',     'bottom': '0px', 'left': 'auto'   }); }

			if(key == "fs") { this.parent().css({'width': '100%', 'height': '100%', 'top': 'auto', 'right': 'auto', 'bottom': '0px',  'left': '0px' }); }
		},
		items: {
			"bl": {name: "Bottom Left"},
			"br": {name: "Bottom Right"},
			"tl": {name: "Top Left"},
			"tr": {name: "Top Right"},
			"sep1": "---------",
			"t11": {name: "Thirds (1,1)"},
			"t12": {name: "Thirds (1,2)"},
			"t13": {name: "Thirds (1,3)"},
			"t21": {name: "Thirds (2,1)"},
			"t22": {name: "Thirds (2,2)"},
			"t23": {name: "Thirds (2,3)"},
			"t31": {name: "Thirds (1,1)"},
			"t32": {name: "Thirds (1,2)"},
			"t33": {name: "Thirds (3,3)"},
			"sep2": "---------",
			"fs": {name: "Full Screen"}
		}
	});
}