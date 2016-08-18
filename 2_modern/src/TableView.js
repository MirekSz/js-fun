import $ from 'jquery';

class TableView {
    /**
     *
     * @param {EventEmitter} ee
     * @param {string} divID
     */
    constructor(ee, divID) {
        this.ee = ee;
        this.divID = divID;
        this.users = [];
        this.setUpListeners();
    }

    setUpListeners() {
        let {ee} = this;
        ee.on('users-new-data', (users) => {
            this.users = users;
            this.render();
        });
        ee.on('delete-user', () => {
            this.users.splice(this.selectedRow, 1);
            this.render();
        });
        ee.on('edit-current-user', () => {
            this.hideTableView();
            ee.emit('editUser', this.users[this.selectedRow]);
        });
        ee.on('add-new-user', this.hideTableView);
        ee.on('userEdited', (user) => {
            this.users[this.selectedRow] = user;
            this.render()
        });
        ee.on('userAdded', (user) => {
            this.users.push(user);
            this.render()
        });
        ee.on('formCanceled', () => {
            this.render();
        });
    };

    render() {
        this.selectedRow = -1;
        $(this.divID).html(TableView.prepareTableHtml(this.users));
        $(this.divID).find("table tbody tr").on('click', (event) => {
            let userId = parseInt((event.target.parentElement.id).substring(8));
            this.onRowClick(userId);
        });
    };

    /**
     *
     * @param {number} rowNumber
     */
    onRowClick(rowNumber) {
        let selected = this.selectedRow;
        if (selected != -1) {
            $("#tableRow" + selected).removeClass("activeRow");
        }
        $("#tableRow" + rowNumber).addClass("activeRow");
        this.selectedRow = rowNumber;
        if (selected !== rowNumber) {
            this.ee.emit('onRowSelectionChange', this.users[rowNumber]);
        }
    };

    hideTableView() {
        $(this.divID).html("");
    };

    /**
     *
     * @param {Array} users
     * @returns {string}
     */
    static prepareTableHtml(users) {
        let tHeadHtml = `<thead>
                        <tr>
                            <th class="col-md-3">Imię</th>
                            <th class="col-md-5">Nazwisko</th>
                            <th class="col-md-2">Wiek</th>
                            <th class="col-md-2">Płeć</th>
                        </tr>
                     </thead>`;

        let rowsHtml = users.map(createRow).join('');

        return `<table class="table table-bordered">
                    ${tHeadHtml}
                    <tbody>
                        ${rowsHtml}
                    </tbody>
                </table>`;

        /**
         *
         * @param  {User} user
         * @param {number} rowNumber
         * @returns {string}
         */
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