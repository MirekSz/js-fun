import $ from "jquery";
import template from './formView.hbs';

class FormView {
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
        ee.on('editUser', (user) => {
            this.renderWithMode("Edytuj");
            let $form = $("#form");
            this.deserializeForm($form, user);

            $form.on("submit", (e) => {
                e.preventDefault();
                var user = this.serializeForm($form, {});
                this.hideFormView();
                ee.emit('userEdited', user);
            });
        });
        ee.on('add-new-user', () => {
            this.renderWithMode("Dodaj");
            var $form = $("#form");

            $form.on("submit", (e) => {
                e.preventDefault();
                var user = this.serializeForm($form, {});
                this.hideFormView();
                ee.emit('userAdded', user);
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
            ee.emit('formCanceled');
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
            console.log(element);
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
