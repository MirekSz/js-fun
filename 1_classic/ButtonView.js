function ButtonView(ee) {
    this.ee = ee;
    this.setUpListeners();
}

ButtonView.prototype.setUpListeners = function () {
    let that = this;
    let ee = this.ee;
    ee.addListener('onRowSelectionChange', function () {
        $("#editBtn").prop("disabled", false);
        $("#deleteBtn").prop("disabled", false);
    });
    ee.addListener('add-new-user', ButtonView.hideButtonView);
    ee.addListener('edit-current-user', ButtonView.hideButtonView);
    ee.addListener('userEdited', function () {
        that.renderTo("#buttonView");
    });
    ee.addListener('userAdded', function () {
        that.renderTo("#buttonView");
    });
    ee.addListener('formCanceled', function () {
        that.renderTo("#buttonView");
    });
};

ButtonView.prototype.renderTo = function (divID) {
    $(divID).html(prepareButtonHtml());
    setOnClickForButtons(this.ee);
};

ButtonView.hideButtonView = function () {
    $("#buttonView").html("");
};

function setOnClickForButtons(ee) {
    $("#addBtn").click(function () {
        ee.emitEvent('add-new-user');
    });
    $("#editBtn").click(function () {
        ee.emitEvent('edit-current-user');
    });
    $("#deleteBtn").click(function () {
        var answer = confirm("Czy chcesz usunąć tego użytkownika?");
        if (answer) {
            ee.emitEvent('delete-user');
        }
    });
}

function prepareButtonHtml() {
    return `<button type=\"button\" class=\"btn btn-primary\" id=\"addBtn\">Dodaj<\/button>
            <button type=\"button\" class=\"btn btn-primary\" id=\"editBtn\" disabled>Popraw<\/button>
            <button type=\"button\" class=\"btn btn-primary\" id=\"deleteBtn\" disabled>Usuń<\/button>`;
}