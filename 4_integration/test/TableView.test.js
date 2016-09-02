/* eslint-disable */

import EventEmitter from 'event-emitter';
import TableView from '../src/TableView.js';
import {USER_SERVICE_EVENT} from '../src/UserService'

describe('TableView tests...', function () {




    before(()=> {
        $(document.body).append('<div id="workspace"></div>')
    });

    afterEach(()=> {
        $('#workspace').empty();
    });

    it('should render table with header', function () {
        //given
        let tableView = new TableView(new EventEmitter());
        tableView.setDivID('#workspace');

        //when
        tableView.render();

        //then
        expect($('#workspace table thead tr').length).to.be.gt(0)
    });

    it('should render table with empty body', function () {
        //given
        let tableView = new TableView(new EventEmitter());
        tableView.setDivID('#workspace');

        //when
        tableView.render();

        //then
        expect($('#workspace table tbody tr').length).to.be.eq(0)
    });

    it('should render table rows after USERS_NEW_DATA event', function () {
        //given
        let ee = new EventEmitter();
        let tableView = new TableView(ee);
        tableView.setDivID('#workspace');
        tableView.render();
        var userToAdd = {id: 0, name: "Jacek", surname: "Doe", age: "43", sex: "Mężczyzna"};

        //when
        ee.emit(USER_SERVICE_EVENT.USERS_NEW_DATA, [userToAdd]);

        //then
        expect($('#workspace table tbody tr').length).to.be.eq(1)
    });

});