import { createPage } from "./create.js";
import { homePage } from "./dashboard.js";
import { detailsPage } from "./details.js";
import { editPage } from "./edit.js";
import { render } from "./lib.js";
import { page } from "./lib.js";
import { loginPage } from "./login.js";
import { myFurniturePage } from "./my-furniture.js";
import { regPage } from "./register.js";
const mainDiv = document.querySelector('.container')

page(decorate)
page('/', homePage);
page('/create', createPage);
page('/login', loginPage);
page('/my-furniture', myFurniturePage);
page('/details', detailsPage);
page('/register', regPage);
page('/edit', editPage);

page.start();
homePage();


function decorate(ctx,next) {
    ctx.render = (conntent) => render(conntent, mainDiv);
    next()
};

const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', onLogout);

function onLogout() {
    localStorage.removeItem('user')
    page.redirect('/')
}
