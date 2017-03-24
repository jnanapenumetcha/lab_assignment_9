/**
 * Created by Marmik on 04/10/2016.
 */

/**
 * Modified by Gayatri on 25/03/2017.
 */
var express = require('express');
var app = express();
var request = require('request');
app.get('/getMovies', function (req, res) {
    var result={
        'Details': []
    };

    request('http://data.tmsapi.com/v1.1/movies/showings?startDate=2017-03-25&zip=64131&api_key=24re9vrmkc4qq2dqxapgbsuh', function (error, response, body) {
        //Check for error
        if(error){
            return console.log('Error:', error);
        }

        //Check for right status code
        if(response.statusCode !== 200){
            return console.log('Invalid Status Code Returned:', response.statusCode);
        }
        //All is good. Print the body
        body = JSON.parse(body);
        for(var i=0;i<body.length;i++)
        {
            if(body[i].showtimes.count > 1) {
                result.Details.push({
                    'Title': body[i].title,
                    'Theatre': body[i].showtimes[0].theatre.name,
                    'Show-times': body[i].showtimes[0].dateTime + ' , ' + body[i].showtimes[1].dateTime + ' , ' + body[i].showtimes[2].dateTime
                });
            }
        }
    });

    request('https://api.themoviedb.org/3/search/movie?api_key=84860317e6e2393b48e4dcbf50e16ffc&query=Jack+Reacher', function (error, response, body) {
        //Check for error
        if(error){
            return console.log('Error:', error);
        }

        //Check for right status code
        if(response.statusCode !== 200){
            return console.log('Invalid Status Code Returned:', response.statusCode);
        }
        //All is good. Print the body
        body = JSON.parse(body);
        var results = body.results;
        for(var i=0;i<results.length;i++)
        {
            result.review.push({'oberview': results[i].overview});
        }
        res.contentType('application/json');
        res.write(JSON.stringify(result));
        res.end();

    });

    console.log(result.Details);


})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})