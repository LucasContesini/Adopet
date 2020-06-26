export function addAnimalInfo(name, type, breed, birthDate, vaccinated, castrated, zipCode, description) {
    return {
        type: '@animal/ADD_INFO',
        payload: { name, type, breed, birthDate, vaccinated, castrated, zipCode, description }
    }
}

export function saveAnimal(name, type, breed, birthDate, vaccinated, castrated, zipCode, description, images) {
    return {
        type: '@animal/SAVE_ANIMAL',
        payload: { name, type, breed, birthDate, vaccinated, castrated, zipCode, description, images }
    }
}

export function getAnimalType() {
    return {
        type: '@animal/GET_ANIMAL_TYPE',
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

export function getAllAnimalSuccess(animals) {
    return {
        type: '@animal/GET_ALL_ANIMAL_SUCCESS',
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


export function getAnimalInfoById(id) {
    return {
        type: '@animal/GET_ANIMAL_BY_ID',
        payload: { id }
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