import { regUser } from "./data.js";
import { html,page,render } from "./lib.js";

const mainDiv = document.querySelector('.container');

const template = () => html`
  <div class="row space-top">
            <div class="col-md-12">
                <h1>Register New User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit="${onSubmit}">
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input class="form-control" id="email" type="text" name="email">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="password">Password</label>
                        <input class="form-control" id="password" type="password" name="password">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="rePass">Repeat</label>
                        <input class="form-control" id="rePass" type="password" name="rePass">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Register" />
                </div>
            </div>
        </form>
`;
async function onSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const { email, password } = Object.fromEntries(formData);
    const resp = await regUser({email,password});
    saveUser(JSON.stringify(resp));
    alert('Successul register!')
    page.redirect('/')
};
function saveUser(data) {
    localStorage.setItem('user', data)
}

export function regPage() {
    render(template(), mainDiv);
    
}