import * as api from './api.js'
const PAGE_SIZE = 3
const paths = {
    'getAll': '/data/pets',
    'byId': '/data/pets/',
    'login': '/users/login',
    'reg': '/users/register',
    'logout': '/users/logout',
    'edit': '/data/pets/',
    'del': '/data/pets/',
    'create': '/data/pets',
    'count': '/data/pets?count'
}
export function getCount() {
    return api.get(paths.count)
}
export function getAll(page) {
    let query = [];

    if (page) {
        query.push(`offset=${(page - 1) * PAGE_SIZE}`);
        query.push(`pageSize=${PAGE_SIZE}`)
    }
    let querystring = query.length ? `?${query.join('&')}` : ''
    return api.get(paths.getAll + querystring)
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