import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import authReducer from './auth_reducer';
import secretMsgReducer from './secret_msg_reducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  secretMsg: secretMsgReducer
});

export default rootReducer;
