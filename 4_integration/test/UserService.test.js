/*eslint-disable */

let chai = require('chai');
let sinonChai = require('sinon-chai');
let sinon = require('sinon/pkg/sinon');

chai.use(sinonChai);

import EventEmitter from 'event-emitter';
import UserService, {USER_SERVICE_EVENT} from '../src/UserService';

describe('UserService tests...', function () {

    let ee = new EventEmitter();
    let userService = new UserService(ee, 'localhost:3000', '/users/');
    let spy;

    beforeEach(function () {
        this.sinon = sinon.sandbox.create();
        spy = sinon.spy(userService, 'getUsers');
    });

    afterEach(function () {
        userService.getUsers.restore();
        this.sinon.restore();
    });

    ita('Should emit USERS_NEW_DATA event after load users', async() => {

        //given
        let users = [];
        ee.on(USER_SERVICE_EVENT.USERS_NEW_DATA, (data)=> {
            users = data;
        });
        sinon.stub(userService.http, 'getData', () => {
            return Promise.resolve({data: [{}, {}]});
        });

        //when
        await userService.getUsers();

        //then
        expect(users.length).to.be.eq(2);
    });
    ita('Should add user and then call getUsers', async() => {

        //given
        let stub = sinon.stub(userService.http, 'post', (url, newUser) => {
            return Promise.resolve(newUser);
        });

        //when
        let newUser = await userService.addUser({id:12});

        //then
        expect(newUser.id).to.be.eq(12);
        expect(stub).to.have.been.calledWith('/users/', {id:12});
        expect(spy).to.have.been.calledOnce;
    });
    ita('Should edit user and then call getUsers', async() => {

        //given
        let stub = sinon.stub(userService.http, 'put', () => {
            return Promise.resolve();
        });

        //when
        await userService.editUser({id:12});

        //then
        expect(stub).to.have.been.calledWith('/users/', {id:12});
        expect(spy).to.have.been.calledOnce;
    });
    ita('Should delete user and then call getUsers', async() => {

        //given
        let stub = sinon.stub(userService.http, 'doDelete', () => {
            return Promise.resolve();
        });

        //when
        await userService.deleteUser(12);

        //then
        expect(stub).to.have.been.calledWith('/users/12', 12);
        expect(spy).to.have.been.calledOnce;
    });
});
