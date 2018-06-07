var igdbAPI = "df6ffa3dcea9c390e5cdffffc7c00df9";
var userGame = "starcraft";

// var url = `https://api-endpoint.igdb.com/characters/?fields=*&limit=10?user-key=${igdbAPI}`
// var url = 'https://api-endpoint.igdb.com/games/75813';
// console.log(url);

axios({
    method: 'get',
    url: 'https://api-endpoint.igdb.com/games/75813',
    headers: {
        'user-key': igdbAPI,
        accept: 'application/json'
    }
})
.then(function (response) {
    console.log(response)
    // response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
})
.catch(function(err) {
    console.error(err);
})