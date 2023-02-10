import { homePage } from "./home.js";
import { show, updateNav } from "./util.js";

const loginSection = document.querySelector('#form-login');
const form = loginSection.querySelector('form');
form.addEventListener('submit', onSubmit);

export function loginPage() {
    show(loginSection);
};
async function onSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData(form);
    let { email,password } = Object.fromEntries(formData);
    await login(email,password);
    updateNav()
    homePage()
    
};

async function login(email,password) {
    try {
        const resp = await fetch('http://localhost:3030/users/login', {
            method: 'POST',
            'Content-Type': 'aplication/json',
            body: JSON.stringify({ email,password })
        });
        if (!resp.ok) {
            const err = await resp.json()
            throw new Error(err.message)
        };
        const user = await resp.json()
        localStorage.setItem('user',JSON.stringify(user))
    } catch (error) {
        alert(error.message);
        throw error
    }
};
