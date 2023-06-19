import openingHours from "../config/opening-hours"

export function setOpeningHours() {
    const ohBody = document.querySelector("#opening-hours-body")

    const today = new Date();
    const day = today.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    let nextDay = new Date(today);
    nextDay.setDate(nextDay.getDate() + 1);
    nextDay = nextDay.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

    const open = openingHours[day].open;
    const close = openingHours[day].close;

    const openNext = openingHours[nextDay].open;
    const closeNext = openingHours[nextDay].close;


    const openTimeStr = open.toLocaleTimeString('en-DE', { hour: 'numeric', minute: 'numeric', hour12: false });
    const closeTimeStr = close.toLocaleTimeString('en-DE', { hour: 'numeric', minute: 'numeric', hour12: false });
    const openTimeNextStr = openNext.toLocaleTimeString('en-DE', { hour: 'numeric', minute: 'numeric', hour12: false });
    const closeTimeNextStr = closeNext.toLocaleTimeString('en-DE', { hour: 'numeric', minute: 'numeric', hour12: false });

    // apply text-color based on open/closed currently, set text-success if open, text-error if closed
    // if closed, display the next open time instead
    if (today.getHours() >= open.getHours() && today.getHours() < close.getHours()) {
        ohBody.innerHTML = `Open today from ${openTimeStr} to ${closeTimeStr}`;
        ohBody.classList.add("text-success");
        ohBody.classList.remove("text-error");
    }
    else {
        ohBody.innerHTML = `Closed today. Open tomorrow from ${openTimeNextStr} to ${closeTimeNextStr}`;
        ohBody.classList.add("text-error");
        ohBody.classList.remove("text-success");
    }
}