import React, {Component} from 'react';
import MediaQuery from 'react-responsive';
import {Row, Col, Button} from 'antd';

class Header extends Component {
  lastMonth = () => {
    let date = this
      .props
      .date
      .clone()
      .subtract(1, 'months');
    
  }

  nextMonth = () => {
    let date = this
      .props
      .date
      .clone()
      .add(1, 'months');
   
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

export default Header;
