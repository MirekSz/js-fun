/*eslint-disable */

import EventEmitter from 'event-emitter';
import UserService, {USER_SERVICE_EVENT} from '../src/UserService';

describe('UserService tests...', function () {

    function stubPromise(data) {
        return () => Promise.resolve(data);
    }

    let ee = new EventEmitter();
    let userService = new UserService(ee, 'http://localhost:3000', '/users/');
    let spy;

    beforeEach(function () {
        this.sinon = sinon.sandbox.create();
        spy = sinon.spy(userService, 'getUsers');
    });

    afterEach(function () {
        spy.restore();
        this.sinon.restore();
    });

    ita('Should emit USERS_NEW_DATA event after load users', async() => {

        //given
        let users = [];
        ee.on(USER_SERVICE_EVENT.USERS_NEW_DATA, (data)=> {
            users = data;
        });
        let stub = sinon.stub(userService.http, 'getData', stubPromise({data:[{}, {}]}));

        //when
        await userService.getUsers();

        //then
        expect(users.length).to.be.eq(2);
        stub.restore();
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
        stub.restore();
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
        stub.restore();
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
        stub.restore();
    });
});
describe('UserService + HttpManager + backend tests...', function () {
    let ee = new EventEmitter();
    let service = new UserService(ee, 'http://localhost:3000', '/users/');
    let user = {id: 14, name: 'K', surname: 'S', age: '34', sex: 'Mężczyzna'};

    ita('should add user', async() => {
        //given
        let users = await service.getUsers();
        let currentCount = users.length;

        //when
        await service.addUser(user);
        let newUsers = await service.getUsers();
        let newCount = newUsers.length;

        //then
        expect(newCount).to.be.eq(currentCount + 1);
    });
    ita('should edit user', async() => {
        //given
        let users = await service.getUsers();
        let id = users[0].id;
        users[0].name = 'M'

        //when
        let newUsers = await service.editUser(users[0]);
        let newUser = {};
        newUsers.forEach((element) => {
            if (element.id === id) {
                newUser = element;
            }
        });

        //then
        expect(newUser).to.be.eql(users[0]);
    });
    ita('should delete user', async() => {
        //given
        let users = await service.getUsers();
        console.log(users.length);
        let currentCount = users.length;

        if(!currentCount) {
            throw 'Received 0 users from backend!';
        }

        //when
        let newUsers = await service.deleteUser(users[currentCount-1].id);
        let newCount = newUsers.length;

        //then
        expect(newCount).to.be.eq(currentCount - 1);
    });
});
