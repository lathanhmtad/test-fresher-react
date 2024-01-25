import { createSlice } from '@reduxjs/toolkit'
import { fetchAllRoles, createRoles, updateRole, deleteRole, fetchRolesWithPagination, fetchRoleById, assignPermissionsForRole } from './roleThunk'


const initialState = {
    loading: false,
    data: [],
    totalElements: 0,
    totalPages: 0,
    currentPage: 1,
    isCreateRolesSuccess: false,
    isUpdateSuccess: false,
    isDeleteSuccess: false,
    isAssignSuccess: false,
    roleDetails: {},
    showDrawerDetails: false,
    errorMessage: '',
    roleOptions: []
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
        resetIsDeleteSuccess: (state) => {
            state.isDeleteSuccess = false
        },
        resetErrorMessage: (state) => {
            state.errorMessage = ''
        },
        resetIsAssignSuccess: (state) => {
            state.isAssignSuccess = false
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

            // fetch all roles
            .addCase(fetchAllRoles.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchAllRoles.fulfilled, (state, action) => {
                state.roleOptions = []
                state.data = action.payload
                for (let i = 0; i < state.data.length; i++) {
                    state.roleOptions.push({
                        label: state.data[i].name,
                        value: state.data[i].id
                    })
                }
                state.loading = false
            })
            .addCase(fetchAllRoles.rejected, (state) => {
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
            .addCase(createRoles.rejected, (state, action) => {
                state.errorMessage = action.payload.message
                state.loading = false
            })

            // assign permissions
            .addCase(assignPermissionsForRole.pending, (state) => {
                state.loading = true
            })
            .addCase(assignPermissionsForRole.fulfilled, (state) => {
                state.isAssignSuccess = true
                state.loading = false
            })
            .addCase(assignPermissionsForRole.rejected, (state, action) => {
                state.errorMessage = action.payload.message
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
            .addCase(deleteRole.fulfilled, (state) => {
                state.isDeleteSuccess = true
                state.loading = false
            })
            .addCase(deleteRole.rejected, (state) => {
                state.loading = false
            })
    },
})

// Action creators are generated for each case reducer function
export const { setCurrentPage, resetIsCreateRolesSuccess, resetIsUpdateSuccess, resetIsAssignSuccess,
    resetIsDeleteSuccess, setRoleDetails, closeDrawer, resetErrorMessage }
    = roleSlice.actions

export default roleSlice.reducer