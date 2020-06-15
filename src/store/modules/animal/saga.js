import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import axios from 'axios';
import baseUrl from '../../../services/baseUrl';
import NavigationService from '../../../services/navigation';

import { getAnimalTypeSuccess } from './action';

export function* findAnimalType({ payload }) {
    try {
        const tokenSelector = state => state.auth.token;
        const token = yield select(tokenSelector);

        axios.defaults.headers.Authorization = `Bearer ${token}`;
        
        const response = yield call (
            axios.get,
            `${baseUrl}/animal/type`
        );
        yield put(getAnimalTypeSuccess(response.data));
    } catch(error) {   
    }
}

export function* saveAnimal({payload}) {
    try {
        const {name, type, breed, birthDate, vaccinated, castrated, zipCode, description, images} = payload;
        
        const tokenSelector = state => state.auth.token;
        const token = yield select(tokenSelector);

        axios.defaults.headers.Authorization = `Bearer ${token}`;

        const body = {
            name,
            typeId: type,
            breed,
            birthDate,
            vaccinated,
            castrated,
            zipCode,
            description,
            images
        };

        const response = yield call(
            axios.post,
            `${baseUrl}/animal`,
            body
        );
        console.tron.log(response);
    } catch(error) {
        console.tron.log(error);
    }
}

export default all([
    takeLatest('@animal/GET_ANIMAL_TYPE', findAnimalType),
    takeLatest('@animal/SAVE_ANIMAL', saveAnimal),
]);