import React, { Component } from 'react';
import { History } from 'history';
import { MainProps } from '../states/MainProps';
import Loading from './Loading';
import NotFound from './NotFound';
import CalendarEditItem from './CalendarEditItem';
import moment from 'moment';

export interface CalendarItemProps extends MainProps {
    history: History;
    itemId: string;
    isLoading: boolean;
}

class CalendarItem extends Component<CalendarItemProps> {
    render() {

        if (this.props.isLoading || !this.props.calendarItems.length) {
            return <Loading />
        }

        const selectedItem = this.props.calendarItems.find((item) => item.id === this.props.itemId);
        if (!selectedItem) {
            return <NotFound />
        }

        return <CalendarEditItem item={selectedItem} {...this.props} />
    }
}

export default CalendarItem;