import React, {Component} from 'react';
import MediaQuery from 'react-responsive';
import {
  Row,
  Col,
  Tag,
  Icon,
  Divider
} from 'antd';
import {connect} from 'react-redux';
import {getEvent} from '../../redux/event.redux';

@connect(state => state.event, {getEvent})
class EventPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this
      .props
      .getEvent()
  }

  renderPC() {
    const eventList = this
      .props
      .eventList
      .map((v, i) => {
        return (
          <div key={i}>
            <Row className={"event-list-row"}>
              <Col span={2}>
                <Tag color="#5CC3BF">{i + 1}</Tag>
              </Col>
              <Col span={22}>
                <Row>
                  <Tag><Icon type="clock-circle-o"/> {v.time}</Tag>
                </Row>
                <Row>{v.name}</Row>
              </Col>
            </Row>
            <Divider/>
          </div>
        )
      });
    return (
      <div>
        <Divider orientation="left">
          <Icon type="schedule"/>
          Your Event List
        </Divider>
        {eventList}
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

export default EventPanel;
