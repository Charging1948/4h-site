// generate opening hours object, with open and close times for each day. 7:30 - 19:00 for weekdays, 8:00 - 18:00 for weekends.
const openingHours = {
    monday: {
        open: null,
        close: null
    },
    tuesday: {
        open: null,
        close: null
    },
    wednesday: {
        open: null,
        close: null
    },
    thursday: {
        open: null,
        close: null
    },
    friday: {
        open: null,
        close: null
    },
    saturday: {
        open: null,
        close: null
    },
    sunday: {
        open: null,
        close: null
    }
};

const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday"];
const weekends = ["saturday", "sunday"];


const getOpeningHours = () => {
    weekdays.forEach(day => {
        openingHours[day].open = new Date().setHours(7, 30, 0, 0);
        openingHours[day].close = new Date().setHours(19, 0, 0, 0);
    });

    weekends.forEach(day => {
        openingHours[day].open = new Date().setHours(8, 0, 0, 0);
        openingHours[day].close = new Date().setHours(18, 0, 0, 0);
    });
    return openingHours;
}

const getDateString = (date) => {
    return date.toLocaleDateString('en-DE', { weekday: 'long' }).toLowerCase();
}

const getFormattedDateString = (today, date) => {
    let result = date.toLocaleDateString('en-DE', { weekday: 'long' });
    // compare to today, if today, return "Today", if not today return result
    if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear())
        return "Today";
    else if (date.getDate() === today.getDate() + 1 && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear())
        return "Tomorrow";
    return result
}

const getTimeString = (date) => {
    if (typeof date === "number")
        date = new Date(date)
    return date.toLocaleTimeString('en-DE', { hour: '2-digit', minute: '2-digit' });
}

const createWeekSchedule = (today, openingHours, isClosedToday) => {
    let weekSchedule = [];
    for (let i = 0; i < Object.keys(openingHours).length; i++) {
        const curDay = new Date(today);
        curDay.setDate(curDay.getDate() + i);
        const curDayString = getDateString(curDay);
        console.log(curDayString)
        weekSchedule.push({
            day: curDayString,
            formattedDay: getFormattedDateString(today, curDay),
            open: getTimeString(openingHours[curDayString].open),
            close: getTimeString(openingHours[curDayString].close),
            isTodayAndOpen: false, 
            classNames: "badge badge-neutral"
        });
    }
    if (!isClosedToday) {
        weekSchedule[0].classNames = "badge badge-success badge-lg";
        weekSchedule[0].isTodayAndOpen = true;
    }
    return weekSchedule;
};


const getOpenInfo = async (baseDate) => {
    return new Promise((resolve, reject) => {
        const openingHours = getOpeningHours();

        const today = baseDate ?? new Date();
        const day = getDateString(today);
        let nextDay = new Date(today);
        nextDay.setDate(nextDay.getDate() + 1);
        nextDay = getDateString(nextDay);

        const open = getTimeString(openingHours[day].open);
        const close = getTimeString(openingHours[day].close);
        const openNext = getTimeString(openingHours[nextDay].open);
        const closeNext = getTimeString(openingHours[nextDay].close);
        const openHours = new Date(openingHours[day].open).getHours();
        const closeHours = new Date(openingHours[day].close).getHours();
        const isClosed = today.getHours() < openHours || today.getHours() >= closeHours;

        const weekSchedule = createWeekSchedule(today, openingHours, isClosed);
        weekSchedule.toString = () => {
            console.log(weekSchedule)
            return weekSchedule.map(day => { return `${day.formattedDay}: <span class="${day.classNames}">${day.open} - ${day.close}</span>` }).join('\n');
        }

        resolve({ today, day, nextDay, open, close, openNext, closeNext, openHours, closeHours, isClosed, weekSchedule });
    });
}

export { getOpeningHours, getDateString, getTimeString, getOpenInfo };