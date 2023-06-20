import { themeChange } from 'theme-change'
import routes from './routes.js'
import { setOpeningHours } from './dom-manipulation.js';


function loadRoute(route) {

    if (!route)
        route = routes["/404"];

    let routeName = route.split("/").pop().split(".")[0];
    routeName = routeName.charAt(0).toUpperCase() + routeName.slice(1);

    fetch(route)
        .then(response => response.text())
        .then(html => { return html })
        .then(html => {
            const bodyMatch = html.match(/<body ?([^>]*?(id="([\s\S]*?)")?|[^>]*?)>([\s\S]*)<\/body>/)
            const mainContent = document.querySelector('main.main-content')
            mainContent.innerHTML = bodyMatch[4];
            mainContent.id = bodyMatch[3];

            import(`../styles/pages/${bodyMatch[3]}.scss`)


            // update the page title
            document.title = html.match(/<title>(.*?)<\/title>/)[1];

            // update the page heading
            document.querySelector("#the-page-heading").innerHTML += ` - ${routeName}`;

            // update the active nav link
            document.querySelectorAll(".navlink").forEach(link => {
                link.classList.add("navlink-neutral");
                link.classList.remove("navlink-primary");
                if (link.href === window.location.origin + window.location.pathname) {
                    link.classList.remove("navlink-neutral");
                    link.classList.add("navlink-primary");
                }
            });

            // update the theme-toggle-state of the input
            // if html has data-theme="dark" attribute then set the input to checked
            const themeToggleInput = document.querySelector("#theme-toggle-input")
            themeToggleInput.checked = document.querySelector("html[data-theme='light']") ? true : false;
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


themeChange();
