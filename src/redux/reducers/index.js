import { combineReducers } from 'redux';
import web3 from './web3_reducer';

const rootReducer = combineReducers({
  web3,
});

export default rootReducer;
