import React, { useContext, useReducer, useEffect } from 'react'
import Reducer from '../Reducer/theme_reducer'
import { AsyncStorage } from 'react-native'
import { RESTORE_THEME, SET_THEME } from '../type'

const initialState = {
    theme: ''
}

const ThemeContext = React.createContext()

export const ThemeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState)

    const setTheme = value => {
        dispatch({ type: SET_THEME, payload: value })
    }

    useEffect(() => {
        // AsyncStorage.getItem('total').then((value) => {
        //     if (value) {
        //         dispatch({ type: RESTORE_TOTAL, payload: JSON.parse(value) })
        //     }
        // });
    }, [])

    const colors = {
        themColor: state.theme === "dark" ? 'black' : 'orange',
        background: state.theme === "dark" ? '#232425' : 'white',
        text: state.theme === "dark" ? 'white' : 'black',
        card: state.theme === "dark" ? 'black' : 'white',
        icon: state.theme === "dark" ? '#F7BD00' : 'orange',
        transparent: state.theme === "dark" ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.3)',
    }

    useEffect(() => {
        AsyncStorage.getItem('theme').then((value) => {
            if (value) {
                dispatch({ type: RESTORE_THEME, payload: value })
            }
        });


    }, [])

    return (
        <ThemeContext.Provider value={{ ...state, setTheme, colors }} >
            {children}
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () => {
    return useContext(ThemeContext)
}
