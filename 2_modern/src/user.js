'use strict';

class User {
    constructor(id, name, surname, age, sex) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.sex = sex;
    }
}

module.exports.User = User;