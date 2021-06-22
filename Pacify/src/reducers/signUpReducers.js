import {userConstants} from '../constants/userConstants';

const initialState = {
  userDetails: {},
};

export default function signUpReducer(state = initialState, action) {
  switch (action.type) {
    case userConstants.STORE_SIGNUP_DETAILS:
      return {userDetails: {...action.user}};
    case userConstants.REMOVE_SIGNUP_DETAILS:
      return {userDetails: {}};
    default:
      return state;
  }
}
