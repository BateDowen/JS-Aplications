import { showHome } from "./home.js";
import { showRegPage } from "./reg.js";

const main = document.querySelector('main');

const sectionsDiv = document.querySelector('.sections');
sectionsDiv.style.display = 'none'
const navBar = document.querySelector('nav');
navBar.addEventListener('click', showSec);
const links ={
    '/':showHome,
    '/reg':showRegPage
    
}
function showSec(ev) {
    ev.preventDefault()
    const target = ev.target;
    if (target.tagName == 'A') {
        const url = new URL(target);
        goto(url.pathname)
     
    }
}
const context = {
    showSection,
    goto
}
function showSection(section) {
    main.replaceChildren(section)
}

function goto(name) {
    const handler = links[name];
    if (typeof handler == 'function') {
        handler(context);
        
    }
}
goto('/reg')