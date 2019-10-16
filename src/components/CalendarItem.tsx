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

    state = { isPharmacy: false };
    selectedItem?: CalendarItemModel;

    constructor(props: CalendarItemProps, context?: any) {
        super(props, context);

        this.selectedItem = undefined;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleIsPharmacyChanged = this.handleIsPharmacyChanged.bind(this);
    }

    handleSubmit(event: any) {
        event.preventDefault();
        if (!this.selectedItem) { return; }

        if (this.state.isPharmacy) {
            this.selectedItem.code1 = 'X';
            this.selectedItem.code2 = 'X';
            this.selectedItem.manualWorkingTime = event.target.elements.manualWorkingTime.value;
        } else {
            this.selectedItem.code1 = event.target.elements.code1.value;
            this.selectedItem.code2 = event.target.elements.code2.value;
        }
        this.selectedItem.isPharmacy = this.state.isPharmacy;
        this.selectedItem.note = event.target.elements.note.value;
        this.props.doSaveCalendar(this.selectedItem, this.props.filter.yearMonthId);
        this.props.history.push('/');
    }

    initDropdown() {
        return this.props.calendarCodes.map((item, index) => <option key={index} id={item.code}>{item.code}</option>)
    }

    handleIsPharmacyChanged() {
        this.setState({
            isPharmacy: !this.state.isPharmacy
        });
    }

    render() {
        if (this.props.isLoading) {
            return <Loading />
        }

        this.selectedItem = this.props.calendarItems.find((item) => item.id === this.props.itemId);
        if (!this.selectedItem) {
            return <Loading />
        }

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Label>Date : </Form.Label>
                    <Form.Control type='text' disabled value={moment(this.selectedItem.date).format("D/MM/YYYY")} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Code 1 : </Form.Label>
                    <select className='form-control' name='code1'>
                        {this.initDropdown()}
                    </select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Code 2 : </Form.Label>
                    <select className='form-control' name='code2'>
                        {this.initDropdown()}
                    </select>
                </Form.Group>
                <Form.Group>
                    <Form.Check type="checkbox" label="ร้านยา"
                        checked={this.state.isPharmacy}
                        onChange={this.handleIsPharmacyChanged} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Working Time : </Form.Label>
                    <Form.Control type='text' name='manualWorkingTime'></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Note : </Form.Label>
                    <Form.Control type='text' name='note'></Form.Control>
                </Form.Group>
                <Button className='form-control' variant="primary" type="submit">Save</Button>
            </Form>
        );
    }
}

export default CalendarItem;