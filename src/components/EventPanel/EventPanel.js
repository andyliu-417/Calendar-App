import React, {Component} from 'react';
import MediaQuery from 'react-responsive';
import {
  Row,
  Tag,
  Icon,
  Divider,
  List,
  Badge
} from 'antd';
import { WingBlank, WhiteSpace, Card } from 'antd-mobile';

import moment from 'moment';
import config from '../../config';

class EventPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  filterCurrentEvents() {
    this.state.events.splice(0, this.state.events.length);
    // this.state.events = [];
    const {date, eventList} = this.props;
    const end = date
      .endOf('month')
      .format("YYYY-MM-DD");
    const start = date
      .startOf('month')
      .format("YYYY-MM-DD");

    for (let i = 0; i < eventList.length; i++) {
      const event = eventList[i];
      const eventMoment = moment(`${event.datetime.years}-${event.datetime.months + 2}-${event.datetime.date} ${event.datetime.hours}:${event.datetime.minutes}`, "YYYY-MM-DD HH:mm");
      if (eventMoment.isBetween(start, end)) {
        this
          .state
          .events
          .push(event);
      }
    }
  }
  showEvent(v) {
    return (
      `${v.datetime.date < 10 ? "0" + v.datetime.date : v.datetime.date} 
       ${config.monthNames[v.datetime.months + 1]}
       ${v.datetime.years} 
       ${v.datetime.hours < 10 ? "0" + v.datetime.hours : v.datetime.hours} :
       ${v.datetime.minutes < 10 ? "0" + v.datetime.minutes : v.datetime.minutes} - 
       ${v.name}`
      );

  }
  renderPC() {
    this.filterCurrentEvents()

    return (
      <div>
        {this.state.events.length>0 ? (
          <div> 
            <Divider>
              <Icon type="schedule"/>&nbsp;&nbsp;
              You have &nbsp;<Badge count={this.state.events.length} style={{ backgroundColor: '#5CC3BF' }}/> &nbsp;
              {this.state.events.length===1?(<span>to-do</span>):(<span>to-dos</span>)} this month
            </Divider>
            <List
              size="large"
              bordered
              dataSource={this.state.events}
              renderItem={(v, i) => (
                <List.Item>
                  <Row>
                    <Tag color="#5CC3BF">{i + 1}</Tag>
                    <Icon type="clock-circle-o"/>&nbsp;
                    <span className="event-detail">
                      {this.showEvent(v)}
                      </span>
                  </Row>
                </List.Item>
            )}/>  
          </div>
        ):(
          <div> 
              <Divider>
                <Icon type="schedule"/>&nbsp;&nbsp;
                You do not have to-dos this month
              </Divider>
          </div>
        )}
      </div>
    );
  }

  renderMB() {
    this.filterCurrentEvents()

    return (
      <WingBlank>
        <WhiteSpace></WhiteSpace>

        {this.state.events.length>0 ? (
          <div> 
            <Icon type="schedule"/>&nbsp;&nbsp;
            You have &nbsp;<Badge count={this.state.events.length} style={{ backgroundColor: '#5CC3BF' }}/> &nbsp;
            {this.state.events.length===1?(<span>to-do</span>):(<span>to-dos</span>)} this month
            <WhiteSpace></WhiteSpace>
            
            {this.state.events.map((v,i) => (
              <Card key={i}>
                <Card.Header
                  title={`${v.datetime.date < 10 ? "0" + v.datetime.date : v.datetime.date} 
                  -${config.monthNames[v.datetime.months + 1]}
                  -${v.datetime.years} `}
                  extra={<span> {
                    `${v.datetime.hours < 10 ? "0" + v.datetime.hours : v.datetime.hours} :
                    ${v.datetime.minutes < 10 ? "0" + v.datetime.minutes : v.datetime.minutes}`
                } </span>}></Card.Header>
                <Card.Body>
                  <span>{v.name}</span>
                </Card.Body>
              </Card>
            ))}
          </div>
        ):(
          <div> 
              <Icon type="schedule"/>&nbsp;&nbsp;
              You do not have to-dos this month
              <WhiteSpace></WhiteSpace>
              
          </div>
        )}
      </WingBlank>
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
