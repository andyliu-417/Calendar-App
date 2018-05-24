import React from "react";
import MediaQuery from "react-responsive";
import { Modal, Button, Input, TimePicker, Icon, notification } from "antd";

import { connect } from "react-redux";
import { addEvent, saveEvent } from "../../redux/event.redux";

import PropTypes from "prop-types";
import moment from "moment";

import config from "../../config";

@connect(state => state.event, { addEvent, saveEvent })
class UpdateEventModal extends React.PureComponent {
  static propTypes = {
    datetime: PropTypes.object.isRequired,
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

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
