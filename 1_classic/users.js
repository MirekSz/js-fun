//initialization
$(document).ready(initialize);

var ee = new EventEmitter();

function initialize() {
    new TableView(ee);
    new DetailsView(ee);
    new ButtonView(ee).renderTo("#buttonView", ee);
    new FormView(ee);
    getData(ee);
}

function getData(ee) {
    var users = [{name: 'Jacek', surname: 'Doe', age: '43', sex: 'Mężczyzna'},
        {name: 'Marzanna', surname: 'Uss', age: '54', sex: 'Kobieta'},
        {name: 'Julia', surname: 'Dolej', age: '22', sex: 'Kobieta'}];
    setTimeout(function () {
        ee.emitEvent('users-new-data', [users]);
    }, 30);
}

// DetailsView
function DetailsView(ee) {
    this.setUpListeners(ee, this);
}

DetailsView.prototype.setUpListeners = function(ee, that){
    ee.addListener('onRowSelectionChange', function (user) {
        that.renderTo("#extendedView", user);
    });
    ee.addListener('editButtonClick', that.hideDetailsView);
    ee.addListener('addButtonClick', that.hideDetailsView);
    ee.addListener('deleteButtonClick', that.hideDetailsView);
};

DetailsView.prototype.renderTo = function (divID, user) {
    $(divID).html(prepareExtendedView(user));
};

DetailsView.prototype.hideDetailsView = function () {
    $("#extendedView").html("");
};

// TableView
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
    $(divID).html(prepareTableHtml(tableView.users));
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
        ee.emitEvent('onRowSelectionChange', [that.users[rowNumber]]);
    }
};

function onRowClick(rowNumber) {
    ee.emitEvent('onRowClick', [rowNumber]);
}

// ButtonView
function ButtonView(ee) {
    this.ee = ee;
    this.setUpListeners(ee, this);
}

ButtonView.prototype.setUpListeners = function (ee, that) {
    ee.addListener('onRowSelectionChange', function () {
        $("#editBtn").prop("disabled", false);
        $("#deleteBtn").prop("disabled", false);
    });
    ee.addListener('addButtonClick', that.hideButtonView);
    ee.addListener('addButtonClick', that.hideButtonView);
    ee.addListener('userEdited', function () {
        that.renderTo("#buttonView", ee);
    });
    ee.addListener('userAdded', function () {
        that.renderTo("#buttonView", ee);
    });
    ee.addListener('formCanceled', function () {
        that.renderTo("#buttonView", ee);
    });
};

ButtonView.prototype.renderTo = function (divID, ee) {
    $(divID).html(prepareButtonHtml());
    setOnClickForButtons(ee);
};

ButtonView.prototype.hideButtonView = function () {
    $("#buttonView").html("");
};

function setOnClickForButtons(ee) {
    $("#addBtn").click(function () {
        ee.emitEvent('addButtonClick');
    });
    $("#editBtn").click(function () {
        ee.emitEvent('editButtonClick');
    });
    $("#deleteBtn").click(function () {
        var answer = confirm("Czy chcesz usunąć tego użytkownika?");
        if (answer) {
            ee.emitEvent('deleteButtonClick');
        }
    });
}

// FormView
function FormView(ee) {
    this.ee = ee;
    this.setUpListeners(ee, this);
}

FormView.prototype.setUpListeners = function (ee, that) {
    ee.addListener('editUser', function (user) {
        that.renderTo('#workspace', ee, "Edytuj");
        var $form = $("#form");
        deserializeForm($form, user);
        $form.on("submit", function (e) {
            e.preventDefault();
            var user = serializeForm($form, {});
            that.hideFormView();
            ee.emitEvent('userEdited', [user]);
        });
    });
    ee.addListener('addButtonClick', function () {
        that.renderTo('#workspace', ee, "Dodaj");
        var $form = $("#form");
        $form.on("submit", function (e) {
            e.preventDefault();
            var user = serializeForm($form, {});
            that.hideFormView();
            ee.emitEvent('userAdded', [user]);
        });
    });
};

FormView.prototype.renderTo = function (divID, ee, mode) {
    $("#workspace").html(prepareFormHtml(mode));
    $("#cancelBtn").click(function () {
        ee.emitEvent('formCanceled');
    });
};

FormView.prototype.hideFormView = function () {
    $("#workspace").html("");
};

function serializeForm($form, user) {
    var inputs = $form.find("input");
    $.each(inputs, function (index, element) {
        console.log(element);
        user[element.name] = element.value;
    });
    var selects = $form.find("select");
    $.each(selects, function (index, element) {
        console.log(element);
        user[element.name] = element.value;
    });
    return user;
}

function deserializeForm($form, user) {
    var inputs = $form.find("input");
    $.each(inputs, function (index, element) {
        var name = element.name;
        element.value = user[name];
    });
    var selects = $form.find("select");
    $.each(selects, function (index, element) {
        console.log(element);
        element.value = user[element.name];
    });
}

//HTML preparing functions
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
        return `<tr onclick='onRowClick(${rowNumber})' id="tableRow${rowNumber}">
                    <td>${user.name}</td>
                    <td>${user.surname}</td>
                    <td>${user.age}</td>
                    <td>${user.sex}</td>
                </tr>`;
    }
}

function prepareButtonHtml() {
    return `<button type=\"button\" class=\"btn btn-primary\" id=\"addBtn\">Dodaj<\/button>
            <button type=\"button\" class=\"btn btn-primary\" id=\"editBtn\" disabled>Popraw<\/button>
            <button type=\"button\" class=\"btn btn-primary\" id=\"deleteBtn\" disabled>Usuń<\/button>`;
}

function prepareExtendedView(user) {
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

function prepareFormHtml(mode) {
    return `<div class=\"row\">
                <div class=\"col-md-4\">&nbsp;<\/div>
                <div class=\"col-md-4\">
                    <h3>${mode + " Użytkownika"}<\/h3>
                    <form name=\"form\" id=\"form\">
                        <div class=\"form-group\">
                            <label for=\"name\">Imie:<\/label>
                            <input id=\"name\" name=\"name\" class=\"form-control\" type=\"text\" required>
                        <\/div>
                        <div class=\"form-group\">
                            <label for=\"surname\">Nazwisko:<\/label>
                            <input id=\"surname\" name=\"surname\" class=\"form-control\" type=\"text\" required>
                        <\/div>
                        <div class=\"form-group\">
                            <label for=\"age\">Wiek:<\/label>
                            <input id=\"age\" name=\"age\" class=\"form-control\" type=\"number\" min=\"18\" max=\"99\" required>
                        <\/div>
                        <div class=\"form-group\">
                            <label for=\"sex\">Płeć:<\/label>
                            <select class=\"form-control\" name=\"sex\" id=\"sex\">
                                <option>Mężczyzna<\/option>
                                <option>Kobieta<\/option>
                            <\/select>
                        <\/div>
                        <div class=\"form-group\">
                            <button type=\"submit\" class=\"btn btn-primary\">Zapisz<\/button>
                            <button type=\"button\" id=\"cancelBtn\" class=\"btn btn-warning\">Cofnij<\/button>
                        <\/div>
                    <\/form>
                <\/div>
            <div class=\"col-md-4\">&nbsp;<\/div><\/div>`;
}