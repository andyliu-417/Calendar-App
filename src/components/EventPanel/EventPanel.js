import React, {Component} from 'react';
import MediaQuery from 'react-responsive';
import {Row, Col, Tag, Icon, Divider} from 'antd';
import {connect} from 'react-redux';
import {getEvent} from '../../redux/event.redux';
import moment from 'moment';

@connect(state => state.event, {getEvent})
class EventPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {events:[]};
  }

  componentDidMount() {
    this
      .props
      .getEvent();
    
    const end = this
      .props
      .date
      .endOf('month')
      .format("YYYY-MM-DD");
    const start = this
      .props
      .date
      .startOf('month')
      .format("YYYY-MM-DD");

    const events = this
    .props
    .eventList
    .map(v => ((moment(`${v.datetime.years}-${v.datetime.months + 2}-${v.datetime.date} ${v.datetime.hours}:${v.datetime.minutes}`, "YYYY-MM-DD HH:mm").isBetween(start, end))
      ? v : null));

    this.setState(events);
  }

  renderPC() {
    // const end = this
    //   .props
    //   .date
    //   .endOf('month')
    //   .format("YYYY-MM-DD");
    // const start = this
    //   .props
    //   .date
    //   .startOf('month')
    //   .format("YYYY-MM-DD");

    const eventList = 
    // this
    //   .props
    //   .eventList
    this.state.events
      .map(
        (v, i) => (
          // (moment(`${v.datetime.years}-${v.datetime.months + 2}-${v.datetime.date} ${v.datetime.hours}:${v.datetime.minutes}`, "YYYY-MM-DD HH:mm").isBetween(start, end))
        // ? 
        (
          <div key={i}>
            <Row className={"event-list-row"}>
              <Col span={2}>
                <Tag color="#5CC3BF">{i + 1}</Tag>
              </Col>
              <Col span={22}>
                <Row>
                  <Tag><Icon type="clock-circle-o"/> </Tag>
                  {`${v.datetime.years}-${v.datetime.months+2}-${v.datetime.date} ${v.datetime.hours<10?"0"+v.datetime.hours:v.datetime.hours}:${v.datetime.minutes<10?"0"+v.datetime.minutes:v.datetime.minutes}`}
                </Row>
                <Row>{v.name}</Row>
              </Col>
            </Row>
            <Divider/>
          </div>
        )
        // : null)
      ));
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
