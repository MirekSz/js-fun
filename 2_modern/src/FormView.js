import $ from 'jquery';

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

    hideFormView () {
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
        $.each(inputs, function (index, element) {
            user[element.name] = element.value;
        });
        var selects = $form.find("select");
        $.each(selects, function (index, element) {
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
        $.each(inputs, function (index, element) {
            element.value = user[element.name];
        });
        let selects = $form.find("select");
        $.each(selects, function (index, element) {
            console.log(element);
            element.value = user[element.name];
        });
    }

    /**
     *
     * @param {string} mode
     * @returns {string}
     */
    static prepareFormHtml(mode) {
        return `<div class=\"row\">
                <div class=\"col-md-4\">&nbsp;<\/div>
                <div class=\"col-md-4\">
                    <h3>${mode + " Użytkownika"}<\/h3>
                    <form name=\"form\" id=\"form\">
                        <div class=\"form-group\">
                            <label for=\"name\">Imie:<\/label>
                            <input id=\"name\" name=\"name\" class=\"form-control\" type=\"text\" required>
                        <\/div>
                        <div class=\"form-group\">
                            <label for=\"surname\">Nazwisko:<\/label>
                            <input id=\"surname\" name=\"surname\" class=\"form-control\" type=\"text\" required>
                        <\/div>
                        <div class=\"form-group\">
                            <label for=\"age\">Wiek:<\/label>
                            <input id=\"age\" name=\"age\" class=\"form-control\" type=\"number\" min=\"18\" max=\"99\" required>
                        <\/div>
                        <div class=\"form-group\">
                            <label for=\"sex\">Płeć:<\/label>
                            <select class=\"form-control\" name=\"sex\" id=\"sex\">
                                <option>Mężczyzna<\/option>
                                <option>Kobieta<\/option>
                            <\/select>
                        <\/div>
                        <div class=\"form-group\">
                            <button type=\"submit\" class=\"btn btn-primary\">Zapisz<\/button>
                            <button type=\"button\" id=\"cancelBtn\" class=\"btn btn-warning\">Cofnij<\/button>
                        <\/div>
                    <\/form>
                <\/div>
            <div class=\"col-md-4\">&nbsp;<\/div><\/div>`;
    }
}
export default FormView;
