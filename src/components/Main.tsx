import React, { Component } from 'react';
import { Route } from 'react-router';
import CalendarList from './CalendarList';
import CalendarItem from './CalendarItem';
import { MainProps } from '../states/MainProps';
import { Container, Button } from 'react-bootstrap';
import SiteNavbar from './SiteNavbar';
import { Link } from 'react-router-dom';
import moment from 'moment';

class Main extends Component<MainProps> {
    render() {
        const items = this.props.calendarItems[this.props.filter.yearMonthId] || [];
        const newItemLink = '/item/' + moment().format("YYYYMMDD");
        return (
            <div>
                <SiteNavbar />
                <Container>
                    <Route exact path="/" render={() => (
                        <div>
                            <CalendarList items={items} {...this.props} />
                        </div>
                    )} />
                    <Route path="/item/:id" render={(param) => (
                        <CalendarItem
                            itemId={param.match.params.id}
                            history={param.history}
                            {...this.props} />
                    )} />
                </Container>
            </div>
        );
    }
}

export default Main;