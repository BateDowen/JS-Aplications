// show('#home-page');

import { createPage } from "./create.js";
import { homePage } from "./home.js";
import { loginPage } from "./login.js";
import { registerPage } from "./register.js";
import { updateNav } from "./util.js";

const routes ={
    '/': homePage,
    '/login': loginPage,
    '/register': registerPage,
    '/create': createPage,
    '/logout': logout,

}
document.querySelector('nav').addEventListener('click', onNavigate);
document.querySelector('#add-movie-button a').addEventListener('click', onNavigate);

function onNavigate(ev) {
    if (ev.target.tagName == 'A' && ev.target.href) {
        ev.preventDefault();
        const url = new URL(ev.target.href);
        const view = routes[url.pathname];
        if (typeof view == 'function') {
            view();
        };
    };
};



function logout() {
    alert('Logget out');
    localStorage.removeItem('user');
    updateNav()
};
updateNav()
homePage()
