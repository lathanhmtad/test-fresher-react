import { createAsyncThunk } from '@reduxjs/toolkit'
import roleService from '../../../services/roleService'
import { ROLES_MAX_ITEMS_PER_PAGE } from '../../../utils/appConstants'
import _ from 'lodash'

export const fetchRolesWithPagination = createAsyncThunk(
    'roles/fetchRolesWithPagination',
    async ({ page, size }) => {
        const response = await roleService.getRolesWithPagination(page, size)
        return response
    }
)

export const fetchAllRoles = createAsyncThunk(
    'roles/fetchAllRoles',
    async () => {
        const response = await roleService.getAllRoles()
        return response
    }
)

export const fetchRoleById = createAsyncThunk(
    'roles/fetchRoleById',
    async (roleId) => {
        const response = await roleService.getRoleById(roleId)
        return response
    }
)

export const createRoles = createAsyncThunk(
    'roles/createRoles',
    async (payload, thunkAPI) => {
        const response = await roleService.createRoles(payload)
        if (_.isArray(response)) {
            thunkAPI.dispatch(fetchRolesWithPagination({ page: 1, size: ROLES_MAX_ITEMS_PER_PAGE }))
        }
        return response
    }
)

export const updateRole = createAsyncThunk(
    'roles/updateRole',
    async ({ roleId, data }, thunkAPI) => {
        const response = await roleService.updateRole(roleId, data)
        thunkAPI.dispatch(fetchRolesWithPagination({ page: thunkAPI.getState().role.currentPage, size: ROLES_MAX_ITEMS_PER_PAGE }))
        return response
    }
)

export const deleteRole = createAsyncThunk(
    'roles/deleteRole',
    async (roleId, thunkAPI) => {
        const response = await roleService.deleteRole(roleId)
        thunkAPI.dispatch(fetchRolesWithPagination({ page: thunkAPI.getState().role.currentPage, size: ROLES_MAX_ITEMS_PER_PAGE }))
        return response
    }
)