import React, { useEffect, useState } from 'react';
import { Popconfirm, Table, Form, Typography, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRole, fetchRoleById, fetchRolesWithPagination, updateRole } from '../../../redux/slices/roles/roleThunk';
import { ROLES_MAX_ITEMS_PER_PAGE } from '../../../utils/appConstants';
import { resetIsDeleteSuccess, resetIsUpdateSuccess, setCurrentPage } from '../../../redux/slices/roles/roleSlice';
import { QuestionCircleOutlined } from '@ant-design/icons'
import EditableCell from './EditableCell';
import { toast } from 'react-toastify';

const { Link } = Typography;

const TableRole = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()

    // redux state
    const { loading, data, currentPage: current, totalElements, isUpdateSuccess, isDeleteSuccess } = useSelector(state => state.role)

    // fetch data effect
    useEffect(() => {
        dispatch(fetchRolesWithPagination({ page: current, size: ROLES_MAX_ITEMS_PER_PAGE }))
    }, [current])


    // edit state
    const [editingKey, setEditingKey] = useState('');

    // edit function
    const isEditing = (record) => record.id === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.id);
    };
    const cancel = () => {
        setEditingKey('');
    };

    useEffect(() => {
        if (isUpdateSuccess) {
            toast.success('Update success!')
            cancel()
            dispatch(resetIsUpdateSuccess())
        }
    }, [isUpdateSuccess])

    useEffect(() => {
        if (isDeleteSuccess) {
            toast.success('Delete success!')
            dispatch(resetIsDeleteSuccess())
        }
    }, [isDeleteSuccess])

    // row selection
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    // handle table change 
    const handleOnChange = (pagination) => {
        dispatch(setCurrentPage(pagination.current))
    }

    const handleDelete = (roleId) => {
        dispatch(deleteRole(roleId))
    }

    const save = async (roleId) => {
        try {
            const row = await form.validateFields();
            dispatch(updateRole({ roleId: roleId, data: row }))
        } catch (error) { }
    }

    // columns definition
    const columns = [
        { title: 'Id', dataIndex: 'id', editable: false },
        { title: 'Name', dataIndex: 'name', editable: true },
        { title: 'Description', dataIndex: 'description', editable: true },
        {
            title: 'Action',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <Space size='large'>
                        <Link onClick={() => save(record.id)}>
                            Save
                        </Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <Link type="warning">Cancel</Link>
                        </Popconfirm>
                    </Space>
                ) : (
                    <Space size='large'>
                        <Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Edit
                        </Link>
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}
                            icon={
                                <QuestionCircleOutlined
                                    style={{
                                        color: 'red',
                                    }}
                                />
                            }
                        >
                            <Link disabled={editingKey !== ''} type='danger'>Delete</Link>
                        </Popconfirm>
                        <Link
                            type='warning'
                            disabled={editingKey !== ''} onClick={() => dispatch(fetchRoleById(record.id))}>
                            Details
                        </Link>
                    </Space>
                );
            },
        },
    ];

    // merged columns
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <>
            <Form form={form} component={false}>
                <Table
                    loading={loading ? true : false}
                    bordered
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    onChange={handleOnChange}
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    rowKey="id"
                    columns={mergedColumns}
                    dataSource={data}
                    pagination={
                        {
                            current: current,
                            pageSize: ROLES_MAX_ITEMS_PER_PAGE,
                            total: totalElements,
                        }
                    }
                />
            </Form>
        </>
    );
};
export default TableRole;