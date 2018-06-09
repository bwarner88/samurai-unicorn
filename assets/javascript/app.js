//Create on click event to search for a video game
$("#search-button").on("click", function (event) {
    event.preventDefault();
    
    for (i = 0; i < 9; i ++) {
    $(".game-display" + i).empty();
    };

    var gameName = $("#game-input").val();
    var gbAPI = "4a12e90d2bea50d175659d20cfed7dd6425d84a3"
    var gbURL = "https://www.giantbomb.com/api/search/?api_key=" + gbAPI + "&format=jsonp&query=" + gameName + "&resources=game";
    

    $.ajax({
        url: gbURL,
        method: 'GET',
        dataType: 'jsonp',
        crossDomain: true,
        jsonp: 'json_callback',
        complete: function () {
            console.log("done")
        },
        success: function (data) {
            console.log(data);
            console.log(data.results[0].image.screen_large_url);
            console.log(data.results[0].original_game_rating[0].name)
            
            for (var i = 0; i < 9; i ++) {
            
            var rating = $("<h3>");
            rating.text(data.results[i].original_game_rating[0].name);
            $(".game-display" + i).prepend(rating);

            var platforms = $("<h3>");
            platforms.text(data.results[i].platforms[0].name);
            $(".game-display" + i).prepend(platforms);

            var info = $("<p>");
            info.text(data.results[i].deck);
            $('.game-display' + i).prepend(info);

            var img = $("<img>");
            img.attr("id", "game-image");
            img.attr("class", "image-click");
            img.attr("value", data.results[i].name);
            img.attr("src", data.results[i].image.original_url);
            $(".game-display" + i).append(img);

            };
        },
        error: function (error) {
            console.log(error);
        }
    });

    $("#game-input").val("");

});

//Grabs name from game to store for twitch query URL
$(document).on("click", ".image-click", function(){
    console.log($(this).attr("value"));
})

//TwitchAPI Call
var httpRequest = new XMLHttpRequest();
axios({
    url: "https://api.twitch.tv/kraken/clips/top?limit=2&game=Counter-Strike: Global Offensive&trending=true",
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

