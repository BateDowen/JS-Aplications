import * as api from './api.js'

const paths = {
    'getAll': '/data/pets?sortBy=_createdOn%20desc&distinct=name',
    'byId': '/data/pets/',
    'login': '/users/login',
    'reg': '/users/register',
    'logout': '/users/logout',
    'edit': '/data/pets/',
    'del': '/data/pets/',
    'create': '/data/pets'
}
export function getAll() {
    return api.get(paths.getAll)
}
export function getById(id) {
    return api.get(paths.byId + id)
}
export function create(data) {
    return api.post(paths.create,data)
}
export function edit(id,data) {
    return api.put(paths.edit + id,data)
}
export function deleteItem(id) {
    return api.del(paths.del + id)
}
export function login(data) {
   return api.post(paths.login,data)
}
export function register(data) {
    return api.post(paths.reg,data)
};
export function logout() {
    return api.get(paths.logout)
}