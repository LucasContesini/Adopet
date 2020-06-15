const INITIAL_STATE = {
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
};

export default function animal(state = INITIAL_STATE, action) {
    switch(action.type) {
        case '@animal/ADD_INFO': {
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
        
    }
    return INITIAL_STATE;
}