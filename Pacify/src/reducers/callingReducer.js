import {userConstants} from '../constants/userConstants';

const initialState = {
  isCalling: false,
  requestedUser: null,
};

export default function callingReducer(state = initialState, action) {
  switch (action.type) {
    case userConstants.ON_CALLING:
      return {isCalling: true, requestedUser: {...action.user}};
    case userConstants.REMOVE_CALLING:
      return {isCalling: false, requestedUser: null};
    default:
      return state;
  }
}
