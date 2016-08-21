import $ from 'jquery'
import EventEmitter from "event-emitter";
import HttpManager from "./HttpManager";

import ButtonView from "./ButtonView";
import TableView from "./TableView";
import DetailsView from "./DetailsView";
import FormView from "./FormView";

$(document).ready(initialize);

function initialize() {

    let ee = new EventEmitter();
    let httpManager = new HttpManager(ee);

    new ButtonView(ee, "#buttonView").render();
    new TableView(ee, httpManager, '#workspace');
    new DetailsView(ee, '#detailsView');
    new FormView(ee, '#workspace');

    httpManager.getUsers();
}