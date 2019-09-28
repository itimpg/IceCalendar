import React, { Component } from 'react';
import { CalendarItemModel } from '../models/CalendarItemModel';
import { History } from 'history';
import { MainProps } from '../states/MainProps';

interface CalendarItemProps extends MainProps {
    history: History;
    itemId: number;
}

class CalendarItem extends Component<CalendarItemProps> {

    constructor(props: CalendarItemProps, context?: any) {
        super(props, context);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event: any) {
        event.preventDefault();
        const code = event.target.elements.code.value;
        const item: CalendarItemModel = {
            date: new Date(2019, 8, 1),
            code: code,
            id: 2
        };
        const yearMonthId = '201908'; // this.props.filter.yearMonthId
        this.props.saveCalendarItem(item, yearMonthId);
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' name='code' />
                    <input type='submit' value='save' />
                </form>
            </div>
        );
    }
}

export default CalendarItem;