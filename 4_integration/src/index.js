import $ from 'jquery';
import EventEmitter from 'event-emitter';

import UserService from './UserService';
import ButtonView from './ButtonView';
import TableView from './TableView';
import DetailsView from './DetailsView';
import FormView from './FormView';
import EventRouter from './EventRouter';

function initialize() {
    let baseUrl = 'http://localhost:3000';

    let ee = new EventEmitter();
    let service = new UserService(ee, baseUrl, '/users/');
    let router = new EventRouter(ee);

    let buttonView = new ButtonView(ee);
    let tableView = new TableView(ee, service);
    let details = new DetailsView();
    let form = new FormView(ee, service);

    router.setDetailsView(details);
    router.setFormView(form);
    router.setButtonView(buttonView);
    router.setTableView(tableView);
    router.start();

    service.getUsers();
}

$(document).ready(initialize);
