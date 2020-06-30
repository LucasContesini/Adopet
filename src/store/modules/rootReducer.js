import { combineReducers } from 'redux';

import auth from './auth/reducer';
import animal from './animal/reducer';
import commons from './commons/reducer';

export default combineReducers({
    auth,
    animal,
    commons,
});