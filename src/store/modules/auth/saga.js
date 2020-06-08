import { takeLatest, all, call, put } from 'redux-saga/effects';
import axios from 'axios';
import baseUrl from '../../../services/baseUrl';

import { signInSuccess, signInFailed } from './action';
export function* signIn({ payload }) {
    try {
        const body = {
            email: payload.email,
            password: payload.password
        }
        const response = yield call(
            axios.post,
            `${baseUrl}/auth`,
            body);

            yield put(signInSuccess(response.data.token));

    } catch(error) {
        console.tron.log(error.response);
        if(error.response.status === 401) {
            yield put(signInFailed());
        }
    }
    
}

export default all([
    takeLatest('@auth/SIGN_IN', signIn),
]);