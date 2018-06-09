var gameName = $("#game-input").val();

var giantbombURL = "https://www.giantbomb.com/api/search/?api_key=" + gbAPI + "&format=jsonp&query=" + gameName + "&resources=game";

var gbAPI = "4a12e90d2bea50d175659d20cfed7dd6425d84a3"

// Create on click event to search for a video game
$("#search-button").on("click", function(event){
    var p = $("<p>");
    $(".lead").append(p.text("this is a test"));
    console.log("test");

$.ajax({
    url: giantbombURL,
    method: 'GET',
    dataType: 'jsonp',
    crossDomain: true,
    jsonp: 'json_callback',
    complete: function() {
        console.log("done")
    },
    success: function(data) {
        console.log(data);
    },
    error: function(error) {
        console.log(error);
    }
});

});


var httpRequest = new XMLHttpRequest();
axios({
    url: "https://api.twitch.tv/kraken/clips/top?limit=2&game=overwatch&trending=true",
    headers: {
        "Client-ID": "7wqn4lbccr164m3mxkpoxfxvc9tso7",
        'Accept': 'application/vnd.twitchtv.v5+json'
    },
    method: 'GET',
})
    .then(function (response) {
        console.log(response.data)
        console.log("baxios")
        clipList = response.data;
        var clipsDisplay = document.getElementById('clips-display');
        console.log(clipList)
        clipList.clips.forEach(function (clip, index, array) {
            clipItem = document.createElement('div');
            clipItem.innerHTML = clip.embed_html;
            clipsDisplay.appendChild(clipItem);
        })
    })
    .catch(function (err) {
        console.error(err)
    })
