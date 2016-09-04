import $ from 'jquery';
import template from './tableView.hbs';

import {BUTTON_EVENTS} from './ButtonView';
import {FORM_EVENTS} from './FormView';
import {USER_SERVICE_EVENT} from './UserService';

export const TABLE_EVENTS = {
    ON_ROW_SELECTION_CHANGE: 'onRowSelectionChange',
    EDIT_USER: 'edit-user'
};

class TableView {
    /**
     *
     * @param {EventEmitter} ee
     * @param {UserService} service
     */
    constructor(ee, service) {
        this.ee = ee;
        this.service = service;
        this.users = [];
        this.setUpListeners();
        this.loading = true;
    }

    setUpListeners() {
        let {ee} = this;
        ee.on(USER_SERVICE_EVENT.USERS_NEW_DATA, (users) => {
            this.loading = false;
            this.users = users;
            this.render(this.divID, users);
        });
        ee.on(BUTTON_EVENTS.DELETE_USER, () => {
            this.service.deleteUser(this.users[this.selectedRow].id);
        });
        ee.on(BUTTON_EVENTS.EDIT_BUTTON_CLICK, () => {
            this.hideTableView();
            ee.emit(TABLE_EVENTS.EDIT_USER, this.users[this.selectedRow]);
        });
        ee.on(BUTTON_EVENTS.ADD_NEW_USER, this.hideTableView.bind(this));
        ee.on(FORM_EVENTS.FORM_CANCELED, this.render.bind(this));
        ee.on(FORM_EVENTS.USER_EDITED, () => {
            this.loading = true;
            this.render();
        });
        ee.on(FORM_EVENTS.USER_ADDED, () => {
            this.loading = true;
            this.render();
        });
    }

    render(divID, users, loading) {
        this.divID = divID;
        if (typeof loading !== 'undefined') {
            this.loading = loading;
        }
        if (typeof users !== 'undefined') {
            this.users = users;
        }
        this.selectedRow = -1;
        $(divID).html(TableView.prepareTableHtml(this.users, this.loading));
        if (!this.loading) {
            $(divID).find('table tbody tr').on('click', (event) => {
                let rowNumber = $(event.target.parentElement).data('id');
                this.onRowClick(rowNumber);
            });
        }
    }

    /**
     *
     * @param {number} rowNumber
     */
    onRowClick(rowNumber) {
        let selected = this.selectedRow;
        if (selected !== -1) {
            $(`tr[data-id*='${selected}']`).removeClass('activeRow', {duration: 500});
        }
        $(`tr[data-id*='${rowNumber}']`).addClass('activeRow', {duration: 500});
        this.selectedRow = rowNumber;
        if (selected !== rowNumber) {
            let selectedUser = {};
            this.users.forEach((element) => {
                if (element.id === rowNumber) {
                    selectedUser = element;
                }
            });
            this.ee.emit(TABLE_EVENTS.ON_ROW_SELECTION_CHANGE, selectedUser);
        }
    }

    hideTableView() {
        $(this.divID).html('');
    }

    /**
     *
     * @param {Array} users
     * @param {boolean} loading
     * @returns {string}
     */
    static prepareTableHtml(users, loading) {
        return template({users, loading});
    }
}

export default TableView;
