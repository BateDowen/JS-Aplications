import { homePage } from "./home.js";
import { show } from "./util.js";

const createSection = document.querySelector('#add-movie');
const form = createSection.querySelector('form');
form.addEventListener('submit', onSubmit);

export function createPage() {
    show(createSection);
};
async function onSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData(form);
    let {title,description,img} = Object.fromEntries(formData);
    await createMovie(title,description,img);
    form.reset();
    homePage();

};
async function createMovie(title,description,img) {
    const user = JSON.parse(localStorage.getItem('user'));

    try {
        const resp = await fetch('http://localhost:3030/data/movies', {
            method: 'POST',
            headers:{
                'Content-Type': 'aplication/json',
                'X-Authorization': user.accessToken
            },
            body: JSON.stringify({ title,description,img })
        });
        if (!resp.ok) {
            const err = await resp.json()
            throw new Error(err.message)
        };
        
    } catch (error) {
        alert(error.message);
        throw error
    }
}