import $ from 'jquery';

class TableView {
    constructor(ee) {
        this.ee = ee;
        this.users = [];
        this.setUpListeners();
    }

    setUpListeners () {
        let that = this;
        let ee = that.ee;
        ee.on('users-new-data', function (users) {
            that.users = users;
            that.renderTo("#workspace");
        });
        ee.on('onRowClick', function (rowNumber) {
            that.onRowClick(rowNumber);
        });
        ee.on('delete-user', function () {
            that.users.splice(that.selectedRow, 1);
            that.renderTo("#workspace");
        });
        ee.on('edit-current-user', function () {
            TableView.hideTableView();
            ee.emit('editUser', that.users[that.selectedRow]);
        });
        ee.on('add-new-user', TableView.hideTableView);
        ee.on('userEdited', function (user) {
            that.users[that.selectedRow] = user;
            that.renderTo("#workspace")
        });
        ee.on('userAdded', function (user) {
            that.users.push(user);
            that.renderTo("#workspace")
        });
        ee.on('formCanceled', function () {
            that.renderTo("#workspace");
        });
    };

    renderTo (divID) {
        this.selectedRow = -1;
        var that = this;
        $(divID).html(TableView.prepareTableHtml(that.users));
        $(divID).find("table tbody tr").on('click', function (event) {
            var userId = parseInt((event.target.parentElement.id).substring(8));
            that.ee.emit('onRowClick', userId);
        });
    };

    onRowClick (rowNumber) {
        let that = this;
        let selected = that.selectedRow;
        if (selected != -1) {
            $("#tableRow" + selected).removeClass("activeRow");
        }
        $("#tableRow" + rowNumber).addClass("activeRow");
        that.selectedRow = rowNumber;
        if (selected !== rowNumber) {
            that.ee.emit('onRowSelectionChange', that.users[rowNumber]);
        }
    };

    static hideTableView () {
        $("#workspace").html("");
    };

    static prepareTableHtml(users) {
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
}

export default TableView;