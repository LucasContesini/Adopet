import { combineReducers } from 'redux';

import auth from './auth/reducer';
import animal from './animal/reducer';
import chat from './chat/reducer';
import commons from './commons/reducer';

export default combineReducers({
    auth: auth,
    animal: animal,
    commons: commons,
    chat: chat,
});