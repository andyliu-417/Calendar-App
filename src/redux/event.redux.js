import compare from '../helpers/utils';

const initState = {
  eventList: []
};

const ADD_EVENT = 'ADD_EVENT';
const SAVE_EVENT = 'SAVE_EVENT';

export function addEvent(event) {
  return {type: ADD_EVENT, payload: event};
}

export function saveEvent() {
  return {type: SAVE_EVENT};
}

export function event(state = initState, action) {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...state,
        eventList: state
          .eventList
          .concat(action.payload)
          .sort(compare())
      };
    case SAVE_EVENT:
      console.log("save");
      localStorage.setItem('eventList', JSON.stringify(state.eventList));
      return {
        ...state
      };
    default:
      return state;
  }
}