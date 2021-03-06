function DetailsView(ee) {
    this.ee = ee;
    this.setUpListeners();
}

DetailsView.prototype.setUpListeners = function(){
    let that = this;
    let ee = this.ee;
    ee.addListener('onRowSelectionChange', function (user) {
        DetailsView.renderTo("#detailsView", user);
    });
    ee.addListener('edit-current-user', DetailsView.hideDetailsView);
    ee.addListener('add-new-user', DetailsView.hideDetailsView);
    ee.addListener('delete-user', DetailsView.hideDetailsView);
};

DetailsView.renderTo = function (divID, user) {
    $(divID).html(prepareDetailsHtml(user));
};

DetailsView.hideDetailsView = function () {
    $("#detailsView").html("");
};

function prepareDetailsHtml(user) {
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
