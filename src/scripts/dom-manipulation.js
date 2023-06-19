import { getOpenInfo } from "../config/opening-hours"

export async function setOpeningHours() {
    const ohBody = document.querySelector("#opening-hours-body")
    const openInfo = await getOpenInfo();

    ohBody.innerHTML += `${openInfo.weekSchedule.toString()}`;
}