function getUrlParams(prop) {
    var params = {};
    var search = decodeURIComponent(location.href.slice(location.href.indexOf('?') + 1));
    var definitions = search.split('&');

    definitions.forEach(function (val, key) {
        var parts = val.split('=', 2);
        params[parts[0]] = parts[1];
    });

    return (prop && prop in params) ? params[prop] : params;
}

var userParam = getUrlParams(location.href);
var gameName;

//GIANT BOMB API CALL SAVED IN A FUNCTION
function giantBomb() {
    for (i = 0; i < 9; i++) {
        $("#game-display" + i).empty();
    };

    var gbAPI = "4a12e90d2bea50d175659d20cfed7dd6425d84a3"
    var gbURL = "https://www.giantbomb.com/api/search/?api_key=" + gbAPI + "&format=jsonp&query=" + userParam.search + "&resources=game";

    $.ajax({
        url: gbURL,
        method: 'GET',
        dataType: 'jsonp',
        crossDomain: true,
        jsonp: 'json_callback',
        complete: function () {
            console.log("Done")
        },
        success: function (data) {
            console.log(data);
            console.log(data.results[0].name);

            for (var i = 0; i < data.results.length - 1; i++) {

                $("#user-choice").text(userParam.search.toLowerCase().replace(/\b[a-z]/g, function (letter) {
                    return letter.toUpperCase();
                }));
                var gameDisplay = $("<div>");
                gameDisplay.attr({
                    id: "game-display" + i,
                    class: "card text-center col-md-4 shadow border border-secondary rounded p-2 bg-light my-3 mx-3"
                });
                $("#game-box").append(gameDisplay);

                var gameImg = $("<img>");
                gameImg.attr({
                    id: "game-image",
                    class: "image-click mx-auto",
                    value: data.results[i].name,
                    src: data.results[i].image.small_url
                });

                var info = $("<p>");
                info.attr("id", "info-text");
                info.text(data.results[i].deck);

                var rating = $("<h3>");
                rating.text(data.results[i].original_game_rating[0].name);

                var platforms = $("<h3>");
                platforms.text(data.results[i].platforms[0].name);
                $("#game-display" + i).append(name, gameImg, info, rating, platforms);

            };
        },
        error: function (error) {
            console.log(error);
        }
    });

    $("#game-input").val("");
}

//USER INPUT GAME SEARCH ON MAIN PAGE, CLICKING SEARCH SAVES VALUE OF INPUT
$("#start-button, #search-button").on("click", function (event) {
    event.preventDefault()
    gameName = $("#game-input").val().trim();
    location.href = "./gamepage.html?search=" + gameName;
});

//CHECK TO SEE WE'RE ON GAMEPAGE
if (whatPage === 'gamepage') {
    giantBomb();
}

//CHECK TO SEE WE'RE ON RESULTS PAGE
if (whatPage === 'result') {
    twitchDisplay();

    //Create a custom API call to Giant-BOmb for the final results page
    var gbAPI = "4a12e90d2bea50d175659d20cfed7dd6425d84a3"
    var gbURL = "https://www.giantbomb.com/api/search/?api_key=" + gbAPI + "&format=jsonp&query=" + userParam.search + "&resources=game";

    $.ajax({
        url: gbURL,
        method: 'GET',
        dataType: 'jsonp',
        crossDomain: true,
        jsonp: 'json_callback',
        complete: function () {
            console.log("Done")
        },
        success: function (data) {
            console.log(data);
            console.log(data.results[0].name);

            var name = $("<h1>");
            name.attr("class", "display-4");
            name.text(data.results[0].name);
            $("#game-name").append(name);

            // var img = $("<img>");
            // img.attr("id", "final-game-image");
            // img.attr("src", data.results[0].image.small_url);
            // $("#game-results-display").append(img);

            // var description = $("<div>");
            // description.html(data.results[0].description);
            $("#description").append(data.results[0].description);
        },
        error: function (error) {
            console.log(error);
        }
    });

}

//Create on click event to search for a video game
$("#search-button", "#start-button").on("click", function (event) {
    event.preventDefault();
    giantBomb();

});

// Create an onlick event where if you click on a specific game image you can get specific results
$(document).on("click", ".image-click", function () {
    console.log($(this).attr("value"));
    // alert($(this).attr("value"));

    var specificGame = $(this).attr("value");
    location.href = "./result.html?search=" + specificGame;
    var gbAPI = "4a12e90d2bea50d175659d20cfed7dd6425d84a3"
    var gbURL = "https://www.giantbomb.com/api/search/?api_key=" + gbAPI + "&format=jsonp&query=" + specificGame + "&resources=game";


    $.ajax({
        url: gbURL,
        method: 'GET',
        dataType: 'jsonp',
        crossDomain: true,
        jsonp: 'json_callback',
        complete: function () {
            console.log("done for real")

        },
        success: function (data) {
            console.log(data);
            console.log("giant-bomb");

        }
    });

});


function twitchDisplay() {
    var httpRequest = new XMLHttpRequest();
    axios({
        url: "https://api.twitch.tv/kraken/clips/top?limit=1&game=" + userParam.search + "&trending=true",
        headers: {
            "Client-ID": "7wqn4lbccr164m3mxkpoxfxvc9tso7",
            'Accept': 'application/vnd.twitchtv.v5+json'
        },
        method: 'GET',
    })

        .then(function (response) {
            console.log(response.data)
            var clipList = response.data;
            var clipsDisplay = $('#clips-display');
            console.log(clipList)
            clipList.clips.forEach(function (clip, index, array) {
                clipItem = $('<div>');
                clipItem.attr('class', 'twitchClip')
                clipItem.html(clip.embed_html);
                clipsDisplay.append(clipItem);
            })
        })
        .catch(function (err) {
            console.error(err)
        })
}