import * as api from './api.js';

const endpoints = {
    "all": '/data/catalog',
    'byId': '/data/catalog',
    'login': '/users/login',
    'register': '/users/register'

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


