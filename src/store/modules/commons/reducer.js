const INITIAL_STATE = {
    render: 0,
};

export default function commons(state = INITIAL_STATE, action) {
    switch(action.type) {
        case '@commons/SET_RENDER':
            if(INITIAL_STATE.render > 10) {
                INITIAL_STATE.render = 0;
            }
            INITIAL_STATE.render = ++INITIAL_STATE.render;
    }
    return INITIAL_STATE;
}