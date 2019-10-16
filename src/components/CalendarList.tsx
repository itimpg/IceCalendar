import React, { Component } from 'react';
import CalendarListItem from './CalendarListItem';
import { MainProps } from '../states/MainProps';
import { CalendarItemModel } from '../models/CalendarItemModel';
import Loading from './Loading';

interface calendarListProps extends MainProps {
    items: CalendarItemModel[];
}

const calendarList = function (props: calendarListProps) {
    if(!props.items.length){
        return <Loading/>
    }

    return (
        <div>
            {props.items.map((item: CalendarItemModel, index: number) =>
                <CalendarListItem key={index} item={item} {...props} />
            )}
        </div>
    );
}

export default calendarList;