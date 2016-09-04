/*eslint-disable */

import EventEmitter from 'event-emitter';
import UserService, {USER_SERVICE_EVENT} from '../src/UserService';


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
    it('should add user', () => {
        //given
        var promise = service.getUsers();
        promise.then((users) => {
            var currentSize = users.length;
            service.addUser({name: 'Jan'}).then(() => {
                service.getUsers().then((users) => {
                    var lastSize = users.length;
                    expect(1).to.be.eq(currentSize + 1);
                });
            })
        });
    });
    it('should fire event after load users', (done) => {
        //given
        let users = [];
        ee.on(USER_SERVICE_EVENT.USERS_NEW_DATA, (data)=> {
            users = data;
        });

        var userService = new UserService(ee);
        userService.http = {
            getData: ()=> {
                return Promise.resolve({data: [{}]});
            }
        };

        //when
        userService.getUsers().then(()=>{
        expect(users).to.not.be.empty;

        }).then(done).catch(done);

        //thenn
        // expect(users).to.not.be.empty; expect z sinona

    });
});
