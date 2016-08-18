import $ from 'jquery';

class ButtonView {
    constructor(ee) {
        this.ee = ee;
        this.setUpListeners();
    }

    setUpListeners () {
        let that = this;
        let ee = this.ee;
        ee.on('onRowSelectionChange', function () {
            $("#editBtn").prop("disabled", false);
            $("#deleteBtn").prop("disabled", false);
        });
        ee.on('add-new-user', ButtonView.hideButtonView);
        ee.on('edit-current-user', ButtonView.hideButtonView);
        ee.on('userEdited', function () {
            that.renderTo("#buttonView");
        });
        ee.on('userAdded', function () {
            that.renderTo("#buttonView");
        });
        ee.on('formCanceled', function () {
            that.renderTo("#buttonView");
        });
    }

    renderTo (divID) {
        $(divID).html(ButtonView.prepareButtonHtml());
        this.setOnClickForButtons(this.ee);
    }

    setOnClickForButtons (ee) {
        $("#addBtn").click(function () {
            ee.emit('add-new-user');
        });
        $("#editBtn").click(function () {
            ee.emit('edit-current-user');
        });
        $("#deleteBtn").click(function () {
            var answer = confirm("Czy chcesz usunąć tego użytkownika?");
            if (answer) {
                ee.emit('delete-user');
            }
        });
    }
    static hideButtonView () {
        $("#buttonView").html("");
    }
    static prepareButtonHtml () {
        return `<button type=\"button\" class=\"btn btn-primary\" id=\"addBtn\">Dodaj<\/button>
            <button type=\"button\" class=\"btn btn-primary\" id=\"editBtn\" disabled>Popraw<\/button>
            <button type=\"button\" class=\"btn btn-primary\" id=\"deleteBtn\" disabled>Usuń<\/button>`;
    }
}

export default ButtonView;