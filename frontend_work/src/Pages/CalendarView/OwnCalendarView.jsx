import FullCalendar from "@fullcalendar/react";
import { useRef, useState } from "react";

import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth"
import { MonthAgenda } from "@syncfusion/ej2-react-schedule";
// import events from "./events";
import CustomModal from "./CustomModal";

const OwnCalendarView = ({events}) => {
    // const calendarRef = useRef(null);
    // const [events, setEvents] = useState([{
    //     id: "999",
    //     title: "Repeating Event",
    //     start: "2024-12-04T09:56"
    // },])

console.log(events);

    return (
        <>
            <FullCalendar
                // ref={calendarRef}
                initialView="multiMonthYear"

                multiMonthMinWidth={340}
                displayEventTime={true}
                plugins={[multiMonthPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
                // editable={true}
                events={events}
                // droppable={true}
                headerToolbar={{
                    left: "prev,today,next",
                    center: "title",
                    right: "multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay"
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
                height={"90vh"}
                eventClick={(info) => {
                    if(window.confirm(info.event.title+" to notigy the person")){
                        console.log(info.event.title);
                    }
                    else{
                        console.log(info.event.title+"----> Failed");
                    }

                }}
                
            />

        </>
    )


}

export default OwnCalendarView;