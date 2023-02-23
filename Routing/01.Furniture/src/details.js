import { html,render } from "./lib.js";

const mainDiv = document.querySelector('.container');

const template = (furniture) => html`
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
                <div>
                    <a href=”#” class="btn btn-info">Edit</a>
                    <a href=”#” class="btn btn-red">Delete</a>
                </div>
            </div>
        </div>
`;

export function detailsPage(furniture) {
    render(template(furniture), mainDiv);
    
}