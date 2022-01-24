import {
  SET_BALANCE,
  SET_PROVIDER,
  SET_ACCOUNT,
  RESET_WEB3,
  SET_TOKEN_BALANCE,
  SET_IS_CONNECTING,
  SET_IS_CONNECTED,
  SET_ERROR,
} from '../types';

export function setProvider(provider) {
  return {
    type: SET_PROVIDER,
    payload: provider,
  };
}
export function setBalance(balance) {
  return {
    type: SET_BALANCE,
    payload: balance,
  };
}
export function setAccount(account) {
  return {
    type: SET_ACCOUNT,
    payload: account,
  };
}
export function setTokenBalance(balance) {
  return {
    type: SET_TOKEN_BALANCE,
    payload: balance,
  };
}
export function setIsConnecting(payload) {
  return {
    type: SET_IS_CONNECTING,
    payload,
  };
}
export function setIsConnected(payload) {
  return {
    type: SET_IS_CONNECTED,
    payload,
  };
}
export function setError(payload) {
  return {
    type: SET_ERROR,
    payload,
  };
}
export function resetWeb3() {
  return {
    type: RESET_WEB3,
  };
}
