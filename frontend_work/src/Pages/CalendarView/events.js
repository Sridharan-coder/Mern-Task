// const events = [
//     {
//         id: "999",
//         title: "Repeating Event",
//         start: "2024-12-04T09:56"
//     },

// ];

function getDate(dayString) {
    const today = new Date();
    const year = today.getFullYear().toString();
    let month = (today.getMonth() + 1).toString();

    if (month.length === 1) {
        month = "0" + month;
    }

    return dayString.replace("YEAR", year).replace("MONTH", month);
}

// export default events;
