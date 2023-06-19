import { themeChange } from 'theme-change'
import routes from './routes.js'
import { setOpeningHours } from './dom-manipulation.js';
// import '../styles/tailwind.scss';
// import '../styles/base.scss';
// import '../styles/layout.scss';

themeChange();

function loadRoute(route) {

    if (!route)
        route = routes["/404"];

    fetch(route)
        .then(response => response.text())
        .then(html => { return html })
        .then(html => {
            document.getElementById("main-content").innerHTML = html.match(/<body[^>]*>([\s\S]*)<\/body>/)[1];

            // update the page title
            document.title = html.match(/<title>(.*?)<\/title>/)[1];

            // update the active nav link
            document.querySelectorAll(".navlink").forEach(link => {
                link.classList.add("navlink-neutral");
                link.classList.remove("navlink-primary");
                if (link.href === window.location.origin + window.location.pathname) {
                    link.classList.remove("navlink-neutral");
                    link.classList.add("navlink-primary");
                }
            });
        })
        .then(async () => {
            await setOpeningHours();
        })
        .catch(error => {
            console.warn(error);
        })
}

// Listen for changes in the URL
window.addEventListener("popstate", () => {
    loadRoute(routes[window.location.pathname]);
});

// Load the initial route
loadRoute(routes[window.location.pathname]);
