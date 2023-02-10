import { login } from "../users.js";

const loginPage = document.querySelector('#log');
const form = loginPage.querySelector('form');
form.addEventListener('submit', onSubmit)

let ctx = null;

export function showLog(context) {
    ctx = context;
    context.showSection(loginPage);
    
};
async function onSubmit(ev) {
    ev.preventDefault();
    let formData = new FormData(form)
    let { email,password } = Object.fromEntries(formData);
    await login(email,password);
    ctx.goTo('/home')
}