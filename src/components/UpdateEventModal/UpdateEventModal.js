import React, { Component } from "react";
import MediaQuery from "react-responsive";
import { Modal, Button, Input, TimePicker, Icon, notification } from "antd";

import { connect } from "react-redux";
import { addEvent, saveEvent } from "../../redux/event.redux";

import PropTypes from "prop-types";
import moment from "moment";

import config from "../../config";

@connect(state => state.event, { addEvent, saveEvent })
class UpdateEventModal extends Component {
  static propTypes = {
    pickDate: PropTypes.object,
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

  update(mq) {}

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
    notification["success"]({
      message: msg,
      description:
        "You add an event on " +
        this.props.pickDate.format("YYYY-MMMM-DD") +
        ".",
      duration: 2
    });
  }

  showError(mq) {
    const msg = "Please select time and set name!";
    notification["error"]({
      message: msg,
      duration: 2
    });
  }

  clear() {
    this.setState({
      name: "",
      time: null
    });
  }

  renderPC() {
    const { datetime, time, name, visible, onClose, onUpdate } = this.props;

    return (
      <Modal
        title={datetime.format("YYYY-MM-DD")}
        visible={visible}
        onCancel={onClose}
        footer={[
          <Button key="cancel" onClick={onClose}>
            <Icon type="close" />
          </Button>,
          <Button key="save" onClick={onUpdate}>
            <Icon type="check" />
          </Button>
        ]}
      >
        <Input.Group compact>
          <Input
            style={{
              width: "72%"
            }}
            placeholder="Event Name"
            defaultValue={name}
            onChange={v => this.props.onChange("name", v.target.value)}
          />
          <TimePicker
            defaultOpenValue={moment("00:00", "HH:mm")}
            format="HH:mm"
            defaultValue={time}
            onChange={v => this.props.onChange("time", v)}
          />
        </Input.Group>
      </Modal>
    );
  }

  render() {
    return (
      <div>
        <MediaQuery query="(min-device-width: 1224px)">
          {this.renderPC()}
        </MediaQuery>
        <MediaQuery query="(max-device-width: 1224px)">
          {/* {this.renderMB()} */}
        </MediaQuery>
      </div>
    );
  }
}

export default UpdateEventModal;
