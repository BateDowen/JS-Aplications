import { auth } from "./auth.js";
import { getAll, getById } from "./data.js";
import { detailsPage } from "./details.js";
import {page} from "./lib.js";
import { html,render } from "./lib.js";

const mainDiv = document.querySelector('.container');

const template = (resp, onClick) => html`
    
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Welcome to Furniture System</h1>
            <p>Select furniture from the catalog to view details.</p>
        </div>
        ${resp.map(x => html`
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src="${x.img}" />
                        <p>Description here</p>
                        <footer>
                            <p>Price: <span>${x.price}$</span></p>
                        </footer>
                        <div>
                            <a @click="${onClick}" href="javascript:void(0)" id="/${x._id}" class="btn btn-info">Details</a>
                        </div>
                    </div>
                </div>
            </div>
        `)}
    </div>
`;

export async function homePage(ctx) {
    
    const resp = await getAll();
    render(template(resp, onClick), mainDiv);
    auth()
};
async function onClick(ev){
    ev.preventDefault();
    const resp = await getById(ev.target.id);
    page.redirect(detailsPage(resp));
};
