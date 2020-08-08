export function addAnimalInfo(id, name, type, breed, birthDate, vaccinated, castrated, city, description) {
    return {
        type: '@animal/ADD_INFO',
        payload: { id, name, type, breed, birthDate, vaccinated, castrated, city, description }
    }
}

export function saveAnimal(name, type, breed, birthDate, vaccinated, castrated, city, description, images) {
    return {
        type: '@animal/SAVE_ANIMAL',
        payload: { name, type, breed, birthDate, vaccinated, castrated, city, description, images }
    }
}

export function updateAnimal(id, name, type, breed, birthDate, vaccinated, castrated, city, description, images) {
    return {
        type: '@animal/UPDATE_ANIMAL',
        payload: { id, name, type, breed, birthDate, vaccinated, castrated, city, description, images }
    }
}

export function getAnimalType() {
    return {
        type: '@animal/GET_ANIMAL_TYPE',
        payload: {}
    }
}

export function signOutAnimal() {
    return {
        type: '@animal/SIGN_OUT',
        payload: {}
    }
}

export function getAnimalTypeSuccess(animalTypes) {
    return {
        type: '@animal/GET_ANIMAL_TYPE_SUCCESS',
        payload: { animalTypes }
    }
}


export function getAllAnimal() {
    return {
        type: '@animal/GET_ALL_ANIMAL',
        payload: {}
    }
}

export function getAllInterested() {
    return {
        type: '@animal/GET_ALL_INTERESTED',
        payload: {}
    }
}

export function getAllAdopted() {
    return {
        type: '@animal/GET_ALL_ADOPTED',
        payload: {}
    }
}

export function getAllAnimalSuccess(animals) {
    return {
        type: '@animal/GET_ALL_ANIMAL_SUCCESS',
        payload: { animals }
    }
}

export function getAllInterestedAnimalSuccess(animals) {
    return {
        type: '@animal/GET_ALL_ANIMAL_INTERESTED_SUCCESS',
        payload: { animals }
    }
}

export function getAllAdoptedAnimalSuccess(animals) {
    return {
        type: '@animal/GET_ALL_ANIMAL_ADOPTED_SUCCESS',
        payload: { animals }
    }
}

export function getAllOwnedAnimal() {
    return {
        type: '@animal/GET_ALL_OWNED_ANIMAL',
        payload: {}
    }
}

export function getAllOwnedAnimalSuccess(ownedAnimals) {
    return {
        type: '@animal/GET_ALL_OWNED_ANIMAL_SUCCESS',
        payload: { ownedAnimals }
    }
}


export function getAnimalInfoById(id, isEdit) {
    return {
        type: '@animal/GET_ANIMAL_BY_ID',
        payload: { id, isEdit }
    }
}

export function setAdoptAnimal(id) {
    return {
        type: '@animal/SET_ADOPT_ANIMAL',
        payload: { id }
    }
}

export function deleteAnimal(id) {
    return {
        type: '@animal/DELETE_ADOPT_ANIMAL',
        payload: { id }
    }
}

export function getAnimalInfoByIdSuccess(animalInfo) {
    return {
        type: '@animal/GET_ANIMAL_BY_ID_SUCCESS',
        payload: { animalInfo }
    }
}

export function likeAnimal(animal) {
    return {
        type: '@animal/LIKE_ANIMAL',
        payload: { animal }
    }
}

export function loveAnimal(animal) {
    return {
        type: '@animal/LOVE_ANIMAL',
        payload: { animal }
    }
}
