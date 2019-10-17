import React, { Component } from 'react';
import { MainProps } from '../states/MainProps';
import { Pagination } from 'react-bootstrap';
import moment from 'moment';

interface MonthPickerProps extends MainProps {
    reloadData: (yearMonthId: number) => void;
}

class MonthPicker extends Component<MonthPickerProps> {

    constructor(props: MonthPickerProps, context?: any) {
        super(props, context);

        this.handlePrevMonth = this.handlePrevMonth.bind(this);
        this.handleNextMonth = this.handleNextMonth.bind(this);
    }

    handlePrevMonth(event: any) {
        event.preventDefault();
        this.updateFilter(this.props.filter.yearMonthId, -1);
    }

    handleNextMonth(event: any) {
        event.preventDefault();
        this.updateFilter(this.props.filter.yearMonthId, 1);
    }

    updateFilter(yearMonthId: number, monthIndex: number) {
        const newYearMonthId = Number(moment(yearMonthId, "YYYYMM").add(monthIndex, 'months').format("YYYYMM"));
        this.props.updateFilter(newYearMonthId);
        this.props.reloadData(newYearMonthId);
    }

    render() {
        const title = moment(this.props.filter.yearMonthId, "YYYYMM").format("MMMM YYYY");
        return (
            <Pagination className='text-center'>
                <Pagination.Prev className='w-25' onClick={this.handlePrevMonth} />
                <Pagination.Item className='w-50 unchanged'>{title}</Pagination.Item>
                <Pagination.Next className='w-25' onClick={this.handleNextMonth} />
            </Pagination>
        )
    }
}

export default MonthPicker;