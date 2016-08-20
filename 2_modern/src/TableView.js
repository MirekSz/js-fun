import $ from 'jquery';
//noinspection JSUnresolvedVariable
import template from './tableView.hbs';

class TableView {
    /**
     *
     * @param {EventEmitter} ee
     * @param {string} divID
     */
    constructor(ee, divID) {
        this.ee = ee;
        this.divID = divID;
        this.users = new Map([]);
        this.setUpListeners();
    }

    setUpListeners() {
        let {ee} = this;
        ee.on('users-new-data', (users) => {
            this.users = users;
            this.render();
        });
        ee.on('delete-user', () => {
            this.users.delete(this.selectedRow);
            this.render();
        });
        ee.on('edit-current-user', () => {
            this.hideTableView();
            ee.emit('editUser', this.users.get(this.selectedRow));
        });
        ee.on('add-new-user', this.hideTableView);
        ee.on('userEdited', (user) => {
            this.users.set(this.selectedRow, user);
            this.render()
        });
        ee.on('userAdded', (user) => {
            this.users.set(this.users.size, user);
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
            this.ee.emit('onRowSelectionChange', this.users.get(rowNumber));
        }
    };

    hideTableView() {
        $(this.divID).html("");
    };

    /**
     *
     * @param {Map} users
     * @returns {string}
     */
    static prepareTableHtml(users) {
        return template({users:users});
    }
}

export default TableView;