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
    new DetailsView(ee, '#detailsView');
    new ButtonView(ee, "#buttonView").render();
    new FormView(ee, '#workspace');
    getData(ee);
}
/**
 *
 * @param {EventEmitter} ee
 */
function getData(ee) {
    let users = new Map([
        [0, new User('Jacek', 'Doe', '43', 'Mężczyzna')],
        [1, new User('Marzanna', 'Uss', '54', 'Kobieta')],
        [2, new User('Julia', 'Dolej', '22', 'Kobieta')]
    ]);
    setTimeout(function () {
        ee.emit('users-new-data', users);
    }, 30);
}
