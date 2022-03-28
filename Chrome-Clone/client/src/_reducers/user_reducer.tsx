import { Action } from "redux";
import { Statement } from "typescript";

import {LOGIN_UESR, REGISTER_UESR} from '../_actions/types'

export default function (state = {}, action : any){

    switch(action.type){
        case LOGIN_UESR:
            return {...state, loginSuccess : action.payload }
            break;
        case REGISTER_UESR:
            return {...state, Success : action.payload }
            break;
        default:
            return state
            break;
    }
}