import $ from 'jquery';
import template from './formView.hbs';

export const FORM_EVENTS = {
    USER_EDITED: 'user-edited',
    USER_ADDED: 'userAdded',
    FORM_CANCELED: 'formCanceled'
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
    }

    /**
     *
     * @param {string} divID
     * @param {string} mode
     */
    render(divID, mode) {
        this.divID = divID;
        this.mode = mode;
        let {ee} = this;
        $(this.divID).html(FormView.prepareFormHtml(this.mode));
        $('#cancelBtn').click(() => {
            this.hideFormView();
            ee.emit(FORM_EVENTS.FORM_CANCELED);
        });
    }

    hideFormView() {
        this.mode = 'Hidden';
        $(this.divID).html('');
    }

    /**
     *
     * @param $form
     * @param {User} user
     * @returns {User}
     */
    serializeForm($form, user) {
        let inputs = $form.find('input');
        $.each(inputs, (index, element) => {
            user[element.name] = element.value;
        });
        let selects = $form.find('select');
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
        let inputs = $form.find('input');
        $.each(inputs, (index, element) => {
            element.value = user[element.name];
        });
        let selects = $form.find('select');
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
