/* eslint-disable */

import EventEmitter from 'event-emitter';
import TableView, {TABLE_EVENTS} from '../src/TableView.js';
import {USER_SERVICE_EVENT} from '../src/UserService'

describe('TableView tests...', function () {

    before(()=> {
        $(document.body).append('<div id="workspace"></div>');
    });

    afterEach(()=> {
        $('#workspace').empty();
    });

    it('should render table with header', function () {
        //given
        let tableView = new TableView(new EventEmitter());

        //when
        tableView.render('#workspace');

        //then
        expect($('#workspace table thead tr').length).to.be.gt(0);
    });

    it('should render table with empty body', function () {
        //given
        let tableView = new TableView(new EventEmitter());

        //when
        tableView.render('#workspace');

        //then
        expect(tableView.users.length).to.be.eq(0);
    });


    it('should render table rows after USERS_NEW_DATA event', function () {
        //given
        let ee = new EventEmitter();
        let tableView = new TableView(ee);
        tableView.render('#workspace');
        var user = {id: 0, name: "Jacek", surname: "Doe", age: "43", sex: "Mężczyzna"};

        //when
        ee.emit(USER_SERVICE_EVENT.USERS_NEW_DATA, [user]);

        //then
        expect(tableView.users.length).to.be.eq(1)
    });

    it('should emit TABLE_EVENTS.ON_ROW_SELECTION_CHANGE with first user', function () {
        //given
        let ee = new EventEmitter();
        let tableView = new TableView(ee);
        tableView.render('#workspace', [{id:12, name:'Jurek'}]);
        let emittedUser = {};
        ee.on(TABLE_EVENTS.ON_ROW_SELECTION_CHANGE, (user) => {
            this.emittedUser = user;
        });

        //when
        tableView.onRowClick(0);

        //then
        expect(emittedUser).to.be.eq(tableView.users[0]);
    });

});