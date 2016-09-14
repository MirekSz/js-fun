import $ from 'jquery';
//noinspection JSUnresolvedVariable
import template from './buttonView.hbs';
import {TABLE_EVENTS} from './TableView';

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
    }

    /**
     *
     * @param {boolean} val
     */
    setButtonsDisabled(val) {
        this.disabled = val;
        this.$editBtn.prop('disabled', val);
        this.$deleteBtn.prop('disabled', val);
    }

    /**
     * @param divID
     * @param disabled
     */
    render(divID, disabled = true) {
        if (typeof divID !== 'undefined') {
            this.divID = divID;
        }
        $(this.divID).html(ButtonView.prepareButtonHtml());

        this.$addBtn = $('#addBtn');
        this.$editBtn = $('#editBtn');
        this.$deleteBtn = $('#deleteBtn');

        this.ee.on(TABLE_EVENTS.ON_ROW_SELECTION_CHANGE, () => {
            this.setButtonsDisabled(false);
        });

        this.setButtonsDisabled(disabled);
        this.setOnClickForButtons();
    }

    setOnClickForButtons() {
        let {ee, $addBtn, $editBtn, $deleteBtn} = this;
        $addBtn.click(() => {
            ee.emit(BUTTON_EVENTS.ADD_NEW_USER);
        });
        $editBtn.click(() => {
            ee.emit(BUTTON_EVENTS.EDIT_BUTTON_CLICK);
        });
        $deleteBtn.click(() => {
            let answer = confirm('Czy chcesz usunąć tego użytkownika?');
            if (answer) {
                this.setButtonsDisabled(true);
                ee.emit(BUTTON_EVENTS.DELETE_USER);
            }
        });
    }

    hide() {
        $(this.divID).empty();
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
