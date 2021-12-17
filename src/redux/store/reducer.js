import { ADD_ACCOUNT,ACCESS, ACCOUNT, USER } from "./createAction";

const account ={
    account : [],
    user : {}
}

export const reducer = (state=account,action)=>{
    switch(action.type){
        case ADD_ACCOUNT:
            return {
                ...state,
                account:action.payLoad
            }
        case ACCESS:
            return{
                ...state,
                account : action.payLoad
            }
        case ACCOUNT:
            return{
                ...state,
                user: action.payLoad
            }
        case USER:
            return {
                ...state
            }
        default :
            return state
    }
}