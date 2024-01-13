import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import roleService from '../../services/roleService'

export const fetchRolesWithPagination = createAsyncThunk(
    'roles/fetchRolesWithPagination',
    async ({ page, size }) => {
        const response = await roleService.getRolesWithPagination(page, size)
        return response.data
    }
)

const initialState = {
    value: 0,
}

export const roleSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = roleSlice.actions

export default roleSlice.reducer