import { getOpenInfo } from "../config/opening-hours"

export async function setOpeningHours() {
    const ohBody = document.querySelector("#opening-hours-body")
    // const today = new Date();
    // today.setDate(today.getDate() + 5);
    // today.setHours(11, 0, 0, 0);
    // const openInfo = await getOpenInfo(today);
    const openInfo = await getOpenInfo();

    ohBody.innerHTML += `${openInfo.weekSchedule.toString()}`;
    document.getElementById("opening-hours-body").tabIndex = 0;
}