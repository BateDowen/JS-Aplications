// import page_js  from "./lib.js";
import page_js from "../node_modules/page/page.mjs";
import { authMiddleware } from "./authMiddleware.js";

import { loginView } from "./pages/loginPage.js";
import { renderMiddleware } from "./renderMiddleware.js";

page_js(authMiddleware)
page_js(renderMiddleware);


page_js('/', loginView);

page_js.start()