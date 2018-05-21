import React, { Component } from "react";
import MediaQuery from "react-responsive";
import { Modal, Button, Input, TimePicker, Icon, notification } from "antd";
import {
  Modal as MModal,
  List,
  Button as MButton,
  DatePicker,
  InputItem,
  Toast
} from "antd-mobile";

import { connect } from "react-redux";
import { addEvent, saveEvent } from "../../redux/event.redux";

import PropTypes from "prop-types";
import moment from "moment";

import config from "../../config";

@connect(state => state.event, { addEvent, saveEvent })
class EventModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      time: null
    };
  }

  static propTypes = {
    pickDate: PropTypes.object,
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

  save(mq) {
    const { pickDate, addEvent, saveEvent, onClose } = this.props;
    const time = this.state.time;
    let m;
    if (mq === config.plateform.MB) {
      m = moment(
        `${pickDate.year()}-${pickDate.month()}-${pickDate.date()} ${time.getHours()}:${time.getMinutes()}`,
        "YYYY-MM-DD HH:mm"
      );
    } else {
      m = moment(
        `${pickDate.year()}-${pickDate.month()}-${pickDate.date()} ${time.hours()}:${time.minutes()}`,
        "YYYY-MM-DD HH:mm"
      );
    }
    const datetime = m.toObject();

    addEvent({
      datetime,
      name: this.state.name
    });

    saveEvent();

    this.clear();
    onClose();
  }

  handleSavePC = () => {
    if (this.state.time === null || this.state.name === "") {
      this.showError(config.plateform.PC);
      return;
    }
    this.save(config.plateform.PC);
    this.showNotification(config.plateform.PC);
  };

  handleSaveMB = () => {
    if (this.state.time === null || this.state.name === "") {
      this.showError(config.plateform.MB);
      return;
    }
    this.save(config.plateform.MB);
    this.showNotification(config.plateform.MB);
  };

  showNotification(mq) {
    const msg = "Add Event Successfully.";
    if (mq === config.plateform.MB) {
      Toast.success(msg, 1);
    } else {
      notification["success"]({
        message: msg,
        description:
          "You add an event on " +
          this.props.pickDate.format("YYYY-MMMM-DD") +
          ".",
        duration: 2
      });
    }
  }

  showError(mq) {
    const msg = "Please select time and set name!";
    if (mq === config.plateform.MB) {
      Toast.fail(msg, 1);
    } else {
      notification["error"]({
        message: msg,
        duration: 2
      });
    }
  }

  handleCancel = () => {
    this.clear();
    this.props.onClose();
  };

  clear() {
    this.setState({
      name: "",
      time: null
    });
  }

  renderPC() {
    const { pickDate, visible, onClose } = this.props;

    return (
      <Modal
        title={pickDate.format("YYYY-MM-DD")}
        visible={visible}
        onCancel={onClose}
        footer={[
          <Button key="cancel" onClick={this.handleCancel}>
            {" "}
            <Icon type="close" />{" "}
          </Button>,
          <Button key="save" onClick={this.handleSavePC}>
            {" "}
            <Icon type="check" />{" "}
          </Button>
        ]}
      >
        <Input.Group compact>
          <Input
            style={{
              width: "72%"
            }}
            placeholder="Event Name"
            value={this.state.name}
            onChange={v => this.setState({ name: v.target.value })}
          />
          <TimePicker
            defaultOpenValue={moment("00:00", "HH:mm")}
            format="HH:mm"
            value={this.state.time}
            onChange={v => this.setState({ time: v })}
          />
        </Input.Group>
      </Modal>
    );
  }

  renderMB() {
    return (
      <MModal
        popup
        closable="true"
        visible={this.props.visible}
        onClose={this.props.onClose}
        animationType="slide-up"
      >
        <List
          renderHeader={() => (
            <div>{this.props.pickDate.format("YYYY-MM-DD")}</div>
          )}
          className="popup-list"
        >
          <List.Item>
            <DatePicker
              mode="time"
              format="HH:mm"
              value={this.state.time}
              onChange={v => this.setState({ time: v })}
            >
              <List.Item arrow="horizontal">Event Time</List.Item>
            </DatePicker>
          </List.Item>
          <List.Item>
            <InputItem
              placeholder="Event Name"
              value={this.state.name}
              onChange={v => this.setState({ name: v })}
            />
          </List.Item>

          <List.Item>
            <MButton
              style={{ backgroundColor: "#5CC3BF", color: "white" }}
              onClick={this.handleSaveMB}
            >
              Save
            </MButton>
          </List.Item>
        </List>
      </MModal>
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

export default EventModal;
