import React, { Component } from "react";
import MediaQuery from "react-responsive";
import { Row, Col, Icon } from "antd";

import moment from "moment";
import PropTypes from "prop-types";

import config from "../../config";

class Body extends Component {
  static propTypes = {
    date: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
  };

  clickDayView(el, event) {
    console.log(el.day);
    
    this.props.onDayView(event, el);
  }

  getBusyDays() {
    const busyDays = [];
    const eventList = this.props.eventList;
    const events = eventList
      ? eventList.filter(v => v.completed === false)
      : eventList;

    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      const eventMoment = moment(
        `${event.datetime.years}-${event.datetime.months + 2}-${
          event.datetime.date
        } ${event.datetime.hours}:${event.datetime.minutes}`,
        "YYYY-MM-DD HH:mm"
      );
      busyDays.push(eventMoment.format("YYYY-MM-DD"));
    }
    return busyDays;
  }

  getAllDays(mq) {
    const date = this.props.date;
    const start = date.startOf("month");
    const offset = start.weekday();

    const lastDays = [];
    for (let i = 0; i < offset; i++) {
      const day = start.clone().subtract(offset - i, "days");
      lastDays.push({ day, className: "invalid calendar-row-format-" + mq });
    }

    const currentDays = [];
    for (let i = 1; i < date.daysInMonth() + 1; i++) {
      const day = moment([date.year(), date.month(), i]);
      currentDays.push({
        day,
        className: day.isSame(moment(), "day")
          ? "current calendar-row-format-" + mq
          : "valid calendar-row-format-" + mq
        // (busyDays.indexOf(i) > -1 ? " busy" : "")
      });
    }

    const nextDays = [];
    const daysAdded = lastDays.length + currentDays.length - 1;
    let i = 1;
    while ((daysAdded + i) % 7 !== 0) {
      const day = currentDays[currentDays.length - 1].day
        .clone()
        .add(i, "days");
      nextDays.push({ day, className: "invalid calendar-row-format-" + mq });
      i += 1;
    }

    return [...lastDays, ...currentDays, ...nextDays];
  }

  renderDay(el) {
    const busyDays = this.getBusyDays();

    return (
      <Col
        span={3}
        className={
          el.className +
          (busyDays.indexOf(el.day.format("YYYY-MM-DD")) > -1 ? " busy" : "")
        }
        onClick={() => {
          this.props.onClick(el);
        }}
      >
        {el.day.format("D")} &nbsp;&nbsp;
        {busyDays.indexOf(el.day.format("YYYY-MM-DD")) > -1 
        ? (<Icon type="schedule" onClick={this.clickDayView.bind(this, el)} />) 
        : (null)}
        
      </Col>
    );
  }

  renderDays(mq, days) {
    let weekNo = 1;

    return days.map((v, i) => {
      if (i === (weekNo - 1) * 7) {
        return (
          <div className="calendar-day-rows" key={i}>
            <Col className={"first calendar-row-format-" + mq} span={3}>
              <span className="weekNo">W{weekNo}</span>
            </Col>
            {this.renderDay(v)}
          </div>
        );
      } else {
        if (i === weekNo * 7 - 1) {
          weekNo += 1;
        }
        return <div key={i}>{this.renderDay(v)}</div>;
      }
    });
  }

  renderBody(mq) {
    const days = this.getAllDays(mq);
    return <Row>{this.renderDays(mq, days)}</Row>;
  }

  render() {
    return (
      <div>
        <MediaQuery query="(min-device-width: 1224px)">
          {this.renderBody(config.plateform.PC)}
        </MediaQuery>
        <MediaQuery query="(max-device-width: 1224px)">
          {this.renderBody(config.plateform.MB)}
        </MediaQuery>
      </div>
    );
  }
}

export default Body;
