import { takeLatest, all, call, put } from 'redux-saga/effects';
import axios from 'axios';
import baseUrl from '../../../services/baseUrl';
import NavigationService from '../../../services/navigation';

import { signInSuccess, signInFailed, signUpSuccess, signUpFailed } from './action';
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
            console.tron.log(response);
            yield put(signInSuccess(response.data.token));
            NavigationService.navigate('AnimalSignUp');
    } catch(error) {
        console.tron.log(error.response);
        if(error.response.status === 401) {
            yield put(signInFailed());
        }
    }
    
}

export function* signUp({ payload }) {
    try {
        const body = {
            nickname: payload.nickname,
            email: payload.email,
            password: payload.password
        }
        const response = yield call(
            axios.post,
            `${baseUrl}/user`,
            body);
            const { id, email, nickname } = response.data;
            yield put(signUpSuccess(id, email, nickname));
            NavigationService.navigate('SignIn');
    } catch(error) {
        if(error.response.status === 409) {
            yield put(signUpFailed());
        }
    }
}

export default all([
    takeLatest('@auth/SIGN_IN', signIn),
    takeLatest('@auth/SIGN_UP', signUp),
]);