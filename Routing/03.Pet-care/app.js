import { authMiddleware } from "./middlewares/authMiddleware.js";
import { renderMidlleware } from "./middlewares/renderMidlleware.js";
import page from "./node_modules/page/page.mjs";
import { createPage } from "./pages/createPage.js";
import { dashPage } from "./pages/dashboard.js";
import { detailsPage } from "./pages/detailsPage.js";
import { editView } from "./pages/editPage.js";
import { homeView } from "./pages/homePage.js";
import { loginPage } from "./pages/loginPage.js";
import { regView } from "./pages/registerPage.js";

page(authMiddleware);
page(renderMidlleware);

page('/',homeView);
page('/login',loginPage);
page('/register',regView);
page('/dashboard',dashPage);
page('/create',createPage);
page('/edit/:id',editView);
page('/details/:id',detailsPage)
page.start()