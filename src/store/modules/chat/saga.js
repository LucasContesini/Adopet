import { takeLatest, all } from 'redux-saga/effects';

import NavigationService from '../../../services/navigation';

export function setActiveChat({ payload }) {
    const { data } = payload;
    NavigationService.navigate('Chat', { data });
  }

export default all([
    takeLatest('@chat/SET_ACTIVE_CHAT', setActiveChat),
]);