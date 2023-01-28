import { AsyncStorage } from "react-native"
import { RESTORE_THEME, SET_THEME } from "../type"

const theme_reducer = (state, action) => {

    switch (action.type) {

        case SET_THEME:
            AsyncStorage.setItem("theme", action.payload);
            return { ...state, theme: action.payload }

        case RESTORE_THEME:
            return { ...state, theme: action.payload }

        default:
            return state
    }
    return state
}

export default theme_reducer