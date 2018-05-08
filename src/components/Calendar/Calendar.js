import React, {Component} from 'react';
import MediaQuery from 'react-responsive';
import './Calendar.css';

class Calendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: null
    };
  }

  componentDidMount() {
    this.setState({});
  }

  renderPC() {
    return (
      <div className="calendar">
asdfsdf
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
