import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { CalendarItemProps } from './CalendarItem';
import { CalendarItemModel } from '../models/CalendarItemModel';
import moment from 'moment';

interface CalendarEditItemProps extends CalendarItemProps {
    item: CalendarItemModel
}

class CalendarEditItem extends Component<CalendarEditItemProps, CalendarItemModel> {

    constructor(props: CalendarEditItemProps, context?: any) {
        super(props, context);

        this.state = props.item;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onCode1Change = this.onCode1Change.bind(this);
        this.onCode2Change = this.onCode2Change.bind(this);
        this.onIsPharmacyChanged = this.onIsPharmacyChanged.bind(this);
        this.onManualWorkingTimeChange = this.onManualWorkingTimeChange.bind(this);
        this.onNoteChange = this.onNoteChange.bind(this);
    }

    onCode1Change(value: string) {
        this.setState({
            code1: value
        });
    }

    onCode2Change(value: string) {
        this.setState({
            code2: value
        });
    }

    onIsPharmacyChanged() {
        const isPharmacy = !this.state.isPharmacy;
        const code1 = isPharmacy ? 'X' : this.state.code1;
        const code2 = isPharmacy ? 'X' : this.state.code2;
        const manualWorkingTime = isPharmacy ? this.state.manualWorkingTime : '';
        this.setState({
            isPharmacy: isPharmacy,
            code1: code1,
            code2: code2,
            manualWorkingTime: manualWorkingTime
        });
    }

    onManualWorkingTimeChange(value: string) {
        this.setState({
            manualWorkingTime: value
        });
    }

    onNoteChange(value: string) {
        this.setState({
            note: value
        })
    }

    handleSubmit(event: any) {
        event.preventDefault();
        this.props.doSaveCalendar(this.state, this.props.filter.yearMonthId);
        this.props.history.push('/');
    }

    initDropdown() {
        return this.props.calendarCodes.map((item, index) => <option key={index} id={item.code}>{item.code}</option>)
    }

    renderWorkingCodes() {
        if (this.state.isPharmacy) {
            return <div></div>
        }

        return (
            <div>
                <Form.Group>
                    <Form.Label>Code 1 : </Form.Label>
                    <select className='form-control' name='code1' value={this.state.code1} onChange={(e) => this.onCode1Change(e.target.value)}>
                        {this.initDropdown()}
                    </select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Code 2 : </Form.Label>
                    <select className='form-control' name='code2' value={this.state.code2}
                        onChange={(e) => this.onCode2Change(e.target.value)}>
                        {this.initDropdown()}
                    </select>
                </Form.Group>
            </div>
        )
    }

    renderManualWorkingTime() {
        if (!this.state.isPharmacy) {
            return <div></div>
        }

        return (
            <Form.Group>
                <Form.Label>Working Time : </Form.Label>
                <Form.Control type='text' name='manualWorkingTime'
                    value={this.state.manualWorkingTime}
                    onChange={(e: any) => this.onManualWorkingTimeChange(e.target.value)}></Form.Control>
            </Form.Group>
        )
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Label>Date : </Form.Label>
                    <Form.Control type='text' disabled value={moment(this.state.date).format("D/MM/YYYY")} />
                </Form.Group>
                <Form.Group>
                    <Form.Check type="checkbox" label="ร้านยา"
                        checked={this.state.isPharmacy}
                        onChange={this.onIsPharmacyChanged} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Note : </Form.Label>
                    <Form.Control type='text' name='note'
                        value={this.state.note}
                        onChange={(e: any) => this.onNoteChange(e.target.value)}></Form.Control>
                </Form.Group>
                {this.renderWorkingCodes()}
                {this.renderManualWorkingTime()}
                <Button className='form-control' variant="primary" type="submit">Save</Button>
            </Form>
        );
    }
}

export default CalendarEditItem;