import {Row,  Tab, Tabs } from "react-bootstrap";


import { useEffect, useState } from "react";

import MapPointer from "../MapPointer/MapPointer";
import axios from "axios";
import OwnCalendarView from "../CalendarView/OwnCalendarView";

const EventVisualize = () => {
    const [points, setPoints] = useState([]);
    const [events, setEvents] = useState([])
    const [eventData, setEventData] = useState("");
    const [emailDetails, setEmailDetails] = useState([])

    useEffect(() => {
        try {
            axios
                .get("http://localhost:3320/generated/file")
                .then((response) => {
                    // console.log(response);

                    const eventCalData = []
                    const eventMapdata = []
                    const emailData = {}
                    const coordinates = response.data.files.map((item) => {
                        const eventData = item.content;
                        const fileName = item.fileName;

                        const locationArray = eventData.location.split(",").map(num => Number(num))
                        // console.log(eventData);


                        eventCalData.push({ id: item.fileName, title: eventData.eventName, start: eventData.time, backgroundColor: '#' + (Math.random() * 0xFFFFFF << 0).toString(16) })


                        eventMapdata.push(eventData.eventName)
                        // console.log(item);

                        emailData[fileName] = { email: eventData.email, name: eventData.name, eventName: eventData.eventName }


                        return { lat: locationArray[0], lng: locationArray[1] }

                    });
                    // console.log(coordinates);
                    setPoints(coordinates);

                    setEvents(eventMapdata);

                    setEmailDetails(emailData);

                    console.log(emailData);

                    setEventData(eventCalData);
                })
                .catch((error) => {
                    console.error("Eroor -->", error);
                });
        } catch (error) {
            console.error("Error -->", error);
        }
    }, []);

    return (
        <>

            <Tabs
                defaultActiveKey="map"
                className=" mb-0 bg-secondary text-white"
                fill
            >
                <Tab className="bg-success" eventKey="map" title="Map">
                    <Row style={{ height: "85vh" }} className=" bg-success">
                        <MapPointer points={points} events={events} />
                    </Row>
                </Tab>
                <Tab eventKey="calendar" title="Calendar" className="text-white">
                    <OwnCalendarView events={eventData} eventsInfo={emailDetails} />
                </Tab>
            </Tabs>
        </>
    );
};

export default EventVisualize;