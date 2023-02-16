import { html, render } from "../../../node_modules/lit-html/lit-html.js";
import { cats } from "./catSeeder.js";

const mainSec = document.getElementById('allCats') ;

const template = (el) => html`
    <ul> 
        ${el.map(x => html`
        <li>
            <img src="${x.imageLocation}" width="250" height="250" alt="Card image cap">
            <div class="info">
                <button class="showBtn" @click="${onClick}">Show status code</button>
                <div class="status" style="display: none" id="${x.statusCode}">
                    <h4>Status Code: ${x.statusCode}</h4>
                    <p>${x.statusMessage}</p>
                </div>
            </div>
        </li>
        
        `)}
    </ul>
    `;
  render(template(cats), mainSec);
  
function onClick(ev) {
   if (ev.target.innerText == 'Show status code') {
    ev.target.innerText = 'Hide status code';
    const statusDiv = ev.target.parentNode.children[1];
    statusDiv.style.display = 'block'

   }else if (ev.target.innerText == 'Hide status code') {
    ev.target.innerText = 'Show status code';
    const statusDiv = ev.target.parentNode.children[1];
    statusDiv.style.display = 'none'

}
}