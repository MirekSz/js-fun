function TableView(ee) {
    this.ee = ee;
    this.users = [];
    this.setUpListeners(ee, this);
}

TableView.prototype.setUpListeners = function (ee, that) {
    ee.addListener('users-new-data', function (users) {
        that.users = users;
        that.renderTo("#workspace", that);
    });
    ee.addListener('onRowClick', function (rowNumber) {
        that.onRowClick(rowNumber, that);
    });
    ee.addListener('deleteButtonClick', function () {
        that.users.splice(that.selectedRow, 1);
        that.renderTo("#workspace", that);
    });
    ee.addListener('editButtonClick', function () {
        that.hideTableView();
        ee.emitEvent('editUser', [that.users[that.selectedRow]]);
    });
    ee.addListener('addButtonClick', that.hideTableView);
    ee.addListener('userEdited', function (user) {
        that.users[that.selectedRow] = user;
        that.renderTo("#workspace", that)
    });
    ee.addListener('userAdded', function (user) {
        that.users.push(user);
        that.renderTo("#workspace", that)
    });
    ee.addListener('formCanceled', function () {
        that.renderTo("#workspace", that);
    });
};

TableView.prototype.renderTo = function (divID, tableView) {
    tableView.selectedRow = -1;
    var that = this;
    $(divID).html(prepareTableHtml(tableView.users));
    $(divID).find("table tbody tr").on('click', function (event) {
        var userId = parseInt((event.target.parentElement.id).substring(8));
        that.ee.emitEvent('onRowClick', [userId]);
    });
};

TableView.prototype.hideTableView = function () {
    $("#workspace").html("");
};

TableView.prototype.onRowClick = function (rowNumber, that) {
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