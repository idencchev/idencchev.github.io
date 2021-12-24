import { loginPage } from "./views/login.js";
import { page, render } from './lib.js';
import { registerPage } from "./views/register.js";
import { logout } from "../api/data.js";
import { getUserData } from "../api/util.js";
import { createPage } from "./views/create.js";
import { searchPage } from "./views/search.js";
import { homePage } from "./views/home.js";

const root = document.querySelector("main");

document.getElementById('logout').addEventListener('click', onLogout);

localStorage.removeItem('path');

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/search', searchPage);
updateUserNav();
page.start();



function decorateContext(ctx, next) {
    ctx.render = (context) => render(context, root);
    next();
}

export function updateUserNav() {
    const userData = getUserData();

    if (userData) {
       
        document.querySelectorAll('.user').forEach(user => user.style.display = '');
        document.querySelectorAll('.guest').forEach(guest => guest.style.display = 'none');
    } else {
        document.querySelectorAll('.user').forEach(user => user.style.display = 'none');
        document.querySelectorAll('.guest').forEach(guest => guest.style.display = '');
    }

}

let path = localStorage.getItem('path');
    if(path) {
      page.redirect(path);  
    }


async function onLogout() {
    await logout();
    updateUserNav();
    page.redirect('/login');
}
