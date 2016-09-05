import $ from 'jquery';
import template from './buttonView.hbs';

import {TABLE_EVENTS} from './TableView';
import {FORM_EVENTS} from './FormView';

export const BUTTON_EVENTS = {
    ADD_NEW_USER: 'add-new-user',
    EDIT_BUTTON_CLICK: 'edit-button-click',
    DELETE_USER: 'delete-user'
};

class ButtonView {
    /**
     *
     * @param {EventEmitter} ee
     */
    constructor(ee) {
        this.ee = ee;
        this.setUpListeners();
        this.setButtonsDisabled(true);
    }

    setUpListeners() {
        let {ee} = this;
        ee.on(TABLE_EVENTS.ON_ROW_SELECTION_CHANGE, () => {
            this.setButtonsDisabled(false);
        });
        ee.on(FORM_EVENTS.USER_EDITED, this.render.bind(this));
        ee.on(FORM_EVENTS.USER_ADDED, this.render.bind(this));
        ee.on(FORM_EVENTS.FORM_CANCELED, this.render.bind(this));
    }

    /**
     *
     * @param {boolean} val
     */
    setButtonsDisabled(val) {
        this.disabled = val;
        $('#editBtn').prop('disabled', val);
        $('#deleteBtn').prop('disabled', val);
    }

    /**
     * @param divID
     */
    render(divID) {
        if (typeof divID !== 'undefined') {
            this.divID = divID;
        }
        $(this.divID).html(ButtonView.prepareButtonHtml());
        this.setOnClickForButtons();
    }

    setOnClickForButtons() {
        let {ee} = this;
        $('#addBtn').click(() => {
            ee.emit(BUTTON_EVENTS.ADD_NEW_USER);
            this.hideButtonView();
        });
        $('#editBtn').click(() => {
            ee.emit(BUTTON_EVENTS.EDIT_BUTTON_CLICK);
            this.hideButtonView();
        });
        $('#deleteBtn').click(() => {
            let answer = confirm('Czy chcesz usunąć tego użytkownika?');
            if (answer) {
                ButtonView.setButtonsDisabled(true);
                ee.emit(BUTTON_EVENTS.DELETE_USER);
            }
        });
    }

    hideButtonView() {
        $(this.divID).html('');
    }

    /**
     *
     * @returns {string}
     */
    static prepareButtonHtml() {
        return template({});
    }
}

export default ButtonView;
