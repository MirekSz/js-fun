import $ from 'jquery';
//noinspection JSUnresolvedVariable
import template from './tableView.hbs';

import {BUTTON_EVENTS} from './ButtonView';
import {FORM_EVENTS} from './FormView';

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
        ee.on(BUTTON_EVENTS.DELETE_USER, () => {
            this.service.deleteUser(this.selectedRow);
        });
        ee.on(BUTTON_EVENTS.EDIT_BUTTON_CLICK, () => {
            this.hide();
            ee.emit(TABLE_EVENTS.EDIT_USER, this.findUserById(this.selectedRow));
        });
        ee.on(BUTTON_EVENTS.ADD_NEW_USER, this.hide.bind(this));
        ee.on(FORM_EVENTS.FORM_CANCELED, () => {
            this.render(this.divID, this.users, false);
        });
        ee.on(FORM_EVENTS.USER_EDITED, () => {
            this.render(this.divID, {}, true);
        });
        ee.on(FORM_EVENTS.USER_ADDED, () => {
            this.render(this.divID, {}, true);
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
            $(`tr[data-id='${selected}']`).removeClass('activeRow', {duration: 500});
        }
        $(`tr[data-id='${rowNumber}']`).addClass('activeRow', {duration: 500});
        this.selectedRow = rowNumber;
        if (selected !== rowNumber) {
            this.ee.emit(TABLE_EVENTS.ON_ROW_SELECTION_CHANGE, this.findUserById(rowNumber));
        }
    }

    hide() {
        $(this.divID).empty();
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

    findUserById(id) {
        let user = {};
        this.users.forEach((element) => {
            if (element.id === id) {
                user = element;
            }
        });
        return user;
    }
}

export default TableView;
