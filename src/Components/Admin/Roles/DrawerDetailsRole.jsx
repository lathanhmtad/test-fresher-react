import React, { useState } from 'react';
import { Button, Descriptions, Drawer, Radio, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { closeDrawer } from '../../../redux/slices/roles/roleSlice';
import './index.scss'

const DrawerDetailsRole = () => {
    const dispatch = useDispatch()

    const { showDrawerDetails: open, roleDetails } = useSelector(state => state.role)

    const items = [
        {
            key: '1',
            label: 'Id',
            children: roleDetails.id,
        },
        {
            key: '2',
            label: 'Name',
            children: roleDetails.name,
        },
        {
            key: '3',
            span: '2',
            label: 'Description',
            children: roleDetails.description,
        },
        {
            key: '4',
            label: 'Create by',
            children: roleDetails.createdBy,
        },
        {
            key: '5',
            label: 'Created date',
            children: roleDetails.createdDate,
        },
        {
            key: '6',
            label: 'Last modified by',
            children: roleDetails.lastModifiedBy,
        },
        {
            key: '7',
            label: 'Last modified date',
            children: roleDetails.lastModifiedDate,
        },
    ];

    const onClose = () => {
        dispatch(closeDrawer())
    }

    return (
        <Drawer
            closeIcon={true}
            title="Role details"
            size='large'
            placement='left'
            onClose={onClose}
            open={open}
        >
            <Descriptions title="Role info" layout="vertical" items={items} />
        </Drawer>
    );
};
export default DrawerDetailsRole;