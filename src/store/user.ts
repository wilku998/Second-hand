 import { observable, computed, autorun } from 'mobx'
 import IUser from '../interfaces/User';

export default class UserStore {
    constructor(){
        autorun(() => console.log(this.log))
    }

    @observable user: IUser = undefined;

    @computed get log(){
        return {...this.user}
    }
    @computed get isAuth(){
        return !!this.user
    }
}
