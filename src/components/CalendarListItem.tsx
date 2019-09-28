import React from 'react';
import { CalendarItemModel } from '../models/CalendarItemModel';
import { Link } from 'react-router-dom';
import { MainProps } from '../states/MainProps';

interface CalendarListItemProps extends MainProps {
    item: CalendarItemModel;
}

function getWorkingHour(code: string) {
    return code;
}

function getDayOfWeek(date: Date) {
    const index = date.getDay();
    switch (index) {
        case 0: return 'sun';
        case 1: return 'mon';
        case 2: return 'tue';
        case 3: return 'wed';
        case 4: return 'thu';
        case 5: return 'fri';
        case 6: return 'sat';
    }
}

const calendarListItem = function (props: CalendarListItemProps) {
    return (
        <Link to={`/item/${props.item.id}`}>
            <div className="mock-border">
                <p>{props.item.date.getDate()}</p>
                <p>{props.item.date.getMonth()}</p>
                <p>{props.item.date.getFullYear()}</p>
                <p>{props.item.code}</p>
                <p>{getWorkingHour(props.item.code)}</p>
                <button onClick={(e) => {
                    e.preventDefault();
                    props.deleteCalendarItem(props.item, props.filter.yearMonthId);
                }}>Remove</button>
            </div>
        </Link>
    );
}

export default calendarListItem;