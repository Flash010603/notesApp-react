import { type } from "../types/types";

export const setError = (error ) => ({
    type: type.uiSetError,
    payload: error
}); 

export const removeError = () => ({
    type: type.uiRemoveError
});

export const startLoading = () => ({
    type: type.uiStartLoading
});

export const finishLoading = () => ({
    type: type.uiFinishLoading
});

