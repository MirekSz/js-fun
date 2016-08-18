function TableView(ee) {
    this.ee = ee;
    this.users = [];
    this.setUpListeners();
}

TableView.prototype.setUpListeners = function () {
    let that = this;
    let ee = that.ee;
    ee.addListener('users-new-data', function (users) {
        that.users = users;
        that.renderTo("#workspace");
    });
    ee.addListener('onRowClick', function (rowNumber) {
        that.onRowClick(rowNumber);
    });
    ee.addListener('delete-user', function () {
        that.users.splice(that.selectedRow, 1);
        that.renderTo("#workspace");
    });
    ee.addListener('edit-current-user', function () {
        TableView.hideTableView();
        ee.emitEvent('editUser', [that.users[that.selectedRow]]);
    });
    ee.addListener('add-new-user', TableView.hideTableView);
    ee.addListener('userEdited', function (user) {
        that.users[that.selectedRow] = user;
        that.renderTo("#workspace")
    });
    ee.addListener('userAdded', function (user) {
        that.users.push(user);
        that.renderTo("#workspace")
    });
    ee.addListener('formCanceled', function () {
        that.renderTo("#workspace");
    });
};

TableView.prototype.renderTo = function (divID) {
    this.selectedRow = -1;
    var that = this;
    $(divID).html(prepareTableHtml(that.users));
    $(divID).find("table tbody tr").on('click', function (event) {
        var userId = parseInt((event.target.parentElement.id).substring(8));
        that.ee.emitEvent('onRowClick', [userId]);
    });
};

TableView.hideTableView = function () {
    $("#workspace").html("");
};

TableView.prototype.onRowClick = function (rowNumber) {
    let that = this;
    var selected = that.selectedRow;
    if (selected != -1) {
        $("#tableRow" + selected).removeClass("activeRow");
    }
    $("#tableRow" + rowNumber).addClass("activeRow");
    that.selectedRow = rowNumber;
    if (selected !== rowNumber) {
        that.ee.emitEvent('onRowSelectionChange', [that.users[rowNumber]]);
    }
};

function prepareTableHtml(users) {
    var tHeadHtml = `<thead>
                        <tr>
                            <th class="col-md-3">Imię</th>
                            <th class="col-md-5">Nazwisko</th>
                            <th class="col-md-2">Wiek</th>
                            <th class="col-md-2">Płeć</th>
                        </tr>
                     </thead>`;

    var rowsHtml = '';
    var i;
    for (i = 0; i < users.length; i++) {
        rowsHtml += createRow(users[i], i);
    }
    return '<table class="table table-bordered">' + tHeadHtml
        + '<tbody>' + rowsHtml + '</tbody></table>';

    function createRow(user, rowNumber) {
        return `<tr id="tableRow${rowNumber}">
                    <td>${user.name}</td>
                    <td>${user.surname}</td>
                    <td>${user.age}</td>
                    <td>${user.sex}</td>
                </tr>`;
    }
}