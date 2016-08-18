import $ from 'jquery';
import EventEmitter from "event-emitter";

import User from './user.js';
import ButtonView from "./ButtonView.js";
import TableView from "./TableView.js";
import DetailsView from "./DetailsView.js";
import FormView from "./FormView.js";

$(document).ready(initialize);

function initialize() {
    var ee = new EventEmitter();
    new TableView(ee);
    new DetailsView(ee);
    new ButtonView(ee).renderTo("#buttonView");
    new FormView(ee);
    getData(ee);
}

function getData(ee) {
    var users = [new User('Jacek', 'Doe', '43', 'Mężczyzna'),
                new User('Marzanna', 'Uss', '54', 'Kobieta'),
                new User('Julia', 'Dolej', '22', 'Kobieta')];
    setTimeout(function () {
        ee.emit('users-new-data', users);
    }, 30);
}
