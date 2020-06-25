import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import axios from 'axios';
import baseUrl from '../../../services/baseUrl';
import NavigationService from '../../../services/navigation';

import { getAnimalTypeSuccess, getAllAnimalSuccess, getAnimalInfoByIdSuccess } from './action';

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

export function* findAllAnimal({ payload }) {
    try {
        const tokenSelector = state => state.auth.token;
        const token = yield select(tokenSelector);

        axios.defaults.headers.Authorization = `Bearer ${token}`;
        axios.defaults.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBZG9wZXQiLCJzdWIiOiIyMyIsImlhdCI6MTU5MzA0NzI1OSwiZXhwIjoxNTkzOTExMjU5fQ.IQcbxNhAU2u91dgH_UnBAYVedtd0YO4ZHiFp82p77O0`;
        
        const response = yield call (
            axios.get,
            `${baseUrl}/animal`
        );
        yield put(getAllAnimalSuccess(response.data));
    } catch(error) {   
    }
}

export function* findAnimalById({ payload }) {
    try {
        const tokenSelector = state => state.auth.token;
        const token = yield select(tokenSelector);

        axios.defaults.headers.Authorization = `Bearer ${token}`;
        axios.defaults.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBZG9wZXQiLCJzdWIiOiIyMyIsImlhdCI6MTU5MzA0NzI1OSwiZXhwIjoxNTkzOTExMjU5fQ.IQcbxNhAU2u91dgH_UnBAYVedtd0YO4ZHiFp82p77O0`;
        
        const { id } = payload;
        const response = yield call (
            axios.get,
            `${baseUrl}/animal/${id}`
        );
        yield put(getAnimalInfoByIdSuccess(response.data));
        NavigationService.navigate('AnimalInfo');
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
        NavigationService.navigate('AnimalList');
    } catch(error) {
        console.tron.log(error);
    }
}

export default all([
    takeLatest('@animal/GET_ANIMAL_TYPE', findAnimalType),
    takeLatest('@animal/GET_ALL_ANIMAL', findAllAnimal),
    takeLatest('@animal/GET_ANIMAL_BY_ID', findAnimalById),
    takeLatest('@animal/SAVE_ANIMAL', saveAnimal),
]);