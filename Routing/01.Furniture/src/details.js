import {  deleteFurniture } from "./data.js";
import { editPage } from "./edit.js";
import { html,page,render } from "./lib.js";

const mainDiv = document.querySelector('.container');

const template = (furniture,isOwner,del,loadEdit) => html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>Furniture Details</h1>
            </div>
        </div>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src="${furniture.img}" />
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <p>Make: <span>${furniture.make}</span></p>
                <p>Model: <span>${furniture.model}</span></p>
                <p>Year: <span>${furniture.year}</span></p>
                <p>Description: <span>${furniture.description}</span></p>
                <p>Price: <span>${furniture.price}$</span></p>
                <p>Material: <span>${furniture.material}</span></p>
                
                    ${isOwner ? html`<div>
                    <a @click="${loadEdit(furniture._id)}"  class="btn btn-info">Edit</a>
                    <a @click ="${del}" href=”javascript:void(0)” class="btn btn-red">Delete</a>
                    </div>`: null}
            </div>
        </div>
`;
export let itemInfo = undefined
export function detailsPage(furniture) {
    itemInfo = furniture
    const userID = JSON.parse(localStorage.getItem('user'))._id
    const isOwner = userID == furniture._ownerId;
    render(template(furniture,isOwner, del,loadEdit), mainDiv);
    
    async function del(ev) {
        ev.preventDefault();
        const choice = confirm('Are you sure you want to delete this item?');
        if (choice) {
            await deleteFurniture(furniture._id);
            page.redirect('/my-furniture')
            
        }
    };
};
function loadEdit(id) {
     return editPage
}


