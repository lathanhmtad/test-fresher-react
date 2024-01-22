import { createSlice } from '@reduxjs/toolkit'
import { fetchAllRoles, createRoles, updateRole, deleteRole, fetchRolesWithPagination, fetchRoleById } from './roleThunk'


const initialState = {
    loading: false,
    data: [],
    totalElements: 0,
    totalPages: 0,
    currentPage: 1,
    isCreateRolesSuccess: false,
    isUpdateSuccess: false,
    roleDetails: {},
    showDrawerDetails: false
}

export const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        resetIsCreateRolesSuccess: (state) => {
            state.isCreateRolesSuccess = false
        },
        resetIsUpdateSuccess: (state) => {
            state.isUpdateSuccess = false
        },
        setRoleDetails: (state, action) => {
            state.roleDetails = action.payload
        },
        closeDrawer: (state) => {
            state.showDrawerDetails = false
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            // fetch roles with pagination
            .addCase(fetchRolesWithPagination.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchRolesWithPagination.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.totalPages = action.payload.totalPages
                state.totalElements = action.payload.totalElements
                state.loading = false
            })
            .addCase(fetchRolesWithPagination.rejected, (state) => {
                state.loading = false
            })

            // fetch role with id 
            .addCase(fetchRoleById.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchRoleById.fulfilled, (state, action) => {
                state.loading = false
                state.showDrawerDetails = true
                state.roleDetails = action.payload
            })
            .addCase(fetchRoleById.rejected, (state) => {
                state.loading = false
            })

            // create roles
            .addCase(createRoles.pending, (state) => {
                state.loading = true
            })
            .addCase(createRoles.fulfilled, (state) => {
                state.isCreateRolesSuccess = true
                state.loading = false
                state.currentPage = 1
            })
            .addCase(createRoles.rejected, (state) => {
                state.loading = false
            })

            // update role
            .addCase(updateRole.pending, (state) => {
                state.loading = true
            })
            .addCase(updateRole.fulfilled, (state) => {
                state.isUpdateSuccess = true
                state.loading = false
            })
            .addCase(updateRole.rejected, (state) => {
                state.loading = false
            })

            // delete a role
            .addCase(deleteRole.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteRole.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(deleteRole.rejected, (state) => {
                state.loading = false
            })


    },
})

// Action creators are generated for each case reducer function
export const { setCurrentPage, resetIsCreateRolesSuccess, resetIsUpdateSuccess, setRoleDetails, closeDrawer } = roleSlice.actions

export default roleSlice.reducer