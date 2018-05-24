import React from "react";
import { Row, Tag, Icon, Divider, List } from "antd";

import moment from "moment";
import config from "../../config";

class DayView extends React.PureComponent {
  filterEventsOfDay() {
    const events = [];
    const { pickDate, eventList } = this.props;

    for (let i = 0; i < eventList.length; i++) {
      const event = eventList[i];
      const eventMoment = moment(
        `${event.datetime.years}-${event.datetime.months + 2}-${
          event.datetime.date
        } ${event.datetime.hours}:${event.datetime.minutes}`,
        "YYYY-MM-DD HH:mm"
      );
      if (eventMoment.isSame(pickDate, "day")) {
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
        <div>
          <Divider>
            <Icon type="menu-fold" onClick={this.props.onClick} />&nbsp;&nbsp; 
            {this.props.pickDate.format('DD MMMM')}
          </Divider>
          <List
            size="large"
            bordered
            dataSource={events}
            renderItem={(v, i) => (
              <List.Item>
                <Row>
                  <Tag color="#5CC3BF">{i + 1}</Tag>
                  <Icon type="clock-circle-o" />&nbsp;
                  <span 
                  className={
                    "event-detail" + (v.completed ? " completed" : "")
                  }
                  >{this.showEvent(v)}</span>
                </Row>
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }

  render() {
    const events = this.filterEventsOfDay();
    // const { pickDate, eventList } = this.props;
    // const events = filterEvents(pickDate, eventList, "day");
    return <div>{this.renderPC(events)}</div>;
  }
}

export default DayView;
