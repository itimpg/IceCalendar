import React from 'react';
import { CalendarItemModel } from '../models/CalendarItemModel';
import { Link } from 'react-router-dom';
import { MainProps } from '../states/MainProps';
import { Row, Card, Button } from 'react-bootstrap';
import moment from 'moment';

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
    const date = moment(props.item.date).format("D/MM/YYYY");
    return (
        <Link to={`/item/${props.item.id}`}>
            <Card>
                <Card.Header>{date}</Card.Header>
                <Card.Body>
                    <p>{date}</p>
                    <p>{props.item.code}</p>
                    <p>{getWorkingHour(props.item.code)}</p>
                    <Link to={"/item/" + props.item.id}>
                        <Button>Edit</Button>
                    </Link>

                    <Button onClick={(e: any) => {
                        e.preventDefault();
                        props.deleteCalendarItem(props.item, props.filter.yearMonthId);
                    }}>
                        Remove
                    </Button>
                </Card.Body>
            </Card>
        </Link>
    );
}

export default calendarListItem;