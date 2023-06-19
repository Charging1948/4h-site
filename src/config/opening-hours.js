// generate opening hours object, with open and close times for each day. 7:30 - 19:00 for weekdays, 8:00 - 18:00 for weekends.
// use dates inside the object, so that it can be used to compare with current time.

const openingHours = {
    monday: {},
    tuesday: {},
    wednesday: {},
    thursday: {},
    friday: {},
    saturday: {},
    sunday: {}
}

const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday"];
const weekends = ["saturday", "sunday"];

weekdays.forEach(day => {
    openingHours[day].open = new Date().setHours(7, 30, 0, 0);
    openingHours[day].close = new Date().setHours(19, 0, 0, 0);
});

weekends.forEach(day => {
    openingHours[day].open = new Date().setHours(8, 0, 0, 0);
    openingHours[day].close = new Date().setHours(18, 0, 0, 0);
});

export default openingHours;