import { editFurniture } from "./data.js";
import { itemInfo } from "./details.js";
import { html,page,render } from "./lib.js";

const mainDiv = document.querySelector('.container');

const template = (itemInfo,onSubmit,errMsg,errors) => html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>Edit Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        ${errMsg ? html`<div class="form-group error" >${errMsg}</div>` : null}

        <form @submit="${onSubmit}">
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="form-control" id="new-make" type="text" name="make" value="${itemInfo.make}">
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class="form-control" id="new-model" type="text" name="model" value="${itemInfo.model}">
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class="form-control" id="new-year" type="number" name="year" value="${itemInfo.year}">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class="form-control" id="new-description" type="text" name="description" value="${itemInfo.description}">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class="form-control" id="new-price" type="number" name="price" value="${itemInfo.price}">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class="form-control" id="new-image" type="text" name="img" value="${itemInfo.img}">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material" value="${itemInfo.material}">
                    </div>
                    <input type="submit" class="btn btn-info" value="Edit" />
                </div>
            </div>
        </form>
`;

export function editPage() {
    update(null,{})
    function update(errMsg, errors) {
        render(template(itemInfo,onSubmit,errMsg,errors), mainDiv);
        
    }
    async function onSubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const data = { } = Object.fromEntries([...formData]);
        const missing = Object.entries(data).filter(([k,v]) => k != 'material' && v == '');
    
        try {
            if (missing.length > 0) {
                const errors = missing.reduce((acc, [k]) => Object.assign(acc, { [k] : true}), {});
                console.log(errors);
                throw {
                    error: new Error('Please fill all fields'),
                    errors
                };
            }
            data.price = Number(data.price);
            data.year = Number(data.year);
           
            await editFurniture(itemInfo._id,data);
            formData.reset();

            page.redirect('/details' + res._id)
        } catch (error) {
            const message = error.error.message;
            update(message, error.errors || {})
        };  
    };
    
};

