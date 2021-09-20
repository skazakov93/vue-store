import {ApiGet} from "./gateway";

const getUsers = (params) =>
    ApiGet(`users${params}`);

const getById = (id) =>
    ApiGet(`users/${id}`)

export {
    getUsers,
    getById
}