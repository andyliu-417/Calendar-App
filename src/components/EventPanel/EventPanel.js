import React, {Component} from 'react';
import MediaQuery from 'react-responsive';
import {
  Row,
  Tag,
  Icon,
  Divider,
  List
} from 'antd';
// import {connect} from 'react-redux'; import {getEvent} from
// '../../redux/event.redux';
import moment from 'moment';

// @connect(state => state.event, {getEvent})
class EventPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  filterCurrentEvents() {
    this.state.events = [];
    const {date, eventList} = this.props;
    const end = date
      .endOf('month')
      .format("YYYY-MM-DD");
    const start = date
      .startOf('month')
      .format("YYYY-MM-DD");

    for (let i = 0; i < eventList.length; i++) {
      const event = eventList[i];
      if (moment(`${event.datetime.years}-${event.datetime.months + 2}-${event.datetime.date} ${event.datetime.hours}:${event.datetime.minutes}`, "YYYY-MM-DD HH:mm").isBetween(start, end)) {
        this
          .state
          .events
          .push(event);
      }
    }
  }
  showEvent(v) {
    return (`${v.datetime.date} ${v.datetime.months + 2} ${v.datetime.years} ${v.datetime.hours < 10
      ? "0" + v.datetime.hours
      : v.datetime.hours}:${v.datetime.minutes < 10
        ? "0" + v.datetime.minutes
        : v.datetime.minutes}
        - ${v.name}`);

  }
  renderPC() {
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

    this.filterCurrentEvents()

    return (
      <div>
        {this.state.events.length>0 ? (
          <div> 
            <Divider orientation="left">
              <Icon type="schedule"/>
              You have {this.state.events.length}
              events to do this month
            </Divider>
            <List
              bordered
              dataSource={this.state.events}
              renderItem={(v, i) => (
                <List.Item>
                  <Row>
                    <Tag color="#5CC3BF">{i + 1}</Tag>
                    <Icon type="clock-circle-o"/>
                    {this.showEvent(v)}
                  </Row>
                </List.Item>
            )}/>  
          </div>
        ):(
          <div> 
              <Divider>
                <Icon type="schedule"/>
                You do not have events to do this month
              </Divider>
          </div>
        )}
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
