import {
  SET_BALANCE,
  SET_PROVIDER,
  SET_ACCOUNT,
  RESET_WEB3,
  SET_TOKEN_BALANCE,
  SET_IS_CONNECTING,
  SET_ERROR,
  SET_IS_CONNECTED,
} from '../types';

const initialState = {
  provider: null,
  account: null,
  balance: null,
  tokenBalance: null,
  isConnecting: false,
  isConnected: false,
  error: '',
};
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PROVIDER:
      return { ...state, provider: action.payload };
    case SET_ACCOUNT:
      return { ...state, account: action.payload };
    case SET_BALANCE:
      return { ...state, balance: action.payload };
    case SET_TOKEN_BALANCE:
      return { ...state, tokenBalance: action.payload };
    case SET_IS_CONNECTING:
      return { ...state, isConnecting: action.payload };
    case SET_IS_CONNECTED:
      return { ...state, isConnected: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case RESET_WEB3:
      return initialState;
    default:
      return state;
  }
}
