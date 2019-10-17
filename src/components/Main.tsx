import React, { Component } from 'react';
import { Route } from 'react-router';
import { MainProps } from '../states/MainProps';
import { Container } from 'react-bootstrap';
import SiteNavbar from './SiteNavbar';
import CalendarList from './CalendarList';
import CalendarItem from './CalendarItem';
import { MainState } from '../states/MainState';
import MonthPicker from './MonthPicker';

class Main extends Component<MainProps> {

    state: MainState;

    constructor(props: MainProps, context?: any) {
        super(props, context);
        this.state = {
            isLoading: false,
            items: []
        }

        this.handleReloadData = this.handleReloadData.bind(this);
    }

    componentDidMount() {
        this.handleReloadData(this.props.filter.yearMonthId);
    }

    handleReloadData(yearMonthId: number) {
        this.state.isLoading = true;
        this.props.doLoadCalendar(yearMonthId)
            .then(() => {
                this.state.isLoading = false;
            });
    }

    render() {
        const items = this.props.calendarItems;
        return (
            <div>
                <SiteNavbar />
                <Container>
                    <Route exact path="/" render={() => (
                        <div>
                            <MonthPicker {...this.props} reloadData={this.handleReloadData} />
                            <CalendarList items={items} {...this.props} />
                        </div>
                    )} />
                    <Route path="/item/:id" render={(param) => (
                        <CalendarItem
                            isLoading={this.state.isLoading}
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