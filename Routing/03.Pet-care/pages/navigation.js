import  { html } from "../node_modules/lit-html/lit-html.js";
import { logout } from "../serveses/util.js";


const template = (isAuthenticated,onLogout) => html`
        <nav>
            <section class="logo">
                <img src="./images/logo.png" alt="logo">
            </section>
            <ul>
                <!--Users and Guest-->
                <li><a href="/">Home</a></li>
                <li><a href="/dashboard">Dashboard</a></li>
                ${isAuthenticated ?
                html`
                 <li><a href="/create">Create Postcard</a></li>
                 <li><a @click="${onLogout}" href="javascript:void(0)">Logout</a></li>`
                 : 
                 html`
                 <li><a href="/login">Login</a></li>
                 <li><a href="register">Register</a></li>`
                }
                
            </ul>
        </nav>
`;
export function navigationView(ctx) {
    return template(ctx.isAuthenticated,onLogout)
    function onLogout() {
        logout();
        localStorage.removeItem('user');
        ctx.page.redirect('/')
    }
}