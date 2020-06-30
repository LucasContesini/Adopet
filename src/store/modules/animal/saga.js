import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import axios from 'axios';
import baseUrl from '../../../services/baseUrl';
import tkn from '../../../config/token';
import NavigationService from '../../../services/navigation';

import { getAnimalTypeSuccess, getAllAnimalSuccess, getAnimalInfoByIdSuccess, getAllOwnedAnimalSuccess } from './action';
import { setRender } from '../commons/action';

export function* findAnimalType({ payload }) {
    try {
        const tokenSelector = state => state.auth.token;
        const token = yield select(tokenSelector);

        axios.defaults.headers.Authorization = `Bearer ${token}`;
        axios.defaults.headers.Authorization = `Bearer ${tkn}`;
        
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
        axios.defaults.headers.Authorization = `Bearer ${tkn}`;
        const userIdSelector = state => state.auth.id;
        const id = yield select(userIdSelector);
        
        const response = yield call (
            axios.get,
            `${baseUrl}/animal?id=${id}`
        );
        yield put(getAllAnimalSuccess(response.data));
    } catch(error) {   
    }
}

export function* findAllOwnedAnimal({ payload }) {
    try {
        const tokenSelector = state => state.auth.token;
        const token = yield select(tokenSelector);

        axios.defaults.headers.Authorization = `Bearer ${token}`;
        axios.defaults.headers.Authorization = `Bearer ${tkn}`;
        
        const response = yield call (
            axios.get,
            `${baseUrl}/animal/owner`
        );
        yield put(getAllOwnedAnimalSuccess(response.data));
    } catch(error) {   
    }
}

export function* findAnimalById({ payload }) {
    try {
        const tokenSelector = state => state.auth.token;
        const token = yield select(tokenSelector);

        axios.defaults.headers.Authorization = `Bearer ${token}`;
        axios.defaults.headers.Authorization = `Bearer ${tkn}`;
        
        const { id, isEdit } = payload;
        console.tron.log(isEdit);
        const response = yield call (
            axios.get,
            `${baseUrl}/animal/${id}`
        );
        yield put(getAnimalInfoByIdSuccess(response.data));
        if(isEdit)
            NavigationService.navigate('AnimalEdit');
        else
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
        axios.defaults.headers.Authorization = `Bearer ${tkn}`;
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
        yield put(setRender());
        NavigationService.navigate('AnimalOwnerList');
    } catch(error) {
        console.tron.log(error);
    }
}

export function* updateAnimal({payload}) {
    try {
        const {id, name, type, breed, birthDate, vaccinated, castrated, zipCode, description, images} = payload;
        
        const tokenSelector = state => state.auth.token;
        const token = yield select(tokenSelector);

        axios.defaults.headers.Authorization = `Bearer ${token}`;
        axios.defaults.headers.Authorization = `Bearer ${tkn}`;
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
            axios.put,
            `${baseUrl}/animal/${id}`,
            body
        );
        console.tron.log(response);
        yield put(setRender());
        NavigationService.navigate('AnimalOwnerList');
    } catch(error) {
        console.tron.log(error);
    }
}

export function* likeAnimal({payload}) {
    try {
        const { id, liked } = payload.animal;
        
        const tokenSelector = state => state.auth.token;
        const token = yield select(tokenSelector);

        axios.defaults.headers.Authorization = `Bearer ${token}`;
        axios.defaults.headers.Authorization = `Bearer ${tkn}`;

        const userIdSelector = state => state.auth.id;
        const userId = yield select(userIdSelector);

        const body = {
            userId,
            animalId: id,
            like: !liked
        };

        const response = yield call(
            axios.post,
            `${baseUrl}/animal/follow/like`,
            body
        );
        console.tron.log(response);
        yield put(setRender());
    } catch(error) {
        console.tron.log(error);
    }
}

export function* loveAnimal({payload}) {
    try {
        const { id, loved } = payload.animal;
        
        const tokenSelector = state => state.auth.token;
        const token = yield select(tokenSelector);

        axios.defaults.headers.Authorization = `Bearer ${token}`;
        axios.defaults.headers.Authorization = `Bearer ${tkn}`;

        const userIdSelector = state => state.auth.id;
        const userId = yield select(userIdSelector);

        const body = {
            userId,
            animalId: id,
            love: !loved
        };

        const response = yield call(
            axios.post,
            `${baseUrl}/animal/follow/love`,
            body
        );
        console.tron.log(response);
        yield put(setRender());
    } catch(error) {
        console.tron.log(error);
    }
}

export function* updateAdoptAnimal({payload}) {
    try {
        const { id } = payload;
        
        const tokenSelector = state => state.auth.token;
        const token = yield select(tokenSelector);

        axios.defaults.headers.Authorization = `Bearer ${token}`;
        axios.defaults.headers.Authorization = `Bearer ${tkn}`;

        const response = yield call(
            axios.put,
            `${baseUrl}/animal/adopt/${id}`
        );
        console.tron.log(response);
        yield put(setRender());
    } catch(error) {
        console.tron.log(error);
    }
}

export function* deleteAnimal({payload}) {
    try {
        const { id } = payload;
        
        const tokenSelector = state => state.auth.token;
        const token = yield select(tokenSelector);

        axios.defaults.headers.Authorization = `Bearer ${token}`;
        axios.defaults.headers.Authorization = `Bearer ${tkn}`;

        const response = yield call(
            axios.delete,
            `${baseUrl}/animal/${id}`
        );
        console.tron.log(response);
        yield put(setRender());
    } catch(error) {
        console.tron.log(error);
    }
}

export default all([
    takeLatest('@animal/GET_ANIMAL_TYPE', findAnimalType),
    takeLatest('@animal/GET_ALL_ANIMAL', findAllAnimal),
    takeLatest('@animal/GET_ALL_OWNED_ANIMAL', findAllOwnedAnimal),
    takeLatest('@animal/GET_ANIMAL_BY_ID', findAnimalById),
    takeLatest('@animal/SAVE_ANIMAL', saveAnimal),
    takeLatest('@animal/UPDATE_ANIMAL', updateAnimal),
    takeLatest('@animal/LIKE_ANIMAL', likeAnimal),
    takeLatest('@animal/LOVE_ANIMAL', loveAnimal),
    takeLatest('@animal/SET_ADOPT_ANIMAL', updateAdoptAnimal),    
    takeLatest('@animal/DELETE_ADOPT_ANIMAL', deleteAnimal),    
]);