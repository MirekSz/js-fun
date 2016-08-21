import $ from 'jquery';
//noinspection JSUnresolvedVariable
import template from './tableView.hbs';

class TableView {
    /**
     *
     * @param {EventEmitter} ee
     * @param {HttpManager} httpManager
     * @param {string} divID
     */
    constructor(ee, httpManager, divID) {
        this.ee = ee;
        this.httpManager = httpManager;
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
            this.httpManager.deleteUser(this.users[this.selectedRow].id);
        });
        ee.on('edit-current-user', () => {
            this.hideTableView();
            ee.emit('editUser', this.users[this.selectedRow]);
        });
        ee.on('add-new-user', this.hideTableView);
        ee.on('userEdited', (user) => {
            this.httpManager.editUser(user);
        });
        ee.on('userAdded', (user) => {
            this.httpManager.addUser(user);
        });
        ee.on('formCanceled', () => {
            this.render();
        });
    };

    render() {
        this.selectedRow = -1;
        $(this.divID).html(TableView.prepareTableHtml(this.users));
        $(this.divID).find("table tbody tr").on('click', (event) => {
            let rowNumber = parseInt((event.target.parentElement.id).substring(8));
            this.onRowClick(rowNumber);
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
        return template({users: users});
    }
}

export default TableView;