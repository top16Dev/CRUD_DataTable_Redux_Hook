import Api from './api';
import { UserModel } from '../models/redux-models';

// eslint-disable-next-line import/no-anonymous-default-export
export default{
    async getAllUsers(){
        var response = await Api().get('posts');
        return response.data;
    },
    async getFilteredUsers(filterString:string){
        var response = await Api().get('posts');
        return response.data.filter((user:UserModel) => (user.body.includes(filterString) || user.title.includes(filterString)));
    },
    async getParticularUser(user_id:number){
        var response = await Api().get('posts');
        return response.data.filter((user:UserModel) => user.id === user_id)[0];
    },
    async deleteParticularUser(user_id:number){
        var response = await Api().get('posts');
        return response.data.filter((user:UserModel) => user.id === user_id)[0];
    },
    async addUser(title:string, description:string){
        const user: UserModel = {userId:0, id:0, title:title, body:description};
        return user;
    },
    async updateUser(user_id:number, title:string, description:string){
        const user: UserModel = {userId:user_id, id:user_id, title:title, body:description};
        return user;
    }
}