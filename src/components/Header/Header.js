import React, {Component} from 'react';
import MediaQuery from 'react-responsive';
import {Row, Col, Button} from 'antd';
import config from '../../config';

class Header extends Component {
  lastMonth = () => {
    let date = this.props.date.clone().subtract(1, 'months');
    this.props.onChangeMonth(date);
  }

  nextMonth = () => {
    let date = this.props.date.clone().add(1, 'months');
    this.props.onChangeMonth(date);
  }

  renderWeekRow(mq) {
    const weekRow = config.weekDays.map((v, i) => {
        if (i === 0) {
          return (
            <div key={v}>
              <Col
                className={"first calendar-row-week-format-"+mq}
                style={{
                color: "#fff"
              }}
                span={3}>.</Col>
              <Col className={"calendar-row-week-format-"+mq} span={3}>{v}</Col>
            </div>
          );
        } else {
          return (
            <Col className={"calendar-row-week-format-"+mq} key={v} span={3}>{v}</Col>
          );
        }
      })
    return (
      <Row>
        {weekRow}
      </Row>
    );
  }

  renderHeader(mq) {
    return (
      <div>
        <Row className="calendar-header-row">
          <Col span={3}>
            <Button ghost icon="double-left" className="left-btn" onClick={this.lastMonth}></Button >
          </Col>
          < Col span={18} className="calendar-title">
            {this
              .props
              .date
              .format('YYYY - MMMM')}
          </Col>
          <Col span={3}>
            <Button
              ghost
              icon="double-right"
              className="right-btn"
              onClick={this.nextMonth}></Button >
          </Col>
        </Row>

        {this.renderWeekRow(mq)}
      </div>
    );
  }

  render() {
    return (
      <div>
        <MediaQuery query="(min-device-width: 1224px)">
          {this.renderHeader("pc")}
        </MediaQuery>
        <MediaQuery query="(max-device-width: 1224px)">
          {this.renderHeader("mb")}
        </MediaQuery>
      </div>
    );
  }
}

export default Header;
