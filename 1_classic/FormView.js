function FormView(ee) {
    this.ee = ee;
    this.setUpListeners();
}

FormView.prototype.setUpListeners = function () {
    let that = this;
    let ee = this.ee;
    ee.addListener('editUser', function (user) {
        that.renderTo('#workspace', "Edytuj");
        var $form = $("#form");
        deserializeForm($form, user);
        $form.on("submit", function (e) {
            e.preventDefault();
            var user = serializeForm($form, {});
            FormView.hideFormView();
            ee.emitEvent('userEdited', [user]);
        });
    });
    ee.addListener('add-new-user', function () {
        that.renderTo('#workspace', "Dodaj");
        var $form = $("#form");
        $form.on("submit", function (e) {
            e.preventDefault();
            var user = serializeForm($form, {});
            FormView.hideFormView();
            ee.emitEvent('userAdded', [user]);
        });
    });
};

FormView.prototype.renderTo = function (divID, mode) {
    let ee = this.ee
    $("#workspace").html(prepareFormHtml(mode));
    $("#cancelBtn").click(function () {
        ee.emitEvent('formCanceled');
    });
};

FormView.hideFormView = function () {
    $("#workspace").html("");
};

function serializeForm($form, user) {
    var inputs = $form.find("input");
    $.each(inputs, function (index, element) {
        console.log(element);
        user[element.name] = element.value;
    });
    var selects = $form.find("select");
    $.each(selects, function (index, element) {
        console.log(element);
        user[element.name] = element.value;
    });
    return user;
}

function deserializeForm($form, user) {
    var inputs = $form.find("input");
    $.each(inputs, function (index, element) {
        var name = element.name;
        element.value = user[name];
    });
    var selects = $form.find("select");
    $.each(selects, function (index, element) {
        console.log(element);
        element.value = user[element.name];
    });
}

function prepareFormHtml(mode) {
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