import $ from "jquery";
import template from './formView.hbs';

import {TABLE_EVENTS} from './TableView'
import {BUTTON_EVENTS} from './ButtonView';

export const FORM_EVENTS = {
    USER_EDITED:'user-edited',
    USER_ADDED:'userAdded',
    FORM_CANCELED:'formCanceled'
};

class FormView {
    /**
     *
     * @param {EventEmitter} ee
     * @param {UserService} service
     */
    constructor(ee, service) {
        this.ee = ee;
        this.service = service;
        this.setUpListeners();
    }

    setDivID(div) {
        this.divID = div;
        return this;
    }

    setUpListeners() {
        let {ee} = this;
        ee.on(TABLE_EVENTS.EDIT_USER, (user) => {
            this.renderWithMode("Edytuj");
            let $form = $("#form");
            this.deserializeForm($form, user);

            $form.on("submit", (e) => {
                e.preventDefault();
                user = this.serializeForm($form, user);
                this.hideFormView();
                this.service.editUser(user); //TODO: przetestować zamianę tej linii z ee.emit
                ee.emit(FORM_EVENTS.USER_EDITED);
            });
        });
        ee.on(BUTTON_EVENTS.ADD_NEW_USER, () => {
            this.renderWithMode("Dodaj");
            var $form = $("#form");

            $form.on("submit", (e) => {
                e.preventDefault();
                var user = this.serializeForm($form, {});
                this.hideFormView();
                this.service.addUser(user); //TODO: to samo
                ee.emit(FORM_EVENTS.USER_ADDED);
            });
        });
    };

    /**
     *
     * @param {string} mode
     */
    renderWithMode(mode) {
        let {ee} = this;
        $(this.divID).html(FormView.prepareFormHtml(mode));
        $("#cancelBtn").click(() => {
            this.hideFormView();
            ee.emit(FORM_EVENTS.FORM_CANCELED);
        });
    };

    hideFormView() {
        $(this.divID).html("");
    };

    /**
     *
     * @param $form
     * @param {User} user
     * @returns {User}
     */
    serializeForm($form, user) {
        var inputs = $form.find("input");
        $.each(inputs, (index, element) => {
            user[element.name] = element.value;
        });
        var selects = $form.find("select");
        $.each(selects, (index, element) => {
            user[element.name] = element.value;
        });
        return user;
    }

    /**
     *
     * @param $form
     * @param {User} user
     */
    deserializeForm($form, user) {
        let inputs = $form.find("input");
        $.each(inputs, (index, element) => {
            element.value = user[element.name];
        });
        let selects = $form.find("select");
        $.each(selects, (index, element) => {
            element.value = user[element.name];
        });
    }

    /**
     *
     * @param {string} mode Dodaj lub Edytuj
     * @returns {string}
     */
    static prepareFormHtml(mode) {
        return template({mode: mode});
    }
}
export default FormView;
