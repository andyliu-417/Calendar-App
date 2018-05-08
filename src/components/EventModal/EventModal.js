import React, {Component} from 'react';
import MediaQuery from 'react-responsive';
import moment from "moment";
import {
  Modal,
  Button,
  Input,
  TimePicker,
  Icon
} from 'antd';

class EventModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      time: null,
    };
  }

  componentDidMount() {
    this.setState({});
  }

  renderPC() {
    const {pickDate, visible, onClose} = this.props;

    return (
      <Modal
        title={pickDate.format("YYYY-MM-DD")}
        visible={visible}
        onCancel={onClose}
        footer={[
          <Button key="cancel" onClick ={onClose}> <Icon type="close" /> </Button>,
          <Button key="save" onClick={this.addEvent}> <Icon type="check" /> </Button >
        ]}>
        <Input.Group compact>
          <Input
            style={{
            width: "72%"
          }}
            placeholder="Event Name"
            onChange={(v) => this.setState({"name": v.target.value})}
            // onChange={(v) => onChange({"name": v.target.value})}
            />
          <TimePicker
            defaultOpenValue={moment("00:00", "HH:mm")}
            format="HH:mm"
            onChange={(v) => this.setState({"time": v})}
            // onChange={(v) => onChange({"time": v})}
            />
        </Input.Group>
      </Modal>
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

export default EventModal;
