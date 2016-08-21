import $ from 'jquery';
import template from './tableView.hbs';

import {BUTTON_EVENTS} from './ButtonView';
import {FORM_EVENTS} from './FormView';
import {USER_SERVICE_EVENT} from './HttpManager';

export const TABLE_EVENTS = {
    ON_ROW_SELECTION_CHANGE: 'onRowSelectionChange',
    EDIT_USER:'edit-user'
};

class TableView {
    /**
     *
     * @param {EventEmitter} ee
     * @param {HttpManager} httpManager
     * @param {string} divID
     */
    constructor(ee, httpManager, divID) {
        this.ee = ee;
        this.httpManager = httpManager;
        this.divID = divID;
        this.users = [];
        this.setUpListeners();
    }

    setUpListeners() {
        let {ee} = this;
        ee.on(USER_SERVICE_EVENT.USERS_NEW_DATA, (users) => {
            this.users = users;
            this.render();
        });
        ee.on(BUTTON_EVENTS.DELETE_USER, () => {
            this.httpManager.deleteUser(this.users[this.selectedRow].id);
        });
        ee.on(BUTTON_EVENTS.EDIT_BUTTON_CLICK, () => {
            this.hideTableView();
            ee.emit(TABLE_EVENTS.EDIT_USER, this.users[this.selectedRow]);
        });
        ee.on(BUTTON_EVENTS.ADD_NEW_USER, this.hideTableView);
        ee.on(FORM_EVENTS.USER_EDITED, (user) => {
            this.httpManager.editUser(user);

        });
        ee.on(FORM_EVENTS.USER_ADDED, (user) => {
            this.httpManager.addUser(user);
        });
        ee.on(FORM_EVENTS.FORM_CANCELED, () => {
            this.render();
        });
    };

    render() {
        this.selectedRow = -1;
        $(this.divID).html(TableView.prepareTableHtml(this.users));
        $(this.divID).find("table tbody tr").on('click', (event) => {
            let rowNumber = parseInt($(event.target.parentElement).attr('data-id'));
            this.onRowClick(rowNumber);
        });
    };

    /**
     *
     * @param {number} rowNumber
     */
    onRowClick(rowNumber) {
        let selected = this.selectedRow;
        if (selected != -1) {
            $("#tableRow" + selected).removeClass("activeRow");
        }
        $("#tableRow" + rowNumber).addClass("activeRow");
        this.selectedRow = rowNumber;
        if (selected !== rowNumber) {
            this.ee.emit(TABLE_EVENTS.ON_ROW_SELECTION_CHANGE, this.users[rowNumber]);
        }
    };

    hideTableView() {
        $(this.divID).html("");
    };

    /**
     *
     * @param {Array} users
     * @returns {string}
     */
    static prepareTableHtml(users) {
        return template({users});
    }
}

export default TableView;