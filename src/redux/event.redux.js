import {compare} from '../helpers/utils';

const initState = {
  eventList: []
};

const ADD_EVENT = 'ADD_EVENT';
const SAVE_EVENT = 'SAVE_EVENT';
const GET_EVENT = 'GET_EVENT';

export function addEvent(event) {
  return {type: ADD_EVENT, payload: event};
}

export function saveEvent() {
  return {type: SAVE_EVENT};
}

export function getEvent() {
  const eventList = JSON.parse(localStorage.getItem('eventList'));
  return {
    type: GET_EVENT,
    payload: eventList || []
  };
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
      localStorage.setItem('eventList', JSON.stringify(state.eventList));
      return {
        ...state
      };
    case GET_EVENT:
      return {
        ...state,
        eventList: action.payload
      };
    default:
      return state;
  }
}