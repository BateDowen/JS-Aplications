import { showLog } from "./pages/login.js";
import { showHome } from "./pages/home.js"; // TODO
import { showReg } from "./pages/reg.js"; //TODO:
import { showCreate } from "./pages/create.js"; // TODO:
import { showDash } from "./pages/dashBoard.js";
import { initialize } from "./router.js";

const pages = {
    '/home': showHome,
    '/login': showLog,
    '/reg': showReg,
    '/create': showCreate,
    '/dash': showDash

};
const router = initialize(pages)

router.goTo('/dash');
