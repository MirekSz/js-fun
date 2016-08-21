import $ from "jquery";
import template from './buttonView.hbs';
import {EVENTS as EVENTS_TABLE} from './TableView'

export const EVENTS = {
    onRowSelectionChange: 'onRowSelectionChange'
};

class ButtonView {
    /**
     *
     * @param {EventEmitter} ee
     * @param {string} divID
     */
    constructor(ee, divID) {
        this.ee = ee;
        this.divID = divID;
        this.setUpListeners();
    }

    setUpListeners() {
        let {ee} = this;
        ee.on(EVENTS_TABLE.onRowSelectionChange, () => {
            ButtonView.setButtonsDisabled(false);
        });
        ee.on('userEdited', () => {
            this.render();
        });
        ee.on('userAdded', () => {
            this.render();
        });
        ee.on('formCanceled', this.render);
    }

    /**
     *
     * @param {boolean} val
     */
    static setButtonsDisabled(val) {
        $("#editBtn").prop("disabled", val);
        $("#deleteBtn").prop("disabled", val);
    }

    render() {
        $(this.divID).html(ButtonView.prepareButtonHtml());
        this.setOnClickForButtons();
    }

    setOnClickForButtons() {
        let {ee} = this;
        $("#addBtn").click(() => {
            ee.emit('add-new-user');
            this.hideButtonView();
        });
        $("#editBtn").click(() => {
            ee.emit('edit-current-user');
            this.hideButtonView();
        });
        $("#deleteBtn").click(() => {
            var answer = confirm("Czy chcesz usunąć tego użytkownika?");
            if (answer) {
                ButtonView.setButtonsDisabled(true);
                ee.emit('delete-user');
            }
        });
    }

    hideButtonView() {
        $(this.divID).html("");
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