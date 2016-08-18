import $ from 'jquery';

class DetailsView {
    constructor(ee) {
        this.ee = ee;
        this.setUpListeners();
    }

    setUpListeners () {
        let ee = this.ee;
        ee.on('onRowSelectionChange', function (user) {
            DetailsView.renderTo("#detailsView", user);
        });
        ee.on('edit-current-user', DetailsView.hideDetailsView);
        ee.on('add-new-user', DetailsView.hideDetailsView);
        ee.on('delete-user', DetailsView.hideDetailsView);
    }

    static renderTo (divID, user) {
        $(divID).html(DetailsView.prepareDetailsHtml(user));
    }

    static hideDetailsView () {
        $("#detailsView").html("");
    };

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