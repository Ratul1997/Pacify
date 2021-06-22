import {userConstants} from '../constants/userConstants';

const initialState = {
  userDetails: {},
};

export default function signUpReducer(state = initialState, action) {
  switch (action.type) {
    case userConstants.STORE_USER_DETAILS:
      return {userDetails: {...action.user}};
    case userConstants.REMOVE_USER_DETAILS:
      return {userDetails: {}};
    case userConstants.UPDATE_USER_DETAILS:
      return {userDetails: {...action.user}};
    default:
      return state;
  }
}
