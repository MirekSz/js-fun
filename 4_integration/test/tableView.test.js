/* eslint-disable */

let chai = require('chai');
let assert = chai.assert;

import EventEmitter from 'event-emitter';
import TableView from '../src/TableView.js';
import USER_SERVICE_EVENT from '../src/UserService'

describe('ButtonView', function() {

    let ee = new EventEmitter();
    let tableView = new TableView(ee);

    it('should set correct divID', function() {
        tableView.setDivID('#workspace');
        assert.equal(tableView.divID, '#workspace');
    });


    tableView.setDivID('#workspace');
    it('should render with given data', function() {
        // let users = [{},{},{}];
        // ee.emit(USER_SERVICE_EVENT.USERS_NEW_DATA, users);
    });
});