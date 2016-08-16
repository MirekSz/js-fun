function ButtonView(ee) {
    this.ee = ee;
    this.setUpListeners(ee, this);
}

ButtonView.prototype.setUpListeners = function (ee, that) {
    ee.addListener('onRowSelectionChange', function () {
        $("#editBtn").prop("disabled", false);
        $("#deleteBtn").prop("disabled", false);
    });
    ee.addListener('addButtonClick', that.hideButtonView);
    ee.addListener('addButtonClick', that.hideButtonView);
    ee.addListener('userEdited', function () {
        that.renderTo("#buttonView", ee);
    });
    ee.addListener('userAdded', function () {
        that.renderTo("#buttonView", ee);
    });
    ee.addListener('formCanceled', function () {
        that.renderTo("#buttonView", ee);
    });
};

ButtonView.prototype.renderTo = function (divID, ee) {
    $(divID).html(prepareButtonHtml());
    setOnClickForButtons(ee);
};

ButtonView.prototype.hideButtonView = function () {
    $("#buttonView").html("");
};

function setOnClickForButtons(ee) {
    $("#addBtn").click(function () {
        ee.emitEvent('addButtonClick');
    });
    $("#editBtn").click(function () {
        ee.emitEvent('editButtonClick');
    });
    $("#deleteBtn").click(function () {
        var answer = confirm("Czy chcesz usunąć tego użytkownika?");
        if (answer) {
            ee.emitEvent('deleteButtonClick');
        }
    });
}

function prepareButtonHtml() {
    return `<button type=\"button\" class=\"btn btn-primary\" id=\"addBtn\">Dodaj<\/button>
            <button type=\"button\" class=\"btn btn-primary\" id=\"editBtn\" disabled>Popraw<\/button>
            <button type=\"button\" class=\"btn btn-primary\" id=\"deleteBtn\" disabled>Usuń<\/button>`;
}