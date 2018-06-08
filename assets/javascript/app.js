var gameName = $("#game-input").val();

var url = "https://www.giantbomb.com/api/search/?api_key=" + gbAPI + "&format=jsonp&query=" + gameName + "&resources=game";
var gbAPI = "4a12e90d2bea50d175659d20cfed7dd6425d84a3"

//Create on click event to search for a video game
$("#search-button").on("click", function(event){
    var p = $("<p>");
    $(".lead").append(p.text("this is a test"));
    console.log("test");

$.ajax({
    url: url,
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
