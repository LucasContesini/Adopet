const INITIAL_STATE = {
    id: 0,
    name: '', 
    type: '', 
    breed: '', 
    birthDate: '', 
    vaccinated: '', 
    castrated: '', 
    zipCode: '', 
    description: '',
    images: [],
    animalTypes: [],
    animals: [],
    ownedAnimals: [],
    animalInfo: '',
};

export default function animal(state = INITIAL_STATE, action) {
    switch(action.type) {
        case '@animal/ADD_INFO': {
            INITIAL_STATE.id = action.payload.id;
            INITIAL_STATE.name = action.payload.name;
            INITIAL_STATE.type = action.payload.type;
            INITIAL_STATE.breed = action.payload.breed;
            INITIAL_STATE.birthDate = action.payload.birthDate;
            INITIAL_STATE.vaccinated = action.payload.vaccinated;
            INITIAL_STATE.castrated = action.payload.castrated;
            INITIAL_STATE.zipCode = action.payload.zipCode;
            INITIAL_STATE.description = action.payload.description;
            break;
        }
        case '@animal/GET_ANIMAL_TYPE_SUCCESS': {
            INITIAL_STATE.animalTypes = action.payload.animalTypes;
            break;
        }
        case '@animal/GET_ALL_ANIMAL_SUCCESS': {
            INITIAL_STATE.animals = action.payload.animals;
            break;
        }
        case '@animal/GET_ALL_OWNED_ANIMAL_SUCCESS': {
            INITIAL_STATE.ownedAnimals = action.payload.ownedAnimals;
            break;
        }
        case '@animal/GET_ANIMAL_BY_ID_SUCCESS': {
            INITIAL_STATE.animalInfo = action.payload.animalInfo;
            break;
        }
        
    }
    return INITIAL_STATE;
}