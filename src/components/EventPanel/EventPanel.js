import React, { Component } from "react";
import MediaQuery from "react-responsive";
import { Row, Tag, Icon, Divider, List, Badge, Button } from "antd";
import { WingBlank, WhiteSpace, Card } from "antd-mobile";

import moment from "moment";
import PropTypes from "prop-types";
import config from "../../config";

import { connect } from "react-redux";
import {
  saveEvent,
  deleteEvent,
  toggleEvent,
  updateEvent
} from "../../redux/event.redux";

import UpdateEventModal from "../UpdateEventModal/UpdateEventModal";

@connect(state => state.event, {
  saveEvent,
  deleteEvent,
  toggleEvent,
  updateEvent
})
class EventPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      datetime: null,
      time: null,
      name: "",
      showModal: false,
      updateId: null
    };
  }

  static propTypes = {
    date: PropTypes.object.isRequired,
    eventList: PropTypes.array.isRequired
  };

  edit(event) {
    const eventMoment = moment(
      `${event.datetime.years}-${event.datetime.months + 2}-${
        event.datetime.date
      } ${event.datetime.hours}:${event.datetime.minutes}`,
      "YYYY-MM-DD HH:mm"
    );
    this.setState({
      datetime: eventMoment,
      time: eventMoment,
      name: event.name,
      showModal: true,
      updateId: event.id
    });
  }

  handleUpdate = () => {
    const { updateId, name, time, datetime } = this.state;
    const { saveEvent, updateEvent } = this.props;

    let m = moment(
      `${datetime.year()}-${datetime.month()}-${datetime.date()} ${time.hours()}:${time.minutes()}`,
      "YYYY-MM-DD HH:mm"
    );
    const eventDatetime = m.toObject();
    updateEvent({
      id: updateId,
      name: name,
      completed: false,
      datetime: eventDatetime
    });
    this.closeModal();
    saveEvent();
  };

  handleChange = (key, val) => {
    this.setState({
      [key]: val
    });
  };

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

  closeModal = () => {
    this.setState({ datetime: null, time: "", name: "", showModal: false });
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
    const { datetime, time, name, showModal } = this.state;
    let count = events.filter(e => e.completed === false).length;

    return (
      <div>
        {events.length > 0 ? (
          <div>
            <Divider>
              {count > 0 ? (
                <div>
                  <Icon type="schedule" />&nbsp;&nbsp; You have &nbsp;<Badge
                    count={count}
                    style={{ backgroundColor: "#5CC3BF" }}
                  />{" "}
                  &nbsp;
                  {events.length === 1 ? (
                    <span>to-do</span>
                  ) : (
                    <span>to-dos</span>
                  )}{" "}
                  this month
                </div>
              ) : (
                <div>
                  <Icon type="schedule" />&nbsp;&nbsp; You do not have to-dos
                  this month
                </div>
              )}
            </Divider>
            <List
              size="large"
              bordered
              dataSource={events}
              renderItem={(v, i) => (
                <List.Item
                  actions={[
                    <Button
                      disabled={v.completed}
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
                    <span
                      className={
                        "event-detail" + (v.completed ? " completed" : "")
                      }
                    >
                      {this.showEvent(v)}
                    </span>
                  </Row>
                </List.Item>
              )}
            />
            {datetime != null && (
              <UpdateEventModal
                datetime={datetime}
                time={time}
                name={name}
                visible={showModal}
                onClose={this.closeModal}
                onChange={this.handleChange}
                onUpdate={this.handleUpdate}
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
