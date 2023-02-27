import * as api from './api.js';

const endpoints = {
    "all": '/data/catalog',
    'byId': '/data/catalog/',
    'login': '/users/login',
    'register': '/users/register',
    'create': '/data/catalog',
    'delete': '/data/catalog/',
    'edit': '/data/catalog/'
    
}

export function getAll() {
   return api.get(endpoints.all)
};

export function getById(id) {
    return api.get(endpoints.byId + id)
 };

export function logUser(data) {
    return api.post(endpoints.login, data)
};
export function regUser(data) {
    return api.post(endpoints.register, data)
};
export async function createFurniture(data) {
    return api.post(endpoints.create,data)
 };
 export async function deleteFurniture(id) {
    return api.del(endpoints.delete + id)
 };
 export async function editFurniture(id,data) {
    return api.put(endpoints.edit + id, data)
 };


