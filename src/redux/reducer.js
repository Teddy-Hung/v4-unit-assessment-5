const initialState = {
    username: {},
    profile_pic: {}
}
const UPDATE_USER = 'UPDATE_USER',
      LOG_OUT = 'LOG_OUT'
      

export function updateUser(userObj){
    return {
        type: UPDATE_USER,
        payload: userObj
    }
}

export function logout(){
    return {
        type: LOG_OUT,
        payload: {}
    }
}

export default function reducer(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case UPDATE_USER:
            return {...state, user: payload}
        case LOG_OUT:
            return {...state, user: payload}
        default:
            return state
    }
}