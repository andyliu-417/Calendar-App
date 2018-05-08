const initState = {
  eventList: []
};

const ADD_EVENT = 'ADD_EVENT';

export function addEvent(event) {
  return {type: ADD_EVENT, payload: event};
}

export function event(state = initState, action) {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...state,
        eventList: state
          .eventList
          .concat(action.payload)
      };
    default:
      return state;
  }
}