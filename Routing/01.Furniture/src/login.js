import { homePage } from "./dashboard.js";
import { logUser } from "./data.js";
import { html,page,render } from "./lib.js";

const mainDiv = document.querySelector('.container');

const template  = (event, errMsg) => html`
     <div class="row space-top">
            <div class="col-md-12">
                <h1>Login User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit="${event}">
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        ${errMsg ? html`<div class="form-group error" >${errMsg}</div>` : null}
                        <label class="form-control-label" for="email">Email</label>
                        <input class="${'form-control' + (errMsg ? ' is-invalid' : '')}" id="email" type="text" name="email">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="password">Password</label>
                        <input class="${'form-control' + (errMsg ? ' is-invalid' : '')}" id="password" type="password" name="password">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Login" />
                </div>
            </div>
        </form>
`;

export function loginPage(ctx) {
    update();

    function update(errMsg) {
        render(template(onSubmit, errMsg), mainDiv);
    };

    async function onSubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const { email, password } = Object.fromEntries(formData);

       try {
         const resp = await logUser({email,password});
         saveUser(JSON.stringify(resp));
         alert('Successuly logged in!')
         ev.target.reset()
         ctx.page.redirect('/')
       } catch (error) {
         update(error.message)
       };
    };
};

function saveUser(data) {
    localStorage.setItem('user', data)
}
