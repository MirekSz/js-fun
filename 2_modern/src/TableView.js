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

    setDivID(div) {
        this.divID = div;
        return this;
    }

    setUpListeners() {
        let {ee} = this;
        ee.on(USER_SERVICE_EVENT.USERS_NEW_DATA, (users) => {
            this.users = users;
            this.loading = false;
            this.render();
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

    render() {
        this.selectedRow = -1;
        $(this.divID).html(TableView.prepareTableHtml(this.users, this.loading));
        if (!this.loading) {
            $(this.divID).find('table tbody tr').on('click', (event) => {
                let rowNumber = parseInt($(event.target.parentElement).attr('data-id'), 10);
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
            this.ee.emit(TABLE_EVENTS.ON_ROW_SELECTION_CHANGE, this.users[rowNumber]);
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
