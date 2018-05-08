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

  renderWeekRow() {
    const weekRow = config.weekDays.map((v, i) => {
        if (i === 0) {
          return (
            <div key={v}>
              <Col
                className="calendar-row-week-format first"
                style={{
                color: "#fff"
              }}
                span={3}>.</Col>
              <Col className="calendar-row-week-format" span={3}>{v}</Col>
            </div>
          );
        } else {
          return (
            <Col className="calendar-row-week-format" key={v} span={3}>{v}</Col>
          );
        }
      })
    return (
      <Row>
        {weekRow}
      </Row>
    );
  }

  renderPC() {
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

        {this.renderWeekRow()}
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
        {/* <MediaQuery query="(min-device-width: 1224px)"> */}
          {this.renderPC()}
        {/* </MediaQuery> */}
        {/* <MediaQuery query="(max-device-width: 1224px)">
          {this.renderMB()}
        </MediaQuery> */}
      </div>
    );
  }
}

export default Header;
