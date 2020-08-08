import produce from 'immer';

const INITIAL_STATE = {
    id: 0,
    name: '', 
    type: '', 
    breed: '', 
    birthDate: '', 
    vaccinated: '', 
    castrated: '', 
    city: '', 
    description: '',
    images: [],
    animalTypes: [],
    animals: [],
    interestedAnimals: [],
    adoptedAnimals: [],
    ownedAnimals: [],
    animalInfo: '',
};

export default function animal(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch(action.type) {
            case '@animal/ADD_INFO': {
                draft.id = action.payload.id;
                draft.name = action.payload.name;
                draft.type = action.payload.type;
                draft.breed = action.payload.breed;
                draft.birthDate = action.payload.birthDate;
                draft.vaccinated = action.payload.vaccinated;
                draft.castrated = action.payload.castrated;
                draft.city = action.payload.city;
                draft.description = action.payload.description;
                break;
            }
            case '@animal/GET_ANIMAL_TYPE_SUCCESS': {
                draft.animalTypes = action.payload.animalTypes;
                break;
            }
            case '@animal/GET_ALL_ANIMAL_SUCCESS': {
                draft.animals = action.payload.animals;
                break;
            }
            case '@animal/GET_ALL_ANIMAL_INTERESTED_SUCCESS': {
                draft.interestedAnimals = action.payload.animals;
                break;
            }
            case '@animal/GET_ALL_ANIMAL_ADOPTED_SUCCESS': {
                draft.adoptedAnimals = action.payload.animals;
                break;
            }
            case '@animal/GET_ALL_OWNED_ANIMAL_SUCCESS': {
                draft.ownedAnimals = action.payload.ownedAnimals;
                break;
            }
            case '@animal/GET_ANIMAL_BY_ID_SUCCESS': {
                draft.animalInfo = action.payload.animalInfo;
                break;
            }
            case '@animal/SIGN_OUT': {
                draft.ownedAnimals = [];
                break;
            }
        }
    });
}