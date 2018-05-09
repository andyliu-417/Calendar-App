import React, {Component} from 'react';
import MediaQuery from 'react-responsive';
import moment from 'moment';
import {Row, Col} from 'antd';

class Body extends Component {

  getAllDays(mq) {
    const date = this.props.date;
    const start = date.startOf('month');
    const offset = start.weekday();

    const lastDays = [];
    for (let i = 0; i < offset; i++) {
      const day = start
        .clone()
        .subtract(offset - i, 'days');
      lastDays.push({day, className: 'invalid calendar-row-format-'+mq});
    }

    const currentDays = [];
    for (let i = 1; i < date.daysInMonth() + 1; i++) {
      const day = moment([
        date.year(),
        date.month(),
        i
      ]);
      currentDays.push({
        day,
        className: (day.isSame(moment(), 'day'))
          ? 'current calendar-row-format-'+mq
          : 'valid calendar-row-format-'+mq
      });
    }

    const nextDays = [];
    const daysAdded = lastDays.length + currentDays.length - 1;
    let i = 1;
    while ((daysAdded + i) % 7 !== 0) {
      const day = currentDays[currentDays.length - 1]
        .day
        .clone()
        .add(i, 'days');
      nextDays.push({day, className: 'invalid calendar-row-format-'+mq});
      i += 1;
    }

    return [
      ...lastDays,
      ...currentDays,
      ...nextDays
    ];

  }

  renderDay(el) {
    return (
      <Col
        span={3}
        className={el.className}
        onClick={() => {
        this
          .props
          .onClick(el)
      }}>
        {el
          .day
          .format('D')}
      </Col>
    );
  }

  renderDays(mq, days) {
    let weekNo = 1;

    return days.map((v, i) => {
      if (i === (weekNo - 1) * 7) {
        return (
          <div className="calendar-day-rows" key={i}>
            <Col className={"first calendar-row-format-"+mq} span={3}>
              <span className="weekNo">W{weekNo}</span>
            </Col>
            {this.renderDay(v)}
          </div>
        );
      } else {
        if (i === (weekNo * 7 - 1)) {
          (weekNo += 1);
        }
        return (
          <div key={i}>
            {this.renderDay(v)}
          </div>
        );
      }
    });
  }

  renderBody(mq) {
    const days = this.getAllDays(mq);
    return (
      <Row>
        {this.renderDays(mq, days)}
      </Row>
    );
  }

  render() {
    return (
      <div>
        <MediaQuery query="(min-device-width: 1224px)">
          {this.renderBody("pc")}
        </MediaQuery>
        <MediaQuery query="(max-device-width: 1224px)">
          {this.renderBody("mb")}
        </MediaQuery>
      </div>
    );
  }
}

export default Body;
