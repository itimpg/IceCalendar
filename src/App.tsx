
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import * as actions from './redux/Actions';
import Main from './components/Main';

function mapStateToProps(state: any) {
    return {
        calendarItems: state.calendarItems,
        calendarCodes: state.calendarCodes,
        filter: state.filter
    };
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators(actions, dispatch);
}

const App = withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

export default App;