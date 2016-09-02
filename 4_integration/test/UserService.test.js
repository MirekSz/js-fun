/*eslint-disable */

import EventEmitter from 'event-emitter';
import UserService from '../src/UserService';
import User from '../src/user';

let baseUrl = 'http://localhost:3000';

let ee = new EventEmitter();


describe('UserService tests...', function () {
    let service = new UserService(ee, baseUrl, '/users/');
    ita('should add user', async() => {
        //given
        var users = await service.getUsers();
        var currentSize = users.length;

        //when
        await service.addUser({name: 'Jan'});

        //then
        users = await service.getUsers();
        var lastSize = users.length;
        expect(lastSize).to.be.eq(currentSize + 1);
    });
});
