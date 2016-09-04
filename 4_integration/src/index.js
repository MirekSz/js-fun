import $ from 'jquery';
import EventEmitter from 'event-emitter';

import UserService from './UserService';
import ButtonView from './ButtonView';
import TableView from './TableView';
import DetailsView from './DetailsView';
import FormView from './FormView';

function initialize() {
    let baseUrl = 'http://localhost:3000';

    let ee = new EventEmitter();
    let service = new UserService(ee, baseUrl, '/users/');

    new ButtonView(ee).setDivID('#buttonView').render();
    let tableView = new TableView(ee, service);
    new DetailsView(ee).setDivID('#detailsView');
    new FormView(ee, service).setDivID('#workspace');

    service.getUsers().then((users) => {
        tableView.render('#workspace', users);
    });
}

$(document).ready(initialize);
