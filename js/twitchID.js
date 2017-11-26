/**
* Get twitch channel name from url
* @author: rieger07
*/

function TwitchGetID(url){
  if (url.includes("player\.")){
	  return url.split("?channel=")[1]
  } else if(url.includes("www.twitch.tv")){
	  return url.split(".tv/")[1]
  } else {
	  return url
  }
}


/*
* Tested URLs:
var url = 'twitch.tv/enviosity';
var url = 'https://www.twitch.tv/enviosity';
url = 'player.twitch.tv/?channel=enviosity';
url = 'https://player.twitch.tv/?channel=enviosity';
*/
