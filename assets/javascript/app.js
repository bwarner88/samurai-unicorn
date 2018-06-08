var url = `https://www.giantbomb.com/api/games/?api_key=${gbAPI}`;
var gbAPI = "3ba3364be372cf8ce64e4c415cae29433e3daf48";


var httpRequest = new XMLHttpRequest();
axios({
url: "https://api.twitch.tv/kraken/clips/top?limit=2&game=overwatch&trending=true",
headers: {
"Client-ID": "7wqn4lbccr164m3mxkpoxfxvc9tso7",
'Accept': 'application/vnd.twitchtv.v5+json'
},
method: 'GET',
})
.then(function(response){
console.log(response.data)
console.log("baxios")
clipList = response.data;
var clipsDisplay = document.getElementById('clips-display');
console.log(clipList)
clipList.clips.forEach(function(clip, index, array) {
clipItem = document.createElement('div');
clipItem.innerHTML = clip.embed_html;
clipsDisplay.appendChild(clipItem);
})
})
.catch(function(err){
console.error(err)
})