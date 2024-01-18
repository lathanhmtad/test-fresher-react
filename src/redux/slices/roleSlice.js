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
    loading: false,
    roles: [],
}

export const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRolesWithPagination.fulfilled, (state, action) => {
                
            })
            
    },
})

// Action creators are generated for each case reducer function
export const { } = roleSlice.actions

export default roleSlice.reducer