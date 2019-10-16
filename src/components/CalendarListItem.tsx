import React from 'react';
import { CalendarItemModel } from '../models/CalendarItemModel';
import { Link } from 'react-router-dom';
import { MainProps } from '../states/MainProps';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { CalendarCode } from '../models/CalendarCode';

interface CalendarListItemProps extends MainProps {
    item: CalendarItemModel;
}

interface CalendarListItemViewModel {
    id: string,
    day: string,
    dayOfWeek: string,
    dayClass: string,
    workingCode: string,
    workingTime: string,
    note: string,
}

function getViewModel(item: CalendarItemModel, calendarCodes: CalendarCode[]): CalendarListItemViewModel {

    const momentDate = moment(item.date);
    const dayClass: string = moment(item.date).date() < moment().date() ? 'old-day' : 'new-day';

    let workingCode = '';
    let workingTime = '';
    if (item.isPharmacy) {
        workingCode = 'ร้านยา';
        workingTime = item.manualWorkingTime;
    }
    else {
        workingCode = item.code1;
        workingTime = calculateWorkingTime(calendarCodes, item.code1);
        if (item.code2 && item.code2 !== 'X') {
            workingCode = `${workingCode}/${item.code2}`;
            const workingTime2 = calculateWorkingTime(calendarCodes, item.code2);
            workingTime = `${workingTime}, ${workingTime2}`;
        }
    }

    return {
        id: item.id,
        day: momentDate.format('DD'),
        dayOfWeek: momentDate.format('ddd'),
        dayClass: dayClass,
        workingCode: workingCode,
        workingTime: workingTime,
        note: item.note
    };
}

function calculateWorkingTime(calendarCodes: CalendarCode[], code: string): string {
    const calendarCode = calendarCodes.find((c) => c.code === code)
    return calendarCode ? calendarCode.workingTime : '';
}

const calendarListItem = function (props: CalendarListItemProps) {
    const item: CalendarListItemViewModel = getViewModel(props.item, props.calendarCodes);
    return (
        <Link to={`/item/${props.item.id}`}>
            <Row className="text-center date-row">
                <Col xs="3" className={'date-item date-' + item.dayOfWeek.toLowerCase()}>
                    <span>{item.dayOfWeek}</span>
                    <h1>{item.day}</h1>
                </Col>
                <Col xs="9" className={item.dayClass}>
                    <span>{item.workingCode}</span>
                    <h3>{item.workingTime}</h3>
                    <span>{item.note}</span>
                </Col>
            </Row>
        </Link>
    );
}

export default calendarListItem;