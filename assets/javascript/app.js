var url = "https://www.giantbomb.com/api/search/?api_key=4a12e90d2bea50d175659d20cfed7dd6425d84a3&format=jsonp&query=star-craft&resources=game";
var gbAPI = "4a12e90d2bea50d175659d20cfed7dd6425d84a3"


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
})