'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let User = require('./user').User;

let app = express();
app.listen(3000, function () {
    console.log('listening on 3000');
});

app.use(bodyParser.json({type: '*/*'}));
app.use(cors());
app.use(function (req, res, next) {
    res.header('Cache-Control', 'no-cache');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Content-Type', 'application/json');
    next();
});

let users = [new User(1, 'Jacek', 'Doe', 43, 'Mężczyzna'),
    new User(2, 'Marzanna', 'Uss', 54, 'Kobieta'),
    new User(3, 'Julia', 'Dolej', 22, 'Kobieta')];

function generateID() {
    let maxID = 0;
    users.map((obj) => {
        if (obj.id > maxID) {
            maxID = obj.id;
        }
    });
    return (maxID + 1);
}

app.get('/users/:id', function (request, response) {
    let found = users.findIndex(user => user.id == request.params.id);
    response.send(users[found]);
});

app.get('/users', function (request, response) {
    response.send(users);
});

app.post('/users', function (request, response) {
    let user = request.body;
    user.id = generateID();
    users.push(user);
    response.send({id: user.id});
});

app.put('/users/:id', function (request, response) {
    let found = users.find(user => user.id === request.body.id);
    if (found) {
        Object.assign(found, request.body);
    }
    response.end();
});

app.delete('/users/:id', function (request, response) {
    let found = users.findIndex(user => user.id == request.params.id);
    users.splice(found, 1);
    response.end();
});

