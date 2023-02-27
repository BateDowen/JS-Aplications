import { createFurniture } from "./data.js";
import { html,render } from "./lib.js";

const mainDiv = document.querySelector('.container');

const template = (onSubmit, errMsg,errors) => html`
 <div class="row space-top">
            <div class="col-md-12">
                <h1>Create New Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit="${onSubmit}">
            ${errMsg ? html`<div class="form-group error" >${errMsg}</div>` : null}
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="${"form-control" + (errors.make ? ' is-invalid': '')}"  id="new-make" type="text" name="make">
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class="${"form-control" + (errors.model ? ' is-invalid': '')}" id="new-model" type="text" name="model">
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class="${"form-control" + (errors.year ? ' is-invalid': '')}" id="new-year" type="number" name="year">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class="${"form-control" + (errors.description ? ' is-invalid': '')}" id="new-description" type="text" name="description">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class="${"form-control" + (errors.price ? ' is-invalid': '')}" id="new-price" type="number" name="price">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class="${"form-control" + (errors.img ? ' is-invalid': '')}" id="new-image" type="text" name="img">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Create" />
                </div>
            </div>
        </form>
`;

export function createPage (ctx){
    update(null,{});

    function update(errMsg, errors) {
        render(template(onSubmit, errMsg, errors), mainDiv);
    };
    async function onSubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const data = { } = Object.fromEntries([...formData]);
        const missing = Object.entries(data).filter(([k,v]) => k != 'material' && v == '');

        try {
            if (missing.length > 0) {
                const errors = missing.reduce((acc, [k]) => Object.assign(acc, { [k] : true}), {});
                
                throw {
                    error: new Error('Please fill all fields'),
                    errors
                };
            }
            data.price = Number(data.price);
            data.year = Number(data.year);
           
            const res = await createFurniture(data);
            ctx.page.redirect('/details/' + res._id)
        } catch (error) {
            const message = error.error.message;
            update(message, error.errors || {})
        };

    };



};
