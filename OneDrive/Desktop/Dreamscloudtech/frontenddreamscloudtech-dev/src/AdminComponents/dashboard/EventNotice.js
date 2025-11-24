import React from "react";
import "./EventNotice.css";

const events = [
    {
        title: "Book Fair",
        description: "Browse and purchase books at our annual school Book Fair.",
        time: "08:00 - 10:00",
    },
    {
        title: "Sports Day",
        description: "A fun-filled day of athletic events and team competitions.",
        time: "10:00 - 12:00",
    },
    {
        title: "Art Exhibition",
        description: "Display your artwork for the school community to admire.",
        time: "12:00 - 14:00",
    },

];

const EventNotice = () => {
    return (
        <div className="event-container">
            <h2 className="event-header">Notice Board</h2>
            {events.map((event, index) => (
                <div className="event-card" key={index}>
                    <div className="event-details">
                        <h3 className="event-title">{event.title}</h3>
                        <p className="event-description">{event.description}</p>
                    </div>
                    <div className="event-time">{event.time}</div>
                </div>
            ))}
        </div>
    );
};

export default EventNotice;
