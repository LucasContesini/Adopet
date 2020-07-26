import produce from 'immer';

const INITIAL_STATE = {
    chats: [],
    activeChat: '',
    activeChatMessages: '',
};

export default function chat(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch(action.type) {
            case '@chat/SET_ACTIVE_CHAT': {
                draft.activeChat = action.payload.chatId;
                break;
              }
              case '@chat/CLEAR_ACTIVE_CHAT': {
                draft.activeChat = '';
                break;
              }
              case '@chat/CLEAR_ACTIVE_MESSAGE': {
                draft.activeChatMessages = '';
                break;
              }
              case '@chat/GET_LIST_CHAT_SUCCESS': {
                draft.chats = action.payload.chats;
                break;
              }
              case '@chat/ACTIVE_CHAT_MESSAGES': {
                draft.activeChatMessages = action.payload.allMessages;
                break;
              }
        }
    });
}