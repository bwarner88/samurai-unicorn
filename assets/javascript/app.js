$(document).ready(function () {

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
    console.log(userParam);
    var gameName;

    //GIANT BOMB API CALL SAVED IN A FUNCTION
    function giantBomb() {
        for (i = 0; i < 9; i++) {
            $(".game-display" + i).empty();
        };

        var gbAPI = "4a12e90d2bea50d175659d20cfed7dd6425d84a3"
        var gbURL = "https://www.giantbomb.com/api/search/?api_key=" + gbAPI + "&format=jsonp&query=" + userParam.search + "&resources=game";
        console.log(gbURL);

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
                console.log(data.results[0].name);

                for (var i = 0; i < 9; i++) {

                    var rating = $("<h3>");
                    rating.text(data.results[i].original_game_rating[0].name);
                    $(".game-display" + i).prepend(rating);

                    var platforms = $("<h3>");
                    platforms.text(data.results[i].platforms[0].name);
                    $(".game-display" + i).prepend(platforms);

                    var info = $("<p>");
                    info.text(data.results[i].deck);
                    $('.game-display' + i).prepend(info);
                    $('#results-game-display').prepend(info);


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
    }

    //USER INPUT GAME SEARCH ON MAIN PAGE, CLICKING SEARCH SAVES VALUE OF INPUT
    $("#start-button").on("click", function (event) {
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
    }


    //Create on click event to search for a video game
    $("#search-button").on("click", function (event) {
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
                console.log("done")
            },
            success: function (data) {
                console.log(data);
                console.log(data.results[0].name);

            }
        });
    });


    function twitchDisplay() {
        var httpRequest = new XMLHttpRequest();
        axios({
            url: "https://api.twitch.tv/kraken/clips/top?limit=2&game=" + userParam.search + "&trending=true",
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
    }

})