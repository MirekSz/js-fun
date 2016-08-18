import $ from 'jquery'
import EventEmitter from "event-emitter";

import User from './user.js';
import ButtonView from "./ButtonView";
import TableView from "./TableView";
import DetailsView from "./DetailsView";
import FormView from "./FormView";

$(document).ready(initialize);

function initialize() {
    let ee = new EventEmitter();
    new TableView(ee, '#workspace');
    new DetailsView(ee);
    new ButtonView(ee).renderTo("#buttonView");
    new FormView(ee, '#workspace');
    getData(ee);
}

function getData(ee) {
    let users = [new User('Jacek', 'Doe', '43', 'Mężczyzna'),
                new User('Marzanna', 'Uss', '54', 'Kobieta'),
                new User('Julia', 'Dolej', '22', 'Kobieta')];
    setTimeout(function () {
        ee.emit('users-new-data', users);
    }, 30);
}
