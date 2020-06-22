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