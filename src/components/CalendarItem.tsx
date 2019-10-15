import React, { Component } from 'react';
import { CalendarItemModel } from '../models/CalendarItemModel';
import { History } from 'history';
import { MainProps } from '../states/MainProps';
import { Form, Button } from 'react-bootstrap';
import moment from 'moment';
import { CalendarCode } from '../models/CalendarCode';
import Loading from './Loading';
import NotFound from './NotFound';

interface CalendarItemProps extends MainProps {
    history: History;
    itemId: string;
    isLoading: boolean;
}

class CalendarItem extends Component<CalendarItemProps> {

    selectedItem?: CalendarItemModel;

    constructor(props: CalendarItemProps, context?: any) {
        super(props, context);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.selectedItem = this.props.calendarItems.find((item) => item.id === this.props.itemId);
    }

    handleSubmit(event: any) {
        event.preventDefault();
        if (!this.selectedItem) { return; }
        
        const code = event.target.elements.code.value;
        const workingCode: CalendarCode = this.props.calendarCodes.find((cCode: CalendarCode) => cCode.code === code) || this.props.calendarCodes[0];

        this.selectedItem.code = code;
        this.selectedItem.startTime = workingCode.startTime;
        this.selectedItem.endTime = workingCode.endTime;

        const yearMonthId = this.props.filter.yearMonthId;
        this.props.doSaveCalendar(this.selectedItem, yearMonthId);
        this.props.history.push('/');
    }

    initDropdown() {
        return this.props.calendarCodes.map((item, index) => <option key={index} id={item.code}>{item.code}</option>)
    }

    render() {
        if (this.props.isLoading) {
            return <Loading />
        }

        if(!this.selectedItem){
            return <NotFound/>
        }

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Label>Date : </Form.Label>
                    <Form.Control type='text' disabled value={moment(this.selectedItem.date).format("D/MM/YYYY")} />
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