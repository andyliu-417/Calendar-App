import React, {Component} from 'react';
import MediaQuery from 'react-responsive';
import './Calendar.css';
import moment from 'moment';
import Header from '../Header/Header';
import Body from '../Body/Body';
import EventModal from '../EventModal/EventModal';
import EventPanel from '../EventPanel/EventPanel';

class Calendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: null
    };
  }

  componentDidMount() {
    this.setState({date: moment()});
  }

  renderPC() {
    return (
      <div className="calendar">
        {this.state.date != null && <Header date={this.state.date}></Header>}

        <Body></Body>

        <EventModal></EventModal>

        <EventPanel></EventPanel>
      </div>
    );
  }

  renderMB() {
    return (
      <div></div>
    );
  }

  render() {
    return (
      <div>
        <MediaQuery query="(min-device-width: 1224px)">
          {this.renderPC()}
        </MediaQuery>
        <MediaQuery query="(max-device-width: 1224px)">
          {this.renderMB()}
        </MediaQuery>
      </div>
    );
  }
}

export default Calendar;
