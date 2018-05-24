import React, { Component } from "react";
import MediaQuery from "react-responsive";
import "./Calendar.css";

import Header from "../Header/Header";
import Body from "../Body/Body";
import EventModal from "../EventModal/EventModal";
import EventPanel from "../EventPanel/EventPanel";
import DayView from "../DayView/DayView";

import moment from "moment";

import { connect } from "react-redux";
import { getEvent } from "../../redux/event.redux";

import config from "../../config";

@connect(state => state.event, { getEvent })
class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      pickDate: null,
      showModal: false,
      showDayView: false,
      showMonthView: true
    };
  }

  handlePick = el => {
    this.setState({ pickDate: el.day, showModal: true });
  };

  handleDayView = (event, el) => {
    this.setState({
      pickDate: el.day,
      showDayView: true,
      showMonthView: false
    });

    event.stopPropagation();
  };

  handleBack = () => {
    this.setState({
      showDayView: false,
      showMonthView: true
    });
  };

  componentDidMount() {
    this.setState({ date: moment() });
    this.props.getEvent();
  }

  renderCalendar(mq) {
    return (
      <div className={"calendar-" + mq}>
        {this.state.date != null &&
          this.state.showMonthView === true && (
            <Header
              date={this.state.date}
              onChangeMonth={v => {
                this.setState({ date: v });
              }}
            />
          )}

        {this.state.date != null &&
          this.state.showMonthView === true && (
            <Body
              date={this.state.date}
              onClick={el => {
                this.handlePick(el);
              }}
              eventList={this.props.eventList}
              onDayView={this.handleDayView}
            />
          )}

        {this.state.pickDate != null && (
          <EventModal
            pickDate={this.state.pickDate}
            visible={this.state.showModal}
            onClose={() => this.setState({ showModal: false })}
          />
        )}

        {this.state.pickDate != null &&
          this.state.showDayView === true && (
            <DayView
              pickDate={this.state.pickDate}
              eventList={this.props.eventList}
              onClick={this.handleBack}
            />
          )}

        {this.state.date != null &&
          this.state.showMonthView === true && (
            <EventPanel
              date={this.state.date}
              eventList={this.props.eventList}
            />
          )}
      </div>
    );
  }

  render() {
    return (
      <div>
        <MediaQuery query="(min-device-width: 1224px)">
          {this.renderCalendar(config.plateform.PC)}
        </MediaQuery>
        <MediaQuery query="(max-device-width: 1224px)">
          {this.renderCalendar(config.plateform.MB)}
        </MediaQuery>
      </div>
    );
  }
}

export default Calendar;
