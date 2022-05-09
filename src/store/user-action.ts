import userSlice from "./user-slice";
import {AnyAction} from '@reduxjs/toolkit';
import { ThunkAction } from "@reduxjs/toolkit";
import {RootState} from './index';
import { UserModel } from "../models/redux-models";
import UserService from "../service/userService";

export const userAction = userSlice.actions

export const fetchUsers = () : ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState) => {
        if(getState().user.all_users.length === 0){
            const response:UserModel[] = await UserService.getAllUsers();
            dispatch(userAction.setUsers(response))
        }
    }
}

export const fetchFilter = (filter:string) : ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState) => {
        // const response:UserModel[] = await UserService.getFilteredUsers(filter);
        dispatch(userAction.setFilter(filter))
    }
}

export const fetchParticularUser = (user_id:number) : ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState) => {
        // const response:UserModel = await UserService.getParticularUser(user_id);
        // alert(response.title);
        dispatch(userAction.setParticularUser(user_id));
    }
}

export const fetchDeleteUser = (user_id:number) : ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState) => {
        const response:UserModel = await UserService.deleteParticularUser(user_id);
        dispatch(userAction.setDeleteUser(response));
    }
}

export const fetchUpdateUser = (user_id:number, title:string, description:string) : ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState) => {
        const response:UserModel = await UserService.updateUser(user_id, title, description);
        dispatch(userAction.setUpdateUser(response));
    }
}

export const fetchAddUser = (title:string, description:string) : ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState) => {
        const response:UserModel = await UserService.addUser(title, description);
        dispatch(userAction.setAddUser(response));
    }
}
// function dispatch(arg0: { payload: UserModel[]; type: string; }) {
//     throw new Error("Function not implemented.");
// }
