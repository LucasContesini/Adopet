import produce from 'immer';

const INITIAL_STATE = {
    firstAccess: false,
    render: 0,
    region: '',
    type: '',
    vaccinated: false,
    castrated: false,
};

export default function commons(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch(action.type) {
            case '@commons/SET_RENDER': {
                if(draft.render > 10) {
                    draft.render = 0;
                }
                draft.render = ++draft.render;
                break;
            }
            case '@commons/SET_REGION': {
                draft.region = action.payload.region;
                break;
            }
            case '@commons/SET_FIRST_ACCESS': {
                draft.firstAccess = true;
                break;
            }
            case '@commons/SET_SEARCH_INFO': {
                draft.type = action.payload.type;
                draft.vaccinated = action.payload.vaccinated;
                draft.castrated = action.payload.castrated;
                break;
            }
        }
    });
}