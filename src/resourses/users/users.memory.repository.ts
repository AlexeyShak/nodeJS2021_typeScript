import { IUser } from "../../interfaces/users";


export let users: IUser[] = [{
    id: '73dfa0d7-e233-4762-9037-5ac8f433c971',
    name: 'Random User',
    login: 'login',
    password: 'password'
},
{
    id: "73dfa0d7-e233-4762-0000-000000000000",
    name: 'Alesha',
    login: 'login',
    password: 'password'  
}];
 /**
 * Method to modify User with responsed data
 * @param data - modyfied data instance of IUser[]
 * @returns void
 */
export const usersModify =(data:IUser[]):void =>{
    users = data;
}