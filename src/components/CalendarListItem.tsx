import React from 'react';
import { CalendarItemModel } from '../models/CalendarItemModel';
import { Link } from 'react-router-dom';
import { MainProps } from '../states/MainProps';
import { Row, Col, Button } from 'react-bootstrap';
import moment from 'moment';
import { CalendarCode } from '../models/CalendarCode';

interface CalendarListItemProps extends MainProps {
    item: CalendarItemModel;
}

const calendarListItem = function (props: CalendarListItemProps) {
    const momentDate = moment(props.item.date);
    const dayOfWeek: string = momentDate.format('ddd');
    const dayClass: string = props.item.date < moment().startOf('day').toDate() ? 'old-day' : 'new-day';
    let workingTime = `${props.item.startTime} - ${props.item.endTime}`;
    return (
        <Link to={`/item/${props.item.id}`}>
            <Row className="text-center date-row">
                <Col xs="3" className={'date-item date-' + dayOfWeek.toLowerCase()}>
                    <span>{dayOfWeek}</span>
                    <h1>{momentDate.format('DD')}</h1>
                </Col>
                <Col xs="9" className={dayClass}>
                    <span>{props.item.code}</span>
                    <h3>{workingTime}</h3>
                </Col>
            </Row>
        </Link>
    );
}

export default calendarListItem;