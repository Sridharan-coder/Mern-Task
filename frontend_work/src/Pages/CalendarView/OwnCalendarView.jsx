import FullCalendar from "@fullcalendar/react";

import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth"
import listPlugin from '@fullcalendar/list';

import axios from "axios";

const OwnCalendarView = ({ events, eventsInfo }) => {


    console.log(eventsInfo);





    const handleSendEmail = (detail) => {


        const subject=`${detail.eventName} notification Mail to ${detail.name}`

        const content=`Hi ${detail.name}, \n we are very pleast about your ${detail.eventName}`


        axios
            .post("http://localhost:3320/sendEmail", {fileName:detail.fileName, email:detail.email, subject, emailContent:content })
            .then((response) => {
                console.log("---> Email sent successfully:", response);
                alert("Email sent successfully")
            })
            .catch((error) => {
                console.error(" ---> Error sending email:", error);
            });
    };





    return (
        <>
            <FullCalendar
                // ref={calendarRef}
                initialView="multiMonthYear"

                multiMonthMinWidth={10}
                displayEventTime={true}
                plugins={[multiMonthPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                // editable={true}
                events={events}
                // droppable={true}
                headerToolbar={{
                    left: "prev,today,next",
                    center: "title",
                    right: "multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay,listWeek"
                }}

                buttonText={{
                    today: "Current",
                    year: "Year",
                    month: "Month",
                    week: "Week",
                    day: "Day",
                    list: "List"
                }}

                eventInteractive={true}
                height={"88vh"}
                eventClick={(info) => {
                    if (window.confirm(info.event.title + " to notigy the person")) {
                        console.log(eventsInfo[info.event.id]);
                        handleSendEmail({fileName:info.event.id,...eventsInfo[info.event.id]})
                    }
                    else {
                        console.log(info.event.title + "----> Failed");
                    }
                }}
            />
        </>
    )
}

export default OwnCalendarView;