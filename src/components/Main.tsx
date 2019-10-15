import React, { Component } from 'react';
import { Route } from 'react-router';
import { MainProps } from '../states/MainProps';
import { Container } from 'react-bootstrap';
import SiteNavbar from './SiteNavbar';
import CalendarList from './CalendarList';
import CalendarItem from './CalendarItem';
import { MainState } from '../states/MainState'; 

class Main extends Component<MainProps> {

    state: MainState;

    constructor(props: MainProps, context?: any) {
        super(props, context);
        this.state = {
            isLoading: false,
            items: []
        }
    }

    componentDidMount() {
        this.props.doLoadCalendar(this.props.filter.yearMonthId)
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