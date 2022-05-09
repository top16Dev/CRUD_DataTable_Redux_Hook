// import { PayloadAction } from "@reduxjs/toolkit";
import {UserModel, UserArrayModel} from "../models/redux-models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const intiailUserState:UserArrayModel={
    all_users:[],
    filtered_users:[],
    cnt : 101,
    particular_User:{
        "userId":0,
        "id": 0,
        "title": "",
        "body": ""
    }
}
const userSlice = createSlice({
    name:'UserInformation',
    initialState:intiailUserState,
    reducers:{
        setUsers(state, action:PayloadAction<UserModel[]>){
            state.all_users = action.payload;
        },
        setFilter(state, action:PayloadAction<string>){
            // state.filtered_users = action.payload;
            state.filtered_users = state.all_users.filter((user:UserModel) => (user.body.includes(action.payload) || user.title.includes(action.payload)));
        },
        setParticularUser(state, action:PayloadAction<number>){
            state.all_users.map((user, it = 0) => {
                if(user.id === action.payload) state.particular_User = user;
                it++;
            })
            // console.log(action.payload.title);
        },
        setDeleteUser(state, action:PayloadAction<UserModel>){
            // eslint-disable-next-line array-callback-return
            state.all_users.map((user, it = 0) => {
                if(user.id === action.payload.id) state.all_users.splice(it, 1);
                it++;
            })
            
        },
        setUpdateUser(state, action:PayloadAction<UserModel>){
            // eslint-disable-next-line array-callback-return
            state.all_users.map((user, it = 0) => {
                if(user.id === action.payload.id){
                    state.all_users[it] = action.payload;
                }
                it++;
            })
            
        },
        setAddUser(state, action:PayloadAction<UserModel>){
            state.all_users.push({userId:state.cnt, id:state.cnt++, title:action.payload.title,body:action.payload.body})
            // state.particular_User = action.payload;
        }
    }
})
export default userSlice;