export interface UserModel{
    "userId": number,
    "id": number,
    "title":string,
    "body":string
}

export interface UserArrayModel{
    all_users: UserModel[],
    filtered_users: UserModel[],
    particular_User: UserModel,
    cnt : number,
}