import { compare } from "../helpers/utils";

const initState = {
  eventList: []
};

const ADD_EVENT = "ADD_EVENT";
const SAVE_EVENT = "SAVE_EVENT";
const GET_EVENT = "GET_EVENT";
const DELETE_EVENT = "DELETE_EVENT";
const TOGGLE_EVENT = "TOGGLE_EVENT";
const UPADTE_EVENT = "UPADTE_EVENT";

export function addEvent(event) {
  return { type: ADD_EVENT, payload: event };
}

export function saveEvent() {
  return { type: SAVE_EVENT };
}

export function deleteEvent(id) {
  return { type: DELETE_EVENT, payload: id };
}

export function toggleEvent(id) {
  return { type: TOGGLE_EVENT, payload: id };
}

export function getEvent() {
  let eventList = JSON.parse(localStorage.getItem("eventList"));
  return {
    type: GET_EVENT,
    payload: eventList || []
  };
}

export function updateEvent(event) {
  return { type: UPADTE_EVENT, payload: event };
}

export function event(state = initState, action) {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...state,
        eventList: [...state.eventList, action.payload].sort(compare())
      };
    case SAVE_EVENT:
      localStorage.setItem("eventList", JSON.stringify(state.eventList));
      return {
        ...state
      };
    case DELETE_EVENT:
      return {
        ...state,
        eventList: state.eventList
          // .map(v => {
          //   if (v.id === action.payload) v.deleted = true;
          //   return v;
          // })
          // .filter(v => v.deleted === false)
          .filter(v => v.id !== action.payload)
          .sort(compare())
      };
    case TOGGLE_EVENT:
      return {
        ...state,
        eventList: state.eventList
          .map(v => {
            if (v.id === action.payload) v.completed = !v.completed;
            return v;
          })
          .sort(compare())
      };
    case UPADTE_EVENT:
      return {
        ...state,
        eventList: state.eventList
          .map(v => {
            if (v.id === action.payload.id) {
              v.name = action.payload.name;
              v.datetime = action.payload.datetime;
            }
            return v;
          })
          .sort(compare())
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
