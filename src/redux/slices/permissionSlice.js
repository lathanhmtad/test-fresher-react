import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import permissionService from '../../services/permissionService'

const initialState = {
    loading: false,
    options: []
}

export const fetchPermissions = createAsyncThunk(
    'permissions/fetchPermissions',
    async () => {
        const response = await permissionService.getAllPermissions()
        return response
    }
)

export const permissionSlice = createSlice({
    name: 'permission',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            // fetch permissions 
            .addCase(fetchPermissions.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchPermissions.fulfilled, (state, action) => {
                state.options = action.payload.map(item => ({
                    label: item.name,
                    value: item.id
                }))
                state.loading = false
            })
            .addCase(fetchPermissions.rejected, (state) => {
                state.loading = false
            })
    }
})

// Action creators are generated for each case reducer function
export const { } = permissionSlice.actions

export default permissionSlice.reducer