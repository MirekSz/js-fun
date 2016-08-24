var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var User = require('./user').User;

var app = express();
app.listen(3000, function () {
    console.log('listening on 3000')
});

app.use(bodyParser.json({type: '*/*'}));
app.use(cors());
app.use(function (req, res, next) {
    res.header('Cache-Control', 'no-cache');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Content-Type', 'application/json');
    next();
});

var users = [new User(0, 'Jacek', 'Doe', '43', 'Mężczyzna'),
    new User(1, 'Marzanna', 'Uss', '54', 'Kobieta'),
    new User(2, 'Julia', 'Dolej', '22', 'Kobieta')];

app.get('/users', function (request, response) {
    setTimeout(() => {response.send(users)}, 2000);
});

app.post('/users', function (request, response) {
    var user = request.body;
    user.id = generateID();
    users.push(user);
    response.send({id: user.id});
});

app.put('/users', function (request, response) {
    var editedUser = request.body;
    var found = users.find(user => user.id == editedUser.id);
    Object.assign(found, editedUser);
    response.end();
});

app.delete('/users/:id', function (request, response) {
    var found = users.findIndex(user => user.id == request.params.id);
    users.splice(found, 1);
    response.end();
});

function generateID() {
    var maxID = 0;
    users.map((obj) => {
        if (obj.id > maxID) maxID = obj.id;
    });
    return (maxID + 1);
}
