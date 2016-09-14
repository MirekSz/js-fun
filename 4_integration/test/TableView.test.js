/* eslint-disable */

import EventEmitter from 'event-emitter';
import TableView, {TABLE_EVENTS} from '../src/TableView.js';
import DetailsView from "../src/DetailsView";

describe('TableView tests...', function () {

    let ee = new EventEmitter();

    before(()=> {
        $(document.body).append('<div id="workspace"></div>');
        $(document.body).append('<div id="detailsView"></div>');
    });

    afterEach(()=> {
        $('#workspace').empty();
        $('#detailsView').empty();
    });

    it('should render table with header', function () {
        //given
        let tableView = new TableView(ee);

        //when
        tableView.render('#workspace');

        //then
        expect($('#workspace table thead tr').length).to.be.gt(0);
    });

    it('should render table with empty body', function () {
        //given
        let tableView = new TableView(ee);

        //when
        tableView.render('#workspace');

        //then
        expect(tableView.users.length).to.be.eq(0);
    });

    it('should emit TABLE_EVENTS.ON_ROW_SELECTION_CHANGE', function () {
        //given
        let tableView = new TableView(ee);
        tableView.render('#workspace', [{id: 1, name: 'Jurek'}]);
        let emittedUser = {};
        ee.on(TABLE_EVENTS.ON_ROW_SELECTION_CHANGE, (user) => {
            emittedUser = user;
        });

        //when
        tableView.onRowClick(1);

        //then
        expect(emittedUser).to.be.eq(tableView.users[0]);
    });

    describe('DetailsView tests...', function () {
        it('should render with given user', function () {
            //given
            let user = {id: 13};
            let details = new DetailsView();

            //when
            details.render('#detailsView', user);

            //then
            expect(details.data).to.be.eql(user);
        });
    });
});

