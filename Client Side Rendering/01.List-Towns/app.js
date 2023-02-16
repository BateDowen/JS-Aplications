import { html,render } from "../../../node_modules/lit-html/lit-html.js";

const inputField = document.querySelector('#towns');
const main = document.getElementById('root');
const btn = document.getElementById('btnLoadTowns').addEventListener('click', showTowns);

function showTowns(ev) {
    ev.preventDefault();
    const template = (town)=> html`
        <ul>
            ${town.value.split(', ').map(x => html`<li>${x}</li>`)}
        </ul>
    `;

render(template(inputField), main)
}