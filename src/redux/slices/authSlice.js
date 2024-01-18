import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    userToken: '', // for storing the jwt
    userInfo: {} // for storing the user info
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action) {
            state.isAuthenticated = true
            state.userToken = action.payload
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload
        },
        doLogout(state) {
            state.isAuthenticated = false
            state.userToken = ''
            state.userInfo = {}
        },
        updateAccessToken(state, action) {
            state.userToken = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { loginSuccess, doLogout, setUserInfo, updateAccessToken } = authSlice.actions

export default authSlice.reducer