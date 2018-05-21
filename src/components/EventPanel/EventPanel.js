import React, { Component } from "react";
import MediaQuery from "react-responsive";
import { Row, Tag, Icon, Divider, List, Badge, Button } from "antd";
import { WingBlank, WhiteSpace, Card } from "antd-mobile";

import moment from "moment";
import PropTypes from "prop-types";
import config from "../../config";

import { connect } from "react-redux";
import { saveEvent, deleteEvent, toggleEvent } from "../../redux/event.redux";

import EventModal from "../EventModal/EventModal";

@connect(state => state.event, { saveEvent, deleteEvent, toggleEvent })
class EventPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pickDate: null,
      name: "",
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
    const evt = { datetime: eventMoment.toObject(), name: event.name };
    const events = this.props.eventList;
    console.log("index", events.indexOf(evt));
    this.setState({ pickDate: eventMoment, name: event.name, showModal: true });
  }

  delete(event) {
    const { saveEvent, deleteEvent } = this.props;
    deleteEvent(event.id);
    saveEvent();
  }

  toggle(event) {
    const { saveEvent, toggleEvent } = this.props;
    toggleEvent(event.id);
    saveEvent();
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
    const { pickDate, name, showModal } = this.state;

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
                      onClick={() => this.toggle(v)}
                    />
                  ]}
                >
                  <Row>
                    <Tag color="#5CC3BF">{i + 1}</Tag>
                    <Icon type="clock-circle-o" />&nbsp;
                    <span className={"event-detail" + (v.completed?" completed":"")}>{this.showEvent(v)}</span>
                  </Row>
                </List.Item>
              )}
            />
            {this.state.pickDate != null && (
              <EventModal
                pickDate={pickDate}
                name={name}
                visible={showModal}
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
