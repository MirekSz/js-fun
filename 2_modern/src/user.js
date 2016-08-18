class User {
    constructor(name, surname, age, sex) {
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.sex = sex;
    }
    getName () {
        return this.name;
    }
    getSurname () {
        return this.surname;
    }
    getAge () {
        return this.age;
    }
    getSex () {
        return this.sex;
    }
}

module.exports = User;