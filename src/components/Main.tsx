import React, { Component } from 'react';
import { Route } from 'react-router';
import CalendarList from './CalendarList';
import CalendarItem from './CalendarItem';
import { MainProps } from '../states/MainProps';

class Main extends Component<MainProps> {
    render() {
        const items = this.props.calendarItems[this.props.filter.yearMonthId] || [];
        return (
            <div>
                <Route exact path="/" render={() => (
                    <div>
                        <button onClick={(e) => {
                            e.preventDefault();
                            this.props.updateFilter({
                                filterMonth: 7, filterYear: 2019, yearMonthId: ''
                            });
                        }}>
                            Update
                    </button>
                        <CalendarList items={items} {...this.props} />
                    </div>
                )} />
                <Route path="/item/:id" render={(param) => (
                    <CalendarItem
                        itemId={Number(param.match.params.id)}
                        history={param.history}
                        {...this.props} />
                )} />
            </div>
        );
    }
}

export default Main;