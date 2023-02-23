import { html,render } from "./lib.js";

const mainDiv = document.querySelector('.container');

const template = () => html`
<div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                            <img src="./images/table.png" />
                            <p>Description here</p>
                            <footer>
                                <p>Price: <span>235 $</span></p>
                            </footer>
                            <div>
                                <a href="#" class="btn btn-info">Details</a>
                            </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                            <img src="./images/sofa.jpg" />
                            <p>Description here</p>
                            <footer>
                                <p>Price: <span>1200 $</span></p>
                            </footer>
                            <div>
                                <a href="#" class="btn btn-info">Details</a>
                            </div>
                    </div>
                </div>
            </div>
        </div>
`;

export function myFurniturePage() {
    render(template(),mainDiv)
};
