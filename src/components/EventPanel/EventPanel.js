import React, { Component } from "react";
import MediaQuery from "react-responsive";
import { Row, Tag, Icon, Divider, List, Badge, Button } from "antd";
import { WingBlank, WhiteSpace, Card } from "antd-mobile";

import moment from "moment";
import PropTypes from "prop-types";
import config from "../../config";

import { connect } from "react-redux";
import { addEvent, saveEvent } from "../../redux/event.redux";

import EventModal from "../EventModal/EventModal";

@connect(state => state.event, { addEvent, saveEvent })
class EventPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pickDate: null,
      showModal: false
    };
  }
  edit(event) {
    const eventMoment = moment(
      `${event.datetime.years}-${event.datetime.months + 2}-${
        event.datetime.date
      } ${event.datetime.hours}:${event.datetime.minutes}`,
      "YYYY-MM-DD HH:mm"
    );
    this.setState({ pickDate: eventMoment, showModal: true });
  }

  delete(v) {
    console.log(v.name);
  }

  flag(v) {
    console.log(v.name);
  }

  static propTypes = {
    date: PropTypes.object.isRequired,
    eventList: PropTypes.array.isRequired
  };

  filterCurrentEvents() {
    const events = [];
    const { date, eventList } = this.props;
    const end = date.endOf("month").format("YYYY-MM-DD");
    const start = date.startOf("month").format("YYYY-MM-DD");

    for (let i = 0; i < eventList.length; i++) {
      const event = eventList[i];
      const eventMoment = moment(
        `${event.datetime.years}-${event.datetime.months + 2}-${
          event.datetime.date
        } ${event.datetime.hours}:${event.datetime.minutes}`,
        "YYYY-MM-DD HH:mm"
      );
      if (eventMoment.isBetween(start, end)) {
        events.push(event);
      }
    }
    return events;
  }

  showEvent(v) {
    return `${v.datetime.date < 10 ? "0" + v.datetime.date : v.datetime.date} 
       ${config.monthNames[v.datetime.months + 1]}
       ${v.datetime.years} 
       ${v.datetime.hours < 10 ? "0" + v.datetime.hours : v.datetime.hours} :
       ${
         v.datetime.minutes < 10 ? "0" + v.datetime.minutes : v.datetime.minutes
       } - 
       ${v.name}`;
  }

  renderPC(events) {
    return (
      <div>
        {events.length > 0 ? (
          <div>
            <Divider>
              <Icon type="schedule" />&nbsp;&nbsp; You have &nbsp;<Badge
                count={events.length}
                style={{ backgroundColor: "#5CC3BF" }}
              />{" "}
              &nbsp;
              {events.length === 1 ? (
                <span>to-do</span>
              ) : (
                <span>to-dos</span>
              )}{" "}
              this month
            </Divider>
            <List
              size="large"
              bordered
              dataSource={events}
              renderItem={(v, i) => (
                <List.Item
                  actions={[
                    <Button
                      ghost
                      className="action-btn"
                      icon="edit"
                      onClick={() => this.edit(v)}
                    />,
                    <Button
                      ghost
                      className="action-btn"
                      icon="delete"
                      onClick={() => this.delete(v)}
                    />,
                    <Button
                      ghost
                      className="action-btn"
                      icon="flag"
                      onClick={() => this.flag(v)}
                    />
                  ]}
                >
                  <Row>
                    <Tag color="#5CC3BF">{i + 1}</Tag>
                    <Icon type="clock-circle-o" />&nbsp;
                    <span
                      onClick={() => {
                        alert("asdfsd");
                      }}
                      className="event-detail"
                    >
                      {this.showEvent(v)}
                    </span>
                  </Row>
                </List.Item>
              )}
            />
            {this.state.pickDate != null && (
              <EventModal
                pickDate={this.state.pickDate}
                visible={this.state.showModal}
                onClose={() => this.setState({ showModal: false })}
              />
            )}
          </div>
        ) : (
          <div>
            <Divider>
              <Icon type="schedule" />&nbsp;&nbsp; You do not have to-dos this
              month
            </Divider>
          </div>
        )}
      </div>
    );
  }

  renderMB(events) {
    return (
      <WingBlank>
        <WhiteSpace />

        {events.length > 0 ? (
          <div>
            <Icon type="schedule" />&nbsp;&nbsp; You have &nbsp;<Badge
              count={events.length}
              style={{ backgroundColor: "#5CC3BF" }}
            />{" "}
            &nbsp;
            {events.length === 1 ? (
              <span>to-do</span>
            ) : (
              <span>to-dos</span>
            )}{" "}
            this month
            <WhiteSpace />
            {events.map((v, i) => (
              <Card key={i}>
                <Card.Header
                  title={`${
                    v.datetime.date < 10
                      ? "0" + v.datetime.date
                      : v.datetime.date
                  } 
                  -${config.monthNames[v.datetime.months + 1]}
                  -${v.datetime.years} `}
                  extra={
                    <span>
                      {" "}
                      {`${
                        v.datetime.hours < 10
                          ? "0" + v.datetime.hours
                          : v.datetime.hours
                      } :
                    ${
                      v.datetime.minutes < 10
                        ? "0" + v.datetime.minutes
                        : v.datetime.minutes
                    }`}{" "}
                    </span>
                  }
                />
                <Card.Body>
                  <span>{v.name}</span>
                </Card.Body>
              </Card>
            ))}
          </div>
        ) : (
          <div>
            <Icon type="schedule" />&nbsp;&nbsp; You do not have to-dos this
            month
          </div>
        )}
        <WhiteSpace />
      </WingBlank>
    );
  }

  render() {
    const events = this.filterCurrentEvents();

    return (
      <div>
        <MediaQuery query="(min-device-width: 1224px)">
          {this.renderPC(events)}
        </MediaQuery>
        <MediaQuery query="(max-device-width: 1224px)">
          {this.renderMB(events)}
        </MediaQuery>
      </div>
    );
  }
}

export default EventPanel;
