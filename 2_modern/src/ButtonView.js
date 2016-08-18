import $ from "jquery";

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
        ee.on('onRowSelectionChange', ButtonView.enableButtons);
        ee.on('add-new-user', this.hideButtonView);
        ee.on('edit-current-user', this.hideButtonView);
        ee.on('userEdited', this.render);
        ee.on('userAdded', this.render);
        ee.on('formCanceled', this.render);
    }

    static enableButtons() {
        $("#editBtn").prop("disabled", false);
        $("#deleteBtn").prop("disabled", false);
    }

    render() {
        $(this.divID).html(ButtonView.prepareButtonHtml());
        this.setOnClickForButtons();
    }

    setOnClickForButtons() {
        let {ee} = this;
        $("#addBtn").click(ee.emit('add-new-user'));
        $("#editBtn").click(ee.emit('edit-current-user'));
        $("#deleteBtn").click(function () {
            var answer = confirm("Czy chcesz usunąć tego użytkownika?");
            if (answer) {
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
        return `<button type=\"button\" class=\"btn btn-primary\" id=\"addBtn\">Dodaj<\/button>
            <button type=\"button\" class=\"btn btn-primary\" id=\"editBtn\" disabled>Popraw<\/button>
            <button type=\"button\" class=\"btn btn-primary\" id=\"deleteBtn\" disabled>Usuń<\/button>`;
    }
}

export default ButtonView;