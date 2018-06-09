$(document).ready(function(){

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
    var resultPage = "./gamepage.html?search=" + userParam;

    
    //Create on click event to search for a video game
    $("#search-button").on("click", function (event) {
        event.preventDefault()
        gameName = $("#game-input").val().trim();
        location.href = "./gamepage.html?search=" + gameName;

    });

    function giantBomb() {

        console.log("Hello");

        // Giant Bomb API Info
        var gbAPI = "4a12e90d2bea50d175659d20cfed7dd6425d84a3"
        var gbURL = "https://www.giantbomb.com/api/search/?api_key=" + gbAPI + "&format=jsonp&query=" + gameName + "&resources=game";
        console.log(gameName)
        console.log(gbURL);

        // Button click leads to gamepage.html
        // URL parameter to add "?S" to URL 
        // location

        // NEED A LOADING PAGE (spinner) for AJAX to run
        // YOUTUBE

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
            },
            error: function (error) {
                console.log(error);
            }
        });
    }

    //ES6 FOR GAMEPAGE.HTML?SEARCH=GAMENAME
    if (location.href === resultPage) {
        // giantBomb();
        console.log("Yo");
    }

})