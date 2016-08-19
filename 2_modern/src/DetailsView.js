import $ from "jquery";

class DetailsView {
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
        ee.on('onRowSelectionChange', (user) => {
            this.render(user);
        });
        ee.on('edit-current-user', () => {
            this.hideDetailsView();
        });
        ee.on('add-new-user', () => {
            this.hideDetailsView();
        });
        ee.on('delete-user', () => {
            this.hideDetailsView();
        });
    }

    /**
     *
     * @param {User} user
     */
    render(user) {
        $(this.divID).html(DetailsView.prepareDetailsHtml(user));
    }

    hideDetailsView() {
        $(this.divID).html("");
    };

    /**
     *
     * @param {User} user
     * @returns {string}
     */
    static prepareDetailsHtml(user) {
        return `<div class="container">
                <div class="row">
                    <div class="col-md-2 evLabel">Imie:</div>
                    <div class="col-md-2 evValue">${user.name}</div>
                </div>
                <div class="row">
                    <div class="col-md-2 evLabel">Nazwisko:</div>
                    <div class="col-md-2 evValue">${user.surname}</div>
                </div>
                <div class="row">
                    <div class="col-md-2 evLabel">Wiek:</div>
                    <div class="col-md-2 evValue">${user.age}</div>
                </div>
                <div class="row">
                    <div class="col-md-2 evLabel">Płeć:</div>
                    <div class="col-md-2 evValue">${user.sex}</div>
                </div>
            </div>`;
    }
}

export default DetailsView;