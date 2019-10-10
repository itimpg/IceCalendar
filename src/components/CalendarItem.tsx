import React, { Component } from 'react';
import { CalendarItemModel } from '../models/CalendarItemModel';
import { History } from 'history';
import { MainProps } from '../states/MainProps';
import { Form, Button } from 'react-bootstrap';
import moment from 'moment';

interface CalendarItemProps extends MainProps {
    history: History;
    itemId: string;
}

class CalendarItem extends Component<CalendarItemProps> {
 
    itemId: string;
    selectedDate: Date;

    constructor(props: CalendarItemProps, context?: any) {
        super(props, context);
        this.handleSubmit = this.handleSubmit.bind(this); 

        this.itemId = this.props.itemId;
        if (!this.itemId || this.itemId.length !== 8) {
            this.itemId = moment().format('YYYYMMDD');
        }
 
        this.selectedDate = moment(this.itemId, "YYYYMMDD").toDate();
    }

    handleSubmit(event: any) {
        event.preventDefault();
        const code = event.target.elements.code.value;
        const item: CalendarItemModel = {
            date: this.selectedDate,
            code: code,
            id: this.itemId
        };
        const yearMonthId = Number(moment(this.selectedDate).format("YYYYMM"));
        this.props.saveCalendarItem(item, yearMonthId);
        this.props.history.push('/');
    }

    initDropdown() {
        return this.props.calendarCodes.map((item, index) => <option key={index} id={item.code}>{item.code}</option>)
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Label>Date : </Form.Label>
                    <Form.Control type='text' disabled value={moment(this.selectedDate).format("D/MM/YYYY")} />
                    <Form.Label>Code : </Form.Label>
                    <select className='form-control' name='code'>
                        {this.initDropdown()}
                    </select>
                </Form.Group>
                <Button className='form-control' variant="primary" type="submit">Save</Button>
            </Form>
        );
    }
}

export default CalendarItem;