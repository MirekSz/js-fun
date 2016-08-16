function DetailsView(ee) {
    this.setUpListeners(ee, this);
}

DetailsView.prototype.setUpListeners = function(ee, that){
    ee.addListener('onRowSelectionChange', function (user) {
        that.renderTo("#detailsView", user);
    });
    ee.addListener('editButtonClick', that.hideDetailsView);
    ee.addListener('addButtonClick', that.hideDetailsView);
    ee.addListener('deleteButtonClick', that.hideDetailsView);
};

DetailsView.prototype.renderTo = function (divID, user) {
    $(divID).html(prepareDetailsHtml(user));
};

DetailsView.prototype.hideDetailsView = function () {
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
