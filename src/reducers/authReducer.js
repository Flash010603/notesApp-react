import { type } from "../types/types";

export const authReducer = (state={}, action) => {
     switch (action.type) {
         case type.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName,
                login: true
             }
         case type.logout:
            return{login: false}
         default:
             return state;
     }
};