import $ from 'jquery';
import EventEmitter from 'event-emitter';

import UserService from './UserService';
import ButtonView from './ButtonView';
import TableView from './TableView';
import DetailsView from './DetailsView';
import FormView from './FormView';
import {TABLE_EVENTS} from './TableView';

/**
 *
 * @param {DetailsView} details
 * @param {EventEmitter} ee
 */
function route(details, ee) {
    ee.on(TABLE_EVENTS.ON_ROW_SELECTION_CHANGE, (user) => {
        details.data = user;
        details.render('#detailsView', user);
    });
}

function initialize() {
    let baseUrl = 'http://localhost:3000';

    let ee = new EventEmitter();
    let service = new UserService(ee, baseUrl, '/users/');

    new ButtonView(ee).render('#buttonView');
    new TableView(ee, service).render('#workspace');
    let details = new DetailsView(ee);
    details.setUpListeners();
    new FormView(ee, service).setDivID('#workspace');
    route(details, ee);

    service.getUsers();
}

$(document).ready(initialize);
