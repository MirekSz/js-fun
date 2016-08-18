var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.listen(3000, function () {
    console.log('listening on 3000')
});

app.use(bodyParser.json({type: '*/*'}));

app.use(function (req, res, next) {
    res.header('Cache-Control', 'no-cache');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Content-Type', 'application/json');
    next();
});

var users = [{id: 0, name: 'Jacek', surname: 'Doe', age: '43', sex: 'Mężczyzna'},
    {id: 1, name: 'Marzanna', surname: 'Uss', age: '54', sex: 'Kobieta'},
    {id: 2, name: 'Julia', surname: 'Dolej', age: '22', sex: 'Kobieta'}];

app.get('/users', function (request, response) {
    response.send(users);
});

app.post('/users', function (request, response) {
    var user = request.body;
    user.id = users.length;
    users.push(user);

    response.send({id: user.id});
});

app.put('/users/:id', function (request, response) {
    var user = request.body;
    var founded = users.find(user => user.id == request.params.id);
    Object.assign(founded, user);
    response.end();
});

app.delete('/users/:id', function (request, response) {
    var founded = users.findIndex(user => user.id == request.params.id);
    users.splice(founded, 1);
    response.end();
});
